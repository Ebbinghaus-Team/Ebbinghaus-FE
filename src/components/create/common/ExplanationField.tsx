type ExplanationFieldProps = {
	explanation: string;
	setExplanation: (value: string) => void;
};

export default function ExplanationField({
	explanation,
	setExplanation,
}: ExplanationFieldProps) {
	return (
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-2">
				해설 <span className="text-red-500">*</span>
			</label>
			<textarea
				value={explanation}
				onChange={(e) => setExplanation(e.target.value)}
				placeholder="문제에 대한 해설을 입력하세요"
				rows={3}
				className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
			/>
		</div>
	);
}



