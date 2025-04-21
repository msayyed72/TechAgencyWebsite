import React, { useState } from 'react';

interface CSS3DCardProps {
  className?: string;
  children: React.ReactNode;
  glowColor?: string;
  depth?: number;
}

const CSS3DCard: React.FC<CSS3DCardProps> = ({
  className = '',
  children,
  glowColor = '#A3FF12',
  depth = 20
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 10;
    const rotateX = ((centerY - y) / centerY) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };
  
  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };
  
  return (
    <div 
      className={`card-3d relative overflow-hidden ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateZ(0)`,
        transition: 'transform 0.3s ease'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative z-10">{children}</div>
      
      <div
        className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300"
        style={{ 
          background: `radial-gradient(circle at ${rotation.y > 0 ? '75%' : '25%'} ${rotation.x < 0 ? '75%' : '25%'}, ${glowColor}, transparent)`,
          zIndex: 5
        }}
      />
    </div>
  );
};

export default CSS3DCard;