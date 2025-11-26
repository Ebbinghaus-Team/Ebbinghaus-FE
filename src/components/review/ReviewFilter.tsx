type ReviewFilterProps = {
  active: string;
  onChange: (filter: string) => void;
  options?: string[];
};

export default function ReviewFilter({ active, onChange, options = ['전체', '1차관문', '2차관문'] }: ReviewFilterProps) {
  return (
    <div className="mb-6">
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {options.map((filter) => (
          <button
            key={filter}
            onClick={() => onChange(filter)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
              active === filter ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}


