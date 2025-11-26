import React from 'react';

type PeriodFilterProps = {
  selected: string;
  onChange: (period: string) => void;
  options?: string[];
};

export default function PeriodFilter({ selected, onChange, options = ['이번 주', '이번 달', '전체'] }: PeriodFilterProps) {
  return (
    <div className="mb-6">
      <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white">
        {options.map((period) => (
          <button
            key={period}
            onClick={() => onChange(period)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
              selected === period ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  );
}


