import type { ApiError } from '../../types/common';
import type {
  TodayReviewProblemResponse,
  ReviewInclusionBody,
  ReviewInclusionResponse,
} from '../../types/review';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getTodayReviewProblems(): Promise<TodayReviewProblemResponse> {
  const res = await fetch(`${BASE_URL}/review/today`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    const error: ApiError = {
      status: res.status,
      title: data?.title ?? '오늘의 복습 문제 조회 오류',
      detail: data?.detail ?? '오늘의 복습 문제를 조회하는 중 오류가 발생했습니다.',
      instance: data?.instance ?? '/api/review/today',
    };
    throw error;
  }

  return data as TodayReviewProblemResponse;
}

export async function setReviewInclusion(
  problemId: number,
  body: ReviewInclusionBody,
): Promise<ReviewInclusionResponse> {
  const res = await fetch(`${BASE_URL}/problems/${problemId}/review-inclusion`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    const error: ApiError = {
      status: res.status,
      title: data?.title ?? '복습 루프 설정 오류',
      detail: data?.detail ?? '복습 루프 설정 중 오류가 발생했습니다.',
      instance: data?.instance ?? `/api/problems/${problemId}/review-inclusion`,
    };
    throw error;
  }

  return data as ReviewInclusionResponse;
}
