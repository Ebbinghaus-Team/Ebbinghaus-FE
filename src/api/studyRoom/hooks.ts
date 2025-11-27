import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  createPersonalStudyRoom,
  createGroupStudyRoom,
  getPersonalStudyRoomProblems,
  getPersonalStudyRooms,
} from '.';
import { showApiErrorToast } from '../../utils/api/showApiErrorToast';
import type {
  CreatePersonalStudyRoomBody,
  CreatePersonalStudyRoomResponse,
  CreateGroupStudyRoomBody,
  CreateGroupStudyRoomResponse,
  PersonalStudyProblemsResponse,
  PersonalStudyRoomsResponse,
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

export const useCreateGroupStudyRoomMutation = () =>
  useMutation<CreateGroupStudyRoomResponse, ApiError, CreateGroupStudyRoomBody>({
    mutationFn: (createGroupStudyRoomBody) => createGroupStudyRoom(createGroupStudyRoomBody),
    onSuccess: () => {
      toast.success('그룹 스터디가 생성되었습니다.');
    },
    onError: showApiErrorToast,
  });

export const usePersonalStudyRoomProblemsQuery = (studyRoomId: number) =>
  useQuery<PersonalStudyProblemsResponse, ApiError>({
    queryKey: ['problems', studyRoomId, 'personal'],
    queryFn: () => getPersonalStudyRoomProblems(studyRoomId),
  });

export const usePersonalStudyRoomsQuery = () =>
  useQuery<PersonalStudyRoomsResponse, ApiError>({
    queryKey: ['study-rooms', 'personal'],
    queryFn: getPersonalStudyRooms,
    staleTime: Infinity,
  });
