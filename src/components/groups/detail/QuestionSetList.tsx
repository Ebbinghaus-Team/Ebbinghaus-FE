import { Link } from 'react-router-dom';
import { formatDateTime } from '../../../utils/date';

export type QuestionSet = {
  id: number;
  title: string;
  description: string;
  questionCount: number;
  author: string;
  createdAt: string;
  status: string;
  reviewCount: number;
  isMyProblem: boolean;
  lastReviewedAt: string | null;
};

type QuestionSetListProps = {
  items: QuestionSet[];
  getStatusColor: (status: string) => string;
  onAfterSolveClick: (qs: QuestionSet) => void;
};

export default function QuestionSetList({
  items,
  getStatusColor,
  onAfterSolveClick,
}: QuestionSetListProps) {
  return (
    <div className="space-y-4">
      {items.map((questionSet) => (
        <div
          key={questionSet.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                  {questionSet.description}
                </span>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(questionSet.status)}`}
                >
                  {questionSet.status}
                </span>
                {questionSet.isMyProblem && (
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                    내 문제
                  </span>
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{questionSet.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                <span>출제자: {questionSet.author}</span>
                <span>작성일: {formatDateTime(questionSet.createdAt)}</span>
                <span>복습 횟수: {questionSet.reviewCount}회</span>
                {questionSet.lastReviewedAt && (
                  <span>마지막 복습: {formatDateTime(questionSet.lastReviewedAt)}</span>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <Link
                  to={`/solve?id=${questionSet.id}&from=group&isMy=${questionSet.isMyProblem ? 'true' : 'false'}`}
                >
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
