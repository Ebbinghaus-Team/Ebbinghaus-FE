import type { ApiError } from '../../types/common';
import type {
  CreateProblemBody,
  CreateProblemResponse,
  SubmitProblemBody,
  SubmitProblemResponse,
  ProblemDetailResponse,
} from '../../types/problem';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createProblem(
  studyRoomId: number,
  body: CreateProblemBody,
): Promise<CreateProblemResponse> {
  const res = await fetch(`${BASE_URL}/study-rooms/${studyRoomId}/problems`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    const error: ApiError = {
      status: res.status,
      title: data?.title ?? '문제 생성 오류',
      detail: data?.detail ?? '문제 생성 중 오류가 발생했습니다.',
      instance: data?.instance ?? `/api/study-rooms/${studyRoomId}/problems`,
    };
    throw error;
  }

  return data as CreateProblemResponse;
}

export async function submitProblem(
  problemId: number,
  body: SubmitProblemBody,
): Promise<SubmitProblemResponse> {
  const res = await fetch(`${BASE_URL}/${problemId}/submit`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    const error: ApiError = {
      status: res.status,
      title: data?.title ?? '문제 제출 오류',
      detail: data?.detail ?? '문제 제출 중 오류가 발생했습니다.',
      instance: data?.instance ?? `/api/problems/${problemId}/submit`,
    };
    throw error;
  }

  return data as SubmitProblemResponse;
}

export async function getProblemDetail(problemId: number): Promise<ProblemDetailResponse> {
  const res = await fetch(`${BASE_URL}/problems/${problemId}`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    const error: ApiError = {
      status: res.status,
      title: data?.title ?? '문제 조회 오류',
      detail: data?.detail ?? '문제를 조회하는 중 오류가 발생했습니다.',
      instance: data?.instance ?? `/api/problems/${problemId}`,
    };
    throw error;
  }

  return data as ProblemDetailResponse;
}
