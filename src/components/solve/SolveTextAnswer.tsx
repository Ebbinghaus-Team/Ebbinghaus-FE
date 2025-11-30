type SolveTextAnswerProps = {
  value: string;
  onChange: (value: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitDisabled: boolean;
};

export default function SolveTextAnswer({
  value,
  onChange,
  onCancel,
  onSubmit,
  isSubmitDisabled,
}: SolveTextAnswerProps) {
  return (
    <div className="space-y-6">
      <div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="답안을 입력하세요"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-gray-300 px-4 py-2 text-base"
        >
          돌아가기
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitDisabled}
          className={`inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer px-4 py-2 text-base focus:ring-2 focus:ring-blue-500 ${
            isSubmitDisabled
              ? 'bg-blue-400 text-white cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          제출하기
        </button>
      </div>
    </div>
  );
}
