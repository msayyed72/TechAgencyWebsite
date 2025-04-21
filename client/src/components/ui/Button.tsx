import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className,
  as = "button",
  href,
  ...props
}) => {
  const baseClasses = "font-bold transition-all rounded-md inline-block";
  
  const variantClasses = {
    primary: "bg-[#A3FF12] text-black hover:bg-opacity-90 btn-glow",
    secondary: "bg-white/10 text-white hover:bg-white/20",
    outline: "bg-transparent border border-[#A3FF12] text-[#A3FF12] hover:bg-[#A3FF12]/10"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const motionProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 }
  };

  if (as === "a") {
    return (
      <motion.a
        href={href}
        className={buttonClasses}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={buttonClasses}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
