/**
 * Section 8: Max PetZ Callback Tracking Engine
 * Matches missed incoming calls with subsequent outgoing calls within a configurable time window.
 * Distinguishes Estimated from Confirmed outcomes, handles ambiguous matches, and applies audit trail rules.
 */

import {
  CallbackMatch,
  CallbackMatchStatus,
  CallbackStoreRecord,
  ParsedCallRecord,
} from '../types/callAnalytics';

export interface CallbackEngineConfig {
  matchingWindowHours: number; // default 24
}

export function matchCallbacks(
  records: ParsedCallRecord[],
  storedConfirmations: Map<string, CallbackStoreRecord> = new Map(),
  config: CallbackEngineConfig = { matchingWindowHours: 24 }
): CallbackMatch[] {
  const windowMs = config.matchingWindowHours * 60 * 60 * 1000;

  // 1. Filter out all Incoming Missed calls, sorted chronologically ascending
  const missedIncomingCalls = records
    .filter((r) => r.event === 'Incoming' && r.status === 'Missed')
    .sort((a, b) => a.epochMs - b.epochMs);

  // 2. Filter out all Outgoing calls, sorted chronologically ascending
  const outgoingCalls = records
    .filter((r) => r.event === 'Outgoing')
    .sort((a, b) => a.epochMs - b.epochMs);

  // Set of outgoing UIDs already assigned to a missed call (Prevent 1 outgoing resolving multiple missed calls)
  const usedOutgoingUids = new Set<string>();

  // Map to detect multiple missed calls for the same normalized phone
  const missedCountByPhone = new Map<string, number>();
  missedIncomingCalls.forEach((m) => {
    const key = m.normalizedPhone;
    missedCountByPhone.set(key, (missedCountByPhone.get(key) || 0) + 1);
  });

  const matches: CallbackMatch[] = [];

  for (const missed of missedIncomingCalls) {
    const phone = missed.normalizedPhone;
    const isMultiMissed = (missedCountByPhone.get(phone) || 0) > 1;

    // Check if staff has already confirmed or marked this missed call
    const stored = storedConfirmations.get(missed.uid);

    // Find candidate outgoing calls:
    // a) Outgoing call must have occurred AFTER the missed call
    // b) Within matching window
    // c) Not already consumed by another missed call
    // d) Same normalized phone number
    const candidates = outgoingCalls.filter((out) => {
      if (usedOutgoingUids.has(out.uid)) return false;
      if (out.epochMs <= missed.epochMs) return false;
      if (out.epochMs - missed.epochMs > windowMs) return false;
      return out.normalizedPhone === phone;
    });

    let assignedOutgoing: ParsedCallRecord | undefined;
    let matchConfidence: CallbackMatch['matchConfidence'] = 'None';
    let status: CallbackMatchStatus = 'Pending';
    let ambiguousCandidates: string[] = [];

    if (candidates.length > 0) {
      if (candidates.length > 1 || isMultiMissed) {
        // Disclose ambiguous matches deterministically
        ambiguousCandidates = candidates.map((c) => c.uid);
        assignedOutgoing = candidates[0]; // closest chronological subsequent
        usedOutgoingUids.add(assignedOutgoing.uid);
        matchConfidence = 'Ambiguous';
        status = 'Ambiguous Match';
      } else {
        assignedOutgoing = candidates[0];
        usedOutgoingUids.add(assignedOutgoing.uid);
        matchConfidence = 'Exact';
        if (assignedOutgoing.status === 'Connected') {
          status = 'Estimated Connected';
        } else {
          status = 'Estimated Attempt';
        }
      }
    } else {
      status = 'Pending';
      matchConfidence = 'None';
    }

    // Apply manual staff confirmation override if present
    let staffVerification: CallbackMatch['staffVerification'] | undefined;
    let finalStatus: CallbackMatchStatus = status;
    let notes = missed.anyNote || '';

    if (stored) {
      finalStatus = stored.status;
      staffVerification = {
        verifiedBy: stored.verifiedBy,
        verifiedAt: stored.verifiedAt,
        notes: stored.notes,
      };
      if (stored.notes) {
        notes = `${notes ? notes + ' | ' : ''}[Staff]: ${stored.notes}`;
      }
    }

    const timeTakenMinutes = assignedOutgoing
      ? Math.max(0, Math.round((assignedOutgoing.epochMs - missed.epochMs) / (60 * 1000)))
      : undefined;

    matches.push({
      missedCallUid: missed.uid,
      missedCallTimestamp: missed.timestamp,
      missedEpochMs: missed.epochMs,
      normalizedPhone: phone,
      maskedPhone: missed.maskedPhone,
      callerName: missed.name,
      department: missed.department,
      outgoingCallUid: assignedOutgoing?.uid,
      outgoingTimestamp: assignedOutgoing?.timestamp,
      outgoingEpochMs: assignedOutgoing?.epochMs,
      outgoingStatus: assignedOutgoing?.status,
      outgoingDurationSeconds: assignedOutgoing?.durationSeconds,
      outgoingStaffName: assignedOutgoing?.staffName,
      timeTakenMinutes,
      matchConfidence,
      status: finalStatus,
      staffVerification,
      notes,
      ambiguousCandidateUids: ambiguousCandidates.length > 0 ? ambiguousCandidates : undefined,
    });
  }

  // Sort descending by missed call time (newest missed calls first)
  matches.sort((a, b) => b.missedEpochMs - a.missedEpochMs);

  return matches;
}

/**
 * Calculates callback performance statistics
 */
export function summarizeCallbacks(matches: CallbackMatch[]): {
  eligibleMissed: number;
  callbackAttempts: number;
  estimatedSuccessful: number;
  confirmedSuccessful: number;
  confirmedUnsuccessful: number;
  ambiguousMatches: number;
  pendingCallbacks: number;
  overallRecoveryRate: number; // percentage of eligible missed that have confirmed or estimated success
  confirmedSuccessRate: number; // percentage of eligible missed that are confirmed successful
} {
  const eligibleMissed = matches.length;
  let callbackAttempts = 0;
  let estimatedSuccessful = 0;
  let confirmedSuccessful = 0;
  let confirmedUnsuccessful = 0;
  let ambiguousMatches = 0;
  let pendingCallbacks = 0;

  matches.forEach((m) => {
    switch (m.status) {
      case 'Estimated Attempt':
        callbackAttempts++;
        break;
      case 'Estimated Connected':
        callbackAttempts++;
        estimatedSuccessful++;
        break;
      case 'Confirmed Successful':
        callbackAttempts++;
        confirmedSuccessful++;
        break;
      case 'Confirmed Unsuccessful':
        callbackAttempts++;
        confirmedUnsuccessful++;
        break;
      case 'Ambiguous Match':
        callbackAttempts++;
        ambiguousMatches++;
        break;
      case 'Pending':
      default:
        pendingCallbacks++;
        break;
    }
  });

  const overallRecoveryRate =
    eligibleMissed > 0
      ? Number((((estimatedSuccessful + confirmedSuccessful) / eligibleMissed) * 100).toFixed(1))
      : 0;

  const confirmedSuccessRate =
    eligibleMissed > 0
      ? Number(((confirmedSuccessful / eligibleMissed) * 100).toFixed(1))
      : 0;

  return {
    eligibleMissed,
    callbackAttempts,
    estimatedSuccessful,
    confirmedSuccessful,
    confirmedUnsuccessful,
    ambiguousMatches,
    pendingCallbacks,
    overallRecoveryRate,
    confirmedSuccessRate,
  };
}
