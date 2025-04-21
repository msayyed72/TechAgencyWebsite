import React from 'react';
import { motion } from 'framer-motion';
import Logo from '@/assets/logo';

interface FloatingLogoProps {
  className?: string;
  scale?: number;
  animate?: boolean;
}

const FloatingLogo: React.FC<FloatingLogoProps> = ({
  className = '',
  scale = 1,
  animate = true
}) => {
  return (
    <div 
      className={`logo-3d-container relative ${className}`}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ 
          scale: 1, 
          opacity: 1,
        }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut"
        }}
        className={animate ? "rotate3d-animation" : ""}
        style={{ 
          transformStyle: 'preserve-3d',
          transform: 'translateZ(0)',
          scale
        }}
      >
        <div className={`relative ${animate ? "float-animation" : ""}`}>
          {/* Main logo */}
          <Logo className="relative z-10" />
          
          {/* Shadow element */}
          <div 
            className="absolute top-[5%] left-[5%] w-[90%] h-[90%] -z-10 rounded-lg opacity-30 blur-md"
            style={{ 
              background: 'radial-gradient(circle at center, rgba(163, 255, 18, 0.3), transparent 70%)',
              transform: 'translateZ(-20px)'
            }}
          />
          
          {/* Glow elements */}
          <div 
            className="absolute inset-0 rounded-lg opacity-20 blur-md pulse-animation" 
            style={{ 
              background: 'radial-gradient(circle at center, #A3FF12, transparent 70%)',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default FloatingLogo;