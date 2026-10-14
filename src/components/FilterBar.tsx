/**
 * Global Filter Bar with date presets, department/staff pickers, and search
 */

import React from 'react';
import { Calendar, Filter, RotateCcw, Search } from 'lucide-react';
import { DateFilterPreset, FilterState } from '../types/callAnalytics';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  onResetFilters: () => void;
  departments: string[];
  staffMembers: string[];
  dateRangeLabel: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  departments,
  staffMembers,
  dateRangeLabel,
}) => {
  const datePresets: { id: DateFilterPreset; label: string }[] = [
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'last7days', label: 'Last 7 Days' },
    { id: 'last30days', label: 'Last 30 Days' },
    { id: 'last90days', label: 'Last 90 Days' },
    { id: 'thisMonth', label: 'This Month' },
    { id: 'previousMonth', label: 'Prev Month' },
    { id: 'all', label: 'All Time' },
    { id: 'custom', label: 'Custom' },
  ];

  return (
    <div className="border-b-3 border-black bg-white p-3 md:p-4">
      {/* Date Presets Row */}
      <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          <div className="mr-1 flex items-center gap-1 text-xs font-black text-black">
            <Calendar className="h-3.5 w-3.5 text-black" />
            <span className="uppercase">Period:</span>
          </div>
          {datePresets.map((preset) => {
            const isSelected = filters.datePreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => onFilterChange({ datePreset: preset.id })}
                className={`border-2 border-black px-2.5 py-1 text-xs font-black transition-all ${
                  isSelected
                    ? 'bg-[#FFE600] text-black shadow-[2px_2px_0px_#000]'
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>

        {/* Selected Period indicator */}
        <div className="text-right text-xs font-bold text-gray-600">
          Viewing: <span className="font-black text-black">{dateRangeLabel}</span>
        </div>
      </div>

      {/* Custom Date Range Picker (shown when custom is selected) */}
      {filters.datePreset === 'custom' && (
        <div className="mt-2.5 flex flex-wrap items-center gap-2 border-2 border-black bg-[#FFE600]/20 p-2 text-xs font-bold">
          <span>Custom Start:</span>
          <input
            type="date"
            value={filters.customStartDate || ''}
            onChange={(e) => onFilterChange({ customStartDate: e.target.value })}
            className="border-2 border-black bg-white px-2 py-1 font-mono text-xs font-bold"
          />
          <span>Custom End:</span>
          <input
            type="date"
            value={filters.customEndDate || ''}
            onChange={(e) => onFilterChange({ customEndDate: e.target.value })}
            className="border-2 border-black bg-white px-2 py-1 font-mono text-xs font-bold"
          />
        </div>
      )}

      {/* Secondary Filters: Department, Staff, Event, Status, Search */}
      <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-gray-200">
        <div className="flex items-center gap-1 text-xs font-black text-gray-700">
          <Filter className="h-3.5 w-3.5 text-black" />
          <span className="uppercase">Filters:</span>
        </div>

        {/* Department */}
        <select
          value={filters.department}
          onChange={(e) => onFilterChange({ department: e.target.value })}
          className="border-2 border-black bg-white px-2 py-1 text-xs font-bold text-black"
        >
          <option value="all">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        {/* Staff */}
        <select
          value={filters.staff}
          onChange={(e) => onFilterChange({ staff: e.target.value })}
          className="border-2 border-black bg-white px-2 py-1 text-xs font-bold text-black max-w-[160px] truncate"
        >
          <option value="all">All Staff</option>
          {staffMembers.map((staff) => (
            <option key={staff} value={staff}>
              {staff}
            </option>
          ))}
        </select>

        {/* Event */}
        <select
          value={filters.event}
          onChange={(e) => onFilterChange({ event: e.target.value as any })}
          className="border-2 border-black bg-white px-2 py-1 text-xs font-bold text-black"
        >
          <option value="all">All Events</option>
          <option value="Incoming">Incoming Calls</option>
          <option value="Outgoing">Outgoing Calls</option>
        </select>

        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ status: e.target.value as any })}
          className="border-2 border-black bg-white px-2 py-1 text-xs font-bold text-black"
        >
          <option value="all">All Statuses</option>
          <option value="Connected">Connected Only</option>
          <option value="Missed">Missed Only</option>
        </select>

        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
          <input
            type="text"
            placeholder="Search UID, phone, staff, note..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full border-2 border-black bg-white py-1 pl-8 pr-3 text-xs font-bold text-black placeholder:text-gray-400 focus:outline-none focus:bg-[#FFE600]/10"
          />
        </div>

        {/* Reset */}
        <button
          onClick={onResetFilters}
          className="flex items-center gap-1 border-2 border-black bg-gray-100 px-2.5 py-1 text-xs font-black text-black hover:bg-gray-200 active:translate-x-0.5 active:translate-y-0.5"
          title="Reset all filters"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};
