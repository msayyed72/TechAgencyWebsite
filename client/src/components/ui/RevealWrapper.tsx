import React, { useEffect, useRef } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "framer-motion";

interface RevealWrapperProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  duration?: number;
  once?: boolean;
}

const RevealWrapper: React.FC<RevealWrapperProps> = ({
  children,
  delay = 0,
  direction = "up",
  className = "",
  duration = 0.5,
  once = true,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });
  const controls = useAnimation();

  // Set up different animation variants based on direction
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0], // Cubic bezier for smooth easing
      },
    },
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else if (!once) {
      controls.start("hidden");
    }
  }, [isInView, controls, once]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default RevealWrapper;
