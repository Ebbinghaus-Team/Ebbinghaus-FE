type SolveQuestionProps = {
  content: string;
};

export default function SolveQuestion({ content }: SolveQuestionProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">문제</h2>
      <p className="text-gray-700 text-lg leading-relaxed">{content}</p>
    </div>
  );
}
