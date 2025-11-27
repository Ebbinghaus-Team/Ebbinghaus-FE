import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  createPersonalStudyRoom,
  createGroupStudyRoom,
  getPersonalStudyRoomProblems,
  getPersonalStudyRooms,
  getGroupStudyRooms,
  joinGroupStudyRoom,
  getGroupStudyRoomProblems,
} from '.';
import { showApiErrorToast } from '../../utils/api/showApiErrorToast';
import type {
  CreatePersonalStudyRoomBody,
  CreatePersonalStudyRoomResponse,
  CreateGroupStudyRoomBody,
  CreateGroupStudyRoomResponse,
  PersonalStudyRoomProblemsResponse,
  PersonalStudyRoomsResponse,
  GroupStudyRoomsResponse,
  JoinGroupStudyRoomBody,
  JoinGroupStudyRoomResponse,
  GroupStudyRoomProblemsResponse,
} from '../../types/studyRoom';
import type { ApiError } from '../../types/common';

export const useCreatePersonalStudyRoomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<CreatePersonalStudyRoomResponse, ApiError, CreatePersonalStudyRoomBody>({
    mutationFn: (createPersonalStudyRoomBody) =>
      createPersonalStudyRoom(createPersonalStudyRoomBody),
    onSuccess: () => {
      toast.success('개인 공부방이 생성되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['study-rooms', 'personal'],
      });
    },
    onError: showApiErrorToast,
  });
};

export const useCreateGroupStudyRoomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateGroupStudyRoomResponse, ApiError, CreateGroupStudyRoomBody>({
    mutationFn: (createGroupStudyRoomBody) => createGroupStudyRoom(createGroupStudyRoomBody),
    onSuccess: () => {
      toast.success('그룹 스터디가 생성되었습니다.');

      queryClient.invalidateQueries({
        queryKey: ['study-rooms', 'group'],
      });
    },
    onError: showApiErrorToast,
  });
};

export const usePersonalStudyRoomProblemsQuery = (studyRoomId: number) =>
  useQuery<PersonalStudyRoomProblemsResponse, ApiError>({
    queryKey: ['personal-study-room', studyRoomId, 'problems'],
    queryFn: () => getPersonalStudyRoomProblems(studyRoomId),
  });

export const useGroupStudyRoomProblemsQuery = (studyRoomId: number) =>
  useQuery<GroupStudyRoomProblemsResponse, ApiError>({
    queryKey: ['group-study-room', studyRoomId, 'problems'],
    queryFn: () => getGroupStudyRoomProblems(studyRoomId),
  });

export const usePersonalStudyRoomsQuery = () =>
  useQuery<PersonalStudyRoomsResponse, ApiError>({
    queryKey: ['study-rooms', 'personal'],
    queryFn: getPersonalStudyRooms,
    staleTime: Infinity,
  });

export const useGroupStudyRoomsQuery = () =>
  useQuery<GroupStudyRoomsResponse, ApiError>({
    queryKey: ['study-rooms', 'group'],
    queryFn: getGroupStudyRooms,
    staleTime: Infinity,
  });

export const useJoinGroupStudyRoomMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<JoinGroupStudyRoomResponse, ApiError, JoinGroupStudyRoomBody>({
    mutationFn: (joinGroupStudyRoomBody) => joinGroupStudyRoom(joinGroupStudyRoomBody),
    onSuccess: () => {
      toast.success('그룹 스터디 참여에 성공하였습니다.');

      queryClient.invalidateQueries({
        queryKey: ['study-rooms', 'group'],
      });
    },
    onError: showApiErrorToast,
  });
};
