type EssaySectionProps = {
  keywords: string;
  setKeywords: (value: string) => void;
  modelAnswer: string;
  setModelAnswer: (value: string) => void;
};

export default function EssaySection({
  keywords,
  setKeywords,
  modelAnswer,
  setModelAnswer,
}: EssaySectionProps) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          핵심 키워드 (AI 채점용) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="쉼표로 구분하여 입력 (예: 광합성, 엽록소, 이산화탄소)"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          AI가 이 키워드를 기준으로 답안을 채점합니다
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          모범 답안 <span className="text-red-500">*</span>
        </label>
        <textarea
          value={modelAnswer}
          onChange={(e) => setModelAnswer(e.target.value)}
          placeholder="모범 답안을 입력하세요"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </>
  );
}
