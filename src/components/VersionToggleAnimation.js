import React from 'react';
import './VersionToggleAnimation.css';

const VersionToggleAnimation = ({ isAnimating, isNewVersion, previousVersion }) => {
  if (!isAnimating) return null;

  // Check if transitioning from NEW to OLD
  const isNewToOld = previousVersion === 'new' && !isNewVersion;
  // Check if transitioning from OLD to NEW
  const isOldToNew = previousVersion === 'old' && isNewVersion;

  // Same earthquake effect for both transitions, just different text
  return (
    <div className="version-toggle-animation earthquake-transition">
      {/* Earthquake ripples */}
      <div className="earthquake-ripple ripple-1"></div>
      <div className="earthquake-ripple ripple-2"></div>
      <div className="earthquake-ripple ripple-3"></div>
      
      {/* Screen crack effects */}
      <div className="screen-crack crack-1"></div>
      <div className="screen-crack crack-2"></div>
      <div className="screen-crack crack-3"></div>
      
      {/* Digital glitch overlay */}
      <div className="glitch-overlay">
        <div className="glitch-layer layer-1"></div>
        <div className="glitch-layer layer-2"></div>
        <div className="glitch-layer layer-3"></div>
      </div>
      
      {/* Transformation text - different based on direction */}
      <div className="transformation-text">
        <span className="transform-label">
          {isNewToOld ? "SWITCHING TO CLASSIC MODE" : "UPGRADING TO NEW VERSION"}
        </span>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default VersionToggleAnimation; 