import { useState } from 'react';
import { useParams } from 'react-router-dom';
import GroupInfoHeader from '../../../components/groups/detail/GroupInfoHeader';
import GroupStats from '../../../components/groups/detail/GroupStats';
import FilterTabs from '../../../components/groups/detail/FilterTabs';
import QuestionSetList, {
  type QuestionSet,
} from '../../../components/groups/detail/QuestionSetList';
import MembersSidebar from '../../../components/groups/detail/MembersSidebar';
import ReviewAddModal from '../../../components/groups/detail/ReviewAddModal';

const GroupDetailPage = () => {
  useParams();
  const [activeFilter, setActiveFilter] = useState('전체');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionSet | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);

  const group = {
    id: 1,
    title: '토익 스터디 그룹',
    description: '토익 900점 목표로 함께 공부해요',
    members: 8,
    totalQuestionSets: 12,
    unsolvedQuestionSets: 8,
    solvedQuestionSets: 4,
    code: 'A3K9XP2M',
  };

  const members = [
    {
      userId: 1,
      username: '김철수',
      isOwner: true,
      joinedAt: '2024-01-01',
    },
    {
      userId: 2,
      username: '이영희',
      isOwner: false,
      joinedAt: '2024-01-03',
    },
    {
      userId: 3,
      username: '박민수',
      isOwner: false,
      joinedAt: '2024-01-05',
    },
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
      progress: 0,
    },
    {
      id: 2,
      title: 'TOEIC 어휘 - 비즈니스 용어',
      description: '실무에서 자주 사용되는 비즈니스 영어 어휘',
      questionCount: 20,
      author: '박민수',
      createdAt: '2024-01-12',
      status: '1차 관문',
      progress: 30,
    },
    {
      id: 3,
      title: 'TOEIC Part 7 - 독해 전략',
      description: '긴 지문 독해를 위한 핵심 전략과 문제',
      questionCount: 10,
      author: '최지영',
      createdAt: '2024-01-11',
      status: '2차 관문',
      progress: 60,
    },
    {
      id: 4,
      title: 'TOEIC Part 1 - 사진 묘사',
      description: '사진을 보고 적절한 설명을 찾는 문제',
      questionCount: 12,
      author: '이민호',
      createdAt: '2024-01-10',
      status: '완료',
      progress: 100,
    },
    {
      id: 5,
      title: 'TOEIC Part 2 - 응답 문제',
      description: '질문에 대한 적절한 응답을 찾는 문제',
      questionCount: 18,
      author: '정수연',
      createdAt: '2024-01-09',
      status: '완료',
      progress: 100,
    },
  ];

  const filterOptions = ['전체', '안 푼 문제', '1차 관문', '2차 관문', '완료'];

  const getFilterCount = (filter: string) => {
    if (filter === '전체') return questionSets.length;
    return questionSets.filter((set) => set.status === filter).length;
  };

  const filteredQuestionSets = questionSets.filter((set) => {
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

  const handleQuestionComplete = (questionSet: QuestionSet) => {
    setSelectedQuestion(questionSet);
    setShowReviewModal(true);
  };

  const handleAddToReview = () => {
    // 개인 복습 문제셋에 추가하는 로직
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
        <div className="flex-1">
          <GroupInfoHeader group={group} codeCopied={codeCopied} onCopyCode={handleCopyCode} />
          <GroupStats
            totalQuestionSets={group.totalQuestionSets}
            unsolvedQuestionSets={group.unsolvedQuestionSets}
            solvedQuestionSets={group.solvedQuestionSets}
          />
          <FilterTabs
            filters={filterOptions}
            activeFilter={activeFilter}
            onChange={setActiveFilter}
            getFilterCount={getFilterCount}
          />
          <QuestionSetList
            items={filteredQuestionSets}
            getStatusColor={getStatusColor}
            onAfterSolveClick={handleQuestionComplete}
          />
          {filteredQuestionSets.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-file-list-3-line text-4xl text-gray-300 mb-4"></i>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                해당 상태의 문제셋이 없습니다
              </h3>
              <p className="text-gray-500">다른 필터를 선택하거나 새로운 문제를 만들어보세요</p>
            </div>
          )}
        </div>
        <MembersSidebar members={members} />
      </div>

      <ReviewAddModal
        open={showReviewModal && !!selectedQuestion}
        title={selectedQuestion?.title ?? ''}
        onSkip={handleSkipReview}
        onAdd={handleAddToReview}
      />
    </div>
  );
};

export default GroupDetailPage;
