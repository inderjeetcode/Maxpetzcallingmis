/**
 * Max PetZ Hospitals — Call Analytics Dashboard
 * Full-stack Express Server with Google Sheets Integration,
 * Callback Tracking Persistence, and Vite Middleware Integration.
 */

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { RAW_MAIN_DATA_CSV } from './src/data/rawSpreadsheetData';
import { parseSpreadsheetData } from './src/services/dataParser';
import { CallbackAuditLog, CallbackStoreRecord, DataSourceSettings } from './src/types/callAnalytics';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

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
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');
const CALLBACKS_FILE = path.join(DATA_DIR, 'callback_store.json');
const AUDIT_LOGS_FILE = path.join(DATA_DIR, 'audit_logs.json');
const CSV_CACHE_FILE = path.join(DATA_DIR, 'cached_spreadsheet.csv');

// Default Settings
const DEFAULT_SETTINGS: DataSourceSettings = {
  spreadsheetId: '170_JWT44cFX0QIvJ62KeLqe9io3hTkuNYJosVs2oCBA',
  tabName: 'Main data',
  callbackMatchingWindowHours: 24,
  autoRefreshIntervalMinutes: 5,
  managementAnswerRateTarget: 85,
  timezone: 'Asia/Kolkata',
  lastSyncTime: null,
  recordCount: 0,
  connectionStatus: 'verified_cache',
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

/**
 * Attempt to fetch live Google Sheet data via public export / GViz endpoint
 */
async function fetchGoogleSheetCsv(spreadsheetId: string, tabName: string): Promise<{ csv: string; source: string }> {
  const gvizUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
    tabName
  )}`;
  const exportUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&sheet=${encodeURIComponent(
    tabName
  )}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(gvizUrl, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const text = await res.text();
      if (text.includes('UID') && text.includes('Event')) {
        return { csv: text, source: 'google_sheets_gviz' };
      }
    }
  } catch (err) {
    clearTimeout(timeoutId);
    console.log('GViz fetch failed or timed out, trying export endpoint...');
  }

  // Second attempt: export endpoint
  const controller2 = new AbortController();
  const timeoutId2 = setTimeout(() => controller2.abort(), 8000);
  try {
    const res = await fetch(exportUrl, { signal: controller2.signal });
    clearTimeout(timeoutId2);
    if (res.ok) {
      const text = await res.text();
      if (text.includes('UID') && text.includes('Event')) {
        return { csv: text, source: 'google_sheets_export' };
      }
    }
  } catch (err) {
    clearTimeout(timeoutId2);
    console.log('Export endpoint failed or timed out:', err);
  }

  // Graceful fallback to verified cache dataset
  return { csv: cachedCsvData || RAW_MAIN_DATA_CSV, source: 'verified_cache' };
}

// Initial parse of cached data to set record counts
(() => {
  const parsed = parseSpreadsheetData(cachedCsvData);
  currentSettings.recordCount = parsed.records.length;
  currentSettings.columnsDetected = parsed.headers;
  currentSettings.missingRequiredColumns = parsed.missingRequired;
  currentSettings.lastSyncTime = currentSettings.lastSyncTime || new Date().toISOString();
})();

// ==================== API ENDPOINTS ====================

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Max PetZ Call Analytics',
    timestamp: new Date().toISOString(),
    recordCount: currentSettings.recordCount,
    connectionStatus: currentSettings.connectionStatus,
  });
});

/**
 * GET /api/sheets/data
 * Returns the current call dataset, quality summary, and sync status
 */
app.get('/api/sheets/data', (req, res) => {
  const parsed = parseSpreadsheetData(cachedCsvData);

  currentSettings.recordCount = parsed.records.length;
  currentSettings.columnsDetected = parsed.headers;
  currentSettings.missingRequiredColumns = parsed.missingRequired;

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
 * Manually or automatically pulls fresh records from Google Sheets
 */
app.post('/api/sheets/sync', async (req, res) => {
  try {
    const { spreadsheetId, tabName } = currentSettings;
    const startTime = Date.now();
    const { csv, source } = await fetchGoogleSheetCsv(spreadsheetId, tabName);
    const durationMs = Date.now() - startTime;

    const parsed = parseSpreadsheetData(csv);

    if (parsed.records.length > 0) {
      cachedCsvData = csv;
      fs.writeFileSync(CSV_CACHE_FILE, csv, 'utf-8');

      currentSettings.lastSyncTime = new Date().toISOString();
      currentSettings.recordCount = parsed.records.length;
      currentSettings.columnsDetected = parsed.headers;
      currentSettings.missingRequiredColumns = parsed.missingRequired;
      currentSettings.connectionStatus = source === 'verified_cache' ? 'verified_cache' : 'connected';
      currentSettings.errorMessage = undefined;

      writeJsonFile(SETTINGS_FILE, currentSettings);

      return res.json({
        success: true,
        source,
        durationMs,
        recordsCount: parsed.records.length,
        records: parsed.records,
        summary: parsed.summary,
        settings: currentSettings,
      });
    } else {
      currentSettings.errorMessage = 'Google Sheet returned 0 valid records.';
      return res.status(400).json({
        success: false,
        error: currentSettings.errorMessage,
        settings: currentSettings,
      });
    }
  } catch (err: any) {
    currentSettings.connectionStatus = 'error';
    currentSettings.errorMessage = err.message || 'Sync failed';
    res.status(500).json({
      success: false,
      error: currentSettings.errorMessage,
      settings: currentSettings,
    });
  }
});

/**
 * POST /api/sheets/test-connection
 * Tests Google Sheets reachability without modifying data
 */
app.post('/api/sheets/test-connection', async (req, res) => {
  const spreadsheetId = req.body.spreadsheetId || currentSettings.spreadsheetId;
  const tabName = req.body.tabName || currentSettings.tabName;

  const testUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
    tabName
  )}`;

  const startTime = Date.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const response = await fetch(testUrl, { signal: controller.signal });
    clearTimeout(timeoutId);
    const latencyMs = Date.now() - startTime;

    if (response.ok) {
      const text = await response.text();
      const hasHeaders = text.includes('UID') && text.includes('Event');
      return res.json({
        connected: true,
        latencyMs,
        statusCode: response.status,
        headersDetected: hasHeaders,
        message: hasHeaders
          ? 'Successfully connected to Google Sheet Main data tab!'
          : 'Connected to spreadsheet, but could not detect expected headers.',
      });
    } else {
      return res.json({
        connected: false,
        latencyMs,
        statusCode: response.status,
        message: `Google Sheets responded with HTTP status ${response.status}. Verify sharing permissions or spreadsheet ID.`,
      });
    }
  } catch (err: any) {
    return res.json({
      connected: false,
      latencyMs: Date.now() - startTime,
      message: err.name === 'AbortError' ? 'Connection timed out after 6 seconds.' : err.message,
    });
  }
});

/**
 * POST /api/sheets/upload-csv
 * Allows uploading or pasting updated CSV data directly
 */
app.post('/api/sheets/upload-csv', (req, res) => {
  const { csvText } = req.body;
  if (!csvText || typeof csvText !== 'string') {
    return res.status(400).json({ success: false, error: 'No CSV data provided' });
  }

  const parsed = parseSpreadsheetData(csvText);
  if (parsed.records.length === 0) {
    return res.status(400).json({ success: false, error: 'CSV could not be parsed or contains no valid rows' });
  }

  cachedCsvData = csvText;
  fs.writeFileSync(CSV_CACHE_FILE, csvText, 'utf-8');

  currentSettings.lastSyncTime = new Date().toISOString();
  currentSettings.recordCount = parsed.records.length;
  currentSettings.columnsDetected = parsed.headers;
  currentSettings.missingRequiredColumns = parsed.missingRequired;
  currentSettings.connectionStatus = 'connected';
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
 * Returns stored manual confirmations and audit logs
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
 * Saves manual confirmation, marks outcome, and records audit trail
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

  // Add audit log entry
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
  if (auditLogs.length > 500) auditLogs.pop(); // keep last 500
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
