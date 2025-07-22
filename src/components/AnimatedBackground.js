import React, { useEffect, useState } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    console.log('🎨 AnimatedBackground component loaded!');
    // Generate squares with better distribution
    const newSquares = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      size: Math.random() * 40 + 15, // 15-55px
      left: Math.random() * 100, // 0-100%
      top: Math.random() * 120 + 100, // Start below screen
      animationDelay: Math.random() * 15, // 0-15s
      animationDuration: Math.random() * 8 + 12, // 12-20s
      opacity: Math.random() * 0.4 + 0.1, // 0.1-0.5
      rotationSpeed: Math.random() * 2 + 1, // 1-3 rotations
    }));
    setSquares(newSquares);
  }, []);

  return (
    <div className="animated-background">
      {/* Grid pattern overlay */}
      <div className="grid-overlay"></div>
      
      {/* Floating squares */}
      {squares.map((square) => (
        <div
          key={square.id}
          className="floating-square"
          style={{
            width: `${square.size}px`,
            height: `${square.size}px`,
            left: `${square.left}%`,
            top: `${square.top}%`,
            animationDelay: `${square.animationDelay}s`,
            animationDuration: `${square.animationDuration}s`,
            opacity: square.opacity,
            '--rotation-speed': `${square.rotationSpeed}`,
          }}
        />
      ))}
      
      {/* Gradient overlay for depth */}
      <div className="gradient-overlay"></div>
    </div>
  );
};

export default AnimatedBackground; 