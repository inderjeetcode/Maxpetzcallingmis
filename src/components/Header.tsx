/**
 * Header component in Brutalist visual style
 */

import React from 'react';
import { RefreshCw, Clock, ShieldCheck, ShieldAlert, Eye, EyeOff } from 'lucide-react';
import { DataSourceSettings } from '../types/callAnalytics';

interface HeaderProps {
  settings: DataSourceSettings;
  isSyncing: boolean;
  onRefresh: () => void;
  nextRefreshInSeconds: number;
  maskPhones: boolean;
  onToggleMaskPhones: () => void;
  onOpenTestModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  isSyncing,
  onRefresh,
  nextRefreshInSeconds,
  maskPhones,
  onToggleMaskPhones,
  onOpenTestModal,
}) => {
  const formatTimeAgo = (isoString: string | null) => {
    if (!isoString) return 'Not synced yet';
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffMins = Math.floor(diffMs / (60 * 1000));
    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 min ago';
    if (diffMins < 60) return `${diffMins} mins ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours} hr${diffHours > 1 ? 's' : ''} ago`;
  };

  const minutesRemaining = Math.floor(nextRefreshInSeconds / 60);
  const secondsRemaining = nextRefreshInSeconds % 60;
  const timeString = `${minutesRemaining}:${secondsRemaining.toString().padStart(2, '0')}`;

  return (
    <header className="border-b-3 border-black bg-white px-4 py-3 md:px-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Brand & Hospital Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center border-2 border-black bg-[#FFE600] font-black text-black shadow-[2px_2px_0px_#000]">
            <span className="text-xl tracking-tighter">MPZ</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-black md:text-xl">
                MAX PETZ HOSPITALS
              </h1>
              <span className="border-2 border-black bg-black px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
                LIVE ANALYTICS
              </span>
            </div>
            <p className="text-xs font-semibold text-gray-700">
              Operations & Call Recovery Intelligence · Asia/Kolkata (IST)
            </p>
          </div>
        </div>

        {/* Status Badges & Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Connection Status */}
          <div
            className={`flex items-center gap-1.5 border-2 border-black px-2.5 py-1 text-xs font-bold ${
              settings.connectionStatus === 'Connected'
                ? 'bg-[#00D26A] text-black'
                : settings.connectionStatus === 'Connecting'
                ? 'bg-[#0070F3] text-white'
                : settings.connectionStatus === 'Offline / Cached Data'
                ? 'bg-[#FFE600] text-black'
                : settings.connectionStatus === 'Configuration Required'
                ? 'bg-amber-100 text-black'
                : 'bg-[#FF334B] text-white'
            }`}
          >
            {settings.connectionStatus === 'Connected' ? (
              <ShieldCheck className="h-4 w-4" />
            ) : (
              <ShieldAlert className="h-4 w-4" />
            )}
            <span className="uppercase">
              {settings.connectionStatus === 'Connected'
                ? `LIVE GOOGLE SHEET (${settings.authMethod || 'AUTH'})`
                : settings.connectionStatus}
            </span>
            <span className="ml-1 text-[11px] opacity-80">
              ({settings.recordCount} records)
            </span>
          </div>

          {/* Last sync & Auto-refresh countdown */}
          <div className="flex items-center gap-1.5 border-2 border-black bg-gray-100 px-2.5 py-1 text-xs font-bold text-black">
            <Clock className="h-3.5 w-3.5 text-gray-600" />
            <span>Sync: {formatTimeAgo(settings.lastSyncTime)}</span>
            <span className="text-gray-400">|</span>
            <span className="font-mono text-[11px] text-gray-600">
              Auto: {timeString}
            </span>
          </div>

          {/* Privacy Toggle (Masking) */}
          <button
            onClick={onToggleMaskPhones}
            title={maskPhones ? 'Reveal full phone numbers' : 'Mask phone numbers'}
            className="flex items-center gap-1.5 border-2 border-black bg-white px-2.5 py-1 text-xs font-bold text-black transition-all hover:bg-gray-100 active:translate-x-0.5 active:translate-y-0.5"
          >
            {maskPhones ? (
              <>
                <EyeOff className="h-3.5 w-3.5 text-red-600" />
                <span>Masked (Default)</span>
              </>
            ) : (
              <>
                <Eye className="h-3.5 w-3.5 text-emerald-600" />
                <span>Authorized (Plain)</span>
              </>
            )}
          </button>

          {/* Automated System Tests Button */}
          <button
            onClick={onOpenTestModal}
            className="flex items-center gap-1.5 border-2 border-black bg-black px-2.5 py-1 text-xs font-bold text-white transition-all hover:bg-neutral-800 active:translate-x-0.5 active:translate-y-0.5 shadow-[2px_2px_0px_#FFE600]"
          >
            <span>Run Test Suite</span>
          </button>

          {/* Refresh Data Button */}
          <button
            onClick={onRefresh}
            disabled={isSyncing}
            className="flex items-center gap-1.5 border-2 border-black bg-[#FFE600] px-3 py-1 text-xs font-black uppercase text-black shadow-[2px_2px_0px_#000] transition-all hover:bg-yellow-300 active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Refresh Data'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
