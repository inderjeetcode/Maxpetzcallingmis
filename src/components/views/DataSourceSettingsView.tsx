/**
 * Section 10: Data Source Settings View
 * Configuration panel for Google Sheets integration, connection testing,
 * callback matching parameters, and data quality diagnostics.
 */

import React, { useState } from 'react';
import { DataSourceSettings, DataQualitySummary } from '../../types/callAnalytics';
import {
  Settings,
  RefreshCw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Upload,
  Clock,
  ShieldCheck,
  Table,
} from 'lucide-react';
import { ALL_EXPECTED_COLUMNS } from '../../services/dataParser';

interface DataSourceSettingsViewProps {
  settings: DataSourceSettings;
  qualitySummary: DataQualitySummary;
  onSaveSettings: (updates: Partial<DataSourceSettings>) => Promise<void>;
  onTestConnection: () => Promise<void>;
  onRefreshData: () => Promise<void>;
  onUploadCsv: (csvText: string) => Promise<void>;
  isSyncing: boolean;
  connectionTestResult: {
    tested: boolean;
    connected: boolean;
    message: string;
    latencyMs?: number;
  } | null;
}

export const DataSourceSettingsView: React.FC<DataSourceSettingsViewProps> = ({
  settings,
  qualitySummary,
  onSaveSettings,
  onTestConnection,
  onRefreshData,
  onUploadCsv,
  isSyncing,
  connectionTestResult,
}) => {
  const [spreadsheetId, setSpreadsheetId] = useState(settings.spreadsheetId);
  const [tabName, setTabName] = useState(settings.tabName);
  const [matchingWindow, setMatchingWindow] = useState(settings.callbackMatchingWindowHours);
  const [refreshInterval, setRefreshInterval] = useState(settings.autoRefreshIntervalMinutes);
  const [targetAnswerRate, setTargetAnswerRate] = useState(settings.managementAnswerRateTarget);
  const [apiKey, setApiKey] = useState(settings.apiKey || '');
  const [appsScriptUrl, setAppsScriptUrl] = useState(settings.appsScriptUrl || '');
  const [serviceAccountJson, setServiceAccountJson] = useState('');
  const [serviceAccountSaved, setServiceAccountSaved] = useState(false);
  const [manualCsv, setManualCsv] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await onSaveSettings({
        spreadsheetId,
        tabName,
        apiKey,
        appsScriptUrl,
        callbackMatchingWindowHours: matchingWindow,
        autoRefreshIntervalMinutes: refreshInterval,
        managementAnswerRateTarget: targetAnswerRate,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveServiceAccount = async () => {
    if (!serviceAccountJson.trim()) return;
    try {
      const res = await fetch('/api/sheets/service-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credentialsJson: serviceAccountJson }),
      });
      if (res.ok) {
        setServiceAccountSaved(true);
        setServiceAccountJson('');
        setTimeout(() => setServiceAccountSaved(false), 4000);
        onRefreshData();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to parse service account JSON');
      }
    } catch (err: any) {
      alert('Error saving service account: ' + err.message);
    }
  };

  const handleUploadCsvSubmit = async () => {
    if (!manualCsv.trim()) return;
    await onUploadCsv(manualCsv);
    setManualCsv('');
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Title */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b-2 border-black pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-black" />
            <h2 className="text-base font-black uppercase text-black">
              Section 10: Data Source & Integration Settings
            </h2>
          </div>
          <p className="text-xs font-semibold text-gray-600">
            Configure Google Sheets single source of truth, test API reachability, and tune matching thresholds
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onTestConnection}
            className="flex items-center gap-1.5 border-2 border-black bg-white px-3 py-1.5 text-xs font-black uppercase text-black shadow-[2px_2px_0px_#000] hover:bg-gray-100 active:translate-x-0.5 active:translate-y-0.5"
          >
            <span>Test Connection</span>
          </button>
          <button
            onClick={onRefreshData}
            disabled={isSyncing}
            className="flex items-center gap-1.5 border-2 border-black bg-[#FFE600] px-3 py-1.5 text-xs font-black uppercase text-black shadow-[2px_2px_0px_#000] hover:bg-yellow-300 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
          </button>
        </div>
      </div>

      {/* Connection Test Result Feedback Banner */}
      {connectionTestResult && connectionTestResult.tested && (
        <div
          className={`border-3 border-black p-4 shadow-[4px_4px_0px_#000] text-xs font-bold ${
            connectionTestResult.connected
              ? 'bg-[#00D26A] text-black'
              : 'bg-[#FF334B] text-white'
          }`}
        >
          <div className="flex items-center gap-2">
            {connectionTestResult.connected ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <XCircle className="h-5 w-5" />
            )}
            <span className="font-black uppercase text-sm">
              {connectionTestResult.connected
                ? 'CONNECTION TEST PASSED'
                : 'CONNECTION TEST FAILED'}
            </span>
            {connectionTestResult.latencyMs && (
              <span className="font-mono ml-auto">
                Latency: {connectionTestResult.latencyMs}ms
              </span>
            )}
          </div>
          <p className="mt-1 font-mono">{connectionTestResult.message}</p>
        </div>
      )}

      {/* Configuration Form */}
      <form onSubmit={handleSave} className="border-2 border-black bg-white p-5 shadow-[4px_4px_0px_#000]">
        <h3 className="text-xs font-black uppercase text-black border-b border-gray-200 pb-2 mb-4">
          Google Sheets Target Configuration
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
          <div>
            <label className="block text-black uppercase mb-1">
              Google Spreadsheet ID:
            </label>
            <input
              type="text"
              value={spreadsheetId}
              onChange={(e) => setSpreadsheetId(e.target.value)}
              className="w-full border-2 border-black p-2 font-mono text-xs focus:outline-none focus:bg-yellow-50"
            />
            <span className="text-[10px] text-gray-500 font-semibold block mt-1">
              Max PetZ Primary ID: 170_JWT44cFX0QIvJ62KeLqe9io3hTkuNYJosVs2oCBA
            </span>
          </div>

          <div>
            <label className="block text-black uppercase mb-1">
              Sheet Tab Name:
            </label>
            <input
              type="text"
              value={tabName}
              onChange={(e) => setTabName(e.target.value)}
              className="w-full border-2 border-black p-2 font-mono text-xs focus:outline-none focus:bg-yellow-50"
            />
            <span className="text-[10px] text-gray-500 font-semibold block mt-1">
              Must match exact tab title: "Main data"
            </span>
          </div>

          <div>
            <label className="block text-black uppercase mb-1">
              Callback Matching Window (Hours):
            </label>
            <input
              type="number"
              min={1}
              max={168}
              value={matchingWindow}
              onChange={(e) => setMatchingWindow(Number(e.target.value))}
              className="w-full border-2 border-black p-2 font-mono text-xs focus:outline-none focus:bg-yellow-50"
            />
            <span className="text-[10px] text-gray-500 font-semibold block mt-1">
              Default: 24 hours (Matches outbound calls within 24h of missed call)
            </span>
          </div>

          <div>
            <label className="block text-black uppercase mb-1">
              Auto-Refresh Interval (Minutes):
            </label>
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(Number(e.target.value))}
              className="w-full border-2 border-black p-2 font-mono text-xs focus:outline-none focus:bg-yellow-50"
            >
              <option value={1}>Every 1 minute (Fast)</option>
              <option value={5}>Every 5 minutes (Standard)</option>
              <option value={10}>Every 10 minutes</option>
              <option value={15}>Every 15 minutes</option>
            </select>
            <span className="text-[10px] text-gray-500 font-semibold block mt-1">
              Polls live Google Sheet in background while dashboard is open
            </span>
          </div>

          <div>
            <label className="block text-black uppercase mb-1">
              Management Target Answer Rate (%):
            </label>
            <input
              type="number"
              min={50}
              max={100}
              value={targetAnswerRate}
              onChange={(e) => setTargetAnswerRate(Number(e.target.value))}
              className="w-full border-2 border-black p-2 font-mono text-xs focus:outline-none focus:bg-yellow-50"
            />
            <span className="text-[10px] text-gray-500 font-semibold block mt-1">
              Benchmark line rendered on Graph D (Default: 85%)
            </span>
          </div>

          <div>
            <label className="block text-black uppercase mb-1">
              Timezone Boundary:
            </label>
            <div className="border-2 border-black p-2 bg-gray-50 font-mono text-xs font-black">
              Asia/Kolkata (IST · UTC+5:30)
            </div>
            <span className="text-[10px] text-gray-500 font-semibold block mt-1">
              All calendar metrics calculate using India Standard Time
            </span>
          </div>

          <div>
            <label className="block text-black uppercase mb-1">
              Google Sheets API Key (Optional):
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full border-2 border-black p-2 font-mono text-xs focus:outline-none focus:bg-yellow-50"
            />
            <span className="text-[10px] text-gray-500 font-semibold block mt-1">
              Required if sheet is accessed via Google Cloud API Key
            </span>
          </div>

          <div>
            <label className="block text-black uppercase mb-1">
              Google Apps Script Web App URL (Optional):
            </label>
            <input
              type="text"
              value={appsScriptUrl}
              onChange={(e) => setAppsScriptUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/.../exec"
              className="w-full border-2 border-black p-2 font-mono text-xs focus:outline-none focus:bg-yellow-50"
            />
            <span className="text-[10px] text-gray-500 font-semibold block mt-1">
              Secure alternative for corporate restricted spreadsheets
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-4">
          {saveSuccess && (
            <span className="font-mono text-xs font-black text-emerald-700">
              ✓ Settings saved successfully!
            </span>
          )}
          <div className="ml-auto">
            <button
              type="submit"
              disabled={isSaving}
              className="border-2 border-black bg-black px-4 py-2 text-xs font-black uppercase text-white shadow-[2px_2px_0px_#FFE600] hover:bg-neutral-800 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </form>

      {/* Google Service Account Credentials Box */}
      <div className="border-2 border-black bg-white p-5 shadow-[4px_4px_0px_#000]">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-black" />
            <h3 className="text-sm font-black uppercase text-black">
              Google Cloud Service Account (Most Secure Method)
            </h3>
          </div>
          <span
            className={`border border-black px-2 py-0.5 text-[10px] font-black uppercase ${
              settings.serviceAccountConfigured
                ? 'bg-[#00D26A] text-black'
                : 'bg-amber-100 text-amber-900'
            }`}
          >
            {settings.serviceAccountConfigured ? 'CREDENTIALS CONFIGURED' : 'NOT CONFIGURED'}
          </span>
        </div>

        <p className="text-xs font-semibold text-gray-700 mb-3">
          Paste your Google Service Account key JSON here. The server signs OAuth2 tokens server-side and queries the official Google Sheets API v4 without exposing credentials to the client.
        </p>

        <textarea
          rows={3}
          value={serviceAccountJson}
          onChange={(e) => setServiceAccountJson(e.target.value)}
          placeholder='{"type": "service_account", "project_id": "...", "private_key": "...", "client_email": "..."}'
          className="w-full border-2 border-black p-2 font-mono text-xs focus:outline-none focus:bg-yellow-50"
        />

        <div className="mt-3 flex items-center justify-between">
          {serviceAccountSaved && (
            <span className="font-mono text-xs font-black text-emerald-700">
              ✓ Service Account configured successfully!
            </span>
          )}
          <button
            type="button"
            onClick={handleSaveServiceAccount}
            disabled={!serviceAccountJson.trim()}
            className="ml-auto border-2 border-black bg-[#FFE600] px-4 py-1.5 text-xs font-black uppercase text-black shadow-[2px_2px_0px_#000] hover:bg-yellow-300 disabled:opacity-50"
          >
            Save Service Account Key
          </button>
        </div>
      </div>

      {/* Section 12: Data Quality & Column Diagnostics */}
      <div className="border-2 border-black bg-white p-5 shadow-[4px_4px_0px_#000]">
        <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-4">
          <ShieldCheck className="h-5 w-5 text-black" />
          <h3 className="text-sm font-black uppercase text-black">
            Section 12: Data Validation & Column Diagnostics
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-5">
          <div className="border-2 border-black p-3 bg-gray-50">
            <span className="font-bold text-gray-500 uppercase">Active Records:</span>
            <p className="font-mono text-xl font-black text-black">{qualitySummary.uniqueRecords}</p>
          </div>
          <div className="border-2 border-black p-3 bg-gray-50">
            <span className="font-bold text-gray-500 uppercase">Duplicates Prevented:</span>
            <p className="font-mono text-xl font-black text-black">{qualitySummary.duplicatesRemoved}</p>
          </div>
          <div className="border-2 border-black p-3 bg-gray-50">
            <span className="font-bold text-gray-500 uppercase">Timestamps Recovered:</span>
            <p className="font-mono text-xl font-black text-black">{qualitySummary.timestampsRecovered}</p>
          </div>
          <div className="border-2 border-black p-3 bg-gray-50">
            <span className="font-bold text-gray-500 uppercase">Valid Durations:</span>
            <p className="font-mono text-xl font-black text-black">{qualitySummary.validDurationRecords}</p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase text-black mb-2">
            Expected vs. Detected Column Schema ({settings.columnsDetected.length} detected):
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs">
            {ALL_EXPECTED_COLUMNS.map((col) => {
              const isDetected = settings.columnsDetected.some(
                (h) => h.toLowerCase().replace(/[^a-z0-9]/g, '') === col.toLowerCase().replace(/[^a-z0-9]/g, '')
              );
              return (
                <div
                  key={col}
                  className={`border border-black p-1.5 flex items-center justify-between text-[11px] font-mono ${
                    isDetected ? 'bg-emerald-50 text-emerald-900' : 'bg-amber-50 text-amber-900'
                  }`}
                >
                  <span className="truncate">{col}</span>
                  <span className="font-black text-[10px] ml-1">
                    {isDetected ? '✓' : '—'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Manual CSV Upload / Offline Sync Box */}
      <div className="border-2 border-black bg-white p-5 shadow-[4px_4px_0px_#000]">
        <div className="flex items-center gap-2 border-b border-gray-200 pb-3 mb-4">
          <Upload className="h-5 w-5 text-black" />
          <h3 className="text-sm font-black uppercase text-black">
            Manual CSV Data Upload / Backup Override
          </h3>
        </div>
        <p className="text-xs font-semibold text-gray-600 mb-3">
          Paste updated raw CSV data exported from Google Sheets to update the dashboard immediately without network constraints:
        </p>

        <textarea
          rows={4}
          value={manualCsv}
          onChange={(e) => setManualCsv(e.target.value)}
          placeholder="Paste CSV starting with UID,Event,Type,Status,From..."
          className="w-full border-2 border-black p-2 font-mono text-xs focus:outline-none focus:bg-yellow-50"
        />

        <div className="mt-3 flex justify-end">
          <button
            onClick={handleUploadCsvSubmit}
            disabled={!manualCsv.trim()}
            className="border-2 border-black bg-[#FFE600] px-4 py-1.5 text-xs font-black uppercase text-black shadow-[2px_2px_0px_#000] hover:bg-yellow-300 disabled:opacity-50"
          >
            Upload & Process CSV
          </button>
        </div>
      </div>

      {/* Integration Instructions */}
      <div className="border-2 border-black bg-gray-50 p-5 shadow-[4px_4px_0px_#000]">
        <div className="flex items-center gap-2 border-b border-black pb-2 mb-3">
          <HelpCircle className="h-5 w-5 text-black" />
          <h3 className="text-xs font-black uppercase text-black">
            Google Sheets Authorization & Setup Guide
          </h3>
        </div>
        <div className="space-y-2 text-xs font-medium text-gray-800">
          <p>
            <strong>1. Direct Google Sheets Fetch:</strong> The dashboard automatically requests the spreadsheet via public Google Visualization export endpoints (<code className="bg-white px-1 border border-black">/gviz/tq?tqx=out:csv&sheet=Main%20data</code>).
          </p>
          <p>
            <strong>2. Access Permissions:</strong> Ensure the Google Sheet is shared with "Anyone with the link can view" or authorized domain users.
          </p>
          <p>
            <strong>3. Google Apps Script Endpoint (Alternative):</strong> If private corporate access is enforced, deploy a simple Web App in Apps Script returning the active sheet as CSV, and paste its URL.
          </p>
          <p>
            <strong>4. Resilience & Fallback:</strong> If Google Sheets encounters temporary outages, the dashboard preserves the last verified dataset and displays an auditable notification.
          </p>
        </div>
      </div>
    </div>
  );
};
