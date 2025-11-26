type SolveHeaderProps = {
  onBack: () => void;
  questionType: string;
  category: string;
  title: string;
};

export default function SolveHeader({ onBack, questionType, category, title }: SolveHeaderProps) {
  return (
    <div className="mb-6">
      <button
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-gray-700 mb-4"
      >
        <i className="ri-arrow-left-line text-xl mr-2"></i>뒤로 가기
      </button>
      <div className="flex items-center space-x-3 mb-2">
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          {questionType}
        </span>
        <span className="text-sm text-gray-500">{category}</span>
      </div>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
    </div>
  );
}


