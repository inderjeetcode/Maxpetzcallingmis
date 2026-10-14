/**
 * Call Analytics View: Incoming vs Outgoing deeper breakdown,
 * duration distributions, pulse/billing metrics, and staff performance table.
 */

import React from 'react';
import { KPICardsData, ParsedCallRecord, StaffMetric } from '../../types/callAnalytics';
import { PhoneIncoming, PhoneOutgoing, Clock, Users, DollarSign, Activity } from 'lucide-react';

interface CallAnalyticsViewProps {
  records: ParsedCallRecord[];
  kpis: KPICardsData;
  staffMetrics: StaffMetric[];
}

export const CallAnalyticsView: React.FC<CallAnalyticsViewProps> = ({
  records,
  kpis,
  staffMetrics,
}) => {
  // Billing and pulse statistics
  let totalBillable = 0;
  let totalPulse = 0;
  let totalLegBMinutes = 0;

  records.forEach((r) => {
    totalBillable += r.billable;
    totalPulse += r.pulse;
    totalLegBMinutes += r.legBMinutes;
  });

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}m ${s}s`;
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Title */}
      <div>
        <h2 className="text-base font-black uppercase text-black">
          Call Analytics & Operational Performance
        </h2>
        <p className="text-xs font-semibold text-gray-600">
          In-depth inbound/outbound metrics, duration distribution, and staff activity
        </p>
      </div>

      {/* Inbound vs Outbound Comparison Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Inbound Card */}
        <div className="border-3 border-black bg-white p-5 shadow-[4px_4px_0px_#000]">
          <div className="flex items-center justify-between border-b-2 border-black pb-3">
            <div className="flex items-center gap-2">
              <PhoneIncoming className="h-5 w-5 text-[#0070F3]" />
              <h3 className="text-sm font-black uppercase text-black">
                INBOUND TRAFFIC (CLIENT INITIATED)
              </h3>
            </div>
            <span className="border-2 border-black bg-[#0070F3] px-2 py-0.5 text-xs font-black text-white">
              {kpis.incomingCalls} CALLS
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
            <div className="border-2 border-black bg-emerald-50 p-3">
              <span className="font-bold text-gray-600 uppercase">Incoming Connected:</span>
              <p className="font-mono text-2xl font-black text-emerald-800">
                {kpis.incomingConnected}
              </p>
              <span className="text-[11px] font-bold text-emerald-700">
                {kpis.incomingAnswerRate}% Answer Rate
              </span>
            </div>

            <div className="border-2 border-black bg-red-50 p-3">
              <span className="font-bold text-gray-600 uppercase">Incoming Missed:</span>
              <p className="font-mono text-2xl font-black text-red-800">
                {kpis.incomingMissed}
              </p>
              <span className="text-[11px] font-bold text-red-700">
                {kpis.incomingMissedRate}% Missed Rate
              </span>
            </div>
          </div>
        </div>

        {/* Outbound Card */}
        <div className="border-3 border-black bg-white p-5 shadow-[4px_4px_0px_#000]">
          <div className="flex items-center justify-between border-b-2 border-black pb-3">
            <div className="flex items-center gap-2">
              <PhoneOutgoing className="h-5 w-5 text-[#7928CA]" />
              <h3 className="text-sm font-black uppercase text-black">
                OUTBOUND TRAFFIC (STAFF INITIATED)
              </h3>
            </div>
            <span className="border-2 border-black bg-[#7928CA] px-2 py-0.5 text-xs font-black text-white">
              {kpis.outgoingCalls} CALLS
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
            <div className="border-2 border-black bg-emerald-50 p-3">
              <span className="font-bold text-gray-600 uppercase">Outgoing Connected:</span>
              <p className="font-mono text-2xl font-black text-emerald-800">
                {kpis.outgoingConnected}
              </p>
              <span className="text-[11px] font-bold text-emerald-700">
                {kpis.outgoingCalls > 0
                  ? ((kpis.outgoingConnected / kpis.outgoingCalls) * 100).toFixed(1)
                  : 0}
                % Reach Rate
              </span>
            </div>

            <div className="border-2 border-black bg-gray-50 p-3">
              <span className="font-bold text-gray-600 uppercase">Outgoing Unanswered:</span>
              <p className="font-mono text-2xl font-black text-gray-800">
                {kpis.outgoingMissed}
              </p>
              <span className="text-[11px] font-bold text-gray-600">
                Client did not answer
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Telecom Pulse & Billing Details */}
      <div className="border-2 border-black bg-white p-4 shadow-[3px_3px_0px_#000]">
        <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
          <Activity className="h-4 w-4 text-black" />
          <h3 className="text-xs font-black uppercase text-black">
            Telecom Pulse, Billable Counts & Duration Summary
          </h3>
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="border-2 border-black p-3 bg-gray-50">
            <span className="font-bold text-gray-500 uppercase">Average Duration:</span>
            <p className="font-mono text-xl font-black text-black">
              {formatSeconds(kpis.averageCallDurationSeconds)}
            </p>
          </div>
          <div className="border-2 border-black p-3 bg-gray-50">
            <span className="font-bold text-gray-500 uppercase">Total Telecom Pulses:</span>
            <p className="font-mono text-xl font-black text-black">{totalPulse}</p>
          </div>
          <div className="border-2 border-black p-3 bg-gray-50">
            <span className="font-bold text-gray-500 uppercase">Billable Calls:</span>
            <p className="font-mono text-xl font-black text-black">{totalBillable}</p>
          </div>
          <div className="border-2 border-black p-3 bg-gray-50">
            <span className="font-bold text-gray-500 uppercase">Leg B Minutes:</span>
            <p className="font-mono text-xl font-black text-black">{totalLegBMinutes.toFixed(1)}m</p>
          </div>
        </div>
      </div>

      {/* Staff Activity & Extension Table */}
      <div className="border-2 border-black bg-white p-4 shadow-[3px_3px_0px_#000]">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-black" />
            <h3 className="text-sm font-black uppercase text-black">
              Staff / Extension Performance Table
            </h3>
          </div>
          <span className="text-xs font-bold text-gray-600">
            {staffMetrics.length} Agents Identified
          </span>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse border-2 border-black text-xs">
            <thead>
              <tr className="border-b-2 border-black bg-[#FFE600] font-black uppercase text-black">
                <th className="border-r-2 border-black p-2 text-left">Staff Name</th>
                <th className="border-r-2 border-black p-2 text-center">Ext</th>
                <th className="border-r-2 border-black p-2 text-right">Total Calls</th>
                <th className="border-r-2 border-black p-2 text-right">Connected</th>
                <th className="border-r-2 border-black p-2 text-right">Missed</th>
                <th className="border-r-2 border-black p-2 text-right">Inbound</th>
                <th className="border-r-2 border-black p-2 text-right">Outbound</th>
                <th className="p-2 text-right">Avg Duration</th>
              </tr>
            </thead>
            <tbody>
              {staffMetrics.map((staff, idx) => (
                <tr
                  key={idx}
                  className="border-b border-black font-semibold hover:bg-yellow-50"
                >
                  <td className="border-r-2 border-black p-2 font-black text-black">
                    {staff.staffName}
                  </td>
                  <td className="border-r-2 border-black p-2 text-center font-mono font-bold text-gray-700">
                    {staff.extension ? `ext. ${staff.extension}` : '-'}
                  </td>
                  <td className="border-r-2 border-black p-2 text-right font-mono font-bold">
                    {staff.totalCallsHandled}
                  </td>
                  <td className="border-r-2 border-black p-2 text-right font-mono text-emerald-700 font-bold">
                    {staff.connectedCalls}
                  </td>
                  <td className="border-r-2 border-black p-2 text-right font-mono text-red-700 font-bold">
                    {staff.missedCalls}
                  </td>
                  <td className="border-r-2 border-black p-2 text-right font-mono text-[#0070F3]">
                    {staff.incomingHandled}
                  </td>
                  <td className="border-r-2 border-black p-2 text-right font-mono text-[#7928CA]">
                    {staff.outgoingMade}
                  </td>
                  <td className="p-2 text-right font-mono font-bold">
                    {formatSeconds(staff.avgDurationSeconds)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
