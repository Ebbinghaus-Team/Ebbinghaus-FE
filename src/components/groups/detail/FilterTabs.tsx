import React from 'react';

type FilterTabsProps = {
  filters: string[];
  activeFilter: string;
  onChange: (filter: string) => void;
  getFilterCount: (filter: string) => number;
};

export default function FilterTabs({
  filters,
  activeFilter,
  onChange,
  getFilterCount,
}: FilterTabsProps) {
  return (
    <div className="mt-6 mb-6">
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
              activeFilter === filter
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {filter} ({getFilterCount(filter)})
          </button>
        ))}
      </div>
    </div>
  );
}
