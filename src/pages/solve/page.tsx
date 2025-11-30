import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SolveHeader from '../../components/solve/SolveHeader';
import SolveQuestion from '../../components/solve/SolveQuestion';
import SolveOptions from '../../components/solve/SolveOptions';
import SolveResult from '../../components/solve/SolveResult';
import SolveTextAnswer from '../../components/solve/SolveTextAnswer';
import ReviewAddModal from '../../components/groups/detail/ReviewAddModal';
import { useProblemDetailQuery, useSubmitProblemMutation } from '../../api/problem/hooks';
import { useReviewInclusionMutation } from '../../api/review/hooks';

const SolvePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const questionId = searchParams.get('id');
  const from = searchParams.get('from');

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [textAnswer, setTextAnswer] = useState<string>('');
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
  const submitMutation = useSubmitProblemMutation();
  const reviewInclusionMutation = useReviewInclusionMutation();

  const problemId = Number(questionId) || 0;
  const { data: problemDetail, isLoading } = useProblemDetailQuery(problemId);

  const questionTypeLabel = (
    problemDetail?.problemType === 'MCQ'
      ? '객관식'
      : problemDetail?.problemType === 'OX'
        ? 'OX'
        : problemDetail?.problemType === 'SHORT'
          ? '단답형'
          : '서술형'
  ) as string;

  const categoryLabel =
    from === 'group' ? '그룹 문제' : from === 'personal' ? '개인 문제' : '복습 문제';

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (!problemDetail) return;

    let answer = '';
    if (problemDetail.problemType === 'MCQ') {
      if (selectedAnswer === null) return;
      answer = String(selectedAnswer);
    } else if (problemDetail.problemType === 'OX') {
      if (selectedAnswer === null) return;
      answer = selectedAnswer === 0 ? 'true' : 'false';
    } else {
      // SHORT / SUBJECTIVE
      const trimmed = textAnswer.trim();
      if (!trimmed) return;
      answer = trimmed;
    }

    const pid = Number(problemDetail.problemId ?? 0);
    const body = { answer };
    console.log('submit problemId', pid, body);
    submitMutation.mutate(
      { problemId: pid, submitProblemBody: body },
      {
        onSuccess: (res) => {
          setSubmissionResult({
            isCorrect: res.isCorrect,
            explanation: res.explanation,
            aiFeedback: res.aiFeedback ?? null,
            currentGate: res.currentGate ?? null,
            reviewCount: res.reviewCount ?? null,
            nextReviewDate: res.nextReviewDate ?? null,
            isFirstAttempt: res.isFirstAttempt ?? false,
            isReviewStateChanged: res.isReviewStateChanged ?? false,
          });
          setShowResult(true);
        },
      },
    );
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
    const pid = Number(problemDetail?.problemId ?? 0);
    if (!pid) return;
    reviewInclusionMutation.mutate(
      { problemId: pid, reviewInclusionBody: { includeInReview: true } },
      {
        onSuccess: () => {
          setShowReviewModal(false);
          handleGoBack();
        },
      },
    );
  };

  const handleSkipReview = () => {
    setShowReviewModal(false);
    handleGoBack();
  };

  const isCorrect = submissionResult?.isCorrect ?? false;

  if (isLoading || !problemDetail) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SolveHeader
        onBack={handleGoBack}
        questionType={questionTypeLabel}
        category={categoryLabel}
        title={problemDetail?.question ?? ''}
      />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative">
        {!showResult &&
          (problemDetail?.problemType === 'SHORT' || problemDetail?.problemType === 'SUBJECTIVE') &&
          submitMutation.isPending && (
            <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-6 rounded-lg">
              <i className="ri-loader-4-line animate-spin text-3xl text-blue-600 mb-3"></i>
              <div className="text-gray-900 font-medium mb-1">채점 중입니다...</div>
              <div className="text-gray-600 text-sm">AI 채점은 최대 1분이 걸릴 수 있어요.</div>
            </div>
          )}
        {!showResult ? (
          <>
            <SolveQuestion content={problemDetail?.question ?? ''} />

            {(problemDetail?.problemType === 'MCQ' || problemDetail?.problemType === 'OX') && (
              <SolveOptions
                options={
                  problemDetail?.problemType === 'MCQ' ? (problemDetail?.choices ?? []) : ['O', 'X']
                }
                selectedAnswer={selectedAnswer}
                onSelect={handleAnswerSelect}
                onCancel={handleGoBack}
                onSubmit={handleSubmit}
                isSubmitDisabled={selectedAnswer === null || submitMutation.isPending}
              />
            )}

            {(problemDetail?.problemType === 'SHORT' ||
              problemDetail?.problemType === 'SUBJECTIVE') && (
              <SolveTextAnswer
                value={textAnswer}
                onChange={setTextAnswer}
                onCancel={handleGoBack}
                onSubmit={handleSubmit}
                isSubmitDisabled={textAnswer.trim().length === 0 || submitMutation.isPending}
              />
            )}
          </>
        ) : (
          <>
            <SolveResult
              isCorrect={isCorrect}
              correctAnswerText={problemDetail?.choices?.[0] ?? ''}
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
        title={problemDetail?.question ?? ''}
        onSkip={handleSkipReview}
        onAdd={handleAddToReview}
      />
    </div>
  );
};

export default SolvePage;
