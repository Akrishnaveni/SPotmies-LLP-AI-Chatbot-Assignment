import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { authStore } from '../stores/AuthStore';
import { MessageCircle, FileText, LogOut, LogIn } from 'lucide-react';

const Navbar: React.FC = observer(() => {
  const location = useLocation();
  const { isAuthenticated, isAdmin, currentUser, logout } = authStore;
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="p-2 rounded-md bg-blue-100">
                <MessageCircle size={24} className="text-blue-600" />
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-800">Spotmies Chat</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <span className="hidden md:block text-sm text-gray-600 mr-2">
                  Welcome, {currentUser?.username}
                </span>
                
                <Link
                  to="/"
                  className={`p-2 rounded-md ${
                    location.pathname === '/'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <MessageCircle size={20} />
                </Link>
                
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`p-2 rounded-md ${
                      location.pathname === '/admin'
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <FileText size={20} />
                  </Link>
                )}
                
                <button
                  onClick={logout}
                  className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
              >
                <LogIn size={18} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;