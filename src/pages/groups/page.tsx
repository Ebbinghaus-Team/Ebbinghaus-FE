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
      id: 1,
      name: '토익 스터디 그룹',
      description: '토익 900점 목표로 함께 공부해요',
      members: 8,
      questions: 45,
      lastActivity: '2시간 전',
      code: 'A3K9XP2M',
    },
    {
      id: 2,
      name: '공무원 시험 준비',
      description: '9급 공무원 시험 준비 스터디',
      members: 12,
      questions: 78,
      lastActivity: '1일 전',
      code: '7BX4KL9Q',
    },
    {
      id: 3,
      name: '컴활 1급 취득',
      description: '컴퓨터활용능력 1급 자격증 취득',
      members: 6,
      questions: 23,
      lastActivity: '3일 전',
      code: 'Q2LM9A7B',
    },
  ];

  const handleJoinGroup = () => {
    if (joinCode.trim()) {
      // 그룹 참여 로직
      console.log('그룹 참여:', joinCode);
      setShowJoinModal(false);
      setJoinCode('');
    }
  };

  const handleCreateGroup = () => {
    if (groupName.trim()) {
      // 그룹 생성 로직
      console.log('그룹 생성:', { groupName, groupDescription });
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
              key={group.id}
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
