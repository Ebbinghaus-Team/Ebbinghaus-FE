import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createPersonalStudyRoom } from '.';
import { showApiErrorToast } from '../../utils/api/showApiErrorToast';
import type {
  CreatePersonalStudyRoomBody,
  CreatePersonalStudyRoomResponse,
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
