import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const SolvePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const questionId = searchParams.get('id');
  const from = searchParams.get('from');

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

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
    console.log('복습 문제셋에 추가:', question);
    setShowReviewModal(false);
    handleGoBack();
  };

  const handleSkipReview = () => {
    setShowReviewModal(false);
    handleGoBack();
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button
          onClick={handleGoBack}
          className="flex items-center text-gray-500 hover:text-gray-700 mb-4"
        >
          <i className="ri-arrow-left-line text-xl mr-2"></i>뒤로 가기
        </button>
        <div className="flex items-center space-x-3 mb-2">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            {question.type}
          </span>
          <span className="text-sm text-gray-500">{question.category}</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{question.title}</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {!showResult ? (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">문제</h2>
              <p className="text-gray-700 text-lg leading-relaxed">{question.content}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-900 mb-4">답안 선택</h3>
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={index}
                      checked={selectedAnswer === index}
                      onChange={() => handleAnswerSelect(index)}
                      className="text-blue-600"
                    />
                    <span className="text-gray-900">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleGoBack}
                className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 px-4 py-2 text-base"
              >
                취소
              </button>
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 px-4 py-2 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                답안 제출
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-6">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  isCorrect ? 'bg-green-100' : 'bg-red-100'
                }`}
              >
                <i
                  className={`text-2xl ${
                    isCorrect ? 'ri-check-line text-green-600' : 'ri-close-line text-red-600'
                  }`}
                ></i>
              </div>
              <h2
                className={`text-2xl font-bold mb-2 ${
                  isCorrect ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {isCorrect ? '정답입니다!' : '틀렸습니다'}
              </h2>
              <p className="text-gray-600">정답: {question.options[question.correctAnswer]}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">해설</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">{question.explanation}</p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleResultNext}
                className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 px-4 py-2 text-base"
              >
                확인
              </button>
            </div>
          </>
        )}
      </div>

      {/* 복습 추가 모달 */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <i className="ri-check-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">문제 풀이 완료!</h3>
              <p className="text-gray-600 text-sm">"{question.title}" 문제를 완료했습니다.</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                복습 문제셋에 추가하시겠습니까?
              </h4>
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

export default SolvePage;
