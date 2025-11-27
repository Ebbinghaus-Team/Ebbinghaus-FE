import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { signup } from '.';
import { showApiErrorToast } from '../../utils/api/showApiErrorToast';
import type { SignupBody, SignupResponse } from '../../types/auth';
import type { ApiError } from '../../types/common';

export const useSignupMutation = () =>
  useMutation<SignupResponse, ApiError, SignupBody>({
    mutationFn: (signupBody) => signup(signupBody),
    onSuccess: () => {
      toast.success('회원가입 되었습니다.');
    },
    onError: showApiErrorToast,
  });
