import { useState } from 'react';
import { Link } from 'react-router-dom';

const PersonalStudyPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');

  const studyRooms = [
    {
      id: 1,
      title: '수학 - 미적분학',
      description: '미적분학 기본 개념과 응용 문제',
      subject: '수학',
      progress: 72,
      totalQuestions: 25,
      completedQuestions: 18
    },
    {
      id: 2,
      title: '영어 - 토익 문법',
      description: 'TOEIC Part 5, 6 문법 문제 모음',
      subject: '영어',
      progress: 88,
      totalQuestions: 40,
      completedQuestions: 35
    },
    {
      id: 3,
      title: '컴퓨터과학 - 자료구조',
      description: '스택, 큐, 트리, 그래프 등 자료구조',
      subject: '컴퓨터과학',
      progress: 40,
      totalQuestions: 30,
      completedQuestions: 12
    },
    {
      id: 4,
      title: '한국사 - 조선시대',
      description: '조선시대 정치, 경제, 사회, 문화',
      subject: '한국사',
      progress: 23,
      totalQuestions: 35,
      completedQuestions: 8
    }
  ];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const totalRooms = studyRooms.length;
  const totalQuestions = studyRooms.reduce((sum, room) => sum + room.totalQuestions, 0);
  const totalCompleted = studyRooms.reduce((sum, room) => sum + room.completedQuestions, 0);
  const averageProgress = Math.round(studyRooms.reduce((sum, room) => sum + room.progress, 0) / totalRooms);

  const handleCreateRoom = () => {
    if (roomName.trim()) {
      // 공부방 생성 로직
      console.log('공부방 생성:', { roomName, roomDescription });
      setShowCreateModal(false);
      setRoomName('');
      setRoomDescription('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">개인 스터디</h1>
          <p className="text-gray-600">나만의 공부방을 만들어 체계적으로 학습하세요</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 px-4 py-2 text-base"
        >
          <i className="ri-add-line mr-2"></i>개인 공부방 만들기
        </button>
      </div>

      {/* 공부방 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studyRooms.map((room) => (
          <Link key={room.id} to={`/personal-study/${room.id}`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {room.subject}
                  </span>
                  <span className="text-sm text-gray-500">{room.progress}%</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{room.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{room.description}</p>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>진행률</span>
                  <span>{room.completedQuestions}/{room.totalQuestions}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getProgressColor(room.progress)}`}
                    style={{ width: `${room.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <i className="ri-question-line mr-2"></i>
                  <span>문제 {room.totalQuestions}개</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <i className="ri-check-line mr-2"></i>
                  <span>완료 {room.completedQuestions}개</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
                <span className="text-sm text-blue-600 font-medium">학습 계속하기 →</span>
                <i className="ri-arrow-right-line text-gray-400"></i>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 학습 현황 */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">학습 현황</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{totalRooms}</div>
            <div className="text-sm text-gray-600">총 공부방</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{totalQuestions}</div>
            <div className="text-sm text-gray-600">총 문제</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">{totalCompleted}</div>
            <div className="text-sm text-gray-600">완료한 문제</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">{averageProgress}%</div>
            <div className="text-sm text-gray-600">평균 진행률</div>
          </div>
        </div>
      </div>

      {/* 공부방 생성 모달 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">개인 공부방 만들기</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  공부방 이름
                </label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="공부방 이름을 입력하세요"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  공부방 설명
                </label>
                <textarea
                  value={roomDescription}
                  onChange={(e) => setRoomDescription(e.target.value)}
                  placeholder="공부방에 대한 간단한 설명을 입력하세요"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleCreateRoom}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                만들기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalStudyPage;
