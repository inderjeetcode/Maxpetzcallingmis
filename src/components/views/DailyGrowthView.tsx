/**
 * Section 6: Daily Growth Analytics View
 * All 6 graphs (A through F) presented in a clear Brutalist grid.
 */

import React from 'react';
import { DailyGrowthPoint, HourlyDistributionPoint } from '../../types/callAnalytics';
import {
  GraphDailyVolume,
  GraphConnectedVsMissed,
  GraphDayOverDayGrowth,
  GraphDailyAnswerRate,
  GraphHourlyDistribution,
} from '../charts/BrutalistCharts';

interface DailyGrowthViewProps {
  dailyGrowth: DailyGrowthPoint[];
  hourlyDistribution: HourlyDistributionPoint[];
  targetAnswerRate?: number;
}

export const DailyGrowthView: React.FC<DailyGrowthViewProps> = ({
  dailyGrowth,
  hourlyDistribution,
  targetAnswerRate = 85,
}) => {
  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Title */}
      <div>
        <h2 className="text-base font-black uppercase text-black">
          Section 6: Daily Growth Analytics & Call Center Trends
        </h2>
        <p className="text-xs font-semibold text-gray-600">
          Continuous calendar date trends, stacked connection breakdown, day-over-day growth percentages, and hourly distributions (Asia/Kolkata timezone)
        </p>
      </div>

      {/* Graph A & Graph B */}
      <div className="grid grid-cols-1 gap-6">
        <GraphDailyVolume data={dailyGrowth} />
        <GraphConnectedVsMissed data={dailyGrowth} />
      </div>

      {/* Graph C: Day-over-Day Growth Table */}
      <div>
        <GraphDayOverDayGrowth data={dailyGrowth} />
      </div>

      {/* Graph D: Daily Answer Rate */}
      <div>
        <GraphDailyAnswerRate data={dailyGrowth} targetAnswerRate={targetAnswerRate} />
      </div>

      {/* Graph E: Callback Recovery Trend Summary */}
      <div className="border-2 border-black bg-white p-4 shadow-[3px_3px_0px_#000]">
        <div className="border-b border-gray-200 pb-3">
          <h3 className="text-sm font-black uppercase text-black">
            GRAPH E: Callback Recovery Trend by Day
          </h3>
          <p className="text-xs font-semibold text-gray-600">
            Missed call volume vs. outbound recovery attempts and verified outcomes
          </p>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse border-2 border-black text-xs">
            <thead>
              <tr className="border-b-2 border-black bg-[#FFE600] font-black uppercase text-black">
                <th className="border-r-2 border-black p-2 text-left">Date</th>
                <th className="border-r-2 border-black p-2 text-right">Eligible Missed</th>
                <th className="border-r-2 border-black p-2 text-right">Callback Attempts</th>
                <th className="border-r-2 border-black p-2 text-right">Estimated Connected</th>
                <th className="border-r-2 border-black p-2 text-right">Confirmed Successful</th>
                <th className="p-2 text-right">Pending Callbacks</th>
              </tr>
            </thead>
            <tbody>
              {dailyGrowth.map((d, idx) => (
                <tr key={idx} className="border-b border-black font-semibold hover:bg-yellow-50">
                  <td className="border-r-2 border-black p-2 font-mono font-black text-black">
                    {d.displayDate} ({d.date})
                  </td>
                  <td className="border-r-2 border-black p-2 text-right font-mono font-bold text-red-700">
                    {d.eligibleMissed}
                  </td>
                  <td className="border-r-2 border-black p-2 text-right font-mono font-bold text-black">
                    {d.callbackAttempts}
                  </td>
                  <td className="border-r-2 border-black p-2 text-right font-mono font-bold text-emerald-700">
                    {d.estimatedSuccessfulCallbacks}
                  </td>
                  <td className="border-r-2 border-black p-2 text-right font-mono font-bold text-emerald-900">
                    {d.confirmedSuccessfulCallbacks}
                  </td>
                  <td className="p-2 text-right font-mono font-bold text-amber-700">
                    {d.pendingCallbacks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Graph F: Hourly Distribution */}
      <div>
        <GraphHourlyDistribution data={hourlyDistribution} />
      </div>
    </div>
  );
};
