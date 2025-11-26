import React from 'react';
import { Link } from 'react-router-dom';

export type StudyRoom = {
  id: number;
  title: string;
  description: string;
  subject: string;
  progress: number;
  totalQuestions: number;
  completedQuestions: number;
};

type StudyRoomCardProps = {
  room: StudyRoom;
};

function getProgressColor(progress: number) {
  if (progress >= 80) return 'bg-green-500';
  if (progress >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
}

export default function StudyRoomCard({ room }: StudyRoomCardProps) {
  return (
    <Link to={`/personal-study/${room.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {room.subject}
            </span>
            <span className="text-sm text-gray-500">{room.progress}%</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{room.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">{room.description}</p>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>진행률</span>
            <span>
              {room.completedQuestions}/{room.totalQuestions}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className={`h-2 rounded-full ${getProgressColor(room.progress)}`} style={{ width: `${room.progress}%` }}></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <i className="ri-question-line mr-2"></i>
            <span>문제 {room.totalQuestions}개</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <i className="ri-check-line mr-2"></i>
            <span>완료 {room.completedQuestions}개</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
          <span className="text-sm text-blue-600 font-medium">학습 계속하기 →</span>
          <i className="ri-arrow-right-line text-gray-400"></i>
        </div>
      </div>
    </Link>
  );
}


