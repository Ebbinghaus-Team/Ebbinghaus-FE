import React, { useState } from 'react';

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('이번 주');

  const weeklyData = [
    { day: '월요일', date: '1/13', completed: 4, total: 5, progress: 80 },
    { day: '화요일', date: '1/14', completed: 5, total: 5, progress: 100 },
    { day: '수요일', date: '1/15', completed: 3, total: 4, progress: 75 },
    { day: '목요일', date: '1/16', completed: 2, total: 3, progress: 67 },
    { day: '금요일', date: '1/17', completed: 0, total: 2, progress: 0 },
    { day: '토요일', date: '1/18', completed: 0, total: 1, progress: 0 },
    { day: '일요일', date: '1/19', completed: 0, total: 0, progress: 0 }
  ];

  const recentActivities = [
    {
      icon: 'ri-checkbox-circle-line',
      iconColor: 'text-green-500',
      title: '작업기억의 용량 한계 문제 풀이 완료',
      category: '인지심리학',
      time: '2시간 전'
    },
    {
      icon: 'ri-add-circle-line',
      iconColor: 'text-blue-500',
      title: '피아제 인지발달 단계 문제 생성',
      category: '발달심리학',
      time: '5시간 전'
    },
    {
      icon: 'ri-refresh-line',
      iconColor: 'text-purple-500',
      title: '스키마 개념 복습 완료',
      category: '인지심리학',
      time: '1일 전'
    },
    {
      icon: 'ri-team-line',
      iconColor: 'text-orange-500',
      title: '심리학 스터디 그룹 문제 풀이',
      category: '그룹 스터디',
      time: '1일 전'
    },
    {
      icon: 'ri-checkbox-circle-line',
      iconColor: 'text-green-500',
      title: '교육학 이론 문제 풀이 완료',
      category: '교육학',
      time: '2일 전'
    }
  ];

  const getProgressBarColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500';
    if (progress > 50) return 'bg-blue-500';
    return 'bg-blue-500';
  };

  const calculateWeeklyCompletion = () => {
    const totalTasks = weeklyData.reduce((sum, day) => sum + day.total, 0);
    const completedTasks = weeklyData.reduce((sum, day) => sum + day.completed, 0);
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">대시보드</h1>
          <p className="text-gray-600">학습 현황을 한눈에 확인하세요</p>
        </div>

        {/* Period Filter */}
        <div className="mb-6">
          <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-white">
            {['이번 주', '이번 달', '전체'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedPeriod === period
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Review Status */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">주간 복습 현황</h2>
              
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
                    {calculateWeeklyCompletion()}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">최근 활동</h2>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center ${activity.iconColor}`}>
                      <i className={`${activity.icon} text-lg`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.title}
                      </p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
