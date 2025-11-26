import { type RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/home/page'));
const CreatePage = lazy(() => import('../pages/create/page'));
const ReviewPage = lazy(() => import('../pages/review/page'));
const SolvePage = lazy(() => import('../pages/solve/page'));
const PersonalStudyPage = lazy(() => import('../pages/personal-study/page'));
const PersonalStudyDetailPage = lazy(() => import('../pages/personal-study/[id]/page'));
const GroupsPage = lazy(() => import('../pages/groups/page'));
const GroupDetailPage = lazy(() => import('../pages/groups/[id]/page'));
const DashboardPage = lazy(() => import('../pages/dashboard/page'));
const LoginPage = lazy(() => import('../pages/login/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/create', element: <CreatePage /> },
  { path: '/review', element: <ReviewPage /> },
  { path: '/solve', element: <SolvePage /> },
  { path: '/personal-study', element: <PersonalStudyPage /> },
  { path: '/personal-study/:id', element: <PersonalStudyDetailPage /> },
  { path: '/groups', element: <GroupsPage /> },
  { path: '/groups/:id', element: <GroupDetailPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '*', element: <NotFoundPage /> },
];

export default routes;
