type ShortAnswerSectionProps = {
	shortAnswer: string;
	setShortAnswer: (value: string) => void;
};

export default function ShortAnswerSection({
	shortAnswer,
	setShortAnswer,
}: ShortAnswerSectionProps) {
	return (
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-2">
				정답 <span className="text-red-500">*</span>
			</label>
			<input
				type="text"
				value={shortAnswer}
				onChange={(e) => setShortAnswer(e.target.value)}
				placeholder="정답을 입력하세요"
				className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
			/>
		</div>
	);
}



