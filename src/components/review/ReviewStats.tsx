type ReviewStatsProps = {
  total: number;
  completed: number;
  remaining: number;
  progress: number;
};

export default function ReviewStats({ total, completed, remaining, progress }: ReviewStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
        <div className="text-3xl font-bold text-blue-600 mb-2">{total}</div>
        <div className="text-sm text-gray-600">총 문제</div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
        <div className="text-3xl font-bold text-green-600 mb-2">{completed}</div>
        <div className="text-sm text-gray-600">완료</div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
        <div className="text-3xl font-bold text-orange-600 mb-2">{remaining}</div>
        <div className="text-sm text-gray-600">남은 문제</div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
        <div className="text-lg font-semibold text-gray-700 mb-2">{progress}%</div>
        <div className="text-sm text-gray-600">진행률</div>
      </div>
    </div>
  );
}


