import React from 'react';
import './ThemeToggleSwitch.css';

const ThemeToggleSwitch = ({ isDarkMode, onToggle, className = '' }) => {
  return (
    <div className={`theme-toggle-switch ${className}`}>
      <button
        className={`toggle-root ${isDarkMode ? 'dark' : 'light'}`}
        onClick={onToggle}
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} theme`}
        title={`Switch to ${isDarkMode ? 'light' : 'dark'} theme`}
      >
        <div className="toggle-track">
          <div className={`toggle-thumb ${isDarkMode ? 'checked' : 'unchecked'}`}>
            <div className="toggle-icon">
              {isDarkMode ? '🌙' : '☀️'}
            </div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="toggle-background">
          <div className={`bg-element stars ${isDarkMode ? 'visible' : 'hidden'}`}>
            <span className="star star-1">✨</span>
            <span className="star star-2">⭐</span>
            <span className="star star-3">💫</span>
          </div>
          <div className={`bg-element clouds ${!isDarkMode ? 'visible' : 'hidden'}`}>
            <span className="cloud cloud-1">☁️</span>
            <span className="cloud cloud-2">⛅</span>
          </div>
        </div>
        
        {/* Glow effect */}
        <div className={`toggle-glow ${isDarkMode ? 'dark-glow' : 'light-glow'}`}></div>
      </button>
    </div>
  );
};

export default ThemeToggleSwitch; 