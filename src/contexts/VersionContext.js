import React, { createContext, useContext, useState, useEffect } from 'react';

const VersionContext = createContext();

export function useVersion() {
  return useContext(VersionContext);
}

export function VersionProvider({ children }) {
  const [isNewVersion, setIsNewVersion] = useState(() => {
    // Check localStorage for saved version preference
    const savedVersion = localStorage.getItem('appVersion');
    return savedVersion === 'new';
  });
  const [isToggleAnimating, setIsToggleAnimating] = useState(false);
  const [previousVersion, setPreviousVersion] = useState(() => {
    const savedVersion = localStorage.getItem('appVersion');
    return savedVersion || 'old';
  });

  useEffect(() => {
    // Save version preference to localStorage
    localStorage.setItem('appVersion', isNewVersion ? 'new' : 'old');
    
    // Add version class to body for styling
    if (isNewVersion) {
      document.body.classList.add('new-version');
      document.body.classList.remove('old-version');
    } else {
      document.body.classList.add('old-version');
      document.body.classList.remove('new-version');
    }
  }, [isNewVersion]);

  const toggleVersion = () => {
    const currentVersion = isNewVersion ? 'new' : 'old';
    const newVersion = !isNewVersion;
    
    // Store previous version for animation logic BEFORE starting animation
    setPreviousVersion(currentVersion);
    
    // Start animation immediately after setting previous version
    setTimeout(() => {
      setIsToggleAnimating(true);
      
      // Same quick timing for both transitions since they use same effect
      
      // Quick change for dramatic earthquake effect (both directions)
      setTimeout(() => {
        setIsNewVersion(newVersion);
      }, 100);
      
      // Stop animation after 2.5s
      setTimeout(() => {
        setIsToggleAnimating(false);
      }, 2500);
    }, 50); // Small delay to ensure state update
  };

  const value = {
    isNewVersion,
    toggleVersion,
    isToggleAnimating,
    previousVersion,
    currentVersion: isNewVersion ? 'new' : 'old'
  };

  return (
    <VersionContext.Provider value={value}>
      {children}
    </VersionContext.Provider>
  );
} 