type GroupStatsProps = {
  totalQuestionSets: number;
  unsolvedQuestionSets: number;
  solvedQuestionSets: number;
};

export default function GroupStats({
  totalQuestionSets,
  unsolvedQuestionSets,
  solvedQuestionSets,
}: GroupStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
        <div className="text-2xl font-bold text-green-600 mb-1">{totalQuestionSets}</div>
        <div className="text-sm text-gray-600">총 문제셋</div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
        <div className="text-2xl font-bold text-orange-600 mb-1">{unsolvedQuestionSets}</div>
        <div className="text-sm text-gray-600">안 푼 문제셋</div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
        <div className="text-2xl font-bold text-purple-600 mb-1">{solvedQuestionSets}</div>
        <div className="text-sm text-gray-600">푼 문제셋</div>
      </div>
    </div>
  );
}
