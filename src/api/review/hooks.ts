import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getTodayReviewProblems, setReviewInclusion } from '.';
import type {
  TodayReviewProblemResponse,
  ReviewInclusionVariables,
  ReviewInclusionResponse,
} from '../../types/review';
import type { ApiError } from '../../types/common';
import { showApiErrorToast } from '../../utils/api/showApiErrorToast';

export const useTodayReviewProblemsQuery = () =>
  useQuery<TodayReviewProblemResponse, ApiError>({
    queryKey: ['today', 'review', 'problems'],
    queryFn: getTodayReviewProblems,
    staleTime: Infinity,
  });

export const useReviewInclusionMutation = () =>
  useMutation<ReviewInclusionResponse, ApiError, ReviewInclusionVariables>({
    mutationFn: ({ problemId, reviewInclusionBody }) =>
      setReviewInclusion(problemId, reviewInclusionBody),
    onSuccess: (data) => {
      toast.success(data?.message ?? '복습 루프 설정이 완료되었습니다.');
    },
    onError: showApiErrorToast,
  });
