import { useState } from 'react';

const NOTION_PAGE_URL =
  'https://fine-gooseberry-ef4.notion.site/ebd/2bcd00d60fae80e89765febdbaf8df04';

function ServiceInfo() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="flex flex-col items-center text-center gap-2">
            <i className="ri-loader-4-line animate-spin text-3xl text-blue-600" />
            <p className="text-gray-900 font-medium">페이지를 불러오는 중입니다...</p>
          </div>
        </div>
      )}

      <iframe
        src={NOTION_PAGE_URL}
        className={`w-full min-h-[80vh] border-0 ${!isLoading ? 'visible' : 'invisible'}`}
        onLoad={() => setIsLoading(false)}
        title="팀 소개 페이지"
      />
    </div>
  );
}

export default ServiceInfo;
