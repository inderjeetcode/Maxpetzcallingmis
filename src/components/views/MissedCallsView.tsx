/**
 * Missed Calls Dedicated Triage View
 */

import React from 'react';
import { CallbackMatch, ParsedCallRecord } from '../../types/callAnalytics';
import { PhoneMissed, PhoneForwarded, Clock, AlertCircle } from 'lucide-react';

interface MissedCallsViewProps {
  missedCalls: ParsedCallRecord[];
  callbackMatches: CallbackMatch[];
  onOpenTriageModal: (match: CallbackMatch) => void;
  maskPhones: boolean;
}

export const MissedCallsView: React.FC<MissedCallsViewProps> = ({
  missedCalls,
  callbackMatches,
  onOpenTriageModal,
  maskPhones,
}) => {
  const matchesByMissedUid = new Map<string, CallbackMatch>();
  callbackMatches.forEach((m) => matchesByMissedUid.set(m.missedCallUid, m));

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-4">
        <div>
          <div className="flex items-center gap-2">
            <PhoneMissed className="h-5 w-5 text-red-600" />
            <h2 className="text-base font-black uppercase text-black">
              Missed Call Intake & Recovery Triage ({missedCalls.length} calls)
            </h2>
          </div>
          <p className="text-xs font-semibold text-gray-600">
            Real-time feed of unanswered client inquiries requiring hospital response
          </p>
        </div>
      </div>

      {/* Missed Calls Table */}
      <div className="border-2 border-black bg-white shadow-[4px_4px_0px_#000]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="border-b-2 border-black bg-[#FF334B] font-black uppercase text-white">
                <th className="border-r-2 border-black p-2.5 text-left">UID / Time</th>
                <th className="border-r-2 border-black p-2.5 text-left">Customer</th>
                <th className="border-r-2 border-black p-2.5 text-left">Department</th>
                <th className="border-r-2 border-black p-2.5 text-left">Note / Inquiry</th>
                <th className="border-r-2 border-black p-2.5 text-center">Duration</th>
                <th className="border-r-2 border-black p-2.5 text-center">Recovery State</th>
                <th className="p-2.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {missedCalls.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center font-bold text-gray-500">
                    No missed calls found for current filter criteria.
                  </td>
                </tr>
              ) : (
                missedCalls.map((call) => {
                  const match = matchesByMissedUid.get(call.uid);
                  const status = match ? match.status : 'Pending';

                  let statusBg = 'bg-gray-100 text-gray-800';
                  if (status === 'Confirmed Successful') statusBg = 'bg-[#00D26A] text-black';
                  else if (status === 'Estimated Connected') statusBg = 'bg-emerald-100 text-emerald-800';
                  else if (status === 'Estimated Attempt') statusBg = 'bg-amber-100 text-amber-800';
                  else if (status === 'Ambiguous Match') statusBg = 'bg-[#FFE600] text-black';
                  else if (status === 'Pending') statusBg = 'bg-[#FF334B] text-white';

                  return (
                    <tr
                      key={call.uid}
                      className="border-b border-black font-semibold hover:bg-yellow-50 transition-colors"
                    >
                      <td className="border-r-2 border-black p-2.5">
                        <div className="font-mono font-bold text-black">{call.uid}</div>
                        <div className="font-mono text-[10px] text-gray-600">
                          {new Date(call.epochMs).toLocaleTimeString('en-IN', {
                            timeZone: 'Asia/Kolkata',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}{' '}
                          · {call.dateKey}
                        </div>
                      </td>
                      <td className="border-r-2 border-black p-2.5">
                        <div className="font-mono font-black text-black">
                          {maskPhones ? call.maskedPhone : call.from}
                        </div>
                        {call.name && (
                          <div className="text-[10px] font-bold text-gray-700">{call.name}</div>
                        )}
                        <div className="text-[10px] text-gray-500 font-bold">
                          {call.state}, {call.country}
                        </div>
                      </td>
                      <td className="border-r-2 border-black p-2.5 font-bold text-black">
                        {call.department}
                      </td>
                      <td className="border-r-2 border-black p-2.5 text-[11px] text-gray-800 max-w-[260px] truncate">
                        {call.anyNote || 'No notes logged'}
                      </td>
                      <td className="border-r-2 border-black p-2.5 text-center font-mono font-bold">
                        {call.durationSeconds}s
                      </td>
                      <td className="border-r-2 border-black p-2.5 text-center">
                        <span
                          className={`inline-block border border-black px-2 py-0.5 text-[10px] font-black uppercase ${statusBg}`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="p-2.5 text-center">
                        {match && (
                          <button
                            onClick={() => onOpenTriageModal(match)}
                            className="flex items-center gap-1 border-2 border-black bg-[#FFE600] px-2.5 py-1 text-[11px] font-black uppercase text-black shadow-[2px_2px_0px_#000] hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5"
                          >
                            <PhoneForwarded className="h-3 w-3" />
                            <span>Verify</span>
                          </button>
                        )}
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
