import React from 'react';

type ReviewAddModalProps = {
  open: boolean;
  title: string;
  onSkip: () => void;
  onAdd: () => void;
};

export default function ReviewAddModal({ open, title, onSkip, onAdd }: ReviewAddModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <i className="ri-check-line text-2xl text-green-600"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">문제 풀이 완료!</h3>
          <p className="text-gray-600 text-sm">"{title}" 문제를 완료했습니다.</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h4 className="text-sm font-medium text-blue-900 mb-2">복습 문제셋에 추가하시겠습니까?</h4>
          <p className="text-xs text-blue-700">개인 복습 문제셋에 추가하면 나중에 다시 복습할 수 있습니다.</p>
        </div>

        <div className="flex space-x-3">
          <button onClick={onSkip} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            건너뛰기
          </button>
          <button onClick={onAdd} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            복습에 추가
          </button>
        </div>
      </div>
    </div>
  );
}


