import React from 'react';
import { Link } from 'react-router-dom';

export type GroupCardData = {
  id: number;
  name: string;
  description: string;
  members: number;
  questions: number;
  code: string;
};

type GroupCardProps = {
  group: GroupCardData;
  copiedCode: string;
  onCopyCode: (code: string) => void;
};

export default function GroupCard({ group, copiedCode, onCopyCode }: GroupCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow h-full">
      <Link to={`/groups/${group.id}`}>
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
            {group.name}
          </h3>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{group.description}</p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <i className="ri-team-line mr-2"></i>
            <span>멤버 {group.members}명</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <i className="ri-question-line mr-2"></i>
            <span>문제 {group.questions}개</span>
          </div>
        </div>
      </Link>

      <div className="pt-3 border-t border-gray-200 mb-3">
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <i className="ri-key-2-line text-gray-400"></i>
            <span className="text-sm font-mono font-medium text-gray-700">{group.code}</span>
          </div>
          <button
            onClick={() => onCopyCode(group.code)}
            className="inline-flex items-center justify-center font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer hover:bg-gray-200 px-2 py-1 text-sm"
          >
            {copiedCode === group.code ? (
              <>
                <i className="ri-check-line text-green-600"></i>
              </>
            ) : (
              <>
                <i className="ri-file-copy-line text-gray-600"></i>
              </>
            )}
          </button>
        </div>
      </div>

      <Link to={`/groups/${group.id}`}>
        <div className="flex justify-between items-center">
          <span className="text-sm text-blue-600 font-medium">그룹 입장 →</span>
          <i className="ri-arrow-right-line text-gray-400"></i>
        </div>
      </Link>
    </div>
  );
}


