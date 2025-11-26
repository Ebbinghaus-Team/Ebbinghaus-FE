import React from 'react';

type GroupsHeaderProps = {
  onClickJoin: () => void;
  onClickCreate: () => void;
};

export default function GroupsHeader({ onClickJoin, onClickCreate }: GroupsHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">그룹 스터디</h1>
        <p className="text-gray-600">스터디원들과 함께 문제를 공유하고 학습하세요</p>
      </div>
      <div className="flex space-x-3">
        <button
          onClick={onClickJoin}
          className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 px-4 py-2 text-base"
        >
          <i className="ri-key-line mr-2"></i>
          그룹 참여
        </button>
        <button
          onClick={onClickCreate}
          className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 px-4 py-2 text-base"
        >
          <i className="ri-team-line mr-2"></i>
          그룹 만들기
        </button>
      </div>
    </div>
  );
}


