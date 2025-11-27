import type { ApiError } from '../../types/common';
import type {
  CreatePersonalStudyRoomBody,
  CreatePersonalStudyRoomResponse,
  CreateGroupStudyRoomBody,
  CreateGroupStudyRoomResponse,
  PersonalStudyProblemsResponse,
  PersonalStudyRoomsResponse,
  GroupStudyRoomsResponse,
  JoinGroupStudyRoomBody,
  JoinGroupStudyRoomResponse,
  GroupStudyRoomProblemsResponse,
  GroupStudyRoomMembersResponse,
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

export async function getPersonalStudyRooms(): Promise<PersonalStudyRoomsResponse> {
  const res = await fetch(`${BASE_URL}/study-rooms/personal`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    const error: ApiError = {
      status: res.status,
      title: data?.title ?? '개인 공부방 조회 오류',
      detail: data?.detail ?? '개인 공부방을 조회하는 중 오류가 발생했습니다.',
      instance: data?.instance ?? `/api/study-rooms/personal`,
    };
    throw error;
  }

  return data as PersonalStudyRoomsResponse;
}

export async function getGroupStudyRooms(): Promise<GroupStudyRoomsResponse> {
  const res = await fetch(`${BASE_URL}/study-rooms/group`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    const error: ApiError = {
      status: res.status,
      title: data?.title ?? '그룹 스터디룸 조회 오류',
      detail: data?.detail ?? '그룹 스터디룸을 조회하는 중 오류가 발생했습니다.',
      instance: data?.instance ?? `/api/study-rooms/group`,
    };
    throw error;
  }

  return data as GroupStudyRoomsResponse;
}

export async function joinGroupStudyRoom(
  body: JoinGroupStudyRoomBody,
): Promise<JoinGroupStudyRoomResponse> {
  const res = await fetch(`${BASE_URL}/study-rooms/group/join`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    const error: ApiError = {
      status: res.status,
      title: data?.title ?? '그룹 스터디 참여 오류',
      detail: data?.detail ?? '그룹 스터디 참여 중 오류가 발생했습니다.',
      instance: data?.instance ?? '/api/study-rooms/group/join',
    };
    throw error;
  }

  return data as JoinGroupStudyRoomResponse;
}

export async function getGroupStudyRoomProblems(
  studyRoomId: number,
): Promise<GroupStudyRoomProblemsResponse> {
  const res = await fetch(`${BASE_URL}/study-rooms/group/${studyRoomId}/problems`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    const error: ApiError = {
      status: res.status,
      title: data?.title ?? '그룹 스터디룸 문제 조회 오류',
      detail: data?.detail ?? '그룹 스터디룸 문제를 조회하는 중 오류가 발생했습니다.',
      instance: data?.instance ?? `/api/study-rooms/group/${studyRoomId}/problems`,
    };
    throw error;
  }

  return data as GroupStudyRoomProblemsResponse;
}

export async function getGroupStudyRoomMembers(
  studyRoomId: number,
): Promise<GroupStudyRoomMembersResponse> {
  const res = await fetch(`${BASE_URL}/study-rooms/group/${studyRoomId}/members`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    const error: ApiError = {
      status: res.status,
      title: data?.title ?? '그룹 스터디룸 맴버 조회 오류',
      detail: data?.detail ?? '그룹 스터디룸 맴버를 조회하는 중 오류가 발생했습니다.',
      instance: data?.instance ?? `/api/study-rooms/group/${studyRoomId}/members`,
    };
    throw error;
  }

  return data as GroupStudyRoomMembersResponse;
}
