type MultipleChoiceSectionProps = {
	options: string[];
	updateOption: (index: number, value: string) => void;
	addOption: () => void;
	removeOption: (index: number) => void;
	correctAnswer: string;
	setCorrectAnswer: (value: string) => void;
};

export default function MultipleChoiceSection({
	options,
	updateOption,
	addOption,
	removeOption,
	correctAnswer,
	setCorrectAnswer,
}: MultipleChoiceSectionProps) {
	return (
		<>
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-2">
					선택지 (최소 2개) <span className="text-red-500">*</span>
				</label>
				<div className="space-y-3">
					{options.map((option, index) => (
						<div key={index} className="flex items-center space-x-3">
							<span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
								{String.fromCharCode(65 + index)}
							</span>
							<input
								type="text"
								value={option}
								onChange={(e) => updateOption(index, e.target.value)}
								placeholder={`${String.fromCharCode(65 + index)}번 선택지`}
								className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
							{options.length > 2 && (
								<button
									onClick={() => removeOption(index)}
									className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
								>
									<i className="ri-close-line"></i>
								</button>
							)}
						</div>
					))}
					<button
						onClick={addOption}
						className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap"
					>
						<i className="ri-add-line mr-2"></i>선택지 추가
					</button>
				</div>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-700 mb-2">
					정답 <span className="text-red-500">*</span>
				</label>
				<div className="flex flex-wrap gap-2">
					{options.map((_, index) => (
						<button
							key={index}
							onClick={() => setCorrectAnswer(String.fromCharCode(65 + index))}
							className={`w-12 h-12 rounded-lg border-2 font-medium transition-colors cursor-pointer ${
								correctAnswer === String.fromCharCode(65 + index)
									? 'border-blue-500 bg-blue-50 text-blue-600'
									: 'border-gray-300 text-gray-600 hover:border-gray-400'
							}`}
						>
							{String.fromCharCode(65 + index)}
						</button>
					))}
				</div>
			</div>
		</>
	);
}



