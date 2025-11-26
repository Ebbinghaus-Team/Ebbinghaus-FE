import React, { useState } from 'react';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import PeriodFilter from '../../components/dashboard/PeriodFilter';
import WeeklyReviewStatus, { type WeeklyDay } from '../../components/dashboard/WeeklyReviewStatus';
import RecentActivities, { type RecentActivity } from '../../components/dashboard/RecentActivities';

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('이번 주');

  const weeklyData: WeeklyDay[] = [
    { day: '월요일', date: '1/13', completed: 4, total: 5, progress: 80 },
    { day: '화요일', date: '1/14', completed: 5, total: 5, progress: 100 },
    { day: '수요일', date: '1/15', completed: 3, total: 4, progress: 75 },
    { day: '목요일', date: '1/16', completed: 2, total: 3, progress: 67 },
    { day: '금요일', date: '1/17', completed: 0, total: 2, progress: 0 },
    { day: '토요일', date: '1/18', completed: 0, total: 1, progress: 0 },
    { day: '일요일', date: '1/19', completed: 0, total: 0, progress: 0 },
  ];

  const recentActivities: RecentActivity[] = [
    {
      icon: 'ri-checkbox-circle-line',
      iconColor: 'text-green-500',
      title: '작업기억의 용량 한계 문제 풀이 완료',
      category: '인지심리학',
      time: '2시간 전',
    },
    {
      icon: 'ri-add-circle-line',
      iconColor: 'text-blue-500',
      title: '피아제 인지발달 단계 문제 생성',
      category: '발달심리학',
      time: '5시간 전',
    },
    {
      icon: 'ri-refresh-line',
      iconColor: 'text-purple-500',
      title: '스키마 개념 복습 완료',
      category: '인지심리학',
      time: '1일 전',
    },
    {
      icon: 'ri-team-line',
      iconColor: 'text-orange-500',
      title: '심리학 스터디 그룹 문제 풀이',
      category: '그룹 스터디',
      time: '1일 전',
    },
    {
      icon: 'ri-checkbox-circle-line',
      iconColor: 'text-green-500',
      title: '교육학 이론 문제 풀이 완료',
      category: '교육학',
      time: '2일 전',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader />

        <PeriodFilter selected={selectedPeriod} onChange={setSelectedPeriod} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Review Status */}
          <div className="lg:col-span-2">
            <WeeklyReviewStatus weeklyData={weeklyData} />
          </div>

          {/* Recent Activities */}
          <div className="lg:col-span-1">
            <RecentActivities activities={recentActivities} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
