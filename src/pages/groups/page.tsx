
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function GroupsPage() {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [selectedGroupCode, setSelectedGroupCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [copiedCode, setCopiedCode] = useState('');

  const myGroups = [
    {
      id: 1,
      name: '토익 스터디 그룹',
      description: '토익 900점 목표로 함께 공부해요',
      members: 8,
      questions: 45,
      lastActivity: '2시간 전',
      code: 'A3K9XP2M'
    },
    {
      id: 2,
      name: '공무원 시험 준비',
      description: '9급 공무원 시험 준비 스터디',
      members: 12,
      questions: 78,
      lastActivity: '1일 전',
      code: '7BX4KL9Q'
    },
    {
      id: 3,
      name: '컴활 1급 취득',
      description: '컴퓨터활용능력 1급 자격증 취득',
      members: 6,
      questions: 23,
      lastActivity: '3일 전',
      code: 'Q2LM9A7B'
    }
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

  const handleShowCode = (code: string) => {
    setSelectedGroupCode(code);
    setShowCodeModal(true);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">그룹 스터디</h1>
          <p className="text-gray-600">스터디원들과 함께 문제를 공유하고 학습하세요</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowJoinModal(true)}
            className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 px-4 py-2 text-base"
          >
            <i className="ri-key-line mr-2"></i>
            그룹 참여
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 px-4 py-2 text-base"
          >
            <i className="ri-team-line mr-2"></i>
            그룹 만들기
          </button>
        </div>
      </div>

      {/* 내 그룹 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">내 그룹</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myGroups.map((group) => (
            <div key={group.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow h-full">
              <Link to={`/groups/${group.id}`}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
                    {group.name}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{group.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <i className="ri-team-line mr-2"></i>
                    <span>멤버 {group.members}명</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <i className="ri-question-line mr-2"></i>
                    <span>문제 {group.questions}개</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <i className="ri-time-line mr-2"></i>
                    <span>마지막 활동: {group.lastActivity}</span>
                  </div>
                </div>
              </Link>
              
              {/* 그룹 코드 */}
              <div className="pt-3 border-t border-gray-200 mb-3">
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <i className="ri-key-2-line text-gray-400"></i>
                    <span className="text-sm font-mono font-medium text-gray-700">{group.code}</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(group.code)}
                    className="inline-flex items-center justify-center font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer hover:bg-gray-200 px-2 py-1 text-sm"
                  >
                    {copiedCode === group.code ? (
                      <>
                        <i className="ri-check-line text-green-600"></i>
                      </>
                    ) : (
                      <>
                        <i className="ri-file-copy-line text-gray-600"></i>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <Link to={`/groups/${group.id}`}>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-blue-600 font-medium">그룹 입장 →</span>
                  <i className="ri-arrow-right-line text-gray-400"></i>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 그룹 참여 모달 */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">그룹 참여</h3>
              <button
                onClick={() => setShowJoinModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                그룹 코드
              </label>
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="예: TOEIC-8K9M"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
              />
              <p className="text-sm text-gray-500 mt-1">
                그룹 관리자로부터 받은 그룹 코드를 입력해주세요
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowJoinModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={handleJoinGroup}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                참여하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 그룹 생성 모달 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">그룹 만들기</h3>
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
                  그룹 이름
                </label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="그룹 이름을 입력하세요"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  그룹 설명
                </label>
                <textarea
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                  placeholder="그룹에 대한 간단한 설명을 입력하세요"
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
                onClick={handleCreateGroup}
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
}
