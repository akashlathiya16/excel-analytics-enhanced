import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { VersionProvider, useVersion } from './contexts/VersionContext';
import LoginPage from './assets/js/LoginPage';
import RegisterPage from './assets/js/RegisterPage';
import Dashboard from './assets/js/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ClickSpark from './components/ClickSpark';
import VersionToggleAnimation from './components/VersionToggleAnimation';
import './App.css';

const AppContent = () => {
  const { isNewVersion, isToggleAnimating, previousVersion } = useVersion();

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
      {/* Click Spark effect only for NEW version */}
      {isNewVersion && <ClickSpark />}
      {/* Version transition animations */}
      <VersionToggleAnimation 
        isAnimating={isToggleAnimating} 
        isNewVersion={isNewVersion}
        previousVersion={previousVersion}
      />
    </>
  );
};

function App() {
  return (
    <VersionProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </VersionProvider>
  );
}

export default App;
 