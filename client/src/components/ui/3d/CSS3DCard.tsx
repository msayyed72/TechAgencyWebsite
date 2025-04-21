
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 15;
    const rotateX = ((centerY - y) / centerY) * 15;
    
    setRotation({ x: rotateX, y: rotateY });
    setPosition({ x: (x - centerX) / 10, y: (y - centerY) / 10 });
  };
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
    setPosition({ x: 0, y: 0 });
  };
  
  return (
    <motion.div 
      className={`card-3d relative ${className}`}
      style={{
        transform: `
          perspective(1000px) 
          rotateX(${rotation.x}deg) 
          rotateY(${rotation.y}deg)
          translateZ(${isHovered ? depth : 0}px)
          translateX(${position.x}px)
          translateY(${position.y}px)
        `,
        transition: isHovered ? 'transform 0.1s ease' : 'transform 0.5s ease-out'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative z-10">{children}</div>
      
      <motion.div
        className="absolute inset-0 opacity-0 transition-opacity duration-300"
        style={{ 
          background: `
            radial-gradient(
              circle at ${50 + (rotation.y / 15) * 50}% ${50 + (rotation.x / 15) * 50}%, 
              ${glowColor}, 
              transparent 50%
            )
          `,
          opacity: isHovered ? 0.2 : 0,
          zIndex: 5
        }}
      />
      
      <motion.div
        className="absolute inset-0 opacity-0"
        style={{
          background: `linear-gradient(
            ${135 + (rotation.y * 2)}deg,
            transparent,
            ${glowColor}40 50%,
            transparent
          )`,
          opacity: isHovered ? 0.15 : 0,
          zIndex: 4
        }}
      />
    </motion.div>
  );
};

export default CSS3DCard;
