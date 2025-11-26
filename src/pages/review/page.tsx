
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ReviewPage = () => {
  const [activeFilter, setActiveFilter] = useState('전체');

  const reviewQuestions = [
    {
      id: 1,
      question: '미적분학의 기본 정리에 대한 문제',
      subject: '수학',
      stage: '1차관문',
      dueDate: '2024-01-15',
      completed: false
    },
    {
      id: 2,
      question: 'TOEIC 문법 - 관계대명사',
      subject: '영어',
      stage: '2차관문',
      dueDate: '2024-01-15',
      completed: true
    },
    {
      id: 4,
      question: '한국사 - 조선시대 정치제도',
      subject: '한국사',
      stage: '1차관문',
      dueDate: '2024-01-15',
      completed: false
    },
    {
      id: 5,
      question: '화학 - 산화환원반응',
      subject: '화학',
      stage: '2차관문',
      dueDate: '2024-01-15',
      completed: false
    }
  ];

  const getStageColor = (stage: string) => {
    switch (stage) {
      case '1차관문':
        return 'bg-yellow-100 text-yellow-800';
      case '2차관문':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFilteredQuestions = () => {
    if (activeFilter === '전체') return reviewQuestions;
    return reviewQuestions.filter(q => q.stage === activeFilter);
  };

  const filteredQuestions = getFilteredQuestions();
  const totalQuestions = reviewQuestions.length;
  const completedQuestions = reviewQuestions.filter(q => q.completed).length;
  const remainingQuestions = totalQuestions - completedQuestions;
  const progressPercentage = Math.round((completedQuestions / totalQuestions) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">오늘의 복습</h1>
        <p className="text-gray-600">과학적 복습 주기에 따라 오늘 풀어야 할 문제들입니다</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{totalQuestions}</div>
          <div className="text-sm text-gray-600">총 문제</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{completedQuestions}</div>
          <div className="text-sm text-gray-600">완료</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">{remainingQuestions}</div>
          <div className="text-sm text-gray-600">남은 문제</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <div className="text-lg font-semibold text-gray-700 mb-2">{progressPercentage}%</div>
          <div className="text-sm text-gray-600">진행률</div>
        </div>
      </div>

      {/* 필터 탭 */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {['전체', '1차관문', '2차관문'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeFilter === filter
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* 문제 목록 */}
      <div className="space-y-4">
        {filteredQuestions.map((question) => (
          <div key={question.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStageColor(question.stage)}`}>
                    {question.stage}
                  </span>
                  <span className="text-sm text-gray-500">{question.subject}</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">{question.question}</h3>
                <p className="text-sm text-gray-500">복습 예정일: {question.dueDate}</p>
              </div>
              <div className="flex items-center space-x-3">
                {question.completed ? (
                  <div className="flex items-center text-green-600">
                    <i className="ri-check-circle-fill text-xl mr-2"></i>
                    <span className="text-sm font-medium">완료</span>
                  </div>
                ) : (
                  <Link to={`/solve?id=${question.id}`}>
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
    </div>
  );
};

export default ReviewPage;
