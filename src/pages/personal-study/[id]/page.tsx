import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { mapGateToDisplayLabel } from '../../../utils/apiMappers';
import type { ApiProblemType, ApiReviewGate } from '../../../utils/apiMappers';

const PersonalStudyDetailPage = () => {
  const { id } = useParams();
  const [activeFilter, setActiveFilter] = useState('전체');

  // API 스펙(/api/study-rooms/personal/{id}/problems) 형태의 더미 데이터
  const studyRoomInfo = {
    studyRoomId: Number(id) || 1,
    studyRoomName: '수학 - 미적분학',
    description: '미적분학 기본 개념과 응용 문제',
    subject: '수학',
    totalQuestions: 25,
    completedQuestions: 18,
    remainingQuestions: 7,
    progress: 72,
  };

  type ProblemItem = {
    problemId: number;
    question: string;
    problemType: ApiProblemType;
    reviewGate: ApiReviewGate;
    createdAt: string;
    lastReviewedAt?: string;
    reviewCount: number;
  };

  const problems = useMemo<ProblemItem[]>(
    () => [
      {
        problemId: 1,
        question: '극한의 정의와 성질',
        problemType: 'SUBJECTIVE',
        reviewGate: 'GATE_2',
        createdAt: '2024-01-10',
        lastReviewedAt: '2024-01-14',
        reviewCount: 2,
      },
      {
        problemId: 2,
        question: '미분의 기본 공식',
        problemType: 'MCQ',
        reviewGate: 'GRADUATED',
        createdAt: '2024-01-11',
        lastReviewedAt: '2024-01-15',
        reviewCount: 3,
      },
      {
        problemId: 3,
        question: '연쇄법칙 응용 문제',
        problemType: 'SHORT',
        reviewGate: 'GATE_1',
        createdAt: '2024-01-12',
        lastReviewedAt: '2024-01-13',
        reviewCount: 1,
      },
      {
        problemId: 4,
        question: '적분의 기본 정리',
        problemType: 'OX',
        reviewGate: 'GATE_1',
        createdAt: '2024-01-13',
        lastReviewedAt: '2024-01-14',
        reviewCount: 1,
      },
      {
        problemId: 5,
        question: '부분적분 계산',
        problemType: 'SUBJECTIVE',
        reviewGate: 'GATE_2',
        createdAt: '2024-01-14',
        lastReviewedAt: '2024-01-15',
        reviewCount: 2,
      },
    ],
    [],
  );

  const filteredProblems = useMemo(() => {
    if (activeFilter === '전체') return problems;
    if (activeFilter === '졸업한 문제') return problems.filter((p) => p.reviewGate === 'GRADUATED');
    const gate = activeFilter === '1차관문' ? 'GATE_1' : 'GATE_2';
    return problems.filter((p) => p.reviewGate === gate);
  }, [activeFilter, problems]);
  const stage1Count = problems.filter((p) => p.reviewGate === 'GATE_1').length;
  const stage2Count = problems.filter((p) => p.reviewGate === 'GATE_2').length;
  const completedCount = problems.filter((p) => p.reviewGate === 'GRADUATED').length;

  const getStageColor = (stage: string) => {
    switch (stage) {
      case '완료':
        return 'bg-green-100 text-green-800';
      case '1차관문':
        return 'bg-yellow-100 text-yellow-800';
      case '2차관문':
        return 'bg-blue-100 text-blue-800';
      case '미완료':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Link className="text-gray-500 hover:text-gray-700" to="/personal-study">
                <i className="ri-arrow-left-line text-xl"></i>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">{studyRoomInfo.studyRoomName}</h1>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {studyRoomInfo.subject}
              </span>
            </div>
            <p className="text-gray-600">{studyRoomInfo.description}</p>
          </div>
          <Link to={`/create?from=personal&studyId=${id}`}>
            <button className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 px-4 py-2 text-base">
              <i className="ri-add-line mr-2"></i>문제 추가
            </button>
          </Link>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {studyRoomInfo.totalQuestions}
            </div>
            <div className="text-sm text-gray-600">총 문제</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {studyRoomInfo.completedQuestions}
            </div>
            <div className="text-sm text-gray-600">졸업한 문제</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {studyRoomInfo.remainingQuestions}
            </div>
            <div className="text-sm text-gray-600">남은 문제</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">{studyRoomInfo.progress}%</div>
            <div className="text-sm text-gray-600">진행률</div>
          </div>
        </div>
      </div>

      {/* 필터 탭 */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {[
            { label: '전체', count: problems.length },
            { label: '1차관문', count: stage1Count },
            { label: '2차관문', count: stage2Count },
            { label: '졸업한 문제', count: completedCount },
          ].map((filter) => (
            <button
              key={filter.label}
              onClick={() => setActiveFilter(filter.label)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === filter.label
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* 문제 목록 */}
      <div className="space-y-4">
        {filteredProblems.length > 0 ? (
          filteredProblems.map((p) => (
            <div
              key={p.problemId}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStageColor(mapGateToDisplayLabel(p.reviewGate))}`}
                    >
                      {mapGateToDisplayLabel(p.reviewGate)}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {p.problemType}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{p.question}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>작성일: {p.createdAt}</span>
                    {p.lastReviewedAt && <span>마지막 복습: {p.lastReviewedAt}</span>}
                    <span>복습 횟수: {p.reviewCount}회</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Link to={`/solve?id=${p.problemId}&from=personal`}>
                    <button className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 px-3 py-1.5 text-sm">
                      문제풀기
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <i className="ri-file-list-3-line text-5xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 text-lg">해당하는 문제가 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalStudyDetailPage;
