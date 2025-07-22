import React, { useState, useEffect, useCallback } from 'react';
import './ClickSpark.css';

const ClickSpark = () => {
  const [sparks, setSparks] = useState([]);

  const createSpark = useCallback((x, y) => {
    const newSpark = {
      id: Date.now() + Math.random(),
      x,
      y,
      particles: Array.from({ length: 8 }, (_, i) => ({
        id: i,
        angle: (i * 45) * (Math.PI / 180), // 45 degrees apart
        velocity: Math.random() * 100 + 50, // 50-150px
        size: Math.random() * 4 + 2, // 2-6px
        color: `hsl(${Math.random() * 60 + 120}, 100%, ${Math.random() * 30 + 60}%)`, // Green to cyan
        life: 1,
      })),
    };

    setSparks(prev => [...prev, newSpark]);

    // Remove spark after animation
    setTimeout(() => {
      setSparks(prev => prev.filter(spark => spark.id !== newSpark.id));
    }, 600);
  }, []);

  const handleClick = useCallback((e) => {
    createSpark(e.clientX, e.clientY);
  }, [createSpark]);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  return (
    <div className="click-spark-container">
      {sparks.map(spark => (
        <div key={spark.id} className="spark-wrapper">
          {spark.particles.map(particle => (
            <div
              key={particle.id}
              className="spark-particle"
              style={{
                left: spark.x,
                top: spark.y,
                '--angle': `${particle.angle}rad`,
                '--velocity': `${particle.velocity}px`,
                '--size': `${particle.size}px`,
                '--color': particle.color,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ClickSpark; 