import type { ApiError } from '../../types/common';
import type { SignupBody, SignupResponse, LoginBody, LoginResponse } from '../../types/auth';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function signup(body: SignupBody): Promise<SignupResponse> {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    const error: ApiError = {
      status: res.status,
      title: data?.title ?? '회원가입 오류',
      detail: data?.detail ?? '회원가입 중 오류가 발생했습니다.',
      instance: data?.instance ?? '/api/auth/signup',
    };
    throw error;
  }
  return data as SignupResponse;
}

export async function login(body: LoginBody): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    const error: ApiError = {
      status: res.status,
      title: data?.title ?? '로그인 오류',
      detail: data?.detail ?? '로그인 중 오류가 발생했습니다.',
      instance: data?.instance ?? '/api/auth/login',
    };
    throw error;
  }

  return data as LoginResponse;
}

export async function logout(): Promise<void> {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  const data = await res.json().catch(() => undefined);

  if (!res.ok) {
    const error: ApiError = {
      status: res.status,
      title: data?.title ?? '로그아웃 오류',
      detail: data?.detail ?? '로그아웃 중 오류가 발생했습니다.',
      instance: data?.instance ?? '/api/auth/logout',
    };
    throw error;
  }
  return;
}
