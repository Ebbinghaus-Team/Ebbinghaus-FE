import { useQuery } from '@tanstack/react-query';
import { getTodayReviewProblems } from '.';
import type { TodayReviewProblemResponse } from '../../types/review';
import type { ApiError } from '../../types/common';

export const useTodayReviewProblemsQuery = () =>
  useQuery<TodayReviewProblemResponse, ApiError>({
    queryKey: ['today', 'review', 'problems'],
    queryFn: getTodayReviewProblems,
    staleTime: Infinity,
  });
