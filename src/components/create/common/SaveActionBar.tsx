type SaveActionBarProps = {
	onSave: () => void;
	isEnabled: boolean;
};

export default function SaveActionBar({ onSave, isEnabled }: SaveActionBarProps) {
	return (
		<div className="flex justify-end mt-8">
			<button
				onClick={onSave}
				disabled={!isEnabled}
				className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
			>
				문제 저장
			</button>
		</div>
	);
}



