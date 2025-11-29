import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../../api/auth/hooks';

const SignupPage = () => {
  const navigate = useNavigate();
  const signupMutation = useSignupMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [receiveNotifications, setReceiveNotifications] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signupMutation.mutate(
      { email, password, username, receiveNotifications },
      {
        onSuccess: () => {
          navigate('/login', { replace: true });
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link className="inline-block" to="/">
            <div className="text-3xl font-bold text-blue-600 mb-2">StudyLoop</div>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">회원가입</h2>
          <p className="mt-2 text-sm text-gray-600">새 계정을 만들어 시작하세요</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
                placeholder="이메일을 입력하세요"
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
                placeholder="비밀번호를 입력하세요"
                required
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">이름(닉네임)</label>
              <input
                className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300"
                placeholder="표시할 이름을 입력하세요"
                required
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="flex items-center">
              <input
                id="receiveNotifications"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={receiveNotifications}
                onChange={(e) => setReceiveNotifications(e.target.checked)}
              />
              <label htmlFor="receiveNotifications" className="ml-2 block text-sm text-gray-700">
                알림 수신에 동의합니다
              </label>
            </div>

            <button
              type="submit"
              disabled={signupMutation.isPending}
              className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 px-6 py-3 text-lg w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {signupMutation.isPending ? '처리 중...' : '회원가입'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">이미 계정이 있으신가요? </span>
            <Link to="/login" className="text-sm text-blue-600 hover:text-blue-500">
              로그인
            </Link>
          </div>
        </div>

        <div className="text-center">
          <Link className="text-sm text-gray-500 hover:text-gray-700" to="/">
            ← 홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
