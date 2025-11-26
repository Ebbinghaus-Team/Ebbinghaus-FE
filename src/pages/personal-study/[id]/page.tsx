import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const PersonalStudyDetailPage = () => {
  const { id } = useParams();
  const [activeFilter, setActiveFilter] = useState('전체');

  const studyRoom = {
    id: 1,
    title: '수학 - 미적분학',
    description: '미적분학 기본 개념과 응용 문제',
    subject: '수학',
    totalQuestions: 25,
    completedQuestions: 18,
    remainingQuestions: 7,
    progress: 72
  };

  const questions = [
    {
      id: 1,
      title: '극한의 정의와 성질',
      type: '서술형',
      stage: '2차관문',
      createdAt: '2024-01-10',
      lastReview: '2024-01-14',
      reviewCount: 2,
      status: 'in-progress'
    },
    {
      id: 2,
      title: '미분의 기본 공식',
      type: '객관식',
      stage: '완료',
      createdAt: '2024-01-11',
      lastReview: '2024-01-15',
      reviewCount: 3,
      status: 'completed'
    },
    {
      id: 3,
      title: '연쇄법칙 응용 문제',
      type: '단답형',
      stage: '1차관문',
      createdAt: '2024-01-12',
      lastReview: '2024-01-13',
      reviewCount: 1,
      status: 'in-progress'
    },
    {
      id: 4,
      title: '적분의 기본 정리',
      type: 'O/X',
      stage: '1차관문',
      createdAt: '2024-01-13',
      lastReview: '2024-01-14',
      reviewCount: 1,
      status: 'in-progress'
    },
    {
      id: 5,
      title: '부분적분 계산',
      type: '서술형',
      stage: '2차관문',
      createdAt: '2024-01-14',
      lastReview: '2024-01-15',
      reviewCount: 2,
      status: 'in-progress'
    }
  ];

  const getFilteredQuestions = () => {
    switch (activeFilter) {
      case '1차관문':
        return questions.filter(q => q.stage === '1차관문');
      case '2차관문':
        return questions.filter(q => q.stage === '2차관문');
      case '완료':
        return questions.filter(q => q.status === 'completed');
      default:
        return questions;
    }
  };

  const filteredQuestions = getFilteredQuestions();
  const stage1Count = questions.filter(q => q.stage === '1차관문').length;
  const stage2Count = questions.filter(q => q.stage === '2차관문').length;
  const completedCount = questions.filter(q => q.status === 'completed').length;

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
              <h1 className="text-3xl font-bold text-gray-900">{studyRoom.title}</h1>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {studyRoom.subject}
              </span>
            </div>
            <p className="text-gray-600">{studyRoom.description}</p>
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
            <div className="text-2xl font-bold text-blue-600 mb-1">{studyRoom.totalQuestions}</div>
            <div className="text-sm text-gray-600">총 문제</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{studyRoom.completedQuestions}</div>
            <div className="text-sm text-gray-600">완료</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">{studyRoom.remainingQuestions}</div>
            <div className="text-sm text-gray-600">남은 문제</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">{studyRoom.progress}%</div>
            <div className="text-sm text-gray-600">진행률</div>
          </div>
        </div>
      </div>

      {/* 필터 탭 */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {[
            { label: '전체', count: questions.length },
            { label: '1차관문', count: stage1Count },
            { label: '2차관문', count: stage2Count },
            { label: '완료', count: completedCount }
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
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <div key={question.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStageColor(question.stage)}`}>
                      {question.stage}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {question.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{question.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>작성일: {question.createdAt}</span>
                    {question.lastReview && <span>마지막 복습: {question.lastReview}</span>}
                    <span>복습 횟수: {question.reviewCount}회</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {question.status === 'completed' ? (
                    <div className="flex items-center text-green-600">
                      <i className="ri-check-circle-fill text-xl mr-2"></i>
                      <span className="text-sm font-medium">완료</span>
                    </div>
                  ) : (
                    <Link to={`/solve?id=${question.id}&from=personal`}>
                      <button className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 px-3 py-1.5 text-sm">
                        복습하기
                      </button>
                    </Link>
                  )}
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
