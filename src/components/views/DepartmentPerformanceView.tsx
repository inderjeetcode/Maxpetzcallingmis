/**
 * Section 6 Graph G: Department Performance View
 * Displays incoming calls, connected calls, missed calls, answer rate, and callback performance by department.
 */

import React from 'react';
import { DepartmentMetric } from '../../types/callAnalytics';
import { Building2, TrendingUp, PhoneCall } from 'lucide-react';

interface DepartmentPerformanceViewProps {
  metrics: DepartmentMetric[];
}

export const DepartmentPerformanceView: React.FC<DepartmentPerformanceViewProps> = ({
  metrics,
}) => {
  const maxCalls = Math.max(...metrics.map((m) => m.totalCalls), 5);

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}m ${s}s`;
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-black" />
          <h2 className="text-base font-black uppercase text-black">
            GRAPH G: Departmental Operational Breakdown
          </h2>
        </div>
        <p className="text-xs font-semibold text-gray-600">
          Evaluates call volume, answer rate, and callback resolution across hospital divisions
        </p>
      </div>

      {/* Visual Comparative Bars */}
      <div className="border-2 border-black bg-white p-4 shadow-[4px_4px_0px_#000]">
        <h3 className="text-xs font-black uppercase text-black mb-4">
          Call Volume by Department
        </h3>

        <div className="space-y-4">
          {metrics.map((dept) => {
            const pct = Math.max(5, (dept.totalCalls / maxCalls) * 100);
            return (
              <div key={dept.department} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="font-black text-black">{dept.department}</span>
                  <span className="font-mono text-gray-700">
                    {dept.totalCalls} calls ({dept.incomingCalls} in / {dept.outgoingCalls} out)
                  </span>
                </div>
                <div className="h-5 w-full border-2 border-black bg-gray-100 flex overflow-hidden">
                  <div
                    style={{ width: `${(dept.incomingConnected / maxCalls) * 100}%` }}
                    className="h-full bg-[#00D26A]"
                    title={`Connected: ${dept.incomingConnected}`}
                  />
                  <div
                    style={{ width: `${(dept.incomingMissed / maxCalls) * 100}%` }}
                    className="h-full bg-[#FF334B]"
                    title={`Missed: ${dept.incomingMissed}`}
                  />
                  <div
                    style={{ width: `${(dept.outgoingCalls / maxCalls) * 100}%` }}
                    className="h-full bg-[#7928CA]"
                    title={`Outgoing: ${dept.outgoingCalls}`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-bold pt-3 border-t border-gray-200">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 bg-[#00D26A] border border-black" />
            <span>Inc Connected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 bg-[#FF334B] border border-black" />
            <span>Inc Missed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 bg-[#7928CA] border border-black" />
            <span>Outbound</span>
          </div>
        </div>
      </div>

      {/* Detailed Department Table */}
      <div className="border-2 border-black bg-white shadow-[4px_4px_0px_#000]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="border-b-2 border-black bg-[#FFE600] font-black uppercase text-black">
                <th className="border-r-2 border-black p-2.5 text-left">Department</th>
                <th className="border-r-2 border-black p-2.5 text-right">Total Calls</th>
                <th className="border-r-2 border-black p-2.5 text-right">Incoming</th>
                <th className="border-r-2 border-black p-2.5 text-right">Connected</th>
                <th className="border-r-2 border-black p-2.5 text-right">Missed</th>
                <th className="border-r-2 border-black p-2.5 text-right">Answer Rate</th>
                <th className="border-r-2 border-black p-2.5 text-right">Avg Duration</th>
                <th className="border-r-2 border-black p-2.5 text-right">Eligible Missed</th>
                <th className="p-2.5 text-right">Recovery Rate</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((dept, idx) => (
                <tr
                  key={idx}
                  className="border-b border-black font-semibold hover:bg-yellow-50 transition-colors"
                >
                  <td className="border-r-2 border-black p-2.5 font-black text-black">
                    {dept.department}
                  </td>
                  <td className="border-r-2 border-black p-2.5 text-right font-mono font-bold">
                    {dept.totalCalls}
                  </td>
                  <td className="border-r-2 border-black p-2.5 text-right font-mono text-[#0070F3]">
                    {dept.incomingCalls}
                  </td>
                  <td className="border-r-2 border-black p-2.5 text-right font-mono text-[#00D26A] font-bold">
                    {dept.incomingConnected}
                  </td>
                  <td className="border-r-2 border-black p-2.5 text-right font-mono text-[#FF334B] font-bold">
                    {dept.incomingMissed}
                  </td>
                  <td className="border-r-2 border-black p-2.5 text-right font-mono font-black">
                    <span
                      className={`inline-block border border-black px-1.5 py-0.5 ${
                        dept.answerRate >= 85
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {dept.answerRate}%
                    </span>
                  </td>
                  <td className="border-r-2 border-black p-2.5 text-right font-mono text-gray-700">
                    {formatSeconds(dept.avgDurationSeconds)}
                  </td>
                  <td className="border-r-2 border-black p-2.5 text-right font-mono font-bold text-red-700">
                    {dept.eligibleMissed}
                  </td>
                  <td className="p-2.5 text-right font-mono font-black">
                    <span className="inline-block border border-black bg-gray-100 px-1.5 py-0.5">
                      {dept.recoveryRate}%
                    </span>
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
