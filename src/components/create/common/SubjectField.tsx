type SubjectFieldProps = {
	subject: string;
	setSubject: (value: string) => void;
};

export default function SubjectField({ subject, setSubject }: SubjectFieldProps) {
	return (
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-2">
				과목/분야 <span className="text-red-500">*</span>
			</label>
			<input
				type="text"
				value={subject}
				onChange={(e) => setSubject(e.target.value)}
				placeholder="예: 수학, 영어, 역사 등"
				className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
			/>
		</div>
	);
}



