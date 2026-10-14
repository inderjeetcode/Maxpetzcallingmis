/**
 * Section 5: Brutalist KPI Card Component with Delta Comparison & Click-to-filter
 */

import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export type CardColorTheme =
  | 'yellow'
  | 'green'
  | 'red'
  | 'blue'
  | 'purple'
  | 'neutral';

interface KPICardProps {
  title: string;
  value: string | number;
  delta?: number | null;
  deltaSuffix?: string;
  deltaInvert?: boolean; // if true, negative delta is good (e.g. Missed calls)
  colorTheme?: CardColorTheme;
  subtext?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  delta,
  deltaSuffix = '%',
  deltaInvert = false,
  colorTheme = 'neutral',
  subtext,
  onClick,
  isActive = false,
}) => {
  // Theme color styling
  const themeStyles: Record<
    CardColorTheme,
    { border: string; accent: string; bg: string; text: string }
  > = {
    yellow: {
      border: 'border-black',
      accent: 'bg-[#FFE600]',
      bg: 'bg-white',
      text: 'text-black',
    },
    green: {
      border: 'border-black',
      accent: 'bg-[#00D26A]',
      bg: 'bg-white',
      text: 'text-black',
    },
    red: {
      border: 'border-black',
      accent: 'bg-[#FF334B]',
      bg: 'bg-white',
      text: 'text-black',
    },
    blue: {
      border: 'border-black',
      accent: 'bg-[#0070F3]',
      bg: 'bg-white',
      text: 'text-black',
    },
    purple: {
      border: 'border-black',
      accent: 'bg-[#7928CA]',
      bg: 'bg-white',
      text: 'text-black',
    },
    neutral: {
      border: 'border-black',
      accent: 'bg-black',
      bg: 'bg-white',
      text: 'text-black',
    },
  };

  const currentTheme = themeStyles[colorTheme];

  // Determine if delta is positive/good
  const isPositive = delta !== undefined && delta !== null && delta > 0;
  const isNegative = delta !== undefined && delta !== null && delta < 0;
  const isNeutral = delta === 0 || delta === null || delta === undefined;

  let deltaColor = 'text-gray-600 bg-gray-100';
  if (isPositive) {
    deltaColor = deltaInvert ? 'text-red-700 bg-red-100' : 'text-emerald-700 bg-emerald-100';
  } else if (isNegative) {
    deltaColor = deltaInvert ? 'text-emerald-700 bg-emerald-100' : 'text-red-700 bg-red-100';
  }

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`group relative flex flex-col justify-between border-2 border-black p-3.5 transition-all ${
        currentTheme.bg
      } ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#000]' : ''
      } ${isActive ? 'ring-3 ring-black shadow-[4px_4px_0px_#FFE600]' : 'shadow-[2px_2px_0px_#000]'}`}
    >
      {/* Top Header & Color indicator line */}
      <div>
        <div className="flex items-center justify-between gap-1">
          <span className="text-[11px] font-black uppercase tracking-wider text-gray-700 line-clamp-1">
            {title}
          </span>
          <div className={`h-2.5 w-2.5 border border-black ${currentTheme.accent}`} />
        </div>

        {/* Primary Value */}
        <div className="mt-2 flex items-baseline justify-between">
          <span className="font-mono text-2xl font-black tracking-tight text-black md:text-3xl">
            {value}
          </span>
        </div>
      </div>

      {/* Comparison Delta vs Previous Period */}
      <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-2 text-xs">
        <div className="flex items-center gap-1 font-mono font-bold">
          {delta !== null && delta !== undefined ? (
            <span className={`flex items-center px-1.5 py-0.5 text-[11px] border border-black ${deltaColor}`}>
              {isPositive ? (
                <ArrowUpRight className="mr-0.5 h-3 w-3 inline" />
              ) : isNegative ? (
                <ArrowDownRight className="mr-0.5 h-3 w-3 inline" />
              ) : (
                <Minus className="mr-0.5 h-3 w-3 inline" />
              )}
              {isPositive ? `+${delta}` : delta}
              {deltaSuffix}
            </span>
          ) : (
            <span className="text-[11px] text-gray-500 font-sans">N/A</span>
          )}
          <span className="text-[10px] text-gray-500 font-sans ml-1">vs prev</span>
        </div>

        {subtext && (
          <span className="text-[10px] font-bold text-gray-600 line-clamp-1">
            {subtext}
          </span>
        )}
      </div>
    </div>
  );
};
