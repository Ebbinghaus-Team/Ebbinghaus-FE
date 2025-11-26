import React from 'react';

type DashboardStatsProps = {
  totalRooms: number;
  totalQuestions: number;
  totalCompleted: number;
  averageProgress: number;
};

export default function DashboardStats({
  totalRooms,
  totalQuestions,
  totalCompleted,
  averageProgress,
}: DashboardStatsProps) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">학습 현황</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">{totalRooms}</div>
          <div className="text-sm text-gray-600">총 공부방</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">{totalQuestions}</div>
          <div className="text-sm text-gray-600">총 문제</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-orange-600 mb-1">{totalCompleted}</div>
          <div className="text-sm text-gray-600">완료한 문제</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">{averageProgress}%</div>
          <div className="text-sm text-gray-600">평균 진행률</div>
        </div>
      </div>
    </div>
  );
}


