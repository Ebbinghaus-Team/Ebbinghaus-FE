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

  // 샘플 문제 데이터
  const question = {
    id: questionId,
    type: '객관식',
    category: '복습 문제',
    title: 'TOEIC Part 5 - 문법 문제 (동사의 시제)',
    content: 'The company _____ its annual report next month according to the schedule.',
    options: ['1. will publish', '2. published', '3. has published', '4. publishing'],
    correctAnswer: 0,
    explanation: '미래 시제를 나타내는 "next month"가 있으므로 미래형 "will publish"가 정답입니다.',
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      const isCorrect = selectedAnswer === question.correctAnswer;
      const mock = {
        isCorrect,
        explanation: question.explanation,
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

  const isCorrect = submissionResult?.isCorrect ?? selectedAnswer === question.correctAnswer;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SolveHeader
        onBack={handleGoBack}
        questionType={question.type}
        category={question.category}
        title={question.title}
      />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {!showResult ? (
          <>
            <SolveQuestion content={question.content} />

            <SolveOptions
              options={question.options}
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
              correctAnswerText={question.options[question.correctAnswer]}
              explanation={submissionResult?.explanation ?? question.explanation}
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
        title={question.title}
        onSkip={handleSkipReview}
        onAdd={handleAddToReview}
      />
    </div>
  );
};

export default SolvePage;
