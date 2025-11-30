type SolveResultProps = {
  isCorrect: boolean;
  correctAnswerText: string;
  explanation: string;
  aiFeedback: string | null;
  currentGate: string | null;
  nextReviewDate: string | null;
  onConfirm: () => void;
};

export default function SolveResult({
  isCorrect,
  correctAnswerText,
  explanation,
  aiFeedback,
  currentGate,
  nextReviewDate,
  onConfirm,
}: SolveResultProps) {
  const format = (value: string | null) => {
    if (!value) return '-';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };
  const formatGate = (gate: string | null) => {
    if (!gate) return null;
    if (gate === 'GATE_1') return '1차 관문';
    if (gate === 'GATE_2') return '2차 관문';
    if (gate === 'GRADUATED') return '완료';
    return gate;
  };
  const gateLabel = formatGate(currentGate);
  const nextDateLabel = nextReviewDate ? format(nextReviewDate) : null;
  return (
    <>
      <div className="text-center mb-6">
        <div
          className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            isCorrect ? 'bg-green-100' : 'bg-red-100'
          }`}
        >
          <i
            className={`text-2xl ${
              isCorrect ? 'ri-check-line text-green-600' : 'ri-close-line text-red-600'
            }`}
          ></i>
        </div>
        <h2 className={`text-2xl font-bold mb-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
          {isCorrect ? '정답입니다!' : '틀렸습니다'}
        </h2>
        {correctAnswerText && <p className="text-gray-600">정답: {correctAnswerText}</p>}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">해설</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-700">{explanation}</p>
          {aiFeedback && <p className="text-gray-700 mt-2">AI 피드백: {aiFeedback}</p>}
          {(gateLabel || nextDateLabel) && (
            <div className="text-xs text-gray-500 mt-2">
              {gateLabel && <span>현재 관문: {gateLabel}</span>}
              {gateLabel && nextDateLabel && <span> / </span>}
              {nextDateLabel && <span>다음 복습일: {nextDateLabel}</span>}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onConfirm}
          className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 px-4 py-2 text-base"
        >
          확인
        </button>
      </div>
    </>
  );
}
