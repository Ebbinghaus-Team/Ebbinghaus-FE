import React from 'react';

type CreateRoomModalProps = {
  open: boolean;
  roomName: string;
  roomDescription: string;
  onChangeRoomName: (value: string) => void;
  onChangeRoomDescription: (value: string) => void;
  onClose: () => void;
  onCreate: () => void;
};

export default function CreateRoomModal({
  open,
  roomName,
  roomDescription,
  onChangeRoomName,
  onChangeRoomDescription,
  onClose,
  onCreate,
}: CreateRoomModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">개인 공부방 만들기</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">공부방 이름</label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => onChangeRoomName(e.target.value)}
              placeholder="공부방 이름을 입력하세요"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">공부방 설명</label>
            <textarea
              value={roomDescription}
              onChange={(e) => onChangeRoomDescription(e.target.value)}
              placeholder="공부방에 대한 간단한 설명을 입력하세요"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            취소
          </button>
          <button onClick={onCreate} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            만들기
          </button>
        </div>
      </div>
    </div>
  );
}


