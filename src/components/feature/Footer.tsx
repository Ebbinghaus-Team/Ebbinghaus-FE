
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
            <Link to="/team" className="hover:text-blue-600 transition-colors">
              팀 소개
            </Link>
            <Link to="/contact" className="hover:text-blue-600 transition-colors">
              문의하기
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-blue-600 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            © 2024 StudyLoop. All rights reserved.
          </p>
          <div className="mt-2">
            <a 
              href="https://readdy.ai/?origin=logo" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs text-gray-400 hover:text-blue-600 transition-colors"
            >
              Powered by Readdy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
