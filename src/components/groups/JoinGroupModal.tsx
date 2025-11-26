import React from 'react';

type JoinGroupModalProps = {
  open: boolean;
  joinCode: string;
  onChangeJoinCode: (value: string) => void;
  onClose: () => void;
  onJoin: () => void;
};

export default function JoinGroupModal({
  open,
  joinCode,
  onChangeJoinCode,
  onClose,
  onJoin,
}: JoinGroupModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">그룹 참여</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">그룹 코드</label>
          <input
            type="text"
            value={joinCode}
            onChange={(e) => onChangeJoinCode(e.target.value)}
            placeholder="예: A3K9XP2M"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
          />
          <p className="text-sm text-gray-500 mt-1">그룹 관리자로부터 받은 그룹 코드를 입력해주세요</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            취소
          </button>
          <button onClick={onJoin} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            참여하기
          </button>
        </div>
      </div>
    </div>
  );
}


