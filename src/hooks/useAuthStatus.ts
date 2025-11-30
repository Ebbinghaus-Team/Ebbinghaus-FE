import { useGroupStudyRoomsQuery, usePersonalStudyRoomsQuery } from '../api/studyRoom/hooks';

export function useAuthStatus() {
  const personal = usePersonalStudyRoomsQuery();
  const group = useGroupStudyRoomsQuery();

  const personalUnauthorized = personal?.error?.status === 401;
  const groupUnauthorized = group?.error?.status === 401;

  const isLoading = personal.isLoading || group.isLoading;
  const isLoggedIn = !personalUnauthorized || !groupUnauthorized;

  return { isLoggedIn, isLoading };
}


