type QuestionTypeSectionProps = {
	questionType: '' | 'MCQ' | 'OX' | 'SHORT' | 'SUBJECTIVE';
	setQuestionType: (value: 'MCQ' | 'OX' | 'SHORT' | 'SUBJECTIVE') => void;
};

export default function QuestionTypeSection({
	questionType,
	setQuestionType,
}: QuestionTypeSectionProps) {
	return (
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-3">
				문제 유형 <span className="text-red-500">*</span>
			</label>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
				<div
					className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
						questionType === 'MCQ' 
							? 'border-blue-500 bg-blue-50' 
							: 'border-gray-200 hover:border-gray-300'
					}`}
					onClick={() => setQuestionType('MCQ')}
				>
					<div className="text-center">
						<i className="ri-list-check text-3xl text-blue-600 mb-2"></i>
						<h3 className="text-sm font-semibold text-gray-900">객관식</h3>
					</div>
				</div>

				<div
					className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
						questionType === 'OX' 
							? 'border-blue-500 bg-blue-50' 
							: 'border-gray-200 hover:border-gray-300'
					}`}
					onClick={() => setQuestionType('OX')}
				>
					<div className="text-center">
						<i className="ri-checkbox-circle-line text-3xl text-blue-600 mb-2"></i>
						<h3 className="text-sm font-semibold text-gray-900">O/X 문제</h3>
					</div>
				</div>

				<div
					className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
						questionType === 'SHORT' 
							? 'border-blue-500 bg-blue-50' 
							: 'border-gray-200 hover:border-gray-300'
					}`}
					onClick={() => setQuestionType('SHORT')}
				>
					<div className="text-center">
						<i className="ri-text text-3xl text-blue-600 mb-2"></i>
						<h3 className="text-sm font-semibold text-gray-900">단답형</h3>
					</div>
				</div>

				<div
					className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
						questionType === 'SUBJECTIVE' 
							? 'border-blue-500 bg-blue-50' 
							: 'border-gray-200 hover:border-gray-300'
					}`}
					onClick={() => setQuestionType('SUBJECTIVE')}
				>
					<div className="text-center">
						<i className="ri-edit-line text-3xl text-blue-600 mb-2"></i>
						<h3 className="text-sm font-semibold text-gray-900">서술형</h3>
					</div>
				</div>
			</div>
		</div>
	);
}



