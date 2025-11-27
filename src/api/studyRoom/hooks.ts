import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createPersonalStudyRoom, createGroupStudyRoom } from '.';
import { showApiErrorToast } from '../../utils/api/showApiErrorToast';
import type {
  CreatePersonalStudyRoomBody,
  CreatePersonalStudyRoomResponse,
  CreateGroupStudyRoomBody,
  CreateGroupStudyRoomResponse,
} from '../../types/studyRoom';
import type { ApiError } from '../../types/common';

export const useCreatePersonalStudyRoomMutation = () =>
  useMutation<CreatePersonalStudyRoomResponse, ApiError, CreatePersonalStudyRoomBody>({
    mutationFn: (createPersonalStudyRoomBody) =>
      createPersonalStudyRoom(createPersonalStudyRoomBody),
    onSuccess: () => {
      toast.success('개인 공부방이 생성되었습니다.');
    },
    onError: showApiErrorToast,
  });

export const useCreateGroupStudyRoomMutation = () =>
  useMutation<CreateGroupStudyRoomResponse, ApiError, CreateGroupStudyRoomBody>({
    mutationFn: (createGroupStudyRoomBody) => createGroupStudyRoom(createGroupStudyRoomBody),
    onSuccess: () => {
      toast.success('그룹 스터디가 생성되었습니다.');
    },
    onError: showApiErrorToast,
  });
