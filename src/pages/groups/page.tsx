import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GroupsHeader from '../../components/groups/GroupsHeader';
import GroupCard, { type GroupCardData } from '../../components/groups/GroupCard';
import JoinGroupModal from '../../components/groups/JoinGroupModal';
import CreateGroupModal from '../../components/groups/CreateGroupModal';
import { useGroupStudyRoomsQuery } from '../../api/studyRoom/hooks';
import { useCreateGroupStudyRoomMutation } from '../../api/studyRoom/hooks';
import { useJoinGroupStudyRoomMutation } from '../../api/studyRoom/hooks';
import { useAuthStatus } from '../../hooks/useAuthStatus';
import toast from 'react-hot-toast';

export default function GroupsPage() {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupCategory, setGroupCategory] = useState('');
  const [copiedCode, setCopiedCode] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn, isLoading: authLoading } = useAuthStatus();
  const { data, isLoading } = useGroupStudyRoomsQuery();
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

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      toast.error('로그인이 필요합니다.');
      navigate('/login', { replace: true });
    }
  }, [authLoading, isLoggedIn, navigate]);

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
                  <i className="ri-team-line text-4xl text-gray-300 mb-3"></i>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    참여 중인 그룹이 없습니다
                  </h3>
                  <p className="text-gray-600 mb-4">그룹을 만들거나 참여 코드를 입력해 보세요.</p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setShowCreateModal(true)}
                      className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 px-4 py-2 text-base"
                    >
                      <i className="ri-add-line mr-2"></i>그룹 만들기
                    </button>
                    <button
                      onClick={() => setShowJoinModal(true)}
                      className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-gray-300 px-4 py-2 text-base"
                    >
                      <i className="ri-key-2-line mr-2"></i>참여 코드 입력
                    </button>
                  </div>
                </div>
              )}
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
