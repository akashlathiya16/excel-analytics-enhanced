import React, { useEffect, useState } from 'react';
import './GlitchBackground.css';

const GlitchBackground = () => {
  const [glitchTexts, setGlitchTexts] = useState([]);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
  const words = ['LOGIN', 'SECURE', 'ACCESS', 'DATA', 'ANALYTICS', 'EXCEL', 'CHARTS', 'DASHBOARD', 'USER', 'AUTH'];

  useEffect(() => {
    const texts = Array.from({ length: 30 }, (_, i) => {
      const isWord = Math.random() > 0.7;
      const content = isWord 
        ? words[Math.floor(Math.random() * words.length)]
        : Array.from({ length: Math.random() * 8 + 3 }, () => 
            characters[Math.floor(Math.random() * characters.length)]
          ).join('');

      return {
        id: i,
        text: content,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 12,
        opacity: Math.random() * 0.7 + 0.1,
        animationDelay: Math.random() * 10,
        animationDuration: Math.random() * 5 + 3,
        glitchIntensity: Math.random() * 3 + 1,
      };
    });

    setGlitchTexts(texts);
  }, []);

  return (
    <div className="glitch-background">
      <div className="glitch-gradient"></div>
      
      {glitchTexts.map((item) => (
        <div
          key={item.id}
          className="glitch-text"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: `${item.size}px`,
            opacity: item.opacity,
            animationDelay: `${item.animationDelay}s`,
            animationDuration: `${item.animationDuration}s`,
          }}
          data-text={item.text}
        >
          {item.text}
        </div>
      ))}
      
      <div className="glitch-overlay"></div>
    </div>
  );
};

export default GlitchBackground; 