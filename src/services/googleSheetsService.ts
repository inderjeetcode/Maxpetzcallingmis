/**
 * Google Sheets API Authentication & Data Fetching Service
 * Supports Google Service Account JWT, API Key, Apps Script Webhook, and GViz endpoint.
 * Accurately determines connection states without misleading cached data reports.
 */

import crypto from 'crypto';
import { SheetConnectionStatus } from '../types/callAnalytics';

export interface ServiceAccountCredentials {
  client_email: string;
  private_key: string;
  project_id?: string;
  [key: string]: any;
}

export interface GoogleSheetFetchResult {
  csv: string | null;
  status: SheetConnectionStatus;
  authMethod: 'Service Account' | 'API Key' | 'Apps Script' | 'Public Sheet' | 'None';
  errorMessage?: string;
  latencyMs: number;
  recordsCount?: number;
}

/**
 * Creates a signed Google OAuth2 JWT for Service Account authentication
 */
function createServiceAccountJwt(creds: ServiceAccountCredentials, scopes: string[]): string {
  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const claimSet = {
    iss: creds.client_email,
    scope: scopes.join(' '),
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const base64UrlEncode = (obj: object) =>
    Buffer.from(JSON.stringify(obj)).toString('base64url');

  const unsignedToken = `${base64UrlEncode(header)}.${base64UrlEncode(claimSet)}`;

  const sign = crypto.createSign('RSA-SHA256');
  sign.update(unsignedToken);
  sign.end();

  const signature = sign.sign(creds.private_key, 'base64url');
  return `${unsignedToken}.${signature}`;
}

/**
 * Exchanges JWT for Google OAuth2 Access Token
 */
async function getAccessTokenFromServiceAccount(creds: ServiceAccountCredentials): Promise<string> {
  const jwt = createServiceAccountJwt(creds, ['https://www.googleapis.com/auth/spreadsheets.readonly']);

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google OAuth2 Token Exchange Failed (${response.status}): ${errorText}`);
  }

  const tokenData = await response.json();
  return tokenData.access_token;
}

/**
 * Converts Google Sheets API v4 2D values array to CSV string
 */
function valuesToCsv(values: string[][]): string {
  return values
    .map((row) =>
      row
        .map((val) => {
          const str = String(val ?? '');
          if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
            return `"${str.replace(/"/g, '""')}"`;
          }
          return str;
        })
        .join(',')
    )
    .join('\r\n');
}

/**
 * Main fetch function: attempts real authenticated access across configured mechanisms
 */
export async function fetchLiveGoogleSheet(
  spreadsheetId: string,
  tabName: string,
  config: {
    serviceAccount?: ServiceAccountCredentials | null;
    apiKey?: string;
    appsScriptUrl?: string;
  }
): Promise<GoogleSheetFetchResult> {
  const startTime = Date.now();

  // 1. MECHANISM A: Google Service Account
  if (config.serviceAccount && config.serviceAccount.client_email && config.serviceAccount.private_key) {
    try {
      const accessToken = await getAccessTokenFromServiceAccount(config.serviceAccount);
      const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
        tabName
      )}?valueRenderOption=FORMATTED_VALUE`;

      const apiRes = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const latencyMs = Date.now() - startTime;

      if (apiRes.ok) {
        const data = await apiRes.json();
        if (data.values && Array.isArray(data.values) && data.values.length > 0) {
          const csv = valuesToCsv(data.values);
          return {
            csv,
            status: 'Connected',
            authMethod: 'Service Account',
            latencyMs,
            recordsCount: data.values.length - 1,
          };
        }
      } else if (apiRes.status === 403) {
        return {
          csv: null,
          status: 'Permission Error',
          authMethod: 'Service Account',
          errorMessage: `Google Sheet permission denied (403). Grant 'Viewer' access to service account email: ${config.serviceAccount.client_email}`,
          latencyMs,
        };
      } else if (apiRes.status === 404) {
        return {
          csv: null,
          status: 'Connection Error',
          authMethod: 'Service Account',
          errorMessage: `Spreadsheet ID '${spreadsheetId}' or tab '${tabName}' not found (404).`,
          latencyMs,
        };
      }
    } catch (err: any) {
      console.error('Service account fetch error:', err);
    }
  }

  // 2. MECHANISM B: Google Sheets API Key
  if (config.apiKey && config.apiKey.trim() !== '') {
    try {
      const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
        tabName
      )}?key=${config.apiKey.trim()}&valueRenderOption=FORMATTED_VALUE`;

      const apiRes = await fetch(apiUrl);
      const latencyMs = Date.now() - startTime;

      if (apiRes.ok) {
        const data = await apiRes.json();
        if (data.values && Array.isArray(data.values) && data.values.length > 0) {
          const csv = valuesToCsv(data.values);
          return {
            csv,
            status: 'Connected',
            authMethod: 'API Key',
            latencyMs,
            recordsCount: data.values.length - 1,
          };
        }
      } else if (apiRes.status === 403) {
        return {
          csv: null,
          status: 'Permission Error',
          authMethod: 'API Key',
          errorMessage: 'API Key rejected or spreadsheet not publicly readable with key (403).',
          latencyMs,
        };
      }
    } catch (err: any) {
      console.error('API key fetch error:', err);
    }
  }

  // 3. MECHANISM C: Google Apps Script Endpoint
  if (config.appsScriptUrl && config.appsScriptUrl.trim() !== '') {
    try {
      const scriptRes = await fetch(config.appsScriptUrl.trim());
      const latencyMs = Date.now() - startTime;
      if (scriptRes.ok) {
        const text = await scriptRes.text();
        if (text.includes('UID') && text.includes('Event')) {
          return {
            csv: text,
            status: 'Connected',
            authMethod: 'Apps Script',
            latencyMs,
          };
        }
      }
    } catch (err: any) {
      console.error('Apps Script fetch error:', err);
    }
  }

  // 4. MECHANISM D: Direct Google Visualization Endpoint
  try {
    const gvizUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
      tabName
    )}`;
    const res = await fetch(gvizUrl);
    const latencyMs = Date.now() - startTime;

    if (res.ok) {
      const text = await res.text();
      // Verify text is actual CSV and not a Google login HTML page
      if (text.includes('UID') && text.includes('Event') && !text.includes('<!DOCTYPE html>')) {
        return {
          csv: text,
          status: 'Connected',
          authMethod: 'Public Sheet',
          latencyMs,
        };
      } else if (text.includes('accounts.google.com') || text.includes('ServiceLogin') || text.includes('<!DOCTYPE html>')) {
        return {
          csv: null,
          status: 'Permission Error',
          authMethod: 'None',
          errorMessage: 'Google Sheet requires authentication. Enable public link viewing or configure a Google Service Account in settings.',
          latencyMs,
        };
      }
    } else if (res.status === 403 || res.status === 401) {
      return {
        csv: null,
        status: 'Permission Error',
        authMethod: 'None',
        errorMessage: 'Spreadsheet access restricted (403/401). Configure Google Service Account or Apps Script.',
        latencyMs,
      };
    }
  } catch (err: any) {
    // Network or connection failure
  }

  // If all attempts failed or unconfigured
  const hasCredentialsConfigured = Boolean(
    config.serviceAccount?.client_email || config.apiKey || config.appsScriptUrl
  );

  return {
    csv: null,
    status: hasCredentialsConfigured ? 'Connection Error' : 'Configuration Required',
    authMethod: 'None',
    errorMessage: hasCredentialsConfigured
      ? 'Could not connect to Google Sheets with configured credentials.'
      : 'No Google Service Account or API authorization configured yet.',
    latencyMs: Date.now() - startTime,
  };
}
