import React, { useState, FormEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { authStore } from '../stores/AuthStore';
import { Lock, User, AlertCircle } from 'lucide-react';

const LoginPage: React.FC = observer(() => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, isLoading, error } = authStore;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate('/');
    }
  };
  
  // For demo purposes, show login credentials
  const demoCredentials = [
    { role: 'Admin', username: 'admin', password: 'admin123' },
    { role: 'User', username: 'user', password: 'user123' }
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to access your account</p>
        </div>
        
        <div className="bg-white p-8 shadow-md rounded-lg">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center gap-2">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className={`w-full py-2 bg-blue-500 text-white rounded-md transition-all duration-200 ${
                isLoading || !username || !password
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-blue-600'
              }`}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials</h3>
            <div className="bg-gray-50 p-3 rounded-md">
              {demoCredentials.map((cred, index) => (
                <div key={index} className="mb-2 last:mb-0">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-md mb-1">
                    {cred.role}
                  </span>
                  <div className="text-sm">
                    <div>Username: <span className="font-medium">{cred.username}</span></div>
                    <div>Password: <span className="font-medium">{cred.password}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default LoginPage;