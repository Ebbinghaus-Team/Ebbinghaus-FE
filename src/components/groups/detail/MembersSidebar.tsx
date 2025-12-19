type Member = {
  userId: number;
  username: string;
  isOwner: boolean;
};

type MembersSidebarProps = {
  members: Member[];
};

export default function MembersSidebar({ members }: MembersSidebarProps) {
  const sorted = [...members].sort((a, b) => (a.isOwner === b.isOwner ? 0 : a.isOwner ? -1 : 1));
  return (
    <div className="w-80 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">그룹원</h3>
          <span className="text-sm text-gray-500">{members.length}명</span>
        </div>

        <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
          {sorted.map((member) => (
            <div
              key={member.userId}
              className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <i className="ri-user-line text-blue-600 text-xl"></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">
                      {member.username}
                    </h4>
                    {member.isOwner && (
                      <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                        방장
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
