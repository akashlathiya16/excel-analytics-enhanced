import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useVersion } from '../../contexts/VersionContext';
import AnimatedBackground from '../../components/AnimatedBackground';
import GlitchBackground from '../../components/GlitchBackground';
import Squares from '../../components/SquaresBackground';
import ThemeToggleSwitch from '../../components/ThemeToggleSwitch';
import '../css/LoginPage.css';

const LoginPage = () => {
  const { login } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { isNewVersion, toggleVersion } = useVersion();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showThemeAnimation, setShowThemeAnimation] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('All fields are required');
      return;
    }
    setError('');
    setLoading(true);
    
    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleThemeToggle = () => {
    // Show animation only for OLD version
    if (!isNewVersion) {
      // Change theme immediately (button changes first)
      toggleTheme();
      // Then show animation
      setShowThemeAnimation(true);
      // Hide animation after complete
      setTimeout(() => {
        setShowThemeAnimation(false);
      }, 1500);
    } else {
      toggleTheme();
    }
  };

  const handleMouseMove = (e) => {
    if (!isNewVersion || !cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  };

  const handleMouseLeave = () => {
    if (!isNewVersion || !cardRef.current) return;
    
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  return (
    <div className="login-container">
      {/* Squares Background for NEW Dark Theme */}
      {isNewVersion && isDarkMode && (
        <Squares 
          speed={0.5} 
          squareSize={40} 
          direction="diagonal" 
          borderColor="rgba(255, 255, 255, 0.2)" 
          hoverFillColor="#00ff88"
          className="squares-background"
        />
      )}
      
      {/* Theme Change Animation for OLD Version */}
      {showThemeAnimation && !isNewVersion && (
        <div className="theme-change-animation"></div>
      )}

      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        gap: '10px'
      }}>
        <button 
          className={`version-toggle ${isNewVersion ? 'new' : 'old'}`}
          onClick={toggleVersion}
          title={`Switch to ${isNewVersion ? 'Old' : 'New'} Version`}
        >
          <div className="version-toggle-text">
            {isNewVersion ? 'NEW' : 'OLD'}
          </div>
        </button>
        <ThemeToggleSwitch 
          isDarkMode={isDarkMode} 
          onToggle={handleThemeToggle}
        />
      </div>
      <div 
        className="login-card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <h2>LOGIN </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button className="login-btn" disabled={loading} type="submit">
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>
        <p style={{textAlign: 'center', marginTop: '20px'}}>
          Don't have an account? <Link to="/register" style={{color: '#007bff'}}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
