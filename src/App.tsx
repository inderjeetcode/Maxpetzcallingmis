/**
 * Max PetZ Hospitals — Call Analytics Dashboard
 * Main Application Component
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { RAW_MAIN_DATA_CSV } from './data/rawSpreadsheetData';
import { parseSpreadsheetData } from './services/dataParser';
import { matchCallbacks } from './services/callbackEngine';
import {
  filterRecords,
  calculateKPICards,
  calculateDailyGrowth,
  calculateHourlyDistribution,
  calculateDepartmentMetrics,
  calculateStaffMetrics,
} from './services/analyticsCalculator';
import {
  CallbackAuditLog,
  CallbackMatch,
  CallbackMatchStatus,
  CallbackStoreRecord,
  DataSourceSettings,
  FilterState,
  ParsedCallRecord,
} from './types/callAnalytics';

import { Header } from './components/Header';
import { Sidebar, DashboardView } from './components/Sidebar';
import { FilterBar } from './components/FilterBar';
import { OverviewView } from './components/views/OverviewView';
import { CallAnalyticsView } from './components/views/CallAnalyticsView';
import { DailyGrowthView } from './components/views/DailyGrowthView';
import { MissedCallsView } from './components/views/MissedCallsView';
import { CallbackTrackingView } from './components/views/CallbackTrackingView';
import { DepartmentPerformanceView } from './components/views/DepartmentPerformanceView';
import { CallRecordsView } from './components/views/CallRecordsView';
import { DataSourceSettingsView } from './components/views/DataSourceSettingsView';
import { CallbackTriageModal } from './components/CallbackTriageModal';
import { AuditTrailModal } from './components/AuditTrailModal';
import { AutomatedTestRunner } from './components/AutomatedTestRunner';

const INITIAL_FILTERS: FilterState = {
  datePreset: 'all',
  department: 'all',
  staff: 'all',
  event: 'all',
  status: 'all',
  callbackStatus: 'all',
  searchQuery: '',
};

export default function App() {
  const [currentView, setCurrentView] = useState<DashboardView>('overview');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [maskPhones, setMaskPhones] = useState(true);

  // Raw & Parsed records state
  const [allRecords, setAllRecords] = useState<ParsedCallRecord[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [nextRefreshInSeconds, setNextRefreshInSeconds] = useState(300); // 5 mins

  // Backend settings & persistent callback store
  const [settings, setSettings] = useState<DataSourceSettings>({
    spreadsheetId: '170_JWT44cFX0QIvJ62KeLqe9io3hTkuNYJosVs2oCBA',
    tabName: 'Main data',
    callbackMatchingWindowHours: 24,
    autoRefreshIntervalMinutes: 5,
    managementAnswerRateTarget: 85,
    timezone: 'Asia/Kolkata',
    lastSyncTime: new Date().toISOString(),
    recordCount: 0,
    connectionStatus: 'verified_cache',
    columnsDetected: [],
    missingRequiredColumns: [],
  });

  const [callbackConfirmations, setCallbackConfirmations] = useState<Map<string, CallbackStoreRecord>>(new Map());
  const [auditLogs, setAuditLogs] = useState<CallbackAuditLog[]>([]);

  // Modals state
  const [triageMatch, setTriageMatch] = useState<CallbackMatch | null>(null);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [connectionTestResult, setConnectionTestResult] = useState<{
    tested: boolean;
    connected: boolean;
    message: string;
    latencyMs?: number;
  } | null>(null);

  // Initialize with verified seed data immediately
  useEffect(() => {
    const initialParsed = parseSpreadsheetData(RAW_MAIN_DATA_CSV);
    setAllRecords(initialParsed.records);
    setSettings((prev) => ({
      ...prev,
      recordCount: initialParsed.records.length,
      columnsDetected: initialParsed.headers,
      missingRequiredColumns: initialParsed.missingRequired,
    }));
  }, []);

  // Fetch live data & settings from Express backend
  const loadBackendData = useCallback(async () => {
    try {
      const [sheetsRes, callbacksRes] = await Promise.all([
        fetch('/api/sheets/data').then((r) => (r.ok ? r.json() : null)),
        fetch('/api/callbacks').then((r) => (r.ok ? r.json() : null)),
      ]);

      if (sheetsRes && sheetsRes.records && sheetsRes.records.length > 0) {
        setAllRecords(sheetsRes.records);
        if (sheetsRes.settings) {
          setSettings(sheetsRes.settings);
        }
      }

      if (callbacksRes && callbacksRes.confirmations) {
        const map = new Map<string, CallbackStoreRecord>();
        Object.entries(callbacksRes.confirmations).forEach(([k, v]) => {
          map.set(k, v as CallbackStoreRecord);
        });
        setCallbackConfirmations(map);
        if (callbacksRes.auditLogs) {
          setAuditLogs(callbacksRes.auditLogs);
        }
      }
    } catch (err) {
      console.log('Backend fetch fell back to client cache:', err);
    }
  }, []);

  useEffect(() => {
    loadBackendData();
  }, [loadBackendData]);

  // Auto-refresh countdown timer (every 5 minutes or configured interval)
  useEffect(() => {
    const interval = setInterval(() => {
      setNextRefreshInSeconds((prev) => {
        if (prev <= 1) {
          handleRefreshData();
          return (settings.autoRefreshIntervalMinutes || 5) * 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [settings.autoRefreshIntervalMinutes]);

  // Manual Refresh
  const handleRefreshData = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/sheets/sync', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data.records) {
          setAllRecords(data.records);
          if (data.settings) setSettings(data.settings);
        }
      } else {
        // Fallback local refresh
        loadBackendData();
      }
    } catch (err) {
      console.error('Sync failed:', err);
    } finally {
      setIsSyncing(false);
      setNextRefreshInSeconds((settings.autoRefreshIntervalMinutes || 5) * 60);
    }
  };

  // Test Connection
  const handleTestConnection = async () => {
    try {
      const res = await fetch('/api/sheets/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spreadsheetId: settings.spreadsheetId,
          tabName: settings.tabName,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setConnectionTestResult({
          tested: true,
          connected: data.connected,
          message: data.message,
          latencyMs: data.latencyMs,
        });
      }
    } catch (err: any) {
      setConnectionTestResult({
        tested: true,
        connected: false,
        message: err.message || 'Network error testing Google Sheets connection',
      });
    }
  };

  // Save Settings
  const handleSaveSettings = async (updates: Partial<DataSourceSettings>) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.settings) setSettings(data.settings);
      } else {
        setSettings((prev) => ({ ...prev, ...updates }));
      }
    } catch (err) {
      setSettings((prev) => ({ ...prev, ...updates }));
    }
  };

  // Upload/Paste CSV
  const handleUploadCsv = async (csvText: string) => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/sheets/upload-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csvText }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.records) {
          setAllRecords(data.records);
          if (data.settings) setSettings(data.settings);
        }
      } else {
        // Client fallback
        const parsed = parseSpreadsheetData(csvText);
        setAllRecords(parsed.records);
      }
    } catch (err) {
      const parsed = parseSpreadsheetData(csvText);
      setAllRecords(parsed.records);
    } finally {
      setIsSyncing(false);
    }
  };

  // Callback Confirmation / Status update
  const handleConfirmCallback = async (
    missedCallUid: string,
    status: CallbackMatchStatus,
    verifiedBy: string,
    notes: string
  ) => {
    try {
      const res = await fetch('/api/callbacks/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ missedCallUid, status, verifiedBy, notes }),
      });

      const updatedRecord: CallbackStoreRecord = {
        missedCallUid,
        status,
        verifiedBy,
        verifiedAt: new Date().toISOString(),
        notes,
      };

      setCallbackConfirmations((prev) => {
        const next = new Map(prev);
        next.set(missedCallUid, updatedRecord);
        return next;
      });

      if (res.ok) {
        const data = await res.json();
        if (data.auditEntry) {
          setAuditLogs((prev) => [data.auditEntry, ...prev]);
        }
      }
    } catch (err) {
      console.error('Error confirming callback:', err);
    }
  };

  // Derive all Callback Matches across entire dataset
  const callbackMatches = useMemo(() => {
    return matchCallbacks(allRecords, callbackConfirmations, {
      matchingWindowHours: settings.callbackMatchingWindowHours || 24,
    });
  }, [allRecords, callbackConfirmations, settings.callbackMatchingWindowHours]);

  // Filter options lists
  const departments = useMemo(() => {
    const set = new Set<string>();
    allRecords.forEach((r) => {
      if (r.department) set.add(r.department);
    });
    return Array.from(set).sort();
  }, [allRecords]);

  const staffMembers = useMemo(() => {
    const set = new Set<string>();
    allRecords.forEach((r) => {
      if (r.staffName && r.staffName !== 'Unassigned') set.add(r.staffName);
    });
    return Array.from(set).sort();
  }, [allRecords]);

  // Filtered records based on active filter state
  const { filtered, previousPeriodFiltered, dateRangeInfo } = useMemo(() => {
    return filterRecords(allRecords, filters);
  }, [allRecords, filters]);

  // Derived KPI metrics
  const kpis = useMemo(() => {
    return calculateKPICards(filtered, previousPeriodFiltered, callbackMatches);
  }, [filtered, previousPeriodFiltered, callbackMatches]);

  // Daily growth points
  const dailyGrowth = useMemo(() => {
    return calculateDailyGrowth(filtered, callbackMatches);
  }, [filtered, callbackMatches]);

  // Hourly distribution
  const hourlyDistribution = useMemo(() => {
    return calculateHourlyDistribution(filtered);
  }, [filtered]);

  // Department metrics
  const departmentMetrics = useMemo(() => {
    return calculateDepartmentMetrics(filtered, callbackMatches);
  }, [filtered, callbackMatches]);

  // Staff metrics
  const staffMetrics = useMemo(() => {
    return calculateStaffMetrics(filtered);
  }, [filtered]);

  // Missed incoming calls subset for missed calls view
  const missedIncomingCalls = useMemo(() => {
    return filtered.filter((r) => r.event === 'Incoming' && r.status === 'Missed');
  }, [filtered]);

  // Quick filter by KPI card click
  const handleFilterByCategory = (category: string) => {
    if (category === 'all') {
      setFilters((prev) => ({ ...prev, event: 'all', status: 'all' }));
      setCurrentView('call_records');
    } else if (category === 'Incoming') {
      setFilters((prev) => ({ ...prev, event: 'Incoming', status: 'all' }));
      setCurrentView('call_records');
    } else if (category === 'Outgoing') {
      setFilters((prev) => ({ ...prev, event: 'Outgoing', status: 'all' }));
      setCurrentView('call_records');
    } else if (category === 'Connected') {
      setFilters((prev) => ({ ...prev, status: 'Connected' }));
      setCurrentView('call_records');
    } else if (category === 'Missed' || category === 'Incoming-Missed') {
      setFilters((prev) => ({ ...prev, event: 'Incoming', status: 'Missed' }));
      setCurrentView('missed_calls');
    } else if (category === 'Incoming-Connected') {
      setFilters((prev) => ({ ...prev, event: 'Incoming', status: 'Connected' }));
      setCurrentView('call_records');
    } else if (category === 'Outgoing-Connected') {
      setFilters((prev) => ({ ...prev, event: 'Outgoing', status: 'Connected' }));
      setCurrentView('call_records');
    } else if (category === 'Outgoing-Missed') {
      setFilters((prev) => ({ ...prev, event: 'Outgoing', status: 'Missed' }));
      setCurrentView('call_records');
    } else if (category === 'Callbacks' || category === 'Estimated-Successful' || category === 'Confirmed-Successful' || category === 'Pending') {
      setCurrentView('callback_tracking');
    }
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  // Quality diagnostics summary
  const qualitySummary = useMemo(() => {
    return parseSpreadsheetData(RAW_MAIN_DATA_CSV).summary;
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#121212] font-sans">
      {/* Top Header */}
      <Header
        settings={settings}
        isSyncing={isSyncing}
        onRefresh={handleRefreshData}
        nextRefreshInSeconds={nextRefreshInSeconds}
        maskPhones={maskPhones}
        onToggleMaskPhones={() => setMaskPhones(!maskPhones)}
        onOpenTestModal={() => setIsTestModalOpen(true)}
      />

      <div className="flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <Sidebar
          currentView={currentView}
          onViewChange={setCurrentView}
          missedCallsCount={missedIncomingCalls.length}
          pendingCallbacksCount={kpis.pendingCallbacks}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden">
          {/* Global Filter Bar */}
          <FilterBar
            filters={filters}
            onFilterChange={(updates) => setFilters((prev) => ({ ...prev, ...updates }))}
            onResetFilters={handleResetFilters}
            departments={departments}
            staffMembers={staffMembers}
            dateRangeLabel={dateRangeInfo.label}
          />

          {/* View Render */}
          {currentView === 'overview' && (
            <OverviewView
              kpis={kpis}
              dailyGrowth={dailyGrowth}
              hourlyDistribution={hourlyDistribution}
              onFilterCategory={handleFilterByCategory}
              targetAnswerRate={settings.managementAnswerRateTarget}
            />
          )}

          {currentView === 'call_analytics' && (
            <CallAnalyticsView
              records={filtered}
              kpis={kpis}
              staffMetrics={staffMetrics}
            />
          )}

          {currentView === 'daily_growth' && (
            <DailyGrowthView
              dailyGrowth={dailyGrowth}
              hourlyDistribution={hourlyDistribution}
              targetAnswerRate={settings.managementAnswerRateTarget}
            />
          )}

          {currentView === 'missed_calls' && (
            <MissedCallsView
              missedCalls={missedIncomingCalls}
              callbackMatches={callbackMatches}
              onOpenTriageModal={setTriageMatch}
              maskPhones={maskPhones}
            />
          )}

          {currentView === 'callback_tracking' && (
            <CallbackTrackingView
              matches={callbackMatches}
              onOpenTriageModal={setTriageMatch}
              onOpenAuditTrail={() => setIsAuditModalOpen(true)}
              maskPhones={maskPhones}
            />
          )}

          {currentView === 'department_performance' && (
            <DepartmentPerformanceView metrics={departmentMetrics} />
          )}

          {currentView === 'call_records' && (
            <CallRecordsView
              records={filtered}
              callbackMatches={callbackMatches}
              maskPhones={maskPhones}
            />
          )}

          {currentView === 'data_settings' && (
            <DataSourceSettingsView
              settings={settings}
              qualitySummary={qualitySummary}
              onSaveSettings={handleSaveSettings}
              onTestConnection={handleTestConnection}
              onRefreshData={handleRefreshData}
              onUploadCsv={handleUploadCsv}
              isSyncing={isSyncing}
              connectionTestResult={connectionTestResult}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <CallbackTriageModal
        match={triageMatch}
        onClose={() => setTriageMatch(null)}
        onConfirmCallback={handleConfirmCallback}
      />

      <AuditTrailModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        logs={auditLogs}
      />

      <AutomatedTestRunner
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
      />
    </div>
  );
}
