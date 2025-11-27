import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createProblem } from '.';
import { showApiErrorToast } from '../../utils/api/showApiErrorToast';
import type { CreateProblemVariables, CreateProblemResponse } from '../../types/problem';
import type { ApiError } from '../../types/common';

export const useCreateProblemMutation = () =>
  useMutation<CreateProblemResponse, ApiError, CreateProblemVariables>({
    mutationFn: ({ studyRoomId, createProblemBody }) =>
      createProblem(studyRoomId, createProblemBody),
  });
