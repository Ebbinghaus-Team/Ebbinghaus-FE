import { useState } from 'react';
import PersonalHeader from '../../components/personal/PersonalHeader';
import StudyRoomCard, { type StudyRoom } from '../../components/personal/StudyRoomCard';
import DashboardStats from '../../components/personal/DashboardStats';
import CreateRoomModal from '../../components/personal/CreateRoomModal';

const PersonalStudyPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');
  const [roomCategory, setRoomCategory] = useState('');

  const studyRooms: StudyRoom[] = [
    {
      studyRoomId: 1,
      name: '자바 마스터하기',
      category: '프로그래밍',
      description: '자바 기초부터 고급까지',
      totalProblems: 10,
      graduatedProblems: 5,
      createdAt: '2025-01-17T10:30:00',
    },
    {
      studyRoomId: 3,
      name: '스프링 부트 심화',
      category: '프레임워크',
      description: '스프링 부트 고급 기능',
      totalProblems: 15,
      graduatedProblems: 8,
      createdAt: '2025-01-18T09:00:00',
    },
  ];

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
      // 공부방 생성 로직
      setShowCreateModal(false);
      setRoomName('');
      setRoomDescription('');
      setRoomCategory('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PersonalHeader onClickCreate={() => setShowCreateModal(true)} />

      {/* 공부방 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studyRooms.map((room) => (
          <StudyRoomCard key={room.studyRoomId} room={room} />
        ))}
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
