import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useLogoutMutation } from '../../api/auth/hooks';
import { useGroupStudyRoomsQuery, usePersonalStudyRoomsQuery } from '../../api/studyRoom/hooks';
import { useAuthStatus } from '../../hooks/useAuthStatus';

type NavItem = {
  label: string;
  to: string;
  requiresRoom?: boolean;
};

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

  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const closeMobile = () => setMobileOpen(false);

  const navItems: NavItem[] = [
    { label: '문제 만들기', to: '/create', requiresRoom: true },
    { label: '오늘의 복습', to: '/review' },
    { label: '개인 스터디', to: '/personal-study' },
    { label: '그룹 스터디', to: '/groups' },
  ];

  const desktopLinkClass = (to: string) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive(to)
        ? 'text-blue-600 bg-blue-50'
        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
    }`;

  const mobileLinkClass = (to: string) =>
    `block w-full px-4 py-4 text-base font-medium transition-colors ${
      isActive(to) ? 'text-blue-600 bg-blue-50' : 'text-gray-800 hover:bg-gray-50'
    }`;

  const handleNavClick = (item: NavItem) => (e: React.MouseEvent) => {
    if (item.requiresRoom && !hasAnyRoom) {
      e.preventDefault();
      toast.error('개인/그룹 공부방이 없습니다. 먼저 공부방을 생성하세요.');
      return;
    }
    closeMobile();
  };

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        closeMobile();
        navigate('/login', { replace: true });
      },
    });
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMobile}>
              <div className="text-2xl font-bold text-blue-600">StudyLoop</div>
            </Link>
          </div>

          <nav className="hidden md:flex space-x-2">
            {navItems.map((item) => {
              const disabled = item.requiresRoom && !hasAnyRoom;
              return (
                <Link
                  key={item.to}
                  to={disabled ? '#' : item.to}
                  onClick={handleNavClick(item)}
                  className={`${desktopLinkClass(item.to)} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="메뉴"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {mobileOpen ? (
                  <>
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </>
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>

            {!isLoggedIn && (
              <Link to="/login" onClick={closeMobile}>
                <button className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 px-3 py-1.5 text-sm">
                  로그인
                </button>
              </Link>
            )}

            {isLoggedIn && (
              <>
                <button
                  onClick={() =>
                    toast('마이페이지 기능은 현재 준비 중입니다', {
                      icon: '🛠️',
                    })
                  }
                  className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                  aria-label="프로필"
                  title="마이페이지 준비 중입니다"
                >
                  <i className="ri-user-3-line text-gray-700 text-base"></i>
                </button>

                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="hidden sm:inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 px-3 py-1.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  로그아웃
                </button>
              </>
            )}
          </div>
        </div>

        <div className={`md:hidden ${mobileOpen ? 'block' : 'hidden'}`}>
          <nav className="mt-2 bg-white border-t border-gray-200 divide-y divide-gray-200">
            {navItems.map((item) => {
              const disabled = item.requiresRoom && !hasAnyRoom;
              return (
                <Link
                  key={item.to}
                  to={disabled ? '#' : item.to}
                  onClick={handleNavClick(item)}
                  className={`${mobileLinkClass(item.to)} ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="w-full px-4 py-4 text-base font-medium text-gray-800 hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                로그아웃
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
