import { useState } from 'react';
import PersonalHeader from '../../components/personal/PersonalHeader';
import StudyRoomCard, { type StudyRoom } from '../../components/personal/StudyRoomCard';
import DashboardStats from '../../components/personal/DashboardStats';
import CreateRoomModal from '../../components/personal/CreateRoomModal';

const PersonalStudyPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomName, setRoomName] = useState('');
  const [roomDescription, setRoomDescription] = useState('');

  const studyRooms: StudyRoom[] = [
    {
      id: 1,
      title: '수학 - 미적분학',
      description: '미적분학 기본 개념과 응용 문제',
      subject: '수학',
      progress: 72,
      totalQuestions: 25,
      completedQuestions: 18,
    },
    {
      id: 2,
      title: '영어 - 토익 문법',
      description: 'TOEIC Part 5, 6 문법 문제 모음',
      subject: '영어',
      progress: 88,
      totalQuestions: 40,
      completedQuestions: 35,
    },
    {
      id: 3,
      title: '컴퓨터과학 - 자료구조',
      description: '스택, 큐, 트리, 그래프 등 자료구조',
      subject: '컴퓨터과학',
      progress: 40,
      totalQuestions: 30,
      completedQuestions: 12,
    },
    {
      id: 4,
      title: '한국사 - 조선시대',
      description: '조선시대 정치, 경제, 사회, 문화',
      subject: '한국사',
      progress: 23,
      totalQuestions: 35,
      completedQuestions: 8,
    },
  ];

  const totalRooms = studyRooms.length;
  const totalQuestions = studyRooms.reduce((sum, room) => sum + room.totalQuestions, 0);
  const totalCompleted = studyRooms.reduce((sum, room) => sum + room.completedQuestions, 0);
  const averageProgress = Math.round(
    studyRooms.reduce((sum, room) => sum + room.progress, 0) / totalRooms,
  );

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
      <PersonalHeader onClickCreate={() => setShowCreateModal(true)} />

      {/* 공부방 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studyRooms.map((room) => (
          <StudyRoomCard key={room.id} room={room} />
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
        onChangeRoomName={setRoomName}
        onChangeRoomDescription={setRoomDescription}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateRoom}
      />
    </div>
  );
};

export default PersonalStudyPage;
