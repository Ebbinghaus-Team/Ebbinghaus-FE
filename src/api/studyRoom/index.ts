import type { ApiError } from '../../types/common';
import type {
  CreatePersonalStudyRoomBody,
  CreatePersonalStudyRoomResponse,
  CreateGroupStudyRoomBody,
  CreateGroupStudyRoomResponse,
  PersonalStudyProblemsResponse,
} from '../../types/studyRoom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createPersonalStudyRoom(
  body: CreatePersonalStudyRoomBody,
): Promise<CreatePersonalStudyRoomResponse> {
  const res = await fetch(`${BASE_URL}/study-rooms/personal`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    const error: ApiError = {
      status: res.status,
      title: data?.title ?? '개인 공부방 생성 오류',
      detail: data?.detail ?? '개인 공부방 생성 중 오류가 발생했습니다.',
      instance: data?.instance ?? '/api/study-rooms/personal',
    };
    throw error;
  }

  return data as CreatePersonalStudyRoomResponse;
}

// 그룹 스터디 생성 API
// Endpoint: POST /api/study-rooms/group
export async function createGroupStudyRoom(
  body: CreateGroupStudyRoomBody,
): Promise<CreateGroupStudyRoomResponse> {
  const res = await fetch(`${BASE_URL}/study-rooms/group`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    const error: ApiError = {
      status: res.status,
      title: data?.title ?? '그룹 스터디 생성 오류',
      detail: data?.detail ?? '그룹 스터디 생성 중 오류가 발생했습니다.',
      instance: data?.instance ?? '/api/study-rooms/group',
    };
    throw error;
  }

  return data as CreateGroupStudyRoomResponse;
}

export async function getPersonalStudyRoomProblems(
  studyRoomId: number,
): Promise<PersonalStudyProblemsResponse> {
  const res = await fetch(`${BASE_URL}/study-rooms/personal/${studyRoomId}/problems`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    const error: ApiError = {
      status: res.status,
      title: data?.title ?? '개인 공부방 문제 조회 오류',
      detail: data?.detail ?? '개인 공부방 문제를 조회하는 중 오류가 발생했습니다.',
      instance: data?.instance ?? `/api/study-rooms/personal/${studyRoomId}/problems`,
    };
    throw error;
  }

  return data as PersonalStudyProblemsResponse;
}
