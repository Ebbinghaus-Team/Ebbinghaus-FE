import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../api/auth/hooks';
import { useGroupStudyRoomsQuery, usePersonalStudyRoomsQuery } from '../../api/studyRoom/hooks';
import toast from 'react-hot-toast';
import { useAuthStatus } from '../../hooks/useAuthStatus';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const logoutMutation = useLogoutMutation();
  const { data: personalRooms } = usePersonalStudyRoomsQuery();
  const { data: groupRooms } = useGroupStudyRoomsQuery();
  const hasPersonalRoom = (personalRooms?.rooms?.length ?? 0) > 0;
  const hasGroupRoom = (groupRooms?.rooms?.length ?? 0) > 0;
  const hasAnyRoom = hasPersonalRoom || hasGroupRoom;
  const { isLoggedIn } = useAuthStatus();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="text-2xl font-bold text-indigo-600">StudyLoop</div>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              홈
            </Link>
            <Link
              to={hasAnyRoom ? '/create' : '#'}
              onClick={(e) => {
                if (!hasAnyRoom) {
                  e.preventDefault();
                  toast.error('개인/그룹 공부방이 없습니다. 먼저 공부방을 생성하세요.');
                }
              }}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/create')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              } ${!hasAnyRoom ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              문제 만들기
            </Link>
            <Link
              to="/review"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/review')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              오늘의 복습
            </Link>
            <Link
              to="/personal-study"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/personal-study')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              개인 스터디
            </Link>
            <Link
              to="/groups"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/groups')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              그룹 스터디
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {!isLoggedIn && (
              <Link to="/login">
                <button className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 px-3 py-1.5 text-sm">
                  로그인
                </button>
              </Link>
            )}
            {isLoggedIn && (
              <>
                <button
                  className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                  aria-label="프로필"
                  title="마이페이지 준비 중입니다"
                >
                  <i className="ri-user-3-line text-gray-700 text-base"></i>
                </button>
                <button
                  onClick={() =>
                    logoutMutation.mutate(undefined, {
                      onSuccess: () => navigate('/login', { replace: true }),
                    })
                  }
                  disabled={logoutMutation.isPending}
                  className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 px-3 py-1.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  로그아웃
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
