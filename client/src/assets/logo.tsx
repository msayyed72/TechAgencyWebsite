import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 300 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main laptop body (rounded rectangle) */}
      <rect x="30" y="30" width="240" height="140" rx="10" stroke="white" strokeWidth="6" fill="black" />
      
      {/* Logo inside the laptop screen */}
      <g transform="translate(70, 55) scale(0.8)">
        {/* Left bracket */}
        <path d="M30 60L60 30v60L30 60z" fill="white" />
        
        {/* Right bracket */}
        <path d="M170 60L140 30v60L170 60z" fill="white" />
        
        {/* D letter (green) */}
        <path d="M60 30h50v30h-50z" fill="#A3FF12" />
        <path d="M110 60l-50 30 50-30z" fill="#A3FF12" />
      </g>
      
      {/* Laptop bottom/keyboard part */}
      <path d="M20 170l30 40h200l30-40H20z" stroke="white" strokeWidth="6" fill="black" />
      
      {/* Trackpad */}
      <path d="M140 190a15 7 0 1 0 20 0a15 7 0 1 0 -20 0" stroke="white" strokeWidth="3" fill="none" />
      
      {/* Tagline */}
      <text x="150" y="230" textAnchor="middle" fill="#A3FF12" fontFamily="monospace" fontWeight="bold" fontSize="16">We Debug. You Dominate.</text>
    </svg>
  );
};

export default Logo;
