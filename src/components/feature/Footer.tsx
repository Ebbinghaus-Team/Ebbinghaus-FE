import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="text-xl font-bold text-blue-600 mr-8">StudyLoop</div>
          </div>
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <Link to="/team-info" className="hover:text-blue-600 transition-colors">
              팀 소개
            </Link>
            <Link to="/contact" className="hover:text-blue-600 transition-colors">
              문의하기
            </Link>
            <a
              href="https://github.com/Ebbinghaus-Team"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">© 2025 Ebbinghaus Team. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
