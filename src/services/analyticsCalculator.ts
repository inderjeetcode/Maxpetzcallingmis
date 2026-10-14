/**
 * Section 5, 6, 7: Max PetZ Call Center Analytics Calculator
 * Dynamically computes all 16 KPIs, period-over-period comparisons,
 * continuous daily growth analytics, hourly distribution, and department breakdown.
 */

import {
  CallbackMatch,
  DailyGrowthPoint,
  DateFilterPreset,
  DepartmentMetric,
  FilterState,
  HourlyDistributionPoint,
  KPICardsData,
  ParsedCallRecord,
  StaffMetric,
} from '../types/callAnalytics';
import { summarizeCallbacks } from './callbackEngine';
import { toKolkataDateKey } from './dataParser';

/**
 * Resolves filter presets to epoch timestamp ranges (startMs, endMs, prevStartMs, prevEndMs)
 */
export function resolveDateFilterRange(
  preset: DateFilterPreset,
  customStart?: string,
  customEnd?: string,
  referenceDateEpochMs: number = Date.now()
): {
  startMs: number;
  endMs: number;
  prevStartMs: number;
  prevEndMs: number;
  label: string;
  prevLabel: string;
} {
  // Asia/Kolkata offset
  const kolkataOffsetMs = 5.5 * 60 * 60 * 1000;
  const nowKolkata = new Date(referenceDateEpochMs + kolkataOffsetMs);

  // Midnight of today in Kolkata
  const todayStartKolkata = new Date(
    Date.UTC(nowKolkata.getUTCFullYear(), nowKolkata.getUTCMonth(), nowKolkata.getUTCDate(), 0, 0, 0, 0)
  );
  const todayStartMs = todayStartKolkata.getTime() - kolkataOffsetMs;
  const oneDayMs = 24 * 60 * 60 * 1000;

  let startMs = 0;
  let endMs = referenceDateEpochMs;
  let prevStartMs = 0;
  let prevEndMs = 0;
  let label = 'All Records';
  let prevLabel = 'Previous Period';

  switch (preset) {
    case 'today': {
      startMs = todayStartMs;
      endMs = todayStartMs + oneDayMs;
      prevStartMs = todayStartMs - oneDayMs;
      prevEndMs = todayStartMs;
      label = 'Today';
      prevLabel = 'Yesterday';
      break;
    }
    case 'yesterday': {
      startMs = todayStartMs - oneDayMs;
      endMs = todayStartMs;
      prevStartMs = todayStartMs - 2 * oneDayMs;
      prevEndMs = todayStartMs - oneDayMs;
      label = 'Yesterday';
      prevLabel = 'Day Before Yesterday';
      break;
    }
    case 'last7days': {
      const duration = 7 * oneDayMs;
      startMs = todayStartMs - 6 * oneDayMs;
      endMs = todayStartMs + oneDayMs;
      prevStartMs = startMs - duration;
      prevEndMs = startMs;
      label = 'Last 7 Days';
      prevLabel = 'Preceding 7 Days';
      break;
    }
    case 'last30days': {
      const duration = 30 * oneDayMs;
      startMs = todayStartMs - 29 * oneDayMs;
      endMs = todayStartMs + oneDayMs;
      prevStartMs = startMs - duration;
      prevEndMs = startMs;
      label = 'Last 30 Days';
      prevLabel = 'Preceding 30 Days';
      break;
    }
    case 'last90days': {
      const duration = 90 * oneDayMs;
      startMs = todayStartMs - 89 * oneDayMs;
      endMs = todayStartMs + oneDayMs;
      prevStartMs = startMs - duration;
      prevEndMs = startMs;
      label = 'Last 90 Days';
      prevLabel = 'Preceding 90 Days';
      break;
    }
    case 'thisMonth': {
      const monthStartKolkata = new Date(
        Date.UTC(nowKolkata.getUTCFullYear(), nowKolkata.getUTCMonth(), 1, 0, 0, 0, 0)
      );
      startMs = monthStartKolkata.getTime() - kolkataOffsetMs;
      endMs = todayStartMs + oneDayMs;
      const duration = endMs - startMs;
      prevEndMs = startMs;
      prevStartMs = startMs - duration;
      label = 'This Month';
      prevLabel = 'Prior Equivalent Period';
      break;
    }
    case 'previousMonth': {
      const prevMonthStartKolkata = new Date(
        Date.UTC(nowKolkata.getUTCFullYear(), nowKolkata.getUTCMonth() - 1, 1, 0, 0, 0, 0)
      );
      const curMonthStartKolkata = new Date(
        Date.UTC(nowKolkata.getUTCFullYear(), nowKolkata.getUTCMonth(), 1, 0, 0, 0, 0)
      );
      startMs = prevMonthStartKolkata.getTime() - kolkataOffsetMs;
      endMs = curMonthStartKolkata.getTime() - kolkataOffsetMs;
      const duration = endMs - startMs;
      prevEndMs = startMs;
      prevStartMs = startMs - duration;
      label = 'Previous Month';
      prevLabel = 'Two Months Prior';
      break;
    }
    case 'custom': {
      if (customStart && customEnd) {
        startMs = Date.parse(customStart + 'T00:00:00+05:30');
        endMs = Date.parse(customEnd + 'T23:59:59+05:30');
        const duration = endMs - startMs;
        prevEndMs = startMs;
        prevStartMs = startMs - duration;
        label = `${customStart} to ${customEnd}`;
        prevLabel = 'Preceding Window';
      } else {
        startMs = 0;
        endMs = Number.MAX_SAFE_INTEGER;
      }
      break;
    }
    case 'all':
    default: {
      startMs = 0;
      endMs = Number.MAX_SAFE_INTEGER;
      prevStartMs = 0;
      prevEndMs = 0;
      label = 'All Historical Records';
      prevLabel = 'N/A';
      break;
    }
  }

  return { startMs, endMs, prevStartMs, prevEndMs, label, prevLabel };
}

/**
 * Filter records by current filter state
 */
export function filterRecords(
  records: ParsedCallRecord[],
  filterState: FilterState,
  referenceEpochMs: number = Date.now()
): {
  filtered: ParsedCallRecord[];
  previousPeriodFiltered: ParsedCallRecord[];
  dateRangeInfo: ReturnType<typeof resolveDateFilterRange>;
} {
  const dateRangeInfo = resolveDateFilterRange(
    filterState.datePreset,
    filterState.customStartDate,
    filterState.customEndDate,
    referenceEpochMs
  );

  const applyBaseFilters = (r: ParsedCallRecord) => {
    if (filterState.department !== 'all' && r.department !== filterState.department) {
      return false;
    }
    if (filterState.staff !== 'all' && r.staffName !== filterState.staff) {
      return false;
    }
    if (filterState.event !== 'all' && r.event !== filterState.event) {
      return false;
    }
    if (filterState.status !== 'all' && r.status !== filterState.status) {
      return false;
    }
    if (filterState.searchQuery.trim() !== '') {
      const q = filterState.searchQuery.toLowerCase();
      const match =
        r.uid.toLowerCase().includes(q) ||
        r.from.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.staffName.toLowerCase().includes(q) ||
        r.anyNote.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  };

  const filtered = records.filter((r) => {
    if (r.epochMs < dateRangeInfo.startMs || r.epochMs > dateRangeInfo.endMs) {
      return false;
    }
    return applyBaseFilters(r);
  });

  const previousPeriodFiltered =
    dateRangeInfo.prevStartMs > 0
      ? records.filter((r) => {
          if (r.epochMs < dateRangeInfo.prevStartMs || r.epochMs >= dateRangeInfo.prevEndMs) {
            return false;
          }
          return applyBaseFilters(r);
        })
      : [];

  return { filtered, previousPeriodFiltered, dateRangeInfo };
}

/**
 * Calculates raw KPI metrics for a given subset of call records and callback matches
 */
function calculateKPISubset(
  records: ParsedCallRecord[],
  callbacks: CallbackMatch[]
): Omit<KPICardsData, 'comparisons'> {
  const totalCalls = records.length;
  let incomingCalls = 0;
  let incomingConnected = 0;
  let incomingMissed = 0;
  let outgoingCalls = 0;
  let outgoingConnected = 0;
  let outgoingMissed = 0;
  let totalConnected = 0;
  let totalMissed = 0;
  let totalValidDurationSeconds = 0;
  let durationRecordCount = 0;

  records.forEach((r) => {
    if (r.event === 'Incoming') {
      incomingCalls++;
      if (r.status === 'Connected') {
        incomingConnected++;
        totalConnected++;
      } else if (r.status === 'Missed') {
        incomingMissed++;
        totalMissed++;
      }
    } else if (r.event === 'Outgoing') {
      outgoingCalls++;
      if (r.status === 'Connected') {
        outgoingConnected++;
        totalConnected++;
      } else if (r.status === 'Missed') {
        outgoingMissed++;
        totalMissed++;
      }
    }

    if (r.durationSeconds > 0) {
      totalValidDurationSeconds += r.durationSeconds;
      durationRecordCount++;
    }
  });

  const incomingAnswerRate =
    incomingCalls > 0 ? Number(((incomingConnected / incomingCalls) * 100).toFixed(1)) : 0;

  const incomingMissedRate =
    incomingCalls > 0 ? Number(((incomingMissed / incomingCalls) * 100).toFixed(1)) : 0;

  const averageCallDurationSeconds =
    durationRecordCount > 0 ? Math.round(totalValidDurationSeconds / durationRecordCount) : 0;

  // Callback metrics for records in this period
  const recordUids = new Set(records.map((r) => r.uid));
  const relevantCallbacks = callbacks.filter((c) => recordUids.has(c.missedCallUid));
  const cbSummary = summarizeCallbacks(relevantCallbacks);

  return {
    totalCalls,
    incomingCalls,
    incomingConnected,
    incomingMissed,
    outgoingCalls,
    outgoingConnected,
    outgoingMissed,
    totalConnected,
    totalMissed,
    callbackAttempts: cbSummary.callbackAttempts,
    estimatedSuccessfulCallbacks: cbSummary.estimatedSuccessful,
    confirmedSuccessfulCallbacks: cbSummary.confirmedSuccessful,
    pendingCallbacks: cbSummary.pendingCallbacks,
    incomingAnswerRate,
    incomingMissedRate,
    averageCallDurationSeconds,
  };
}

/**
 * Calculates all 16 KPI cards with period-over-period percentage changes
 */
export function calculateKPICards(
  currentRecords: ParsedCallRecord[],
  previousRecords: ParsedCallRecord[],
  callbacks: CallbackMatch[]
): KPICardsData {
  const cur = calculateKPISubset(currentRecords, callbacks);
  const prev = previousRecords.length > 0 ? calculateKPISubset(previousRecords, callbacks) : null;

  const computeDelta = (currentVal: number, prevVal: number | undefined): number | null => {
    if (prevVal === undefined || prevVal === 0) return null;
    return Number((((currentVal - prevVal) / prevVal) * 100).toFixed(1));
  };

  return {
    ...cur,
    comparisons: prev
      ? {
          totalCallsDelta: computeDelta(cur.totalCalls, prev.totalCalls),
          incomingCallsDelta: computeDelta(cur.incomingCalls, prev.incomingCalls),
          incomingConnectedDelta: computeDelta(cur.incomingConnected, prev.incomingConnected),
          incomingMissedDelta: computeDelta(cur.incomingMissed, prev.incomingMissed),
          outgoingCallsDelta: computeDelta(cur.outgoingCalls, prev.outgoingCalls),
          outgoingConnectedDelta: computeDelta(cur.outgoingConnected, prev.outgoingConnected),
          outgoingMissedDelta: computeDelta(cur.outgoingMissed, prev.outgoingMissed),
          totalConnectedDelta: computeDelta(cur.totalConnected, prev.totalConnected),
          totalMissedDelta: computeDelta(cur.totalMissed, prev.totalMissed),
          incomingAnswerRateDelta: Number((cur.incomingAnswerRate - prev.incomingAnswerRate).toFixed(1)),
          averageDurationDelta: computeDelta(cur.averageCallDurationSeconds, prev.averageCallDurationSeconds),
          confirmedCallbacksDelta: computeDelta(
            cur.confirmedSuccessfulCallbacks,
            prev.confirmedSuccessfulCallbacks
          ),
        }
      : undefined,
  };
}

/**
 * Section 6: Daily Growth Analytics
 * Constructs a continuous daily calendar axis (including zero-call days)
 * with Day-over-Day growth percentages and zero-denominator safety.
 */
export function calculateDailyGrowth(
  records: ParsedCallRecord[],
  callbacks: CallbackMatch[]
): DailyGrowthPoint[] {
  if (records.length === 0) return [];

  // Group records by Kolkata dateKey (YYYY-MM-DD)
  const byDate = new Map<string, ParsedCallRecord[]>();
  records.forEach((r) => {
    const list = byDate.get(r.dateKey) || [];
    list.push(r);
    byDate.set(r.dateKey, list);
  });

  // Map callbacks by missedCallUid
  const callbacksByMissedUid = new Map<string, CallbackMatch>();
  callbacks.forEach((c) => callbacksByMissedUid.set(c.missedCallUid, c));

  // Determine date bounds
  const dates = Array.from(byDate.keys()).sort();
  if (dates.length === 0) return [];

  // Generate continuous calendar days from earliest to latest date
  const earliestEpoch = Date.parse(dates[0] + 'T00:00:00+05:30');
  const latestEpoch = Date.parse(dates[dates.length - 1] + 'T00:00:00+05:30');
  const oneDayMs = 24 * 60 * 60 * 1000;

  const continuousDateKeys: string[] = [];
  for (let t = earliestEpoch; t <= latestEpoch; t += oneDayMs) {
    continuousDateKeys.push(toKolkataDateKey(t));
  }

  const points: DailyGrowthPoint[] = [];

  continuousDateKeys.forEach((dKey, idx) => {
    const dayRecords = byDate.get(dKey) || [];
    let incomingCalls = 0;
    let incomingConnected = 0;
    let incomingMissed = 0;
    let outgoingCalls = 0;
    let outgoingConnected = 0;
    let outgoingMissed = 0;

    dayRecords.forEach((r) => {
      if (r.event === 'Incoming') {
        incomingCalls++;
        if (r.status === 'Connected') incomingConnected++;
        else if (r.status === 'Missed') incomingMissed++;
      } else if (r.event === 'Outgoing') {
        outgoingCalls++;
        if (r.status === 'Connected') outgoingConnected++;
        else if (r.status === 'Missed') outgoingMissed++;
      }
    });

    const totalCalls = dayRecords.length;
    const totalConnected = incomingConnected + outgoingConnected;
    const totalMissed = incomingMissed + outgoingMissed;

    const answerRate =
      incomingCalls > 0 ? Number(((incomingConnected / incomingCalls) * 100).toFixed(1)) : 0;
    const missedRate =
      incomingCalls > 0 ? Number(((incomingMissed / incomingCalls) * 100).toFixed(1)) : 0;

    // Callbacks for this day's missed calls
    const dayMissedUids = dayRecords
      .filter((r) => r.event === 'Incoming' && r.status === 'Missed')
      .map((r) => r.uid);
    const dayCallbacks = dayMissedUids
      .map((uid) => callbacksByMissedUid.get(uid))
      .filter((c): c is CallbackMatch => c !== undefined);

    const cbSummary = summarizeCallbacks(dayCallbacks);

    // Format display date: "Oct 13"
    const parsedDate = new Date(dKey + 'T00:00:00+05:30');
    const displayDate = parsedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      timeZone: 'Asia/Kolkata',
    });

    // Previous day calculation for Day-over-Day growth %
    let totalGrowthPct: number | null = null;
    let incomingGrowthPct: number | null = null;
    let connectedGrowthPct: number | null = null;
    let callbackGrowthPct: number | null = null;

    if (idx > 0) {
      const prev = points[idx - 1];
      if (prev.totalCalls > 0) {
        totalGrowthPct = Number((((totalCalls - prev.totalCalls) / prev.totalCalls) * 100).toFixed(1));
      }
      if (prev.incomingCalls > 0) {
        incomingGrowthPct = Number(
          (((incomingCalls - prev.incomingCalls) / prev.incomingCalls) * 100).toFixed(1)
        );
      }
      if (prev.totalConnected > 0) {
        connectedGrowthPct = Number(
          (((totalConnected - prev.totalConnected) / prev.totalConnected) * 100).toFixed(1)
        );
      }
      if (prev.confirmedSuccessfulCallbacks > 0) {
        callbackGrowthPct = Number(
          (
            ((cbSummary.confirmedSuccessful - prev.confirmedSuccessfulCallbacks) /
              prev.confirmedSuccessfulCallbacks) *
            100
          ).toFixed(1)
        );
      }
    }

    points.push({
      date: dKey,
      displayDate,
      totalCalls,
      incomingCalls,
      outgoingCalls,
      incomingConnected,
      incomingMissed,
      outgoingConnected,
      outgoingMissed,
      totalConnected,
      totalMissed,
      answerRate,
      missedRate,
      totalGrowthPct,
      incomingGrowthPct,
      connectedGrowthPct,
      callbackGrowthPct,
      eligibleMissed: cbSummary.eligibleMissed,
      callbackAttempts: cbSummary.callbackAttempts,
      estimatedSuccessfulCallbacks: cbSummary.estimatedSuccessful,
      confirmedSuccessfulCallbacks: cbSummary.confirmedSuccessful,
      pendingCallbacks: cbSummary.pendingCallbacks,
    });
  });

  return points;
}

/**
 * Section 6 Graph F: Hourly Call Distribution (00:00 to 23:00)
 */
export function calculateHourlyDistribution(records: ParsedCallRecord[]): HourlyDistributionPoint[] {
  const hoursMap = new Map<number, HourlyDistributionPoint>();

  for (let h = 0; h < 24; h++) {
    hoursMap.set(h, {
      hour: h,
      hourLabel: `${String(h).padStart(2, '0')}:00`,
      totalCalls: 0,
      incomingCalls: 0,
      outgoingCalls: 0,
      incomingConnected: 0,
      incomingMissed: 0,
    });
  }

  records.forEach((r) => {
    const pt = hoursMap.get(r.hour);
    if (!pt) return;
    pt.totalCalls++;
    if (r.event === 'Incoming') {
      pt.incomingCalls++;
      if (r.status === 'Connected') pt.incomingConnected++;
      else if (r.status === 'Missed') pt.incomingMissed++;
    } else if (r.event === 'Outgoing') {
      pt.outgoingCalls++;
    }
  });

  return Array.from(hoursMap.values());
}

/**
 * Section 6 Graph G: Department Performance
 */
export function calculateDepartmentMetrics(
  records: ParsedCallRecord[],
  callbacks: CallbackMatch[]
): DepartmentMetric[] {
  const deptMap = new Map<string, ParsedCallRecord[]>();

  records.forEach((r) => {
    const dept = r.department || 'General';
    const list = deptMap.get(dept) || [];
    list.push(r);
    deptMap.set(dept, list);
  });

  const callbacksByMissedUid = new Map<string, CallbackMatch>();
  callbacks.forEach((c) => callbacksByMissedUid.set(c.missedCallUid, c));

  const metrics: DepartmentMetric[] = [];

  deptMap.forEach((deptRecords, dept) => {
    let incomingCalls = 0;
    let outgoingCalls = 0;
    let incomingConnected = 0;
    let incomingMissed = 0;
    let totalDuration = 0;
    let validDurationCount = 0;

    deptRecords.forEach((r) => {
      if (r.event === 'Incoming') {
        incomingCalls++;
        if (r.status === 'Connected') incomingConnected++;
        else if (r.status === 'Missed') incomingMissed++;
      } else if (r.event === 'Outgoing') {
        outgoingCalls++;
      }

      if (r.durationSeconds > 0) {
        totalDuration += r.durationSeconds;
        validDurationCount++;
      }
    });

    const answerRate =
      incomingCalls > 0 ? Number(((incomingConnected / incomingCalls) * 100).toFixed(1)) : 0;
    const avgDurationSeconds =
      validDurationCount > 0 ? Math.round(totalDuration / validDurationCount) : 0;

    // Callbacks for this department's missed calls
    const deptMissedUids = deptRecords
      .filter((r) => r.event === 'Incoming' && r.status === 'Missed')
      .map((r) => r.uid);
    const deptCallbacks = deptMissedUids
      .map((uid) => callbacksByMissedUid.get(uid))
      .filter((c): c is CallbackMatch => c !== undefined);

    const cbSummary = summarizeCallbacks(deptCallbacks);
    const recoveredCallbacks = cbSummary.estimatedSuccessful + cbSummary.confirmedSuccessful;

    metrics.push({
      department: dept,
      totalCalls: deptRecords.length,
      incomingCalls,
      outgoingCalls,
      incomingConnected,
      incomingMissed,
      answerRate,
      avgDurationSeconds,
      eligibleMissed: cbSummary.eligibleMissed,
      recoveredCallbacks,
      recoveryRate: cbSummary.overallRecoveryRate,
    });
  });

  // Sort descending by total calls
  metrics.sort((a, b) => b.totalCalls - a.totalCalls);

  return metrics;
}

/**
 * Staff / Extension breakdown metrics
 */
export function calculateStaffMetrics(records: ParsedCallRecord[]): StaffMetric[] {
  const staffMap = new Map<string, ParsedCallRecord[]>();

  records.forEach((r) => {
    if (r.staffName && r.staffName !== 'Unassigned') {
      const list = staffMap.get(r.staffName) || [];
      list.push(r);
      staffMap.set(r.staffName, list);
    }
  });

  const list: StaffMetric[] = [];

  staffMap.forEach((staffRecords, name) => {
    let connected = 0;
    let missed = 0;
    let incoming = 0;
    let outgoing = 0;
    let totalDur = 0;
    let durCount = 0;
    let ext = '';

    staffRecords.forEach((r) => {
      if (r.extension && !ext) ext = r.extension;
      if (r.status === 'Connected') connected++;
      else if (r.status === 'Missed') missed++;

      if (r.event === 'Incoming') incoming++;
      else if (r.event === 'Outgoing') outgoing++;

      if (r.durationSeconds > 0) {
        totalDur += r.durationSeconds;
        durCount++;
      }
    });

    list.push({
      staffName: name,
      extension: ext,
      totalCallsHandled: staffRecords.length,
      connectedCalls: connected,
      missedCalls: missed,
      avgDurationSeconds: durCount > 0 ? Math.round(totalDur / durCount) : 0,
      incomingHandled: incoming,
      outgoingMade: outgoing,
    });
  });

  list.sort((a, b) => b.totalCallsHandled - a.totalCallsHandled);
  return list;
}
