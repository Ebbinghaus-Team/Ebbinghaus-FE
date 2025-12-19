export type WeeklyDay = {
  day: string;
  date: string;
  completed: number;
  total: number;
  progress: number;
};

function getProgressBarColor(progress: number) {
  if (progress === 100) return 'bg-green-500';
  if (progress > 50) return 'bg-blue-500';
  return 'bg-blue-500';
}

function calculateWeeklyCompletion(data: WeeklyDay[]) {
  const totalTasks = data.reduce((sum, d) => sum + d.total, 0);
  const completedTasks = data.reduce((sum, d) => sum + d.completed, 0);
  return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
}

type WeeklyReviewStatusProps = {
  weeklyData: WeeklyDay[];
  title?: string;
};

export default function WeeklyReviewStatus({
  weeklyData,
  title = '주간 복습 현황',
}: WeeklyReviewStatusProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">{title}</h2>
      <div className="space-y-6">
        {weeklyData.map((day) => (
          <div key={day.day}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">{day.day}</span>
                <span className="text-sm text-gray-500">{day.date}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {day.completed}/{day.total}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getProgressBarColor(day.progress)}`}
                style={{ width: `${day.progress}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">주간 달성률</span>
          <span className="text-2xl font-bold text-blue-600">
            {calculateWeeklyCompletion(weeklyData)}%
          </span>
        </div>
      </div>
    </div>
  );
}
