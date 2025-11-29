import { Link } from 'react-router-dom';
import { mapGateToDisplayLabel } from '../../utils/apiMappers';

export type ReviewProblem = {
  problemId: number;
  question: string;
  problemType: 'MCQ' | 'OX' | 'SHORT' | 'SUBJECTIVE';
  gate: 'GATE_1' | 'GATE_2';
  nextReviewDate: string;
  attemptStatus: 'NOT_ATTEMPTED' | 'CORRECT' | 'INCORRECT';
  subject: string;
};

type ReviewProblemListProps = {
  problems: ReviewProblem[];
};

function getStageColor(label: string) {
  switch (label) {
    case '1차관문':
      return 'bg-yellow-100 text-yellow-800';
    case '2차관문':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export default function ReviewProblemList({ problems }: ReviewProblemListProps) {
  return (
    <div className="space-y-4">
      {problems.map((p) => (
        <div
          key={p.problemId}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(mapGateToDisplayLabel(p.gate))}`}
                >
                  {mapGateToDisplayLabel(p.gate)}
                </span>
                <span className="text-sm text-gray-500">{p.subject}</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">{p.question}</h3>
              <p className="text-sm text-gray-500">복습 예정일: {p.nextReviewDate}</p>
            </div>
            <div className="flex items-center space-x-3">
              {p.attemptStatus === 'CORRECT' ? (
                <div className="flex items-center text-green-600">
                  <i className="ri-check-circle-fill text-xl mr-2"></i>
                  <span className="text-sm font-medium">완료</span>
                </div>
              ) : (
                <Link to={`/solve?id=${p.problemId}`}>
                  <button className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 px-4 py-2 text-base">
                    문제 풀기
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
