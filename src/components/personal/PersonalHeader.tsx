type PersonalHeaderProps = {
  onClickCreate: () => void;
};

export default function PersonalHeader({ onClickCreate }: PersonalHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">개인 스터디</h1>
        <p className="text-gray-600">나만의 공부방을 만들어 체계적으로 학습하세요</p>
      </div>
      <button
        onClick={onClickCreate}
        className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 px-4 py-2 text-base"
      >
        <i className="ri-add-line mr-2"></i>개인 공부방 만들기
      </button>
    </div>
  );
}
