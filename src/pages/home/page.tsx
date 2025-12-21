import { Link } from 'react-router-dom';
import {
  ClockArrowUp,
  Repeat,
  RotateCcwSquare,
  SquarePen,
  Bot,
  User,
  Users,
  ArrowRight,
  Check,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                단기 기억을
                <br />
                <span className="text-blue-600">장기 기억으로</span>
                <br />
                전환하는 학습 루프
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                문제를 직접 만들고, 과학적 복습 주기로 반복 학습하여
                <br />
                진정한 이해와 장기 기억을 만들어보세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/create">
                  <button className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 px-8 py-4 text-lg">
                    문제 만들기 시작하기
                  </button>
                </Link>
                <Link to="/review">
                  <button className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 px-8 py-4 text-lg">
                    오늘의 복습 보기
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 현재 학습의 문제점 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">기존 학습 방식의 한계</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              지금의 공부 방식, 무엇이 문제일까요?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-red-50 border border-red-100">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <ClockArrowUp className="w-7 h-7 text-red-600" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">빠른 망각</h3>
              <p className="text-gray-600 text-sm">
                1시간 후 50%, 하루 후 70%의 내용을 잊어버립니다
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-red-50 border border-red-100">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <RotateCcwSquare className="w-7 h-7 text-red-600" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">비효율적 반복</h3>
              <p className="text-gray-600 text-sm">
                체계적이지 않은 복습으로 같은 내용을 반복 학습합니다
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-red-50 border border-red-100">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <Bot className="w-7 h-7 text-red-600" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">수동적 학습</h3>
              <p className="text-gray-600 text-sm">단순 암기 위주로 진정한 이해 없이 학습합니다</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-red-50 border border-red-100">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <User className="w-7 h-7 text-red-600" strokeWidth={2} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">고립된 학습</h3>
              <p className="text-gray-600 text-sm">혼자 공부하며 동기부여와 지속성이 부족합니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* 과학적 근거 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">과학적 근거</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              에빙하우스 망각곡선과 메타인지 연구를 기반으로 한 학습 방법론
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                alt="망각곡선 연구"
                className="w-full h-auto rounded-xl shadow-lg object-cover"
                src="/assets/graph.png"
              />
            </div>
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">에빙하우스 망각곡선</h3>
                <p className="text-gray-600 mb-4">
                  학습 후 1시간이면 50%, 하루가 지나면 70%를 망각합니다. 하지만 적절한 시점에
                  복습하면 기억 유지 기간이 기하급수적으로 증가합니다.
                </p>
                <div className="text-sm text-blue-600 font-medium">
                  1일 → 3일 → 1주 → 2주 → 1개월
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">메타인지 강화</h3>
                <p className="text-gray-600 mb-4">
                  문제를 직접 만드는 학습은 자신의 이해 수준을 점검하게 하여 메타인지를 자연스럽게
                  키워줍니다.
                </p>
                <div className="text-sm text-blue-600 font-medium">
                  문제 생성 → 깊은 이해 → 장기 기억
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* StudyLoop 학습 시스템 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">StudyLoop 학습 시스템</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              과학적 근거를 바탕으로 설계된 효과적인 학습 루프
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <SquarePen className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">1</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">문제 생성</h3>
              <p className="text-gray-600">
                학습한 내용을 바탕으로 직접 문제를 만들어 메타인지를 강화합니다
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <Repeat className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">2</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">투스트라이크 복습</h3>
              <p className="text-gray-600">
                1일 후와 7일 후 두 번만 맞히면 완전 학습으로 이어지는 복습 시스템입니다
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">3</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">그룹 학습</h3>
              <p className="text-gray-600">
                스터디원과 문제를 공유하고 함께 학습하여 동기부여를 높입니다
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">투스트라이크 복습 시스템</h3>

            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-600 font-bold">1차</span>
                </div>
                <span className="text-gray-700">1일 후 복습</span>
              </div>

              <ArrowRight className="text-gray-400 w-6 h-6 hidden md:block" strokeWidth={2} />

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold">2차</span>
                </div>
                <span className="text-gray-700">7일 후 복습</span>
              </div>

              <ArrowRight className="text-gray-400 w-6 h-6 hidden md:block" strokeWidth={2} />

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-blue-600" strokeWidth={3} />
                </div>
                <span className="text-gray-700">완전 학습</span>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              두 번만 맞히면 끝! 간단하고 명확한 규칙으로 장기 기억을 만들어보세요
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">지금 시작해보세요</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            과학적으로 검증된 학습 방법으로 더 효과적인 공부를 시작하세요
          </p>
          <Link to="/create">
            <button className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-white text-blue-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 px-8 py-4 text-lg">
              문제 만들기 시작하기
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
