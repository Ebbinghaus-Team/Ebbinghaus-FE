type OxAnswerSectionProps = {
	oxAnswer: string;
	setOxAnswer: (value: 'O' | 'X') => void;
};

export default function OxAnswerSection({ oxAnswer, setOxAnswer }: OxAnswerSectionProps) {
	return (
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-2">
				정답 <span className="text-red-500">*</span>
			</label>
			<div className="flex space-x-4">
				<button
					onClick={() => setOxAnswer('O')}
					className={`flex-1 py-3 rounded-lg border-2 font-medium transition-colors cursor-pointer ${
						oxAnswer === 'O'
							? 'border-blue-500 bg-blue-50 text-blue-600'
							: 'border-gray-300 text-gray-600 hover:border-gray-400'
					}`}
				>
					O (참)
				</button>
				<button
					onClick={() => setOxAnswer('X')}
					className={`flex-1 py-3 rounded-lg border-2 font-medium transition-colors cursor-pointer ${
						oxAnswer === 'X'
							? 'border-blue-500 bg-blue-50 text-blue-600'
							: 'border-gray-300 text-gray-600 hover:border-gray-400'
					}`}
				>
					X (거짓)
				</button>
			</div>
		</div>
	);
}



