import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import RevealWrapper from "./RevealWrapper";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  icon: Icon,
  delay = 0 
}) => {
  return (
    <RevealWrapper delay={delay * 0.1} className="h-full">
      <motion.div 
        className="bg-[#0A0A0A] p-8 rounded-lg border border-white/10 gradient-border card-glow transition-all duration-300 h-full"
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
      >
        <div className="text-[#A3FF12] text-4xl mb-6">
          <Icon size={40} />
        </div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-300">
          {description}
        </p>
      </motion.div>
    </RevealWrapper>
  );
};

export default ServiceCard;
