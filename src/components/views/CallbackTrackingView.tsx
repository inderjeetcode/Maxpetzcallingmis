/**
 * Section 8: Callback Tracking Table & Management View
 * Detailed auditable log of missed calls and outbound recovery attempts.
 */

import React, { useState } from 'react';
import { CallbackMatch, CallbackMatchStatus } from '../../types/callAnalytics';
import { PhoneForwarded, History, CheckCircle2, XCircle, AlertTriangle, Filter } from 'lucide-react';

interface CallbackTrackingViewProps {
  matches: CallbackMatch[];
  onOpenTriageModal: (match: CallbackMatch) => void;
  onOpenAuditTrail: () => void;
  maskPhones: boolean;
}

export const CallbackTrackingView: React.FC<CallbackTrackingViewProps> = ({
  matches,
  onOpenTriageModal,
  onOpenAuditTrail,
  maskPhones,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredMatches =
    statusFilter === 'all'
      ? matches
      : matches.filter((m) => m.status === statusFilter);

  // Status counters
  const countPending = matches.filter((m) => m.status === 'Pending').length;
  const countEstimatedConn = matches.filter((m) => m.status === 'Estimated Connected').length;
  const countConfirmedSucc = matches.filter((m) => m.status === 'Confirmed Successful').length;
  const countAmbiguous = matches.filter((m) => m.status === 'Ambiguous Match').length;

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Top Header */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between border-b-2 border-black pb-4">
        <div>
          <div className="flex items-center gap-2">
            <PhoneForwarded className="h-5 w-5 text-black" />
            <h2 className="text-base font-black uppercase text-black">
              Section 8: Auditable Callback Tracking Engine
            </h2>
          </div>
          <p className="text-xs font-semibold text-gray-600">
            Automated matching of incoming missed calls to subsequent outbound staff calls within 24h window
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenAuditTrail}
            className="flex items-center gap-1.5 border-2 border-black bg-white px-3 py-1.5 text-xs font-black uppercase text-black shadow-[2px_2px_0px_#000] hover:bg-gray-100 active:translate-x-0.5 active:translate-y-0.5"
          >
            <History className="h-4 w-4" />
            <span>Audit Trail Log</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-black uppercase text-black flex items-center gap-1 mr-1">
          <Filter className="h-3.5 w-3.5" /> Filter Status:
        </span>
        {[
          { id: 'all', label: `All (${matches.length})` },
          { id: 'Pending', label: `Pending (${countPending})` },
          { id: 'Estimated Connected', label: `Estimated Connected (${countEstimatedConn})` },
          { id: 'Confirmed Successful', label: `Confirmed (${countConfirmedSucc})` },
          { id: 'Ambiguous Match', label: `Ambiguous (${countAmbiguous})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`border-2 border-black px-2.5 py-1 text-xs font-black transition-all ${
              statusFilter === tab.id
                ? 'bg-[#FFE600] text-black shadow-[2px_2px_0px_#000]'
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Detailed Callback Tracking Table */}
      <div className="border-2 border-black bg-white shadow-[4px_4px_0px_#000]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="border-b-2 border-black bg-[#FFE600] font-black uppercase text-black">
                <th className="border-r-2 border-black p-2.5 text-left">Missed Call UID / Time</th>
                <th className="border-r-2 border-black p-2.5 text-left">Customer</th>
                <th className="border-r-2 border-black p-2.5 text-left">Outbound Call UID</th>
                <th className="border-r-2 border-black p-2.5 text-left">Outbound Time</th>
                <th className="border-r-2 border-black p-2.5 text-center">Time Taken</th>
                <th className="border-r-2 border-black p-2.5 text-center">Confidence</th>
                <th className="border-r-2 border-black p-2.5 text-center">Status</th>
                <th className="border-r-2 border-black p-2.5 text-left">Staff Verification</th>
                <th className="p-2.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredMatches.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center font-bold text-gray-500">
                    No callback records match this filter.
                  </td>
                </tr>
              ) : (
                filteredMatches.map((item) => {
                  let statusBg = 'bg-gray-100 text-gray-800';
                  if (item.status === 'Confirmed Successful') statusBg = 'bg-[#00D26A] text-black';
                  else if (item.status === 'Estimated Connected') statusBg = 'bg-emerald-100 text-emerald-800';
                  else if (item.status === 'Estimated Attempt') statusBg = 'bg-amber-100 text-amber-800';
                  else if (item.status === 'Ambiguous Match') statusBg = 'bg-[#FFE600] text-black';
                  else if (item.status === 'Pending') statusBg = 'bg-[#FF334B] text-white';

                  return (
                    <tr
                      key={item.missedCallUid}
                      className="border-b border-black font-semibold hover:bg-yellow-50 transition-colors"
                    >
                      <td className="border-r-2 border-black p-2.5">
                        <div className="font-mono font-bold text-black">{item.missedCallUid}</div>
                        <div className="font-mono text-[10px] text-gray-600">
                          {new Date(item.missedEpochMs).toLocaleTimeString('en-IN', {
                            timeZone: 'Asia/Kolkata',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}
                        </div>
                      </td>

                      <td className="border-r-2 border-black p-2.5">
                        <div className="font-mono font-black text-black">
                          {maskPhones ? item.maskedPhone : item.normalizedPhone}
                        </div>
                        {item.callerName && (
                          <div className="text-[10px] font-bold text-gray-700">{item.callerName}</div>
                        )}
                        <div className="text-[10px] text-gray-500">{item.department}</div>
                      </td>

                      <td className="border-r-2 border-black p-2.5 font-mono text-[11px] text-black">
                        {item.outgoingCallUid ? (
                          <span className="font-bold">{item.outgoingCallUid}</span>
                        ) : (
                          <span className="text-gray-400">None</span>
                        )}
                      </td>

                      <td className="border-r-2 border-black p-2.5">
                        {item.outgoingEpochMs ? (
                          <>
                            <div className="font-mono text-[11px] font-bold text-black">
                              {new Date(item.outgoingEpochMs).toLocaleTimeString('en-IN', {
                                timeZone: 'Asia/Kolkata',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit',
                              })}
                            </div>
                            <div className="text-[10px] text-gray-600">{item.outgoingStaffName}</div>
                          </>
                        ) : (
                          <span className="text-gray-400 font-mono text-[11px]">-</span>
                        )}
                      </td>

                      <td className="border-r-2 border-black p-2.5 text-center font-mono font-bold">
                        {item.timeTakenMinutes !== undefined ? (
                          <span className="border border-black bg-gray-100 px-1.5 py-0.5">
                            {item.timeTakenMinutes}m
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>

                      <td className="border-r-2 border-black p-2.5 text-center">
                        <span className="font-mono font-bold text-[10px]">
                          {item.matchConfidence}
                        </span>
                      </td>

                      <td className="border-r-2 border-black p-2.5 text-center">
                        <span
                          className={`inline-block border border-black px-2 py-0.5 text-[10px] font-black uppercase ${statusBg}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="border-r-2 border-black p-2.5 text-[11px]">
                        {item.staffVerification ? (
                          <div>
                            <div className="font-black text-black">
                              {item.staffVerification.verifiedBy}
                            </div>
                            <div className="text-[10px] text-gray-600 italic">
                              "{item.staffVerification.notes || 'Verified'}"
                            </div>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">Awaiting staff confirmation</span>
                        )}
                      </td>

                      <td className="p-2.5 text-center">
                        <button
                          onClick={() => onOpenTriageModal(item)}
                          className="border-2 border-black bg-white px-2.5 py-1 text-[11px] font-black uppercase text-black shadow-[2px_2px_0px_#000] hover:bg-[#FFE600] active:translate-x-0.5 active:translate-y-0.5"
                        >
                          Verify
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
