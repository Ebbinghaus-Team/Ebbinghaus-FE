
import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 로직 구현
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link className="inline-block" to="/">
            <div className="text-3xl font-bold text-blue-600 mb-2">StudyLoop</div>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">로그인</h2>
          <p className="mt-2 text-sm text-gray-600">계정에 로그인하세요</p>
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
            <button 
              type="submit"
              className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 px-6 py-3 text-lg w-full"
            >
              로그인
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">또는</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 px-4 py-2 text-base w-full">
                <i className="ri-google-fill text-red-500 mr-2"></i>Google
              </button>
              <button className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 px-4 py-2 text-base w-full">
                <i className="ri-kakao-talk-fill text-yellow-500 mr-2"></i>Kakao
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button 
              type="button" 
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              계정이 없으신가요? 회원가입
            </button>
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

export default LoginPage;
