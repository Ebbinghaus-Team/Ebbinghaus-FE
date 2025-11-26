import React from 'react';
import { Link } from 'react-router-dom';

export type QuestionSet = {
  id: number;
  title: string;
  description: string;
  questionCount: number;
  author: string;
  createdAt: string;
  status: string;
};

type QuestionSetListProps = {
  items: QuestionSet[];
  getStatusColor: (status: string) => string;
  onAfterSolveClick: (qs: QuestionSet) => void;
};

export default function QuestionSetList({ items, getStatusColor, onAfterSolveClick }: QuestionSetListProps) {
  return (
    <div className="space-y-4">
      {items.map((questionSet) => (
        <div
          key={questionSet.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {questionSet.questionCount}문제
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(questionSet.status)}`}>
                  {questionSet.status}
                </span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{questionSet.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{questionSet.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                <span>출제자: {questionSet.author}</span>
                <span>작성일: {questionSet.createdAt}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <Link to={`/solve?id=${questionSet.id}&from=group`}>
                  <button
                    className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 px-4 py-2 text-base"
                    onClick={() => {
                      setTimeout(() => onAfterSolveClick(questionSet), 2000);
                    }}
                  >
                    {questionSet.status === '완료' ? '다시 풀기' : '문제 풀기'}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


