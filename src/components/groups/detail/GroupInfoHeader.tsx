import React from 'react';
import { Link } from 'react-router-dom';

type Group = {
  title: string;
  description: string;
  code: string;
};

type GroupInfoHeaderProps = {
  group: Group;
  codeCopied: boolean;
  onCopyCode: () => void;
};

export default function GroupInfoHeader({ group, codeCopied, onCopyCode }: GroupInfoHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <Link className="text-gray-500 hover:text-gray-700" to="/groups">
              <i className="ri-arrow-left-line text-xl"></i>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">{group.title}</h1>
          </div>
          <p className="text-gray-600">{group.description}</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onCopyCode}
            className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 px-4 py-2 text-base"
          >
            {codeCopied ? (
              <>
                <i className="ri-check-line mr-2 text-green-600"></i>복사됨
              </>
            ) : (
              <>
                <i className="ri-key-line mr-2"></i>초대 코드
              </>
            )}
          </button>
          <Link to="/create">
            <button className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 px-4 py-2 text-base">
              <i className="ri-add-line mr-2"></i>문제 만들기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}


