import { useMemo, useState } from 'react';
import ReviewHeader from '../../components/review/ReviewHeader';
import ReviewStats from '../../components/review/ReviewStats';
import ReviewFilter from '../../components/review/ReviewFilter';
import ReviewProblemList, { type ReviewProblem } from '../../components/review/ReviewProblemList';
import { useTodayReviewProblemsQuery } from '../../api/review/hooks';

const ReviewPage = () => {
  const [activeFilter, setActiveFilter] = useState('전체');
  const { data, isLoading } = useTodayReviewProblemsQuery();

  const toSubjectLabel = (t: 'MCQ' | 'OX' | 'SHORT' | 'SUBJECTIVE') =>
    t === 'MCQ' ? '객관식' : t === 'OX' ? 'OX' : t === 'SHORT' ? '단답형' : '서술형';

  const sourceProblems = (data?.problems ?? []).map<ReviewProblem>((p) => ({
    problemId: p.problemId,
    question: p.question,
    problemType: p.problemType,
    gate: p.gate as ReviewProblem['gate'],
    nextReviewDate: p.nextReviewDate,
    attemptStatus: p.attemptStatus as ReviewProblem['attemptStatus'],
    subject: toSubjectLabel(p.problemType),
  }));

  const filteredProblems = useMemo(() => {
    if (activeFilter === '전체') return sourceProblems;
    const gate = activeFilter === '1차관문' ? 'GATE_1' : 'GATE_2';
    return sourceProblems.filter((p) => p.gate === gate);
  }, [activeFilter, sourceProblems]);

  const totalQuestions = data?.dashboard.totalCount ?? 0;
  const completedQuestions = data?.dashboard.completedCount ?? 0;
  const remainingQuestions = data?.dashboard.incompletedCount ?? 0;
  const progressPercentage = Math.round(data?.dashboard.progressRate ?? 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ReviewHeader />

      {isLoading ? (
        <div className="animate-pulse space-y-6">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-3">
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      ) : (
        <>
          <ReviewStats
            total={totalQuestions}
            completed={completedQuestions}
            remaining={remainingQuestions}
            progress={progressPercentage}
          />

          <ReviewFilter active={activeFilter} onChange={setActiveFilter} />

          <ReviewProblemList problems={filteredProblems} />
        </>
      )}
    </div>
  );
};

export default ReviewPage;
