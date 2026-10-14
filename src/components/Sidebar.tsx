/**
 * Sidebar Navigation component in Brutalist visual style
 */

import React from 'react';
import {
  LayoutDashboard,
  BarChart3,
  TrendingUp,
  PhoneMissed,
  PhoneForwarded,
  Building2,
  Table,
  Settings,
} from 'lucide-react';

export type DashboardView =
  | 'overview'
  | 'call_analytics'
  | 'daily_growth'
  | 'missed_calls'
  | 'callback_tracking'
  | 'department_performance'
  | 'call_records'
  | 'data_settings';

interface SidebarProps {
  currentView: DashboardView;
  onViewChange: (view: DashboardView) => void;
  missedCallsCount: number;
  pendingCallbacksCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  missedCallsCount,
  pendingCallbacksCount,
}) => {
  const navItems: {
    id: DashboardView;
    label: string;
    icon: React.ReactNode;
    badge?: number;
    badgeColor?: string;
  }[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      id: 'call_analytics',
      label: 'Call Analytics',
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      id: 'daily_growth',
      label: 'Daily Growth',
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      id: 'missed_calls',
      label: 'Missed Calls',
      icon: <PhoneMissed className="h-4 w-4 text-red-600" />,
      badge: missedCallsCount,
      badgeColor: 'bg-[#FF334B] text-white',
    },
    {
      id: 'callback_tracking',
      label: 'Callback Tracking',
      icon: <PhoneForwarded className="h-4 w-4 text-amber-600" />,
      badge: pendingCallbacksCount,
      badgeColor: 'bg-[#FFE600] text-black',
    },
    {
      id: 'department_performance',
      label: 'Department Performance',
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      id: 'call_records',
      label: 'Call Records',
      icon: <Table className="h-4 w-4" />,
    },
    {
      id: 'data_settings',
      label: 'Data Source Settings',
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  return (
    <aside className="w-full shrink-0 border-b-3 border-black bg-white md:w-64 md:border-b-0 md:border-r-3 md:min-h-[calc(100vh-65px)]">
      <div className="p-3 md:p-4">
        <div className="mb-2 hidden md:block">
          <p className="text-[11px] font-black uppercase tracking-wider text-gray-500">
            NAVIGATION
          </p>
        </div>

        <nav className="flex flex-row flex-wrap gap-1.5 md:flex-col md:gap-2">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex items-center justify-between border-2 border-black px-3 py-2 text-left text-xs font-black transition-all ${
                  isActive
                    ? 'bg-[#FFE600] text-black shadow-[3px_3px_0px_#000] translate-x-0.5'
                    : 'bg-white text-gray-900 hover:bg-gray-100 hover:translate-x-0.5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`ml-2 border border-black px-1.5 py-0.2 text-[10px] font-black ${
                      item.badgeColor || 'bg-black text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Brutalist Hospital Info Block */}
        <div className="mt-6 hidden border-2 border-black bg-gray-50 p-3 md:block shadow-[2px_2px_0px_#000]">
          <div className="text-[11px] font-black text-black">MAX PETZ HELPLINE</div>
          <div className="text-xs font-mono font-bold text-gray-700">8448449955</div>
          <div className="mt-2 text-[10px] font-bold text-gray-500">
            Source: Google Sheets
            <br />
            Tab: Main data
          </div>
        </div>
      </div>
    </aside>
  );
};
