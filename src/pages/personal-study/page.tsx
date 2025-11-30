import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalHeader from '../../components/personal/PersonalHeader';
import StudyRoomCard, { type StudyRoom } from '../../components/personal/StudyRoomCard';
import DashboardStats from '../../components/personal/DashboardStats';
import CreateRoomModal from '../../components/personal/CreateRoomModal';
import { usePersonalStudyRoomsQuery } from '../../api/studyRoom/hooks';
import { useCreatePersonalStudyRoomMutation } from '../../api/studyRoom/hooks';
import { useAuthStatus } from '../../hooks/useAuthStatus';

const PersonalStudyPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, isLoading: authLoading } = useAuthStatus();
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [roomCategory, setRoomCategory] = useState('');
  const { data, isLoading } = usePersonalStudyRoomsQuery();
  const createPersonalStudyRoomMutation = useCreatePersonalStudyRoomMutation();

  const studyRooms: StudyRoom[] = (data?.rooms as unknown as StudyRoom[]) ?? [];

  const totalRooms = studyRooms.length;
  const totalQuestions = studyRooms.reduce((sum, room) => sum + room.totalProblems, 0);
  const totalCompleted = studyRooms.reduce((sum, room) => sum + room.graduatedProblems, 0);
  const averageProgress = Math.round(
    studyRooms.reduce((sum, room) => {
      const progress =
        room.totalProblems > 0 ? (room.graduatedProblems / room.totalProblems) * 100 : 0;
      return sum + progress;
    }, 0) / (totalRooms || 1),
  );

  const handleCreateRoom = () => {
    if (roomName.trim()) {
      createPersonalStudyRoomMutation.mutate(
        { name: roomName, description: roomDescription, category: roomCategory },
        {
          onSuccess: () => {
            setShowCreateModal(false);
            setRoomName('');
            setRoomDescription('');
            setRoomCategory('');
          },
        },
      );
    }
  };

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      navigate('/login', { replace: true });
    }
  }, [authLoading, isLoggedIn, navigate]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PersonalHeader onClickCreate={() => setShowCreateModal(true)} />

      {/* 공부방 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studyRooms.length > 0 ? (
          studyRooms.map((room) => <StudyRoomCard key={room.studyRoomId} room={room} />)
        ) : (
          <div className="col-span-full">
            {isLoading ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <i className="ri-home-smile-line text-4xl text-gray-300 mb-3"></i>
                <h3 className="text-lg font-medium text-gray-900 mb-1">개인 공부방이 없습니다</h3>
                <p className="text-gray-600 mb-4">첫 공부방을 만들어 학습을 시작해 보세요.</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 px-4 py-2 text-base"
                >
                  <i className="ri-add-line mr-2"></i>개인 공부방 만들기
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <DashboardStats
        totalRooms={totalRooms}
        totalQuestions={totalQuestions}
        totalCompleted={totalCompleted}
        averageProgress={averageProgress}
      />

      {/* 공부방 생성 모달 */}
      <CreateRoomModal
        open={showCreateModal}
        roomName={roomName}
        roomDescription={roomDescription}
        roomCategory={roomCategory}
        onChangeRoomName={setRoomName}
        onChangeRoomDescription={setRoomDescription}
        onChangeRoomCategory={setRoomCategory}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateRoom}
      />
    </div>
  );
};

export default PersonalStudyPage;
