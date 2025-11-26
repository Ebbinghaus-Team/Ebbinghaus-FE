type Group = { id: number; name: string; members: number };
type PersonalStudy = { id: number; name: string; questions: number };

type SaveLocationSectionProps = {
	saveLocation: "" | "personal" | "group";
	setSaveLocation: (value: "personal" | "group") => void;
	selectedGroup: string;
	setSelectedGroup: (value: string) => void;
	selectedPersonalStudy: string;
	setSelectedPersonalStudy: (value: string) => void;
	myGroups: Group[];
	myPersonalStudies: PersonalStudy[];
};

export default function SaveLocationSection({
	saveLocation,
	setSaveLocation,
	selectedGroup,
	setSelectedGroup,
	selectedPersonalStudy,
	setSelectedPersonalStudy,
	myGroups,
	myPersonalStudies,
}: SaveLocationSectionProps) {
	return (
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-3">
				저장 위치 <span className="text-red-500">*</span>
			</label>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<div
					className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
						saveLocation === "personal"
							? "border-blue-500 bg-blue-50"
							: "border-gray-200 hover:border-gray-300"
					}`}
					onClick={() => setSaveLocation("personal")}
				>
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<i className="ri-user-line text-2xl text-blue-600 mr-4"></i>
							<div>
								<h3 className="text-lg font-semibold text-gray-900">
									개인 스터디
								</h3>
								<p className="text-gray-600 text-sm">나만의 문제집에 저장</p>
							</div>
						</div>
						<div
							className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
								saveLocation === "personal"
									? "border-blue-500 bg-blue-500"
									: "border-gray-300"
							}`}
						>
							{saveLocation === "personal" && (
								<i className="ri-check-line text-white text-sm"></i>
							)}
						</div>
					</div>
				</div>

				<div
					className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
						saveLocation === "group"
							? "border-blue-500 bg-blue-50"
							: "border-gray-200 hover:border-gray-300"
					}`}
					onClick={() => setSaveLocation("group")}
				>
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<i className="ri-team-line text-2xl text-blue-600 mr-4"></i>
							<div>
								<h3 className="text-lg font-semibold text-gray-900">
									그룹 스터디
								</h3>
								<p className="text-gray-600 text-sm">그룹 멤버들과 공유</p>
							</div>
						</div>
						<div
							className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
								saveLocation === "group"
									? "border-blue-500 bg-blue-500"
									: "border-gray-300"
							}`}
						>
							{saveLocation === "group" && (
								<i className="ri-check-line text-white text-sm"></i>
							)}
						</div>
					</div>
				</div>
			</div>

			{saveLocation === "personal" && (
				<div>
					<h3 className="text-sm font-medium text-gray-700 mb-3">
						개인 스터디 선택
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						{myPersonalStudies.map((study) => (
							<div
								key={study.id}
								className={`border rounded-lg p-3 cursor-pointer transition-colors ${
									selectedPersonalStudy === study.id.toString()
										? "border-blue-500 bg-blue-50"
										: "border-gray-200 hover:border-gray-300"
								}`}
								onClick={() => setSelectedPersonalStudy(study.id.toString())}
							>
								<h4 className="font-medium text-gray-900 text-sm">
									{study.name}
								</h4>
								<p className="text-xs text-gray-600">
									문제 {study.questions}개
								</p>
							</div>
						))}
					</div>
				</div>
			)}

			{saveLocation === "group" && (
				<div>
					<h3 className="text-sm font-medium text-gray-700 mb-3">그룹 선택</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						{myGroups.map((group) => (
							<div
								key={group.id}
								className={`border rounded-lg p-3 cursor-pointer transition-colors ${
									selectedGroup === group.id.toString()
										? "border-blue-500 bg-blue-50"
										: "border-gray-200 hover:border-gray-300"
								}`}
								onClick={() => setSelectedGroup(group.id.toString())}
							>
								<h4 className="font-medium text-gray-900 text-sm">
									{group.name}
								</h4>
								<p className="text-xs text-gray-600">멤버 {group.members}명</p>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
}


