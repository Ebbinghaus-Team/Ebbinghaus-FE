import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const GroupDetailPage = () => {
  const { id } = useParams();
  const [activeFilter, setActiveFilter] = useState('전체');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);
  const [codeCopied, setCodeCopied] = useState(false);

  const group = {
    id: 1,
    title: '토익 스터디 그룹',
    description: '토익 900점 목표로 함께 공부해요',
    members: 8,
    totalQuestionSets: 12,
    unsolvedQuestionSets: 8,
    solvedQuestionSets: 4,
    code: 'A3K9XP2M'
  };

  const members = [
    {
      id: 1,
      name: '김영희',
      role: '그룹장',
      joinedAt: '2024-01-01',
      solvedQuestions: 145,
      createdQuestions: 23,
      correctRate: 89
    },
    {
      id: 2,
      name: '박민수',
      role: '멤버',
      joinedAt: '2024-01-03',
      solvedQuestions: 132,
      createdQuestions: 18,
      correctRate: 92
    },
    {
      id: 3,
      name: '최지영',
      role: '멤버',
      joinedAt: '2024-01-05',
      solvedQuestions: 98,
      createdQuestions: 15,
      correctRate: 85
    },
    {
      id: 4,
      name: '이민호',
      role: '멤버',
      joinedAt: '2024-01-07',
      solvedQuestions: 87,
      createdQuestions: 12,
      correctRate: 78
    },
    {
      id: 5,
      name: '정수연',
      role: '멤버',
      joinedAt: '2024-01-10',
      solvedQuestions: 76,
      createdQuestions: 9,
      correctRate: 81
    },
    {
      id: 6,
      name: '강태현',
      role: '멤버',
      joinedAt: '2024-01-12',
      solvedQuestions: 65,
      createdQuestions: 7,
      correctRate: 88
    },
    {
      id: 7,
      name: '윤서아',
      role: '멤버',
      joinedAt: '2024-01-15',
      solvedQuestions: 54,
      createdQuestions: 5,
      correctRate: 76
    },
    {
      id: 8,
      name: '조현우',
      role: '멤버',
      joinedAt: '2024-01-18',
      solvedQuestions: 43,
      createdQuestions: 4,
      correctRate: 72
    }
  ];

  const questionSets = [
    {
      id: 1,
      title: 'TOEIC Part 5 - 문법 기초',
      description: '동사의 시제와 수일치 문제 모음',
      questionCount: 15,
      author: '김영희',
      createdAt: '2024-01-14',
      status: '안 푼 문제',
      progress: 0
    },
    {
      id: 2,
      title: 'TOEIC 어휘 - 비즈니스 용어',
      description: '실무에서 자주 사용되는 비즈니스 영어 어휘',
      questionCount: 20,
      author: '박민수',
      createdAt: '2024-01-12',
      status: '1차 관문',
      progress: 30
    },
    {
      id: 3,
      title: 'TOEIC Part 7 - 독해 전략',
      description: '긴 지문 독해를 위한 핵심 전략과 문제',
      questionCount: 10,
      author: '최지영',
      createdAt: '2024-01-11',
      status: '2차 관문',
      progress: 60
    },
    {
      id: 4,
      title: 'TOEIC Part 1 - 사진 묘사',
      description: '사진을 보고 적절한 설명을 찾는 문제',
      questionCount: 12,
      author: '이민호',
      createdAt: '2024-01-10',
      status: '완료',
      progress: 100
    },
    {
      id: 5,
      title: 'TOEIC Part 2 - 응답 문제',
      description: '질문에 대한 적절한 응답을 찾는 문제',
      questionCount: 18,
      author: '정수연',
      createdAt: '2024-01-09',
      status: '완료',
      progress: 100
    }
  ];

  const filterOptions = ['전체', '안 푼 문제', '1차 관문', '2차 관문', '완료'];

  const getFilterCount = (filter: string) => {
    if (filter === '전체') return questionSets.length;
    return questionSets.filter(set => set.status === filter).length;
  };

  const filteredQuestionSets = questionSets.filter(set => {
    if (activeFilter === '전체') return true;
    return set.status === activeFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case '안 푼 문제':
        return 'bg-gray-100 text-gray-600';
      case '1차 관문':
        return 'bg-orange-100 text-orange-600';
      case '2차 관문':
        return 'bg-blue-100 text-blue-600';
      case '완료':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const handleQuestionComplete = (questionSet: any) => {
    setSelectedQuestion(questionSet);
    setShowReviewModal(true);
  };

  const handleAddToReview = () => {
    // 개인 복습 문제셋에 추가하는 로직
    console.log('복습 문제셋에 추가:', selectedQuestion);
    setShowReviewModal(false);
    setSelectedQuestion(null);
  };

  const handleSkipReview = () => {
    setShowReviewModal(false);
    setSelectedQuestion(null);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(group.code);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-6">
        {/* 메인 컨텐츠 영역 */}
        <div className="flex-1">
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
                  onClick={handleCopyCode}
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

            {/* 통계 카드 - 3개만 표시 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{group.totalQuestionSets}</div>
                <div className="text-sm text-gray-600">총 문제셋</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                <div className="text-2xl font-bold text-orange-600 mb-1">{group.unsolvedQuestionSets}</div>
                <div className="text-sm text-gray-600">안 푼 문제셋</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">{group.solvedQuestionSets}</div>
                <div className="text-sm text-gray-600">푼 문제셋</div>
              </div>
            </div>
          </div>

          {/* 필터 탭 */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
              {filterOptions.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                    activeFilter === filter
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {filter} ({getFilterCount(filter)})
                </button>
              ))}
            </div>
          </div>

          {/* 문제셋 목록 */}
          <div className="space-y-4">
            {filteredQuestionSets.map((questionSet) => (
              <div key={questionSet.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
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
                            setTimeout(() => handleQuestionComplete(questionSet), 2000);
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

          {filteredQuestionSets.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-file-list-3-line text-4xl text-gray-300 mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                해당 상태의 문제셋이 없습니다
              </h3>
              <p className="text-gray-500">
                다른 필터를 선택하거나 새로운 문제를 만들어보세요
              </p>
            </div>
          )}
        </div>

        {/* 오른쪽 사이드바 - 멤버 목록 */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">그룹원</h3>
              <span className="text-sm text-gray-500">{members.length}명</span>
            </div>
            
            <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
              {members.map((member) => (
                <div key={member.id} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <i className="ri-user-line text-blue-600 text-xl"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">{member.name}</h4>
                        {member.role === '그룹장' && (
                          <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                            그룹장
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 복습 추가 모달 */}
      {showReviewModal && selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <i className="ri-check-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">문제 풀이 완료!</h3>
              <p className="text-gray-600 text-sm">
                "{selectedQuestion.title}" 문제를 완료했습니다.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-blue-900 mb-2">복습 문제셋에 추가하시겠습니까?</h4>
              <p className="text-xs text-blue-700">
                개인 복습 문제셋에 추가하면 나중에 다시 복습할 수 있습니다.
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleSkipReview}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                건너뛰기
              </button>
              <button
                onClick={handleAddToReview}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                복습에 추가
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDetailPage;
