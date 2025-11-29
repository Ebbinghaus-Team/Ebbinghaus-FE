import { useMemo, useState } from 'react';
import ReviewHeader from '../../components/review/ReviewHeader';
import ReviewStats from '../../components/review/ReviewStats';
import ReviewFilter from '../../components/review/ReviewFilter';
import ReviewProblemList from '../../components/review/ReviewProblemList';

const ReviewPage = () => {
  const [activeFilter, setActiveFilter] = useState('전체');

  // API 스펙(/api/review/today) 형태의 더미 데이터
  const todayResponse = {
    dashboard: {
      totalCount: 5,
      completedCount: 2,
      incompletedCount: 3,
      progressRate: 40.0,
    },
    problems: [
      {
        problemId: 1,
        question: '미적분학의 기본 정리에 대한 문제',
        problemType: 'MCQ',
        gate: 'GATE_1',
        nextReviewDate: '2024-01-15',
        attemptStatus: 'NOT_ATTEMPTED',
        subject: 'OX',
      },
      {
        problemId: 2,
        question: 'TOEIC 문법 - 관계대명사',
        problemType: 'OX',
        gate: 'GATE_2',
        nextReviewDate: '2024-01-15',
        attemptStatus: 'CORRECT',
        subject: '객관식',
      },
      {
        problemId: 3,
        question: '한국사 - 조선시대 정치제도',
        problemType: 'SHORT',
        gate: 'GATE_1',
        nextReviewDate: '2024-01-15',
        attemptStatus: 'NOT_ATTEMPTED',
        subject: 'OX',
      },
      {
        problemId: 4,
        question: '화학 - 산화환원반응',
        problemType: 'MCQ',
        gate: 'GATE_2',
        nextReviewDate: '2024-01-15',
        attemptStatus: 'NOT_ATTEMPTED',
        subject: '객관식',
      },
    ],
  } as const;

  const filteredProblems = useMemo(() => {
    if (activeFilter === '전체') return todayResponse.problems;
    const gate = activeFilter === '1차관문' ? 'GATE_1' : 'GATE_2';
    return todayResponse.problems.filter((p) => p.gate === gate);
  }, [
    activeFilter,
    todayResponse.problems,
  ]) as unknown as import('../../components/review/ReviewProblemList').ReviewProblem[];

  const totalQuestions = todayResponse.dashboard.totalCount;
  const completedQuestions = todayResponse.dashboard.completedCount;
  const remainingQuestions = todayResponse.dashboard.incompletedCount;
  const progressPercentage = Math.round(todayResponse.dashboard.progressRate);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ReviewHeader />

      <ReviewStats
        total={totalQuestions}
        completed={completedQuestions}
        remaining={remainingQuestions}
        progress={progressPercentage}
      />

      <ReviewFilter active={activeFilter} onChange={setActiveFilter} />

      <ReviewProblemList problems={filteredProblems} />
    </div>
  );
};

export default ReviewPage;
