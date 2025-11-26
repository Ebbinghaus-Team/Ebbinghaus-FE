type SolveOptionsProps = {
  options: string[];
  selectedAnswer: number | null;
  onSelect: (index: number) => void;
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitDisabled: boolean;
};

export default function SolveOptions({
  options,
  selectedAnswer,
  onSelect,
  onCancel,
  onSubmit,
  isSubmitDisabled,
}: SolveOptionsProps) {
  return (
    <>
      <div className="mb-6">
        <h3 className="text-md font-medium text-gray-900 mb-4">답안 선택</h3>
        <div className="space-y-3">
          {options.map((option, index) => (
            <label
              key={index}
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <input
                type="radio"
                value={index}
                checked={selectedAnswer === index}
                onChange={() => onSelect(index)}
                className="text-blue-600"
              />
              <span className="text-gray-900">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onCancel}
          className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 px-4 py-2 text-base"
        >
          취소
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitDisabled}
          className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 px-4 py-2 text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          답안 제출
        </button>
      </div>
    </>
  );
}
