import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { authStore } from './stores/AuthStore';
import Navbar from './components/Navbar';
import ChatPage from './pages/ChatPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';

// Protected route component
const ProtectedRoute: React.FC<{ element: React.ReactNode; requireAdmin?: boolean }> = ({
  element,
  requireAdmin = false
}) => {
  const { isAuthenticated, isAdmin } = authStore;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return <>{element}</>;
};

const App: React.FC = observer(() => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route 
            path="/" 
            element={
              <ProtectedRoute element={<ChatPage />} />
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute element={<AdminPage />} requireAdmin />
            } 
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
});

export default App;