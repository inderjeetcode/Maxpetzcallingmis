/**
 * Max PetZ Hospitals - Call Analytics Dashboard Types
 */

export type CallEvent = 'Incoming' | 'Outgoing' | 'Unknown';
export type CallStatus = 'Connected' | 'Missed' | 'Unknown';

export interface RawCallRecord {
  UID: string;
  Event: string;
  Type: string;
  Status: string;
  From: string;
  Name?: string;
  Country?: string;
  State?: string;
  Duration?: string | number;
  Timestamp?: string;
  UserDetail?: string;
  Department?: string;
  LogSource?: string;
  StarMarked?: string;
  TextIfSMS?: string;
  AnyNote?: string;
  Billable?: string | number;
  Pulse?: string | number;
  LegBRate?: string | number;
  LegBMinutes?: string | number;
  [key: string]: any;
}

export interface ParsedCallRecord {
  uid: string;
  event: CallEvent;
  rawEvent: string;
  type: string;
  status: CallStatus;
  rawStatus: string;
  from: string;
  normalizedPhone: string;
  maskedPhone: string;
  name: string;
  country: string;
  state: string;
  durationSeconds: number;
  timestamp: string; // ISO string
  epochMs: number;
  dateKey: string; // YYYY-MM-DD in Asia/Kolkata
  hour: number; // 0-23 in Asia/Kolkata
  userDetail: string;
  staffName: string;
  extension: string;
  department: string;
  logSource: string;
  starMarked: boolean;
  textIfSMS: string;
  anyNote: string;
  billable: number;
  pulse: number;
  legBRate: number;
  legBMinutes: number;
  // Callback tracking metadata
  callbackStatus?: CallbackMatchStatus;
  callbackMatchUid?: string;
}

export type CallbackMatchStatus =
  | 'Pending'
  | 'Estimated Attempt'
  | 'Estimated Connected'
  | 'Confirmed Successful'
  | 'Confirmed Unsuccessful'
  | 'Ambiguous Match';

export interface CallbackMatch {
  missedCallUid: string;
  missedCallTimestamp: string;
  missedEpochMs: number;
  normalizedPhone: string;
  maskedPhone: string;
  callerName?: string;
  department?: string;
  outgoingCallUid?: string;
  outgoingTimestamp?: string;
  outgoingEpochMs?: number;
  outgoingStatus?: CallStatus;
  outgoingDurationSeconds?: number;
  outgoingStaffName?: string;
  timeTakenMinutes?: number;
  matchConfidence: 'Exact' | 'Heuristic' | 'Ambiguous' | 'None';
  status: CallbackMatchStatus;
  staffVerification?: {
    verifiedBy: string;
    verifiedAt: string;
    notes?: string;
  };
  notes?: string;
  ambiguousCandidateUids?: string[];
}

export interface CallbackStoreRecord {
  missedCallUid: string;
  status: CallbackMatchStatus;
  verifiedBy: string;
  verifiedAt: string;
  notes: string;
}

export interface CallbackAuditLog {
  id: string;
  missedCallUid: string;
  previousStatus: CallbackMatchStatus;
  newStatus: CallbackMatchStatus;
  changedBy: string;
  timestamp: string;
  note: string;
}

export interface KPICardsData {
  totalCalls: number;
  incomingCalls: number;
  incomingConnected: number;
  incomingMissed: number;
  outgoingCalls: number;
  outgoingConnected: number;
  outgoingMissed: number;
  totalConnected: number;
  totalMissed: number;
  callbackAttempts: number;
  estimatedSuccessfulCallbacks: number;
  confirmedSuccessfulCallbacks: number;
  pendingCallbacks: number;
  incomingAnswerRate: number; // percentage 0-100
  incomingMissedRate: number; // percentage 0-100
  averageCallDurationSeconds: number;
  // Comparison deltas against previous equivalent period
  comparisons?: {
    totalCallsDelta: number | null;
    incomingCallsDelta: number | null;
    incomingConnectedDelta: number | null;
    incomingMissedDelta: number | null;
    outgoingCallsDelta: number | null;
    outgoingConnectedDelta: number | null;
    outgoingMissedDelta: number | null;
    totalConnectedDelta: number | null;
    totalMissedDelta: number | null;
    incomingAnswerRateDelta: number | null;
    averageDurationDelta: number | null;
    confirmedCallbacksDelta: number | null;
  };
}

export interface DailyGrowthPoint {
  date: string; // YYYY-MM-DD
  displayDate: string; // e.g. Oct 13
  totalCalls: number;
  incomingCalls: number;
  outgoingCalls: number;
  incomingConnected: number;
  incomingMissed: number;
  outgoingConnected: number;
  outgoingMissed: number;
  totalConnected: number;
  totalMissed: number;
  answerRate: number; // %
  missedRate: number; // %
  // Growth % vs previous day
  totalGrowthPct: number | null;
  incomingGrowthPct: number | null;
  connectedGrowthPct: number | null;
  callbackGrowthPct: number | null;
  // Callback metrics
  eligibleMissed: number;
  callbackAttempts: number;
  estimatedSuccessfulCallbacks: number;
  confirmedSuccessfulCallbacks: number;
  pendingCallbacks: number;
}

export interface HourlyDistributionPoint {
  hour: number; // 0-23
  hourLabel: string; // e.g. "09:00"
  totalCalls: number;
  incomingCalls: number;
  outgoingCalls: number;
  incomingConnected: number;
  incomingMissed: number;
}

export interface DepartmentMetric {
  department: string;
  totalCalls: number;
  incomingCalls: number;
  outgoingCalls: number;
  incomingConnected: number;
  incomingMissed: number;
  answerRate: number;
  avgDurationSeconds: number;
  eligibleMissed: number;
  recoveredCallbacks: number;
  recoveryRate: number;
}

export interface StaffMetric {
  staffName: string;
  extension: string;
  totalCallsHandled: number;
  connectedCalls: number;
  missedCalls: number;
  avgDurationSeconds: number;
  incomingHandled: number;
  outgoingMade: number;
}

export type DateFilterPreset =
  | 'today'
  | 'yesterday'
  | 'last7days'
  | 'last30days'
  | 'last90days'
  | 'thisMonth'
  | 'previousMonth'
  | 'custom'
  | 'all';

export interface FilterState {
  datePreset: DateFilterPreset;
  customStartDate?: string;
  customEndDate?: string;
  department: string; // 'all' or name
  staff: string; // 'all' or name
  event: 'all' | 'Incoming' | 'Outgoing';
  status: 'all' | 'Connected' | 'Missed';
  callbackStatus: 'all' | CallbackMatchStatus;
  searchQuery: string;
}

export type SheetConnectionStatus =
  | 'Connected'
  | 'Connecting'
  | 'Configuration Required'
  | 'Permission Error'
  | 'Connection Error'
  | 'Offline / Cached Data';

export interface DataSourceSettings {
  spreadsheetId: string;
  tabName: string;
  apiKey?: string;
  appsScriptUrl?: string;
  serviceAccountConfigured?: boolean;
  authMethod?: 'Service Account' | 'API Key' | 'Apps Script' | 'Public Sheet' | 'None';
  callbackMatchingWindowHours: number;
  autoRefreshIntervalMinutes: number;
  managementAnswerRateTarget: number;
  timezone: string;
  lastSyncTime: string | null;
  lastSuccessfulLiveSyncTime: string | null;
  recordCount: number;
  connectionStatus: SheetConnectionStatus;
  errorMessage?: string;
  columnsDetected: string[];
  missingRequiredColumns: string[];
}

export interface DataQualitySummary {
  totalRawRows: number;
  uniqueRecords: number;
  duplicatesRemoved: number;
  timestampsRecovered: number;
  unclassifiedStatuses: number;
  unclassifiedEvents: number;
  validDurationRecords: number;
}
