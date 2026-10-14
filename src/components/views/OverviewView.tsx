/**
 * Overview View: 16 Dynamic KPI Cards, Summary Highlights, and Mini Visuals
 */

import React from 'react';
import { KPICardsData, DailyGrowthPoint, HourlyDistributionPoint } from '../../types/callAnalytics';
import { KPICard } from '../KPICard';
import { GraphDailyVolume, GraphHourlyDistribution } from '../charts/BrutalistCharts';
import { PhoneCall, PhoneIncoming, PhoneOutgoing, PhoneMissed, CheckCircle2, Clock } from 'lucide-react';

interface OverviewViewProps {
  kpis: KPICardsData;
  dailyGrowth: DailyGrowthPoint[];
  hourlyDistribution: HourlyDistributionPoint[];
  onFilterCategory?: (category: string) => void;
  targetAnswerRate?: number;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  kpis,
  dailyGrowth,
  hourlyDistribution,
  onFilterCategory,
  targetAnswerRate = 85,
}) => {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* High-Impact Alert Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="border-3 border-black bg-[#FFE600] p-4 shadow-[3px_3px_0px_#000]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-black">
              Incoming Answer Rate
            </span>
            <span
              className={`border border-black px-2 py-0.5 text-[10px] font-black uppercase ${
                kpis.incomingAnswerRate >= targetAnswerRate
                  ? 'bg-[#00D26A] text-black'
                  : 'bg-[#FF334B] text-white'
              }`}
            >
              {kpis.incomingAnswerRate >= targetAnswerRate ? 'ON TARGET' : 'BELOW TARGET'}
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-black text-black">
              {kpis.incomingAnswerRate}%
            </span>
            <span className="text-xs font-bold text-gray-800">
              Target: {targetAnswerRate}%
            </span>
          </div>
          <p className="mt-1 text-[11px] font-bold text-gray-700">
            {kpis.incomingConnected} connected of {kpis.incomingCalls} total incoming calls
          </p>
        </div>

        <div className="border-3 border-black bg-[#FF334B] p-4 text-white shadow-[3px_3px_0px_#000]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-white">
              Unresolved Missed Calls
            </span>
            <PhoneMissed className="h-4 w-4 text-white" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-black text-white">
              {kpis.pendingCallbacks}
            </span>
            <span className="text-xs font-bold text-red-100">
              Pending callbacks
            </span>
          </div>
          <p className="mt-1 text-[11px] font-bold text-red-100">
            {kpis.incomingMissed} incoming missed calls require follow-up
          </p>
        </div>

        <div className="border-3 border-black bg-[#00D26A] p-4 text-black shadow-[3px_3px_0px_#000]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-black">
              Callback Recovery Engine
            </span>
            <CheckCircle2 className="h-4 w-4 text-black" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-3xl font-black text-black">
              {kpis.callbackAttempts}
            </span>
            <span className="text-xs font-bold text-gray-800">
              Attempts made
            </span>
          </div>
          <p className="mt-1 text-[11px] font-bold text-gray-800">
            {kpis.estimatedSuccessfulCallbacks} estimated & {kpis.confirmedSuccessfulCallbacks} staff-confirmed
          </p>
        </div>
      </div>

      {/* 16 DYNAMIC KPI CARDS */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-black uppercase tracking-tight text-black">
            Section 5: Performance KPI Cards (16 Dynamic Metrics)
          </h2>
          <span className="text-xs font-bold text-gray-600">
            Click any card to filter records
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {/* 1. Total Calls */}
          <KPICard
            title="1. Total Calls"
            value={kpis.totalCalls}
            delta={kpis.comparisons?.totalCallsDelta}
            colorTheme="yellow"
            subtext="All unique records"
            onClick={() => onFilterCategory?.('all')}
          />

          {/* 2. Incoming Calls */}
          <KPICard
            title="2. Incoming Calls"
            value={kpis.incomingCalls}
            delta={kpis.comparisons?.incomingCallsDelta}
            colorTheme="blue"
            subtext="Client inbound"
            onClick={() => onFilterCategory?.('Incoming')}
          />

          {/* 3. Incoming Connected */}
          <KPICard
            title="3. Incoming Connected"
            value={kpis.incomingConnected}
            delta={kpis.comparisons?.incomingConnectedDelta}
            colorTheme="green"
            subtext="Answered by staff"
            onClick={() => onFilterCategory?.('Incoming-Connected')}
          />

          {/* 4. Incoming Missed */}
          <KPICard
            title="4. Incoming Missed"
            value={kpis.incomingMissed}
            delta={kpis.comparisons?.incomingMissedDelta}
            deltaInvert={true}
            colorTheme="red"
            subtext="Unanswered inbound"
            onClick={() => onFilterCategory?.('Incoming-Missed')}
          />

          {/* 5. Outgoing Calls */}
          <KPICard
            title="5. Outgoing Calls"
            value={kpis.outgoingCalls}
            delta={kpis.comparisons?.outgoingCallsDelta}
            colorTheme="purple"
            subtext="Staff outbound"
            onClick={() => onFilterCategory?.('Outgoing')}
          />

          {/* 6. Outgoing Connected */}
          <KPICard
            title="6. Outgoing Connected"
            value={kpis.outgoingConnected}
            delta={kpis.comparisons?.outgoingConnectedDelta}
            colorTheme="green"
            subtext="Client answered"
            onClick={() => onFilterCategory?.('Outgoing-Connected')}
          />

          {/* 7. Outgoing Missed */}
          <KPICard
            title="7. Outgoing Missed"
            value={kpis.outgoingMissed}
            delta={kpis.comparisons?.outgoingMissedDelta}
            deltaInvert={true}
            colorTheme="neutral"
            subtext="Unanswered outbound"
            onClick={() => onFilterCategory?.('Outgoing-Missed')}
          />

          {/* 8. Total Connected */}
          <KPICard
            title="8. Total Connected"
            value={kpis.totalConnected}
            delta={kpis.comparisons?.totalConnectedDelta}
            colorTheme="green"
            subtext="All connected calls"
            onClick={() => onFilterCategory?.('Connected')}
          />

          {/* 9. Total Missed */}
          <KPICard
            title="9. Total Missed"
            value={kpis.totalMissed}
            delta={kpis.comparisons?.totalMissedDelta}
            deltaInvert={true}
            colorTheme="red"
            subtext="All missed calls"
            onClick={() => onFilterCategory?.('Missed')}
          />

          {/* 10. Callback Attempts */}
          <KPICard
            title="10. Callback Attempts"
            value={kpis.callbackAttempts}
            colorTheme="yellow"
            subtext="Outbound retries"
            onClick={() => onFilterCategory?.('Callbacks')}
          />

          {/* 11. Estimated Successful */}
          <KPICard
            title="11. Estimated Callbacks"
            value={kpis.estimatedSuccessfulCallbacks}
            colorTheme="green"
            subtext="Outbound connected"
            onClick={() => onFilterCategory?.('Estimated-Successful')}
          />

          {/* 12. Confirmed Successful */}
          <KPICard
            title="12. Confirmed Callbacks"
            value={kpis.confirmedSuccessfulCallbacks}
            delta={kpis.comparisons?.confirmedCallbacksDelta}
            colorTheme="green"
            subtext="Staff verified"
            onClick={() => onFilterCategory?.('Confirmed-Successful')}
          />

          {/* 13. Pending Callbacks */}
          <KPICard
            title="13. Pending Callbacks"
            value={kpis.pendingCallbacks}
            deltaInvert={true}
            colorTheme="red"
            subtext="Requires outreach"
            onClick={() => onFilterCategory?.('Pending')}
          />

          {/* 14. Incoming Answer Rate */}
          <KPICard
            title="14. Incoming Answer Rate"
            value={`${kpis.incomingAnswerRate}%`}
            delta={kpis.comparisons?.incomingAnswerRateDelta}
            deltaSuffix=" pts"
            colorTheme={kpis.incomingAnswerRate >= targetAnswerRate ? 'green' : 'red'}
            subtext={`Target: ${targetAnswerRate}%`}
          />

          {/* 15. Incoming Missed Rate */}
          <KPICard
            title="15. Incoming Missed Rate"
            value={`${kpis.incomingMissedRate}%`}
            deltaInvert={true}
            colorTheme={kpis.incomingMissedRate <= 15 ? 'green' : 'red'}
            subtext="Inbound loss %"
          />

          {/* 16. Average Call Duration */}
          <KPICard
            title="16. Avg Call Duration"
            value={formatDuration(kpis.averageCallDurationSeconds)}
            delta={kpis.comparisons?.averageDurationDelta}
            colorTheme="blue"
            subtext={`${kpis.averageCallDurationSeconds} seconds`}
          />
        </div>
      </div>

      {/* Mini Graphs Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GraphDailyVolume data={dailyGrowth} />
        <GraphHourlyDistribution data={hourlyDistribution} />
      </div>
    </div>
  );
};
