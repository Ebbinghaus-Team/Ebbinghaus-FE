import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createProblem, submitProblem, getProblemDetail } from '.';
import { showApiErrorToast } from '../../utils/api/showApiErrorToast';
import type {
  CreateProblemVariables,
  CreateProblemResponse,
  SubmitProblemVariables,
  SubmitProblemResponse,
  ProblemDetailResponse,
} from '../../types/problem';
import type { ApiError } from '../../types/common';

export const useCreateProblemMutation = () =>
  useMutation<CreateProblemResponse, ApiError, CreateProblemVariables>({
    mutationFn: ({ studyRoomId, createProblemBody }) =>
      createProblem(studyRoomId, createProblemBody),
    onSuccess: () => {
      toast.success('문제가 등록되었습니다.');
    },
    onError: showApiErrorToast,
  });

export const useSubmitProblemMutation = () =>
  useMutation<SubmitProblemResponse, ApiError, SubmitProblemVariables>({
    mutationFn: ({ problemId, submitProblemBody }) => submitProblem(problemId, submitProblemBody),
    onError: showApiErrorToast,
  });

export const useProblemDetailQuery = (problemId: number) =>
  useQuery<ProblemDetailResponse, ApiError>({
    queryKey: ['problem', problemId],
    queryFn: () => getProblemDetail(problemId),
    enabled: Number.isFinite(problemId) && problemId > 0,
  });
