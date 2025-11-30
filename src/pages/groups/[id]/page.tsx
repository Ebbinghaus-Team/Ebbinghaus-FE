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
import {
  useGroupStudyRoomProblemsQuery,
  useGroupStudyRoomMembersQuery,
} from '../../../api/studyRoom/hooks';

const GroupDetailPage = () => {
  const { id } = useParams();
  const studyRoomId = Number(id) || 0;
  const [activeFilter, setActiveFilter] = useState('전체');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionSet | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);

  const { data: problemsData, isLoading: loadingProblems } =
    useGroupStudyRoomProblemsQuery(studyRoomId);
  const { data: membersData, isLoading: loadingMembers } =
    useGroupStudyRoomMembersQuery(studyRoomId);

  const filterOptions = ['전체', '안 푼 문제', '1차 관문', '2차 관문', '완료'];

  const toStatusLabel = (gate: string) => {
    if (gate === 'NOT_IN_REVIEW') return '안 푼 문제';
    if (gate === 'GATE_1') return '1차 관문';
    if (gate === 'GATE_2') return '2차 관문';
    if (gate === 'GRADUATED') return '완료';
    return '안 푼 문제';
  };

  const toProblemTypeLabel = (problemType: string) => {
    if (problemType === 'MCQ') return '객관식';
    if (problemType === 'OX') return 'OX';
    if (problemType === 'SHORT') return '단답형';
    if (problemType === 'SUBJECTIVE') return '서술형';
    return problemType;
  };

  const questionSets: QuestionSet[] =
    problemsData?.problems.map((p) => ({
      id: p.problemId,
      title: p.question,
      description: toProblemTypeLabel(p.problemType),
      questionCount: 1,
      author: p.creatorName,
      createdAt: p.createdAt,
      status: toStatusLabel(p.reviewGate),
      reviewCount: p.reviewCount,
      isMyProblem: p.isMyProblem,
      lastReviewedAt: p.lastReviewedAt,
    })) ?? [];

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
    if (!problemsData) return;
    navigator.clipboard.writeText(problemsData.joinCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  if (loadingProblems || loadingMembers || !problemsData || !membersData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-3">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const headerGroup = {
    id: problemsData.studyRoomId,
    title: problemsData.studyRoomName,
    description: problemsData.studyRoomDescription,
    code: problemsData.joinCode,
  };
  const totalQuestionSets = problemsData.dashboard.totalCount;
  const unsolvedQuestionSets = problemsData.dashboard.unreviewedCount;
  const solvedQuestionSets = problemsData.problems.filter(
    (p) => p.reviewGate === 'GRADUATED',
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-6">
        <div className="flex-1">
          <GroupInfoHeader
            group={headerGroup}
            codeCopied={codeCopied}
            onCopyCode={handleCopyCode}
          />
          <GroupStats
            totalQuestionSets={totalQuestionSets}
            unsolvedQuestionSets={unsolvedQuestionSets}
            solvedQuestionSets={solvedQuestionSets}
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
        <MembersSidebar members={membersData.members} />
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
