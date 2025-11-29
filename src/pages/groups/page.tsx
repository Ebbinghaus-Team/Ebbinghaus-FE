import { useState } from 'react';
import GroupsHeader from '../../components/groups/GroupsHeader';
import GroupCard, { type GroupCardData } from '../../components/groups/GroupCard';
import JoinGroupModal from '../../components/groups/JoinGroupModal';
import CreateGroupModal from '../../components/groups/CreateGroupModal';

export default function GroupsPage() {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [copiedCode, setCopiedCode] = useState('');

  const myGroups: GroupCardData[] = [
    {
      studyRoomId: 2,
      name: '알고리즘 스터디',
      category: '코딩테스트',
      description: '매주 월요일 알고리즘 문제 풀이',
      joinCode: 'ABC12345',
      totalProblems: 20,
      graduatedProblems: 12,
      memberCount: 5,
      joinedAt: '2025-01-17T11:00:00',
    },
    {
      studyRoomId: 5,
      name: 'CS 면접 대비',
      category: '면접',
      description: 'CS 기초 지식 스터디',
      joinCode: 'XYZ98765',
      totalProblems: 30,
      graduatedProblems: 18,
      memberCount: 3,
      joinedAt: '2025-01-18T15:30:00',
    },
  ];

  const handleJoinGroup = () => {
    if (joinCode.trim()) {
      // 그룹 참여 로직
      setShowJoinModal(false);
      setJoinCode('');
    }
  };

  const handleCreateGroup = () => {
    if (groupName.trim()) {
      // 그룹 생성 로직
      setShowCreateModal(false);
      setGroupName('');
      setGroupDescription('');
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <GroupsHeader
        onClickJoin={() => setShowJoinModal(true)}
        onClickCreate={() => setShowCreateModal(true)}
      />

      {/* 내 그룹 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">내 그룹</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myGroups.map((group) => (
            <GroupCard
              key={group.studyRoomId}
              group={group}
              copiedCode={copiedCode}
              onCopyCode={handleCopyCode}
            />
          ))}
        </div>
      </div>

      <JoinGroupModal
        open={showJoinModal}
        joinCode={joinCode}
        onChangeJoinCode={setJoinCode}
        onClose={() => setShowJoinModal(false)}
        onJoin={handleJoinGroup}
      />

      <CreateGroupModal
        open={showCreateModal}
        groupName={groupName}
        groupDescription={groupDescription}
        onChangeGroupName={setGroupName}
        onChangeGroupDescription={setGroupDescription}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateGroup}
      />
    </div>
  );
}
