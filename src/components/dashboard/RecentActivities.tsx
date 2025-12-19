export type RecentActivity = {
  icon: string;
  iconColor: string;
  title: string;
  category: string;
  time: string;
};

type RecentActivitiesProps = {
  activities: RecentActivity[];
  title?: string;
};

export default function RecentActivities({
  activities,
  title = '최근 활동',
}: RecentActivitiesProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">{title}</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div
              className={`flex-shrink-0 w-8 h-8 flex items-center justify-center ${activity.iconColor}`}
            >
              <i className={`${activity.icon} text-lg`}></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="inline-flex items-center font-medium rounded-full border bg-gray-100 text-gray-800 border-gray-200 px-2 py-1 text-xs">
                  {activity.category}
                </span>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
