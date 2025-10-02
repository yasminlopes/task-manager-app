import { useAuth } from '../contexts/auth-context';
import { ClipboardListIcon, LogOutIcon, UserIcon } from '../../shared/components';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
  onSignOut?: () => void;
}

export function Navbar({ onSignOut }: NavbarProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleProfileClick = () => {
    navigate('/auth/me');
  };

  const handleTasksClick = () => {
    navigate('/tasks');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={handleTasksClick}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <ClipboardListIcon size={24} className="text-blue-600" />
            <span className="text-lg font-medium text-gray-900 tracking-tight">
              tasks
            </span>
          </button>

          <div className="flex items-center space-x-4">
            {user && (
              <>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm text-gray-700 font-medium">
                    {user.name || user.email}
                  </span>
                </div>
                
                <button
                  onClick={handleProfileClick}
                  className={`inline-flex items-center space-x-2 px-3 py-1.5 text-sm font-medium transition-colors duration-200 rounded-lg ${
                    location.pathname === '/auth/me' 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <UserIcon size={16} />
                  <span>perfil</span>
                </button>
                
                <button
                  onClick={onSignOut}
                  className="inline-flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 rounded-lg hover:bg-gray-50"
                >
                  <span>sair</span>
                  <LogOutIcon size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}