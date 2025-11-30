import { useState } from 'react';
import GroupsHeader from '../../components/groups/GroupsHeader';
import GroupCard, { type GroupCardData } from '../../components/groups/GroupCard';
import JoinGroupModal from '../../components/groups/JoinGroupModal';
import CreateGroupModal from '../../components/groups/CreateGroupModal';
import { useGroupStudyRoomsQuery } from '../../api/studyRoom/hooks';
import { useCreateGroupStudyRoomMutation } from '../../api/studyRoom/hooks';
import { useJoinGroupStudyRoomMutation } from '../../api/studyRoom/hooks';

export default function GroupsPage() {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupCategory, setGroupCategory] = useState('');
  const [copiedCode, setCopiedCode] = useState('');
  const { data } = useGroupStudyRoomsQuery();
  const createGroupMutation = useCreateGroupStudyRoomMutation();
  const joinGroupMutation = useJoinGroupStudyRoomMutation();

  const myGroups: GroupCardData[] = (data?.rooms as unknown as GroupCardData[]) ?? [];

  const handleJoinGroup = () => {
    if (!joinCode.trim()) return;
    joinGroupMutation.mutate(
      { joinCode: joinCode.trim() },
      {
        onSuccess: () => {
          setShowJoinModal(false);
          setJoinCode('');
        },
      },
    );
  };

  const handleCreateGroup = () => {
    if (!groupName.trim()) return;
    createGroupMutation.mutate(
      { name: groupName, description: groupDescription, category: groupCategory },
      {
        onSuccess: () => {
          setShowCreateModal(false);
          setGroupName('');
          setGroupDescription('');
          setGroupCategory('');
        },
      },
    );
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
          {myGroups.length > 0 ? (
            myGroups.map((group) => (
              <GroupCard
                key={group.studyRoomId}
                group={group}
                copiedCode={copiedCode}
                onCopyCode={handleCopyCode}
              />
            ))
          ) : (
            <div className="col-span-full">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          )}
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
        groupCategory={groupCategory}
        onChangeGroupName={setGroupName}
        onChangeGroupDescription={setGroupDescription}
        onChangeGroupCategory={setGroupCategory}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateGroup}
      />
    </div>
  );
}
