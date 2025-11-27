import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { signup, login, logout } from '.';
import { showApiErrorToast } from '../../utils/api/showApiErrorToast';
import type { SignupBody, SignupResponse, LoginBody, LoginResponse } from '../../types/auth';
import type { ApiError } from '../../types/common';

export const useSignupMutation = () =>
  useMutation<SignupResponse, ApiError, SignupBody>({
    mutationFn: (signupBody) => signup(signupBody),
    onSuccess: () => {
      toast.success('회원가입 되었습니다.');
    },
    onError: showApiErrorToast,
  });

export const useLoginMutation = () =>
  useMutation<LoginResponse, ApiError, LoginBody>({
    mutationFn: (loginBody) => login(loginBody),
    onSuccess: () => {
      toast.success('로그인 되었습니다.');
    },
    onError: showApiErrorToast,
  });

export const useLogoutMutation = () =>
  useMutation<void, ApiError, void>({
    mutationFn: logout,
    onSuccess: () => {
      toast.success('로그아웃 되었습니다.');
    },
    onError: showApiErrorToast,
  });
