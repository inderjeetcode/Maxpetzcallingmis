/**
 * Max PetZ Hospitals — Call Analytics Dashboard
 * Full-stack Express Server with Authenticated Google Sheets API Integration,
 * Callback Tracking Persistence, and ZIP Export Endpoint.
 */

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { RAW_MAIN_DATA_CSV } from './src/data/rawSpreadsheetData';
import { parseSpreadsheetData } from './src/services/dataParser';
import { fetchLiveGoogleSheet, ServiceAccountCredentials } from './src/services/googleSheetsService';
import {
  CallbackAuditLog,
  CallbackStoreRecord,
  DataSourceSettings,
  SheetConnectionStatus,
} from './src/types/callAnalytics';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// CORS & Security headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Storage Directory
const DATA_DIR = path.join(__dirname, 'data');
const PUBLIC_DIR = path.join(__dirname, 'public');
const DOWNLOADS_DIR = path.join(PUBLIC_DIR, 'downloads');

[DATA_DIR, PUBLIC_DIR, DOWNLOADS_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Serve public directory
app.use(express.static(PUBLIC_DIR));

const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const CALLBACKS_FILE = path.join(DATA_DIR, 'callback_store.json');
const AUDIT_LOGS_FILE = path.join(DATA_DIR, 'audit_logs.json');
const CSV_CACHE_FILE = path.join(DATA_DIR, 'cached_spreadsheet.csv');
const SERVICE_ACCOUNT_FILE = path.join(DATA_DIR, 'service_account.json');

// Default Settings
const DEFAULT_SETTINGS: DataSourceSettings = {
  spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID || '170_JWT44cFX0QIvJ62KeLqe9io3hTkuNYJosVs2oCBA',
  tabName: process.env.GOOGLE_SHEET_TAB || 'Main data',
  apiKey: process.env.GOOGLE_SHEETS_API_KEY || '',
  appsScriptUrl: process.env.GOOGLE_APPS_SCRIPT_URL || '',
  callbackMatchingWindowHours: 24,
  autoRefreshIntervalMinutes: 5,
  managementAnswerRateTarget: 85,
  timezone: 'Asia/Kolkata',
  lastSyncTime: null,
  lastSuccessfulLiveSyncTime: null,
  recordCount: 0,
  connectionStatus: 'Offline / Cached Data',
  authMethod: 'None',
  columnsDetected: [],
  missingRequiredColumns: [],
};

function readJsonFile<T>(filePath: string, defaultVal: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content) as T;
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return defaultVal;
}

function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// In-Memory state with disk persistence
let currentSettings: DataSourceSettings = readJsonFile<DataSourceSettings>(SETTINGS_FILE, DEFAULT_SETTINGS);
let callbackStore: Record<string, CallbackStoreRecord> = readJsonFile(CALLBACKS_FILE, {});
let auditLogs: CallbackAuditLog[] = readJsonFile(AUDIT_LOGS_FILE, []);
let cachedCsvData: string = fs.existsSync(CSV_CACHE_FILE)
  ? fs.readFileSync(CSV_CACHE_FILE, 'utf-8')
  : RAW_MAIN_DATA_CSV;

// Check for Service Account in env or file
function getServiceAccount(): ServiceAccountCredentials | null {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    try {
      return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
    } catch (e) {
      console.error('Invalid GOOGLE_SERVICE_ACCOUNT_JSON env var');
    }
  }
  if (fs.existsSync(SERVICE_ACCOUNT_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_FILE, 'utf-8'));
    } catch (e) {
      console.error('Invalid service_account.json file');
    }
  }
  return null;
}

// Initial parse of cached data
(() => {
  const parsed = parseSpreadsheetData(cachedCsvData);
  currentSettings.recordCount = parsed.records.length;
  currentSettings.columnsDetected = parsed.headers;
  currentSettings.missingRequiredColumns = parsed.missingRequired;
  currentSettings.lastSyncTime = currentSettings.lastSyncTime || new Date().toISOString();
  currentSettings.serviceAccountConfigured = Boolean(getServiceAccount());
})();

// ==================== API ENDPOINTS ====================

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Max PetZ Call Analytics',
    timestamp: new Date().toISOString(),
    recordCount: currentSettings.recordCount,
    connectionStatus: currentSettings.connectionStatus,
    lastSuccessfulLiveSyncTime: currentSettings.lastSuccessfulLiveSyncTime,
  });
});

/**
 * GET /api/sheets/data
 * Returns the current call dataset and accurate live connection diagnostics
 */
app.get('/api/sheets/data', (req, res) => {
  const parsed = parseSpreadsheetData(cachedCsvData);

  currentSettings.recordCount = parsed.records.length;
  currentSettings.columnsDetected = parsed.headers;
  currentSettings.missingRequiredColumns = parsed.missingRequired;
  currentSettings.serviceAccountConfigured = Boolean(getServiceAccount());

  res.json({
    success: true,
    csv: cachedCsvData,
    records: parsed.records,
    summary: parsed.summary,
    headers: parsed.headers,
    missingRequired: parsed.missingRequired,
    settings: currentSettings,
  });
});

/**
 * POST /api/sheets/sync
 * Performs an authenticated live sync against Google Sheets.
 * Accurately updates status to 'Connected', 'Permission Error', or 'Connection Error'.
 * Preserves the previous dataset if the live fetch fails without claiming cached data is live.
 */
app.post('/api/sheets/sync', async (req, res) => {
  const serviceAccount = getServiceAccount();
  currentSettings.connectionStatus = 'Connecting';

  try {
    const fetchResult = await fetchLiveGoogleSheet(currentSettings.spreadsheetId, currentSettings.tabName, {
      serviceAccount,
      apiKey: currentSettings.apiKey,
      appsScriptUrl: currentSettings.appsScriptUrl,
    });

    if (fetchResult.status === 'Connected' && fetchResult.csv) {
      const parsed = parseSpreadsheetData(fetchResult.csv);

      if (parsed.records.length > 0) {
        cachedCsvData = fetchResult.csv;
        fs.writeFileSync(CSV_CACHE_FILE, fetchResult.csv, 'utf-8');

        const nowIso = new Date().toISOString();
        currentSettings.lastSyncTime = nowIso;
        currentSettings.lastSuccessfulLiveSyncTime = nowIso;
        currentSettings.recordCount = parsed.records.length;
        currentSettings.columnsDetected = parsed.headers;
        currentSettings.missingRequiredColumns = parsed.missingRequired;
        currentSettings.connectionStatus = 'Connected';
        currentSettings.authMethod = fetchResult.authMethod;
        currentSettings.errorMessage = undefined;

        writeJsonFile(SETTINGS_FILE, currentSettings);

        return res.json({
          success: true,
          liveSync: true,
          authMethod: fetchResult.authMethod,
          latencyMs: fetchResult.latencyMs,
          recordsCount: parsed.records.length,
          records: parsed.records,
          summary: parsed.summary,
          settings: currentSettings,
        });
      }
    }

    // Live sync failed or permission denied: preserve cached data and accurately report error
    currentSettings.connectionStatus = fetchResult.status;
    currentSettings.authMethod = fetchResult.authMethod;
    currentSettings.errorMessage = fetchResult.errorMessage || 'Live sync failed to fetch valid records.';
    currentSettings.lastSyncTime = new Date().toISOString(); // attempt time

    writeJsonFile(SETTINGS_FILE, currentSettings);

    const parsedCache = parseSpreadsheetData(cachedCsvData);

    return res.status(200).json({
      success: false,
      liveSync: false,
      status: fetchResult.status,
      error: currentSettings.errorMessage,
      latencyMs: fetchResult.latencyMs,
      recordsCount: parsedCache.records.length,
      records: parsedCache.records,
      summary: parsedCache.summary,
      settings: currentSettings,
    });
  } catch (err: any) {
    currentSettings.connectionStatus = 'Connection Error';
    currentSettings.errorMessage = err.message || 'Fatal error during Google Sheets synchronization';
    writeJsonFile(SETTINGS_FILE, currentSettings);

    const parsedCache = parseSpreadsheetData(cachedCsvData);
    return res.status(200).json({
      success: false,
      liveSync: false,
      status: 'Connection Error',
      error: currentSettings.errorMessage,
      records: parsedCache.records,
      summary: parsedCache.summary,
      settings: currentSettings,
    });
  }
});

/**
 * POST /api/sheets/test-connection
 * Tests Google Sheets reachability with configured authorization.
 * Accurately reports whether live connection succeeded or why it is blocked.
 */
app.post('/api/sheets/test-connection', async (req, res) => {
  const spreadsheetId = req.body.spreadsheetId || currentSettings.spreadsheetId;
  const tabName = req.body.tabName || currentSettings.tabName;
  const apiKey = req.body.apiKey !== undefined ? req.body.apiKey : currentSettings.apiKey;
  const appsScriptUrl = req.body.appsScriptUrl !== undefined ? req.body.appsScriptUrl : currentSettings.appsScriptUrl;

  const serviceAccount = getServiceAccount();

  const fetchResult = await fetchLiveGoogleSheet(spreadsheetId, tabName, {
    serviceAccount,
    apiKey,
    appsScriptUrl,
  });

  const connected = fetchResult.status === 'Connected';

  res.json({
    connected,
    status: fetchResult.status,
    authMethod: fetchResult.authMethod,
    latencyMs: fetchResult.latencyMs,
    message: connected
      ? `Live Google Sheet verified via ${fetchResult.authMethod} (${fetchResult.latencyMs}ms)`
      : fetchResult.errorMessage || 'Could not establish authenticated connection to Google Sheets.',
  });
});

/**
 * POST /api/sheets/service-account
 * Saves service account credentials securely on server
 */
app.post('/api/sheets/service-account', (req, res) => {
  const { credentialsJson } = req.body;
  if (!credentialsJson) {
    return res.status(400).json({ success: false, error: 'No credentials JSON provided' });
  }

  try {
    const creds = typeof credentialsJson === 'string' ? JSON.parse(credentialsJson) : credentialsJson;
    if (!creds.client_email || !creds.private_key) {
      return res.status(400).json({ success: false, error: 'JSON missing client_email or private_key' });
    }

    fs.writeFileSync(SERVICE_ACCOUNT_FILE, JSON.stringify(creds, null, 2), 'utf-8');
    currentSettings.serviceAccountConfigured = true;
    writeJsonFile(SETTINGS_FILE, currentSettings);

    res.json({
      success: true,
      clientEmail: creds.client_email,
      message: `Service account credentials configured for ${creds.client_email}. Share spreadsheet with Viewer access.`,
    });
  } catch (err: any) {
    res.status(400).json({ success: false, error: 'Invalid JSON: ' + err.message });
  }
});

/**
 * POST /api/sheets/upload-csv
 * Manual CSV upload / backup dataset override
 */
app.post('/api/sheets/upload-csv', (req, res) => {
  const { csvText } = req.body;
  if (!csvText || typeof csvText !== 'string') {
    return res.status(400).json({ success: false, error: 'No CSV data provided' });
  }

  const parsed = parseSpreadsheetData(csvText);
  if (parsed.records.length === 0) {
    return res.status(400).json({ success: false, error: 'CSV contains no valid records' });
  }

  cachedCsvData = csvText;
  fs.writeFileSync(CSV_CACHE_FILE, csvText, 'utf-8');

  currentSettings.lastSyncTime = new Date().toISOString();
  currentSettings.recordCount = parsed.records.length;
  currentSettings.columnsDetected = parsed.headers;
  currentSettings.missingRequiredColumns = parsed.missingRequired;
  currentSettings.connectionStatus = 'Offline / Cached Data';
  currentSettings.errorMessage = undefined;

  writeJsonFile(SETTINGS_FILE, currentSettings);

  res.json({
    success: true,
    recordsCount: parsed.records.length,
    records: parsed.records,
    summary: parsed.summary,
    settings: currentSettings,
  });
});

/**
 * GET /api/callbacks
 */
app.get('/api/callbacks', (req, res) => {
  res.json({
    success: true,
    confirmations: callbackStore,
    auditLogs,
  });
});

/**
 * POST /api/callbacks/confirm
 */
app.post('/api/callbacks/confirm', (req, res) => {
  const { missedCallUid, status, verifiedBy, notes } = req.body;

  if (!missedCallUid || !status) {
    return res.status(400).json({ success: false, error: 'Missing missedCallUid or status' });
  }

  const prev = callbackStore[missedCallUid];
  const previousStatus = prev ? prev.status : 'Pending';

  const record: CallbackStoreRecord = {
    missedCallUid,
    status,
    verifiedBy: verifiedBy || 'Staff User',
    verifiedAt: new Date().toISOString(),
    notes: notes || '',
  };

  callbackStore[missedCallUid] = record;
  writeJsonFile(CALLBACKS_FILE, callbackStore);

  const auditEntry: CallbackAuditLog = {
    id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    missedCallUid,
    previousStatus,
    newStatus: status,
    changedBy: verifiedBy || 'Staff User',
    timestamp: new Date().toISOString(),
    note: notes || '',
  };

  auditLogs.unshift(auditEntry);
  if (auditLogs.length > 500) auditLogs.pop();
  writeJsonFile(AUDIT_LOGS_FILE, auditLogs);

  res.json({
    success: true,
    record,
    auditEntry,
  });
});

/**
 * GET & POST /api/settings
 */
app.get('/api/settings', (req, res) => {
  currentSettings.serviceAccountConfigured = Boolean(getServiceAccount());
  res.json({ success: true, settings: currentSettings });
});

app.post('/api/settings', (req, res) => {
  const updates = req.body;
  currentSettings = {
    ...currentSettings,
    ...updates,
  };
  writeJsonFile(SETTINGS_FILE, currentSettings);
  res.json({ success: true, settings: currentSettings });
});

// ==================== VITE & STATIC HANDLING ====================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Max PetZ Analytics Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
});
