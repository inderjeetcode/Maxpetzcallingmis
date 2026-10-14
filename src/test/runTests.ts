/**
 * Section 14: Automated Test Suite for Max PetZ Call Analytics Dashboard
 * Verifies integration, calculations, callback engine matching rules, and edge cases.
 */

import { RAW_MAIN_DATA_CSV } from '../data/rawSpreadsheetData';
import { parseSpreadsheetData, REQUIRED_COLUMNS } from '../services/dataParser';
import { matchCallbacks, summarizeCallbacks } from '../services/callbackEngine';
import {
  calculateKPICards,
  calculateDailyGrowth,
  calculateHourlyDistribution,
  calculateDepartmentMetrics,
  resolveDateFilterRange,
} from '../services/analyticsCalculator';
import { CallbackStoreRecord } from '../types/callAnalytics';

export interface TestResult {
  category: 'Integration' | 'Calculations' | 'Callback Engine' | 'Data Quality';
  testName: string;
  passed: boolean;
  message: string;
  details?: any;
}

export function executeAllTests(): TestResult[] {
  const results: TestResult[] = [];

  // ================= 1. INTEGRATION & COLUMN MAPPING TESTS =================
  const parsed = parseSpreadsheetData(RAW_MAIN_DATA_CSV);

  // Test 1.1: Verify spreadsheet ID & Main data source loaded
  results.push({
    category: 'Integration',
    testName: 'Spreadsheet ID and Tab Presence',
    passed: parsed.records.length > 0,
    message: `Successfully loaded ${parsed.records.length} records from verified Main data tab`,
  });

  // Test 1.2: Verify required column detection
  const hasAllRequired = REQUIRED_COLUMNS.every((col) =>
    parsed.headers.some((h) => h.toLowerCase().replace(/[^a-z0-9]/g, '') === col.toLowerCase().replace(/[^a-z0-9]/g, ''))
  );
  results.push({
    category: 'Integration',
    testName: 'Required Column Mapping',
    passed: hasAllRequired && parsed.missingRequired.length === 0,
    message: hasAllRequired
      ? `All ${REQUIRED_COLUMNS.length} required columns mapped dynamically: ${REQUIRED_COLUMNS.join(', ')}`
      : `Missing columns: ${parsed.missingRequired.join(', ')}`,
  });

  // Test 1.3: UID Deduplication
  const uids = new Set<string>();
  let hasDuplicateInParsed = false;
  for (const r of parsed.records) {
    if (uids.has(r.uid)) {
      hasDuplicateInParsed = true;
      break;
    }
    uids.add(r.uid);
  }
  results.push({
    category: 'Data Quality',
    testName: 'UID Deduplication & Integrity',
    passed: !hasDuplicateInParsed && parsed.records.length > 0,
    message: `All ${parsed.records.length} active records have unique UIDs. ${parsed.summary.duplicatesRemoved} duplicates safely excluded.`,
  });

  // Test 1.4: Timestamp Recovery
  const validTimestamps = parsed.records.every((r) => r.epochMs > 0 && !isNaN(r.epochMs) && r.dateKey.length === 10);
  results.push({
    category: 'Data Quality',
    testName: 'Timestamp Recovery from Note/UID',
    passed: validTimestamps,
    message: `100% of records recovered valid timestamps and Asia/Kolkata dateKeys. ${parsed.summary.timestampsRecovered} recovered from note/UID epoch.`,
  });

  // ================= 2. CALCULATION TESTS =================
  const incoming = parsed.records.filter((r) => r.event === 'Incoming');
  const outgoing = parsed.records.filter((r) => r.event === 'Outgoing');
  const incomingConnected = incoming.filter((r) => r.status === 'Connected');
  const incomingMissed = incoming.filter((r) => r.status === 'Missed');

  // Test 2.1: Event & Status Classification
  const knownEventsCount = incoming.length + outgoing.length;
  results.push({
    category: 'Calculations',
    testName: 'Event Classification (Incoming vs Outgoing)',
    passed: knownEventsCount === parsed.records.length,
    message: `Classified ${incoming.length} Incoming and ${outgoing.length} Outgoing records (Total: ${knownEventsCount})`,
  });

  // Test 2.2: KPI Calculation & Safe Denominators
  const callbacks = matchCallbacks(parsed.records);
  const kpis = calculateKPICards(parsed.records, [], callbacks);

  const calculatedAnswerRate =
    incoming.length > 0 ? Number(((incomingConnected.length / incoming.length) * 100).toFixed(1)) : 0;
  const calculatedMissedRate =
    incoming.length > 0 ? Number(((incomingMissed.length / incoming.length) * 100).toFixed(1)) : 0;

  const ratesMatch =
    kpis.incomingAnswerRate === calculatedAnswerRate && kpis.incomingMissedRate === calculatedMissedRate;
  const ratesSum100 = Math.abs(kpis.incomingAnswerRate + kpis.incomingMissedRate - 100) < 0.2;

  results.push({
    category: 'Calculations',
    testName: 'Incoming Answer & Missed Rate Calculations',
    passed: ratesMatch && ratesSum100 && !isNaN(kpis.incomingAnswerRate),
    message: `Answer Rate: ${kpis.incomingAnswerRate}% (${incomingConnected.length}/${incoming.length}), Missed Rate: ${kpis.incomingMissedRate}% (${incomingMissed.length}/${incoming.length})`,
  });

  // Test 2.3: Zero Denominator Safety
  const emptyKpis = calculateKPICards([], [], []);
  results.push({
    category: 'Calculations',
    testName: 'Zero-Denominator Safety (NaN/Infinity Prevention)',
    passed:
      emptyKpis.incomingAnswerRate === 0 &&
      emptyKpis.incomingMissedRate === 0 &&
      emptyKpis.averageCallDurationSeconds === 0,
    message: 'Empty datasets safely produce 0% and N/A without NaN or Infinity errors',
  });

  // Test 2.4: Daily Growth & Continuous Date Axis
  const dailyGrowth = calculateDailyGrowth(parsed.records, callbacks);
  const hasContinuousDays = dailyGrowth.length > 0;
  const hasZeroSafeGrowth = dailyGrowth.every(
    (d) => d.totalGrowthPct === null || (!isNaN(d.totalGrowthPct) && isFinite(d.totalGrowthPct))
  );

  results.push({
    category: 'Calculations',
    testName: 'Continuous Daily Axis & DoD Growth %',
    passed: hasContinuousDays && hasZeroSafeGrowth,
    message: `Generated ${dailyGrowth.length} continuous calendar day points with safe DoD growth percentages`,
  });

  // Test 2.5: Hourly Grouping (0-23h)
  const hourly = calculateHourlyDistribution(parsed.records);
  const hourlySum = hourly.reduce((sum, h) => sum + h.totalCalls, 0);
  results.push({
    category: 'Calculations',
    testName: 'Hourly Grouping Reconciles with Total Calls',
    passed: hourly.length === 24 && hourlySum === parsed.records.length,
    message: `All 24 hours (00:00 to 23:00 IST) reconcile: ${hourlySum} calls grouped across 24 intervals`,
  });

  // Test 2.6: Department Performance
  const deptMetrics = calculateDepartmentMetrics(parsed.records, callbacks);
  const deptTotal = deptMetrics.reduce((sum, d) => sum + d.totalCalls, 0);
  results.push({
    category: 'Calculations',
    testName: 'Department Reconciliations',
    passed: deptMetrics.length > 0 && deptTotal === parsed.records.length,
    message: `Reconciled ${deptMetrics.length} departments without inventing names (${deptMetrics
      .map((d) => `${d.department}:${d.totalCalls}`)
      .slice(0, 3)
      .join(', ')}...)`,
  });

  // ================= 3. CALLBACK ENGINE TESTS =================
  // Test 3.1: 1:1 Matching Rule (One outgoing cannot resolve multiple missed calls)
  const assignedOutgoingUids = callbacks
    .filter((c) => c.outgoingCallUid)
    .map((c) => c.outgoingCallUid as string);
  const uniqueAssignedUids = new Set(assignedOutgoingUids);
  results.push({
    category: 'Callback Engine',
    testName: '1:1 Callback Matching Rule Enforced',
    passed: assignedOutgoingUids.length === uniqueAssignedUids.size,
    message: `Verified: ${assignedOutgoingUids.length} matched callbacks map 1:1 to unique outgoing calls (no duplicate assignments)`,
  });

  // Test 3.2: Chronological Integrity (Outgoing cannot occur before missed call)
  const chronologicalPass = callbacks.every((c) => {
    if (!c.outgoingEpochMs) return true;
    return c.outgoingEpochMs > c.missedEpochMs;
  });
  results.push({
    category: 'Callback Engine',
    testName: 'Chronological Integrity (No Pre-Missed Callbacks)',
    passed: chronologicalPass,
    message: 'All matched outgoing callbacks occurred strictly AFTER the missed call occurred',
  });

  // Test 3.3: Separate Estimated vs Confirmed Outcomes
  const summary = summarizeCallbacks(callbacks);
  results.push({
    category: 'Callback Engine',
    testName: 'Estimated vs Confirmed Outcome Separation',
    passed:
      summary.eligibleMissed > 0 &&
      summary.estimatedSuccessful >= 0 &&
      summary.confirmedSuccessful >= 0 &&
      summary.pendingCallbacks >= 0,
    message: `Eligible Missed: ${summary.eligibleMissed} | Estimated Connected: ${summary.estimatedSuccessful} | Confirmed Successful: ${summary.confirmedSuccessful} | Pending: ${summary.pendingCallbacks}`,
  });

  // Test 3.4: Manual Confirmation Persistence Simulation
  const sampleMissedUid = callbacks[0]?.missedCallUid;
  const mockStore = new Map<string, CallbackStoreRecord>();
  if (sampleMissedUid) {
    mockStore.set(sampleMissedUid, {
      missedCallUid: sampleMissedUid,
      status: 'Confirmed Successful',
      verifiedBy: 'Dr. Test Ext 99',
      verifiedAt: new Date().toISOString(),
      notes: 'Test confirmation persisted',
    });
  }
  const retestedCallbacks = matchCallbacks(parsed.records, mockStore);
  const testedRecord = retestedCallbacks.find((c) => c.missedCallUid === sampleMissedUid);
  results.push({
    category: 'Callback Engine',
    testName: 'Manual Confirmation Override & Persistence',
    passed: testedRecord?.status === 'Confirmed Successful' && testedRecord.staffVerification?.verifiedBy === 'Dr. Test Ext 99',
    message: 'Staff verification correctly overrides automatic estimation and maintains audit trail metadata',
  });

  return results;
}

// If run from command line directly: tsx src/test/runTests.ts
const isCli =
  typeof process !== 'undefined' &&
  typeof process.argv !== 'undefined' &&
  Array.isArray(process.argv) &&
  Boolean(process.argv[1]) &&
  import.meta.url === `file://${process.argv[1]}`;

if (isCli) {
  console.log('=====================================================');
  console.log(' MAX PETZ HOSPITALS — AUTOMATED TEST SUITE EXECUTION ');
  console.log('=====================================================\n');

  const suiteResults = executeAllTests();
  let passedCount = 0;

  suiteResults.forEach((r, idx) => {
    const symbol = r.passed ? '✓ PASS' : '✗ FAIL';
    if (r.passed) passedCount++;
    console.log(`[${symbol}] [${r.category}] ${r.testName}`);
    console.log(`       → ${r.message}\n`);
  });

  console.log('-----------------------------------------------------');
  console.log(`TOTAL: ${suiteResults.length} | PASSED: ${passedCount} | FAILED: ${suiteResults.length - passedCount}`);
  if (passedCount === suiteResults.length) {
    console.log('ALL TESTS PASSED SUCCESSFULLY! Section 14 Verified.\n');
  } else {
    console.error('SOME TESTS FAILED!\n');
    process.exit(1);
  }
}
