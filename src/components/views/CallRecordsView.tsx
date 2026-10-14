/**
 * Section 9: Detailed Call Records View
 * Searchable, sortable, paginated data grid with CSV and Excel export.
 */

import React, { useState, useMemo } from 'react';
import { ParsedCallRecord, CallbackMatch } from '../../types/callAnalytics';
import { Download, FileSpreadsheet, ChevronLeft, ChevronRight, Search, Eye } from 'lucide-react';

interface CallRecordsViewProps {
  records: ParsedCallRecord[];
  callbackMatches: CallbackMatch[];
  maskPhones: boolean;
}

export const CallRecordsView: React.FC<CallRecordsViewProps> = ({
  records,
  callbackMatches,
  maskPhones,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [sortField, setSortField] = useState<'epochMs' | 'durationSeconds'>('epochMs');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedRecord, setSelectedRecord] = useState<ParsedCallRecord | null>(null);

  // Map callbacks
  const callbacksByMissedUid = useMemo(() => {
    const map = new Map<string, CallbackMatch>();
    callbackMatches.forEach((c) => map.set(c.missedCallUid, c));
    return map;
  }, [callbackMatches]);

  // Sort
  const sortedRecords = useMemo(() => {
    return [...records].sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      return sortOrder === 'desc' ? (valB > valA ? 1 : -1) : valA > valB ? 1 : -1;
    });
  }, [records, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedRecords.length / pageSize));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedRecords.slice(start, start + pageSize);
  }, [sortedRecords, currentPage, pageSize]);

  const handleSort = (field: 'epochMs' | 'durationSeconds') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'UID',
      'Timestamp (IST)',
      'Phone Number',
      'Name',
      'Event',
      'Status',
      'Duration (seconds)',
      'Department',
      'Staff',
      'Extension',
      'Callback Status',
      'Notes',
    ];

    const rows = sortedRecords.map((r) => {
      const cb = callbacksByMissedUid.get(r.uid);
      return [
        `"${r.uid}"`,
        `"${r.timestamp}"`,
        `"${maskPhones ? r.maskedPhone : r.from}"`,
        `"${r.name || ''}"`,
        `"${r.event}"`,
        `"${r.status}"`,
        r.durationSeconds,
        `"${r.department}"`,
        `"${r.staffName}"`,
        `"${r.extension}"`,
        `"${cb ? cb.status : '-'}"`,
        `"${(r.anyNote || '').replace(/"/g, '""')}"`,
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `max_petz_call_records_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Export to Excel-compatible format (.xls HTML table)
  const handleExportExcel = () => {
    const tableHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="utf-8" /></head>
      <body>
        <table border="1">
          <thead>
            <tr style="background:#FFE600;font-weight:bold;">
              <th>UID</th>
              <th>Timestamp</th>
              <th>Phone</th>
              <th>Name</th>
              <th>Event</th>
              <th>Status</th>
              <th>Duration (sec)</th>
              <th>Department</th>
              <th>Staff</th>
              <th>Callback Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            ${sortedRecords
              .map(
                (r) => `
              <tr>
                <td>${r.uid}</td>
                <td>${r.timestamp}</td>
                <td>${maskPhones ? r.maskedPhone : r.from}</td>
                <td>${r.name || ''}</td>
                <td>${r.event}</td>
                <td>${r.status}</td>
                <td>${r.durationSeconds}</td>
                <td>${r.department}</td>
                <td>${r.staffName}</td>
                <td>${callbacksByMissedUid.get(r.uid)?.status || '-'}</td>
                <td>${r.anyNote || ''}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `max_petz_call_records_${new Date().toISOString().slice(0, 10)}.xls`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Top action header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b-2 border-black pb-4">
        <div>
          <h2 className="text-base font-black uppercase text-black">
            Section 9: Detailed Call Records ({sortedRecords.length} records)
          </h2>
          <p className="text-xs font-semibold text-gray-600">
            Searchable, auditable registry of all hospital call operations
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 border-2 border-black bg-white px-3 py-1.5 text-xs font-black uppercase text-black shadow-[2px_2px_0px_#000] hover:bg-gray-100 active:translate-x-0.5 active:translate-y-0.5"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-1.5 border-2 border-black bg-[#FFE600] px-3 py-1.5 text-xs font-black uppercase text-black shadow-[2px_2px_0px_#000] hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5"
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="border-2 border-black bg-white shadow-[4px_4px_0px_#000]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="border-b-2 border-black bg-[#FFE600] font-black uppercase text-black">
                <th
                  onClick={() => handleSort('epochMs')}
                  className="border-r-2 border-black p-2.5 text-left cursor-pointer hover:bg-yellow-300"
                >
                  UID / Timestamp {sortField === 'epochMs' && (sortOrder === 'desc' ? '▼' : '▲')}
                </th>
                <th className="border-r-2 border-black p-2.5 text-left">Phone Number</th>
                <th className="border-r-2 border-black p-2.5 text-left">Customer</th>
                <th className="border-r-2 border-black p-2.5 text-center">Event</th>
                <th className="border-r-2 border-black p-2.5 text-center">Status</th>
                <th
                  onClick={() => handleSort('durationSeconds')}
                  className="border-r-2 border-black p-2.5 text-right cursor-pointer hover:bg-yellow-300"
                >
                  Duration {sortField === 'durationSeconds' && (sortOrder === 'desc' ? '▼' : '▲')}
                </th>
                <th className="border-r-2 border-black p-2.5 text-left">Department</th>
                <th className="border-r-2 border-black p-2.5 text-left">Staff / Extension</th>
                <th className="border-r-2 border-black p-2.5 text-center">Callback State</th>
                <th className="p-2.5 text-center">Inspect</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-8 text-center font-bold text-gray-500">
                    No call records match the current filter query.
                  </td>
                </tr>
              ) : (
                paginated.map((r) => {
                  const cb = callbacksByMissedUid.get(r.uid);
                  return (
                    <tr
                      key={r.uid}
                      className="border-b border-black font-semibold hover:bg-yellow-50 transition-colors"
                    >
                      <td className="border-r-2 border-black p-2.5">
                        <div className="font-mono font-bold text-black">{r.uid}</div>
                        <div className="font-mono text-[10px] text-gray-600">
                          {new Date(r.epochMs).toLocaleTimeString('en-IN', {
                            timeZone: 'Asia/Kolkata',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}{' '}
                          · {r.dateKey}
                        </div>
                      </td>

                      <td className="border-r-2 border-black p-2.5 font-mono font-bold text-black">
                        {maskPhones ? r.maskedPhone : r.from}
                      </td>

                      <td className="border-r-2 border-black p-2.5">
                        <div className="font-bold text-black">{r.name || '-'}</div>
                        <div className="text-[10px] text-gray-500">
                          {r.state}, {r.country}
                        </div>
                      </td>

                      <td className="border-r-2 border-black p-2.5 text-center">
                        <span
                          className={`inline-block border border-black px-1.5 py-0.5 text-[10px] font-black uppercase ${
                            r.event === 'Incoming'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {r.event}
                        </span>
                      </td>

                      <td className="border-r-2 border-black p-2.5 text-center">
                        <span
                          className={`inline-block border border-black px-1.5 py-0.5 text-[10px] font-black uppercase ${
                            r.status === 'Connected'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>

                      <td className="border-r-2 border-black p-2.5 text-right font-mono font-bold">
                        {r.durationSeconds}s
                      </td>

                      <td className="border-r-2 border-black p-2.5 font-bold text-black">
                        {r.department}
                      </td>

                      <td className="border-r-2 border-black p-2.5">
                        <div className="font-bold text-black">{r.staffName}</div>
                        {r.extension && (
                          <div className="text-[10px] font-mono text-gray-500">
                            ext. {r.extension}
                          </div>
                        )}
                      </td>

                      <td className="border-r-2 border-black p-2.5 text-center">
                        {cb ? (
                          <span className="font-mono text-[10px] font-bold border border-black px-1 py-0.2 bg-gray-100">
                            {cb.status}
                          </span>
                        ) : (
                          <span className="text-gray-400 font-mono">-</span>
                        )}
                      </td>

                      <td className="p-2.5 text-center">
                        <button
                          onClick={() => setSelectedRecord(r)}
                          className="border border-black p-1 hover:bg-[#FFE600]"
                          title="Inspect full raw record"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-black p-3 bg-gray-50 text-xs font-bold">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border-2 border-black bg-white px-2 py-1"
            >
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-gray-600">
              Showing {(currentPage - 1) * pageSize + 1}–
              {Math.min(currentPage * pageSize, sortedRecords.length)} of {sortedRecords.length}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="border-2 border-black bg-white p-1 hover:bg-gray-100 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-2 font-mono font-bold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="border-2 border-black bg-white p-1 hover:bg-gray-100 disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Row Inspection Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-xl border-3 border-black bg-white p-5 shadow-[6px_6px_0px_#000]">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <h3 className="text-sm font-black uppercase text-black">
                Raw Call Record Audit: {selectedRecord.uid}
              </h3>
              <button
                onClick={() => setSelectedRecord(null)}
                className="border-2 border-black p-1 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono max-h-[60vh] overflow-y-auto">
              <div className="border border-black p-2 bg-gray-50">
                <span className="font-bold text-gray-500 font-sans block">Event:</span>
                {selectedRecord.event} ({selectedRecord.rawEvent})
              </div>
              <div className="border border-black p-2 bg-gray-50">
                <span className="font-bold text-gray-500 font-sans block">Status:</span>
                {selectedRecord.status} ({selectedRecord.rawStatus})
              </div>
              <div className="border border-black p-2 bg-gray-50">
                <span className="font-bold text-gray-500 font-sans block">From Phone:</span>
                {maskPhones ? selectedRecord.maskedPhone : selectedRecord.from}
              </div>
              <div className="border border-black p-2 bg-gray-50">
                <span className="font-bold text-gray-500 font-sans block">Duration:</span>
                {selectedRecord.durationSeconds} seconds
              </div>
              <div className="border border-black p-2 bg-gray-50">
                <span className="font-bold text-gray-500 font-sans block">Timestamp:</span>
                {selectedRecord.timestamp}
              </div>
              <div className="border border-black p-2 bg-gray-50">
                <span className="font-bold text-gray-500 font-sans block">Department:</span>
                {selectedRecord.department}
              </div>
              <div className="border border-black p-2 bg-gray-50 col-span-2">
                <span className="font-bold text-gray-500 font-sans block">User Detail:</span>
                {selectedRecord.userDetail || 'None'}
              </div>
              <div className="border border-black p-2 bg-gray-50 col-span-2">
                <span className="font-bold text-gray-500 font-sans block">Any Note:</span>
                <p className="font-sans font-semibold text-black break-words">
                  {selectedRecord.anyNote || 'None'}
                </p>
              </div>
            </div>

            <div className="mt-4 border-t-2 border-black pt-3 text-right">
              <button
                onClick={() => setSelectedRecord(null)}
                className="border-2 border-black bg-black px-4 py-1.5 text-xs font-black text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
