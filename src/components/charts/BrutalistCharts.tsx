/**
 * Section 6: Interactive Brutalist Charts (Graphs A through F)
 * High-contrast, pixel-perfect SVG charts with zero bloat, crisp typography,
 * responsive grids, zero-day handling, and interactive hover tooltips.
 */

import React, { useState } from 'react';
import { DailyGrowthPoint, HourlyDistributionPoint } from '../../types/callAnalytics';

interface GraphProps {
  data: DailyGrowthPoint[];
  targetAnswerRate?: number; // default 85
}

/**
 * GRAPH A: Daily Call Volume Growth (Interactive Multi-Line Chart)
 */
export const GraphDailyVolume: React.FC<GraphProps> = ({ data }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center border-2 border-black bg-white p-6 font-bold text-gray-500">
        No call records for selected period
      </div>
    );
  }

  const maxVal = Math.max(...data.map((d) => Math.max(d.totalCalls, d.incomingCalls, d.outgoingCalls)), 5);
  const chartHeight = 220;
  const paddingX = 40;
  const paddingY = 25;
  const width = Math.max(500, data.length * 60);

  const getX = (i: number) => paddingX + (i / Math.max(1, data.length - 1)) * (width - 2 * paddingX);
  const getY = (val: number) => chartHeight - paddingY - (val / maxVal) * (chartHeight - 2 * paddingY);

  const makePath = (accessor: (d: DailyGrowthPoint) => number) => {
    return data
      .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(accessor(d))}`)
      .join(' ');
  };

  const pathTotal = makePath((d) => d.totalCalls);
  const pathIncoming = makePath((d) => d.incomingCalls);
  const pathOutgoing = makePath((d) => d.outgoingCalls);

  const activePoint = hoveredIdx !== null && hoveredIdx < data.length ? data[hoveredIdx] : null;

  return (
    <div className="border-2 border-black bg-white p-4 shadow-[3px_3px_0px_#000]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-3">
        <div>
          <h3 className="text-sm font-black uppercase text-black">
            GRAPH A: Daily Call Volume Growth
          </h3>
          <p className="text-xs font-semibold text-gray-600">
            Total, Incoming, and Outgoing calls per calendar day (IST)
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 border border-black bg-[#FFE600]" />
            <span>Total Calls</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 border border-black bg-[#0070F3]" />
            <span>Incoming</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 border border-black bg-[#7928CA]" />
            <span>Outgoing</span>
          </div>
        </div>
      </div>

      <div className="relative mt-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${chartHeight}`}
          className="h-64 min-w-[500px] w-full"
          style={{ overflow: 'visible' }}
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
            const y = chartHeight - paddingY - pct * (chartHeight - 2 * paddingY);
            const val = Math.round(pct * maxVal);
            return (
              <g key={idx}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#E5E7EB"
                  strokeDasharray="3 3"
                />
                <text
                  x={paddingX - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="font-mono text-[10px] fill-gray-500 font-bold"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Paths */}
          <path d={pathTotal} fill="none" stroke="#FFE600" strokeWidth="4" />
          <path d={pathIncoming} fill="none" stroke="#0070F3" strokeWidth="2.5" />
          <path d={pathOutgoing} fill="none" stroke="#7928CA" strokeWidth="2.5" />

          {/* Data Points */}
          {data.map((d, i) => {
            const x = getX(i);
            const yTotal = getY(d.totalCalls);
            const isHovered = hoveredIdx === i;
            return (
              <g key={i} className="cursor-pointer" onMouseEnter={() => setHoveredIdx(i)}>
                {/* Vertical hover guide */}
                {isHovered && (
                  <line
                    x1={x}
                    y1={paddingY}
                    x2={x}
                    y2={chartHeight - paddingY}
                    stroke="#000"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                  />
                )}

                <circle
                  cx={x}
                  cy={yTotal}
                  r={isHovered ? 6 : 4}
                  fill="#FFE600"
                  stroke="#000"
                  strokeWidth="2"
                />
                <circle
                  cx={x}
                  cy={getY(d.incomingCalls)}
                  r={isHovered ? 5 : 3.5}
                  fill="#0070F3"
                  stroke="#000"
                  strokeWidth="1.5"
                />
                <circle
                  cx={x}
                  cy={getY(d.outgoingCalls)}
                  r={isHovered ? 5 : 3.5}
                  fill="#7928CA"
                  stroke="#000"
                  strokeWidth="1.5"
                />

                {/* X-axis label */}
                <text
                  x={x}
                  y={chartHeight - 8}
                  textAnchor="middle"
                  className="font-mono text-[10px] fill-gray-800 font-bold"
                >
                  {d.displayDate}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Box */}
        {activePoint && (
          <div className="mt-2 border-2 border-black bg-gray-50 p-2.5 text-xs font-bold shadow-[2px_2px_0px_#000] inline-flex flex-wrap items-center gap-4">
            <span className="font-black text-black">
              {activePoint.displayDate} ({activePoint.date}):
            </span>
            <span className="text-[#B39200]">Total: {activePoint.totalCalls}</span>
            <span className="text-[#0070F3]">Incoming: {activePoint.incomingCalls}</span>
            <span className="text-[#7928CA]">Outgoing: {activePoint.outgoingCalls}</span>
            <span className="text-emerald-700">Connected: {activePoint.totalConnected}</span>
            <span className="text-red-700">Missed: {activePoint.totalMissed}</span>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * GRAPH B: Daily Connected vs Missed Calls (Stacked Bar Chart)
 */
export const GraphConnectedVsMissed: React.FC<GraphProps> = ({ data }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (data.length === 0) return null;

  const maxTotal = Math.max(...data.map((d) => d.totalCalls), 5);
  const chartHeight = 220;
  const paddingX = 40;
  const paddingY = 25;
  const width = Math.max(500, data.length * 65);
  const barWidth = Math.max(16, Math.min(36, (width / data.length) * 0.45));

  const activePoint = hoveredIdx !== null && hoveredIdx < data.length ? data[hoveredIdx] : null;

  return (
    <div className="border-2 border-black bg-white p-4 shadow-[3px_3px_0px_#000]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-3">
        <div>
          <h3 className="text-sm font-black uppercase text-black">
            GRAPH B: Connected vs Missed Breakdown
          </h3>
          <p className="text-xs font-semibold text-gray-600">
            Stacked daily calls by connection category
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 border border-black bg-[#00D26A]" />
            <span>Inc Connected</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 border border-black bg-[#FF334B]" />
            <span>Inc Missed</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 border border-black bg-[#7928CA]" />
            <span>Out Connected</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 border border-black bg-gray-400" />
            <span>Out Missed</span>
          </div>
        </div>
      </div>

      <div className="relative mt-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${chartHeight}`}
          className="h-64 min-w-[500px] w-full"
        >
          {/* Grid lines */}
          {[0, 0.5, 1].map((pct, idx) => {
            const y = chartHeight - paddingY - pct * (chartHeight - 2 * paddingY);
            return (
              <line
                key={idx}
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="#E5E7EB"
                strokeDasharray="3 3"
              />
            );
          })}

          {data.map((d, i) => {
            const x = paddingX + (i / Math.max(1, data.length - 1)) * (width - 2 * paddingX) - barWidth / 2;
            const availableHeight = chartHeight - 2 * paddingY;

            // Stack heights
            const hIncConn = (d.incomingConnected / maxTotal) * availableHeight;
            const hIncMiss = (d.incomingMissed / maxTotal) * availableHeight;
            const hOutConn = (d.outgoingConnected / maxTotal) * availableHeight;
            const hOutMiss = (d.outgoingMissed / maxTotal) * availableHeight;

            let curY = chartHeight - paddingY;
            const yIncConn = curY - hIncConn;
            curY -= hIncConn;
            const yIncMiss = curY - hIncMiss;
            curY -= hIncMiss;
            const yOutConn = curY - hOutConn;
            curY -= hOutConn;
            const yOutMiss = curY - hOutMiss;

            const isHovered = hoveredIdx === i;

            return (
              <g
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIdx(i)}
              >
                {/* Inc Connected */}
                {hIncConn > 0 && (
                  <rect
                    x={x}
                    y={yIncConn}
                    width={barWidth}
                    height={hIncConn}
                    fill="#00D26A"
                    stroke="#000"
                    strokeWidth="1.5"
                  />
                )}
                {/* Inc Missed */}
                {hIncMiss > 0 && (
                  <rect
                    x={x}
                    y={yIncMiss}
                    width={barWidth}
                    height={hIncMiss}
                    fill="#FF334B"
                    stroke="#000"
                    strokeWidth="1.5"
                  />
                )}
                {/* Out Connected */}
                {hOutConn > 0 && (
                  <rect
                    x={x}
                    y={yOutConn}
                    width={barWidth}
                    height={hOutConn}
                    fill="#7928CA"
                    stroke="#000"
                    strokeWidth="1.5"
                  />
                )}
                {/* Out Missed */}
                {hOutMiss > 0 && (
                  <rect
                    x={x}
                    y={yOutMiss}
                    width={barWidth}
                    height={hOutMiss}
                    fill="#9CA3AF"
                    stroke="#000"
                    strokeWidth="1.5"
                  />
                )}

                {/* Total label on top of bar */}
                <text
                  x={x + barWidth / 2}
                  y={yOutMiss - 5}
                  textAnchor="middle"
                  className="font-mono text-[10px] font-bold fill-black"
                >
                  {d.totalCalls}
                </text>

                {/* X axis date */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight - 8}
                  textAnchor="middle"
                  className={`font-mono text-[10px] font-bold ${
                    isHovered ? 'fill-black underline' : 'fill-gray-600'
                  }`}
                >
                  {d.displayDate}
                </text>
              </g>
            );
          })}
        </svg>

        {activePoint && (
          <div className="mt-2 border-2 border-black bg-gray-50 p-2.5 text-xs font-bold shadow-[2px_2px_0px_#000] flex flex-wrap items-center gap-4">
            <span className="font-black text-black">
              {activePoint.displayDate}:
            </span>
            <span className="text-[#00D26A]">Inc Connected: {activePoint.incomingConnected}</span>
            <span className="text-[#FF334B]">Inc Missed: {activePoint.incomingMissed}</span>
            <span className="text-[#7928CA]">Out Connected: {activePoint.outgoingConnected}</span>
            <span className="text-gray-600">Out Missed: {activePoint.outgoingMissed}</span>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * GRAPH C: Day-over-Day Growth Percentage (Trend Chart)
 * Formula: ((Current Day - Previous Day) / Previous Day) * 100
 * Safe handling of 0 denominator with 'N/A'
 */
export const GraphDayOverDayGrowth: React.FC<GraphProps> = ({ data }) => {
  return (
    <div className="border-2 border-black bg-white p-4 shadow-[3px_3px_0px_#000]">
      <div className="border-b border-gray-200 pb-3">
        <h3 className="text-sm font-black uppercase text-black">
          GRAPH C: Day-over-Day Growth %
        </h3>
        <p className="text-xs font-semibold text-gray-600">
          Formula: ((Current Day - Previous Day) / Previous Day) × 100. Zero denominator handled safely as N/A.
        </p>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse border-2 border-black text-xs">
          <thead>
            <tr className="border-b-2 border-black bg-[#FFE600] font-black uppercase text-black">
              <th className="border-r-2 border-black p-2 text-left">Date</th>
              <th className="border-r-2 border-black p-2 text-right">Total Calls</th>
              <th className="border-r-2 border-black p-2 text-right">Total Growth %</th>
              <th className="border-r-2 border-black p-2 text-right">Incoming Growth %</th>
              <th className="border-r-2 border-black p-2 text-right">Connected Growth %</th>
              <th className="p-2 text-right">Callback Growth %</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, idx) => {
              const renderGrowthBadge = (pct: number | null) => {
                if (pct === null) {
                  return <span className="font-mono text-gray-400">N/A</span>;
                }
                const isPos = pct > 0;
                const isNeg = pct < 0;
                return (
                  <span
                    className={`inline-block font-mono font-bold px-1.5 py-0.5 border border-black ${
                      isPos
                        ? 'bg-emerald-100 text-emerald-800'
                        : isNeg
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {isPos ? `+${pct}%` : `${pct}%`}
                  </span>
                );
              };

              return (
                <tr
                  key={idx}
                  className="border-b border-black font-semibold hover:bg-yellow-50 transition-colors"
                >
                  <td className="border-r-2 border-black p-2 font-black font-mono">
                    {d.displayDate} ({d.date})
                  </td>
                  <td className="border-r-2 border-black p-2 text-right font-mono font-bold">
                    {d.totalCalls}
                  </td>
                  <td className="border-r-2 border-black p-2 text-right">
                    {renderGrowthBadge(d.totalGrowthPct)}
                  </td>
                  <td className="border-r-2 border-black p-2 text-right">
                    {renderGrowthBadge(d.incomingGrowthPct)}
                  </td>
                  <td className="border-r-2 border-black p-2 text-right">
                    {renderGrowthBadge(d.connectedGrowthPct)}
                  </td>
                  <td className="p-2 text-right">
                    {renderGrowthBadge(d.callbackGrowthPct)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/**
 * GRAPH D: Daily Answer Rate & Missed Rate % with Target Line
 */
export const GraphDailyAnswerRate: React.FC<GraphProps> = ({ data, targetAnswerRate = 85 }) => {
  if (data.length === 0) return null;

  const chartHeight = 200;
  const paddingX = 40;
  const paddingY = 25;
  const width = Math.max(500, data.length * 60);

  const getX = (i: number) => paddingX + (i / Math.max(1, data.length - 1)) * (width - 2 * paddingX);
  const getY = (rate: number) => chartHeight - paddingY - (rate / 100) * (chartHeight - 2 * paddingY);

  const pathAnswer = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.answerRate)}`)
    .join(' ');

  const pathMissed = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.missedRate)}`)
    .join(' ');

  const targetY = getY(targetAnswerRate);

  return (
    <div className="border-2 border-black bg-white p-4 shadow-[3px_3px_0px_#000]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-3">
        <div>
          <h3 className="text-sm font-black uppercase text-black">
            GRAPH D: Daily Answer Rate vs Target ({targetAnswerRate}%)
          </h3>
          <p className="text-xs font-semibold text-gray-600">
            Incoming call resolution rate with configurable management threshold
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 border border-black bg-[#00D26A]" />
            <span>Answer Rate %</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 border border-black bg-[#FF334B]" />
            <span>Missed Rate %</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 border-t-2 border-dashed border-red-600 inline-block" />
            <span>Target Line ({targetAnswerRate}%)</span>
          </div>
        </div>
      </div>

      <div className="relative mt-4 overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${chartHeight}`} className="h-56 min-w-[500px] w-full">
          {/* Target line */}
          <line
            x1={paddingX}
            y1={targetY}
            x2={width - paddingX}
            y2={targetY}
            stroke="#DC2626"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <text
            x={width - paddingX + 5}
            y={targetY + 4}
            className="font-mono text-[10px] font-black fill-red-700"
          >
            {targetAnswerRate}%
          </text>

          {/* Paths */}
          <path d={pathAnswer} fill="none" stroke="#00D26A" strokeWidth="3" />
          <path d={pathMissed} fill="none" stroke="#FF334B" strokeWidth="2.5" />

          {/* Dots */}
          {data.map((d, i) => {
            const x = getX(i);
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={getY(d.answerRate)}
                  r="4"
                  fill="#00D26A"
                  stroke="#000"
                  strokeWidth="1.5"
                />
                <circle
                  cx={x}
                  cy={getY(d.missedRate)}
                  r="4"
                  fill="#FF334B"
                  stroke="#000"
                  strokeWidth="1.5"
                />
                <text
                  x={x}
                  y={chartHeight - 6}
                  textAnchor="middle"
                  className="font-mono text-[10px] font-bold fill-black"
                >
                  {d.displayDate}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

/**
 * GRAPH F: Hourly Call Distribution (00:00 to 23:00)
 */
export const GraphHourlyDistribution: React.FC<{ data: HourlyDistributionPoint[] }> = ({ data }) => {
  if (data.length === 0) return null;

  const maxCalls = Math.max(...data.map((d) => d.totalCalls), 4);
  const chartHeight = 180;
  const paddingX = 35;
  const paddingY = 20;
  const width = Math.max(600, data.length * 30);
  const barWidth = 14;

  return (
    <div className="border-2 border-black bg-white p-4 shadow-[3px_3px_0px_#000]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-3">
        <div>
          <h3 className="text-sm font-black uppercase text-black">
            GRAPH F: Hourly Call Volume & Missed Distribution
          </h3>
          <p className="text-xs font-semibold text-gray-600">
            Identifies hospital peak call hours and high missed-call intervals (00:00 - 23:00 IST)
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-bold">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 border border-black bg-[#FFE600]" />
            <span>Connected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 border border-black bg-[#FF334B]" />
            <span>Missed</span>
          </div>
        </div>
      </div>

      <div className="relative mt-4 overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${chartHeight}`} className="h-48 min-w-[600px] w-full">
          {data.map((d, i) => {
            const x = paddingX + i * ((width - 2 * paddingX) / 24);
            const availableHeight = chartHeight - 2 * paddingY;
            const hConn = ((d.totalCalls - d.incomingMissed) / maxCalls) * availableHeight;
            const hMiss = (d.incomingMissed / maxCalls) * availableHeight;

            const yConn = chartHeight - paddingY - hConn;
            const yMiss = yConn - hMiss;

            return (
              <g key={i}>
                {hConn > 0 && (
                  <rect
                    x={x}
                    y={yConn}
                    width={barWidth}
                    height={hConn}
                    fill="#FFE600"
                    stroke="#000"
                    strokeWidth="1.2"
                  />
                )}
                {hMiss > 0 && (
                  <rect
                    x={x}
                    y={yMiss}
                    width={barWidth}
                    height={hMiss}
                    fill="#FF334B"
                    stroke="#000"
                    strokeWidth="1.2"
                  />
                )}

                {/* Hour label */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight - 6}
                  textAnchor="middle"
                  className="font-mono text-[9px] font-bold fill-gray-700"
                >
                  {d.hour}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
