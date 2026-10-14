/**
 * Data parser and normalizer for Max PetZ call records.
 * Handles dynamic header mapping, UID deduplication, timestamp recovery,
 * phone masking, and strict Event/Status classification.
 */

import {
  CallEvent,
  CallStatus,
  DataQualitySummary,
  ParsedCallRecord,
} from '../types/callAnalytics';

export const REQUIRED_COLUMNS = [
  'UID',
  'Event',
  'Status',
  'From',
  'Duration (in seconds)',
  'Timestamp',
];

export const ALL_EXPECTED_COLUMNS = [
  'UID',
  'Event',
  'Type',
  'Status',
  'From',
  'Name',
  'Country',
  'State',
  'Duration (in seconds)',
  'Timestamp',
  'User detail',
  'Department(if any)',
  'Log source',
  'Star marked',
  'Text if SMS',
  'Any note',
  'Billable',
  'Pulse',
  'Leg B rate',
  'Leg B minutes',
];

/**
 * Standard RFC-4180 compliant CSV line tokenizer
 */
export function parseCSVToRows(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let insideQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (insideQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          currentField += '"';
          i++; // skip escaped quote
        } else {
          insideQuotes = false;
        }
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        insideQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentField.trim());
        currentField = '';
      } else if (char === '\r') {
        if (nextChar === '\n') {
          i++;
        }
        currentRow.push(currentField.trim());
        currentField = '';
        if (currentRow.some((f) => f.length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
      } else if (char === '\n') {
        currentRow.push(currentField.trim());
        currentField = '';
        if (currentRow.some((f) => f.length > 0)) {
          rows.push(currentRow);
        }
        currentRow = [];
      } else {
        currentField += char;
      }
    }
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.some((f) => f.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Normalizes header strings for case-insensitive matching
 */
function cleanHeader(header: string): string {
  return header.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Formats epoch ms into Asia/Kolkata dateKey YYYY-MM-DD
 */
export function toKolkataDateKey(epochMs: number): string {
  // Asia/Kolkata is UTC + 5:30 (19800000 ms)
  const kolkataOffsetMs = 5.5 * 60 * 60 * 1000;
  const d = new Date(epochMs + kolkataOffsetMs);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Extracts hour (0-23) in Asia/Kolkata timezone
 */
export function toKolkataHour(epochMs: number): number {
  const kolkataOffsetMs = 5.5 * 60 * 60 * 1000;
  const d = new Date(epochMs + kolkataOffsetMs);
  return d.getUTCHours();
}

/**
 * Masks phone numbers to protect customer privacy by default
 */
export function maskPhoneNumber(phone: string): string {
  if (!phone) return 'Unknown';
  const cleaned = phone.replace(/\s+/g, '');
  if (cleaned.length <= 4) return '***';
  if (cleaned.includes('E+') || cleaned.includes('e+')) {
    // Scientific notation representation like 9.20E+11
    return `+91 ${cleaned.slice(0, 3)}***`;
  }
  const prefix = cleaned.slice(0, 3);
  const suffix = cleaned.slice(-3);
  return `${prefix}****${suffix}`;
}

/**
 * Recovers timestamp using UID epoch or note [Date YYYY-MM-DD HH:mm:ss]
 */
export function extractTimestamp(
  rawTimestamp: string | undefined,
  uid: string,
  anyNote: string | undefined
): { isoString: string; epochMs: number; recovered: boolean } {
  // 1. Try raw timestamp column if valid
  if (rawTimestamp && rawTimestamp !== '########' && rawTimestamp.trim() !== '') {
    const parsed = Date.parse(rawTimestamp);
    if (!isNaN(parsed) && parsed > 946684800000) {
      return {
        isoString: new Date(parsed).toISOString(),
        epochMs: parsed,
        recovered: false,
      };
    }
  }

  // 2. Try date pattern inside note [Date YYYY-MM-DD HH:mm:ss]
  if (anyNote) {
    const noteMatch = anyNote.match(/\[Date\s+(\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2})\]/i);
    if (noteMatch && noteMatch[1]) {
      // Note timestamps are logged in local IST time (UTC+5:30)
      const dateStr = noteMatch[1].replace(' ', 'T') + '+05:30';
      const parsed = Date.parse(dateStr);
      if (!isNaN(parsed)) {
        return {
          isoString: new Date(parsed).toISOString(),
          epochMs: parsed,
          recovered: true,
        };
      }
    }
  }

  // 3. Fallback: Parse Unix epoch seconds from UID (e.g., "32.1791868611.4843696" or "cg2.1791874393.1553402")
  const parts = uid.split('.');
  if (parts.length >= 2) {
    const secondPart = parseInt(parts[1], 10);
    // Sanity check: between years 2020 and 2030 (1577836800 to 1893456000)
    if (!isNaN(secondPart) && secondPart >= 1500000000 && secondPart <= 2000000000) {
      const epochMs = secondPart * 1000;
      return {
        isoString: new Date(epochMs).toISOString(),
        epochMs,
        recovered: true,
      };
    }
  }

  // Fallback to now
  const fallback = Date.now();
  return {
    isoString: new Date(fallback).toISOString(),
    epochMs: fallback,
    recovered: true,
  };
}

/**
 * Extracts staff name and extension from user detail string
 */
export function parseUserDetail(userDetail: string | undefined): {
  staffName: string;
  extension: string;
} {
  if (!userDetail || userDetail.trim() === '') {
    return { staffName: 'Unassigned', extension: '' };
  }

  // Example: "Shivani Jaiswal ext. 17 (received)"
  // Example: "IPD Mobile ext. 26 (missed)"
  // Example: "Patient Care Coordinator ext. 11 (received)"
  const extMatch = userDetail.match(/(?:ext\.?|extension)\s*(\d+)/i);
  const extension = extMatch ? extMatch[1] : '';

  // Clean staff name: remove (received)/(missed) and ext part
  let staffName = userDetail
    .replace(/\(.*?\)/g, '')
    .replace(/(?:ext\.?|extension)\s*\d+/i, '')
    .trim();

  // If complex transfer like "Harsh Sharma ext. 15 (transferred) | ...", take the first or primary
  if (staffName.includes('|')) {
    staffName = staffName.split('|')[0].trim();
  }

  return {
    staffName: staffName || 'Unassigned',
    extension,
  };
}

/**
 * Main parser function: takes CSV string and returns validated, deduplicated call records
 */
export function parseSpreadsheetData(csvText: string): {
  records: ParsedCallRecord[];
  summary: DataQualitySummary;
  headers: string[];
  missingRequired: string[];
} {
  const rows = parseCSVToRows(csvText);
  if (rows.length === 0) {
    return {
      records: [],
      summary: {
        totalRawRows: 0,
        uniqueRecords: 0,
        duplicatesRemoved: 0,
        timestampsRecovered: 0,
        unclassifiedStatuses: 0,
        unclassifiedEvents: 0,
        validDurationRecords: 0,
      },
      headers: [],
      missingRequired: REQUIRED_COLUMNS,
    };
  }

  const rawHeaders = rows[0];
  const headerMap = new Map<string, number>();

  rawHeaders.forEach((h, idx) => {
    headerMap.set(cleanHeader(h), idx);
  });

  // Verify missing required columns
  const missingRequired = REQUIRED_COLUMNS.filter((req) => !headerMap.has(cleanHeader(req)));

  const getCol = (row: string[], name: string): string => {
    const idx = headerMap.get(cleanHeader(name));
    if (idx !== undefined && idx < row.length) {
      return row[idx];
    }
    return '';
  };

  const records: ParsedCallRecord[] = [];
  const seenUids = new Set<string>();

  let duplicatesRemoved = 0;
  let timestampsRecovered = 0;
  let unclassifiedStatuses = 0;
  let unclassifiedEvents = 0;
  let validDurationRecords = 0;

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    if (row.length === 0 || row.every((c) => c === '')) continue;

    const uid = getCol(row, 'UID');
    if (!uid) continue;

    // Duplicate check
    if (seenUids.has(uid)) {
      duplicatesRemoved++;
      continue;
    }
    seenUids.add(uid);

    const rawEvent = getCol(row, 'Event');
    let event: CallEvent = 'Unknown';
    if (rawEvent.toLowerCase().includes('incoming')) {
      event = 'Incoming';
    } else if (rawEvent.toLowerCase().includes('outgoing')) {
      event = 'Outgoing';
    } else {
      unclassifiedEvents++;
    }

    const rawStatus = getCol(row, 'Status');
    let status: CallStatus = 'Unknown';
    if (rawStatus.toLowerCase().includes('connect')) {
      status = 'Connected';
    } else if (rawStatus.toLowerCase().includes('miss')) {
      status = 'Missed';
    } else {
      unclassifiedStatuses++;
    }

    const rawDuration = getCol(row, 'Duration (in seconds)');
    let durationSeconds = parseInt(rawDuration, 10);
    if (isNaN(durationSeconds) || durationSeconds < 0) {
      durationSeconds = 0;
    } else {
      validDurationRecords++;
    }

    const rawTimestamp = getCol(row, 'Timestamp');
    const anyNote = getCol(row, 'Any note');
    const { isoString, epochMs, recovered } = extractTimestamp(rawTimestamp, uid, anyNote);
    if (recovered) {
      timestampsRecovered++;
    }

    const from = getCol(row, 'From');
    const userDetail = getCol(row, 'User detail');
    const { staffName, extension } = parseUserDetail(userDetail);

    let department = getCol(row, 'Department(if any)').trim();
    if (!department) {
      department = 'General';
    }

    records.push({
      uid,
      event,
      rawEvent,
      type: getCol(row, 'Type') || 'Call',
      status,
      rawStatus,
      from,
      normalizedPhone: from.replace(/\s+/g, ''),
      maskedPhone: maskPhoneNumber(from),
      name: getCol(row, 'Name').trim(),
      country: getCol(row, 'Country').trim() || 'IN',
      state: getCol(row, 'State').trim() || 'DL',
      durationSeconds,
      timestamp: isoString,
      epochMs,
      dateKey: toKolkataDateKey(epochMs),
      hour: toKolkataHour(epochMs),
      userDetail,
      staffName,
      extension,
      department,
      logSource: getCol(row, 'Log source') || 'IVR',
      starMarked: getCol(row, 'Star marked').toLowerCase() === 'yes',
      textIfSMS: getCol(row, 'Text if SMS'),
      anyNote,
      billable: parseInt(getCol(row, 'Billable'), 10) || 0,
      pulse: parseInt(getCol(row, 'Pulse'), 10) || 0,
      legBRate: parseFloat(getCol(row, 'Leg B rate')) || 0,
      legBMinutes: parseFloat(getCol(row, 'Leg B minutes')) || 0,
    });
  }

  // Sort descending by timestamp (newest records first)
  records.sort((a, b) => b.epochMs - a.epochMs);

  const summary: DataQualitySummary = {
    totalRawRows: rows.length - 1,
    uniqueRecords: records.length,
    duplicatesRemoved,
    timestampsRecovered,
    unclassifiedStatuses,
    unclassifiedEvents,
    validDurationRecords,
  };

  return {
    records,
    summary,
    headers: rawHeaders,
    missingRequired,
  };
}
