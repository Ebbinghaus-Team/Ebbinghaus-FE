type QuestionTypeSectionProps = {
	questionType: '' | 'multiple' | 'ox' | 'short' | 'essay';
	setQuestionType: (value: 'multiple' | 'ox' | 'short' | 'essay') => void;
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
						questionType === 'multiple' 
							? 'border-blue-500 bg-blue-50' 
							: 'border-gray-200 hover:border-gray-300'
					}`}
					onClick={() => setQuestionType('multiple')}
				>
					<div className="text-center">
						<i className="ri-list-check text-3xl text-blue-600 mb-2"></i>
						<h3 className="text-sm font-semibold text-gray-900">객관식</h3>
					</div>
				</div>

				<div
					className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
						questionType === 'ox' 
							? 'border-blue-500 bg-blue-50' 
							: 'border-gray-200 hover:border-gray-300'
					}`}
					onClick={() => setQuestionType('ox')}
				>
					<div className="text-center">
						<i className="ri-checkbox-circle-line text-3xl text-blue-600 mb-2"></i>
						<h3 className="text-sm font-semibold text-gray-900">O/X 문제</h3>
					</div>
				</div>

				<div
					className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
						questionType === 'short' 
							? 'border-blue-500 bg-blue-50' 
							: 'border-gray-200 hover:border-gray-300'
					}`}
					onClick={() => setQuestionType('short')}
				>
					<div className="text-center">
						<i className="ri-text text-3xl text-blue-600 mb-2"></i>
						<h3 className="text-sm font-semibold text-gray-900">단답형</h3>
					</div>
				</div>

				<div
					className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
						questionType === 'essay' 
							? 'border-blue-500 bg-blue-50' 
							: 'border-gray-200 hover:border-gray-300'
					}`}
					onClick={() => setQuestionType('essay')}
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



