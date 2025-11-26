type QuestionFieldProps = {
	question: string;
	setQuestion: (value: string) => void;
};

export default function QuestionField({ question, setQuestion }: QuestionFieldProps) {
	return (
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-2">
				문제 <span className="text-red-500">*</span>
			</label>
			<textarea
				value={question}
				onChange={(e) => setQuestion(e.target.value)}
				placeholder="문제를 입력하세요"
				rows={3}
				className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
			/>
		</div>
	);
}



