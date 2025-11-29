import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SolveHeader from '../../components/solve/SolveHeader';
import SolveQuestion from '../../components/solve/SolveQuestion';
import SolveOptions from '../../components/solve/SolveOptions';
import SolveResult from '../../components/solve/SolveResult';
import ReviewAddModal from '../../components/groups/detail/ReviewAddModal';

const SolvePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const questionId = searchParams.get('id');
  const from = searchParams.get('from');

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<null | {
    isCorrect: boolean;
    explanation: string;
    aiFeedback: string | null;
    currentGate: 'GATE_1' | 'GATE_2' | 'GRADUATED' | null;
    reviewCount: number | null;
    nextReviewDate: string | null;
    isFirstAttempt: boolean;
    isReviewStateChanged: boolean;
  }>(null);

  const problemDetail = {
    problemId: Number(questionId) || 1,
    question: '자바의 접근 제어자가 아닌 것은?',
    problemType: 'MCQ' as const,
    studyRoomId: 1,
    choices: ['public', 'private', 'protected', 'friend'],
    currentGate: 'GATE_1' as const,
    nextReviewDate: '2025-01-29',
    reviewCount: 0,
    includeInReview: true,
  };

  const questionTypeLabel =
    problemDetail.problemType === 'MCQ'
      ? '객관식'
      : problemDetail.problemType === 'OX'
        ? 'OX'
        : problemDetail.problemType === 'SHORT'
          ? '단답형'
          : '서술형';

  const categoryLabel =
    from === 'group' ? '그룹 문제' : from === 'personal' ? '개인 문제' : '복습 문제';

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      const isCorrect = selectedAnswer === 0;
      const mock = {
        isCorrect,
        explanation: isCorrect
          ? '정답입니다. 해당 개념을 잘 이해하고 있습니다.'
          : '접근 제어자에는 friend가 포함되지 않습니다.',
        aiFeedback: null,
        currentGate: isCorrect ? ('GATE_2' as const) : ('GATE_1' as const),
        reviewCount: 1,
        nextReviewDate: isCorrect ? '2025-01-31' : '2025-01-25',
        isFirstAttempt: true,
        isReviewStateChanged: true,
      };
      setSubmissionResult(mock);
      setShowResult(true);
    }
  };

  const handleGoBack = () => {
    if (from === 'personal') {
      navigate('/personal-study');
    } else if (from === 'group') {
      navigate('/groups');
    } else {
      navigate('/review');
    }
  };

  const handleResultNext = () => {
    if (from === 'group') {
      setShowReviewModal(true);
    } else {
      handleGoBack();
    }
  };

  const handleAddToReview = () => {
    // 개인 복습 문제셋에 추가하는 로직
    setShowReviewModal(false);
    handleGoBack();
  };

  const handleSkipReview = () => {
    setShowReviewModal(false);
    handleGoBack();
  };

  const isCorrect = submissionResult?.isCorrect ?? false;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SolveHeader
        onBack={handleGoBack}
        questionType={questionTypeLabel}
        category={categoryLabel}
        title={problemDetail.question}
      />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {!showResult ? (
          <>
            <SolveQuestion content={problemDetail.question} />

            <SolveOptions
              options={problemDetail.choices}
              selectedAnswer={selectedAnswer}
              onSelect={handleAnswerSelect}
              onCancel={handleGoBack}
              onSubmit={handleSubmit}
              isSubmitDisabled={selectedAnswer === null}
            />
          </>
        ) : (
          <>
            <SolveResult
              isCorrect={isCorrect}
              correctAnswerText={problemDetail.choices[0]}
              explanation={submissionResult?.explanation ?? ''}
              aiFeedback={submissionResult?.aiFeedback ?? null}
              currentGate={submissionResult?.currentGate ?? null}
              nextReviewDate={submissionResult?.nextReviewDate ?? null}
              onConfirm={handleResultNext}
            />
          </>
        )}
      </div>

      <ReviewAddModal
        open={showReviewModal}
        title={problemDetail.question}
        onSkip={handleSkipReview}
        onAdd={handleAddToReview}
      />
    </div>
  );
};

export default SolvePage;
