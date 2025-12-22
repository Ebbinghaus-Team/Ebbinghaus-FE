import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './router/ScrollToTop';
import RootLayout from './layouts/RootLayout';
import { defaultQueryRetry } from './utils/query/defaultQueryRetry';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: defaultQueryRetry, refetchOnWindowFocus: false },
    mutations: { retry: defaultQueryRetry },
  },
});

const HomePage = lazy(() => import('./pages/home/page'));
const CreatePage = lazy(() => import('./pages/create/page'));
const ReviewPage = lazy(() => import('./pages/review/page'));
const SolvePage = lazy(() => import('./pages/solve/page'));
const PersonalStudyPage = lazy(() => import('./pages/personal-study/page'));
const PersonalStudyDetailPage = lazy(() => import('./pages/personal-study/[id]/page'));
const GroupsPage = lazy(() => import('./pages/groups/page'));
const GroupDetailPage = lazy(() => import('./pages/groups/[id]/page'));
const DashboardPage = lazy(() => import('./pages/dashboard/page'));
const LoginPage = lazy(() => import('./pages/login/page'));
const SignupPage = lazy(() => import('./pages/signup/page'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const TeamInfoPage = lazy(() => import('./pages/teamInfo/page'));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="create" element={<CreatePage />} />
              <Route path="review" element={<ReviewPage />} />
              <Route path="solve" element={<SolvePage />} />
              <Route path="personal-study" element={<PersonalStudyPage />} />
              <Route path="personal-study/:id" element={<PersonalStudyDetailPage />} />
              <Route path="groups" element={<GroupsPage />} />
              <Route path="groups/:id" element={<GroupDetailPage />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="team-info" element={<TeamInfoPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        toastOptions={{
          duration: 2200,
          style: {
            padding: '12px 16px',
            borderRadius: '14px',
            background: '#ffffff',
            color: '#0f172a',
            fontSize: '14px',
            fontWeight: 500,
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 20px -5px rgba(2,6,23,0.08), 0 4px 8px -4px rgba(2,6,23,0.08)',
          },

          success: {
            iconTheme: {
              primary: '#2563eb',
              secondary: '#eff6ff',
            },
          },

          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fef2f2',
            },
          },

          loading: {
            iconTheme: {
              primary: '#2563eb',
              secondary: '#eff6ff',
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
