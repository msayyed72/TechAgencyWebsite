import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="300" height="300" rx="20" fill="black" />
      <path d="M80 150L130 100H170L120 150L170 200H130L80 150Z" fill="white" />
      <path d="M220 150L170 100H130L180 150L130 200H170L220 150Z" fill="white" />
      <path d="M170 100H130V150H170V100Z" fill="#A3FF12" />
      <path d="M170 150V200H130L170 150Z" fill="#A3FF12" />
      <path d="M100 230C97.2386 230 95 227.761 95 225C95 222.239 97.2386 220 100 220H200C202.761 220 205 222.239 205 225C205 227.761 202.761 230 200 230H100Z" fill="white" />
      <text x="150" y="275" textAnchor="middle" fill="#A3FF12" fontFamily="monospace" fontSize="14">We Debug. You Dominate.</text>
    </svg>
  );
};

export default Logo;
