import { useGroupStudyRoomsQuery, usePersonalStudyRoomsQuery } from '../api/studyRoom/hooks';

export function useAuthStatus() {
  const personal = usePersonalStudyRoomsQuery();
  const group = useGroupStudyRoomsQuery();

  const isLoading = personal.isLoading || group.isLoading;

  const personalStatus = personal.status; // 'pending' | 'success' | 'error'
  const groupStatus = group.status;

  const personalUnauthorized = personal.error?.status === 401;
  const groupUnauthorized = group.error?.status === 401;

  const anyUnauthorized = personalUnauthorized || groupUnauthorized;
  const allSuccess = personalStatus === 'success' && groupStatus === 'success';
  const anyPending = personalStatus === 'pending' || groupStatus === 'pending';
  const isLoggedIn = allSuccess ? true : anyUnauthorized ? false : null;

  return { isLoggedIn, isLoading: anyPending || isLoading };
}
