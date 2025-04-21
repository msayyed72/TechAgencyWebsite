import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import RevealWrapper from "./RevealWrapper";
import CSS3DCard from "./3d/CSS3DCard";

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
      <CSS3DCard className="h-full">
        <motion.div 
          className="bg-[#0A0A0A] p-8 rounded-lg border border-white/10 gradient-border card-glow transition-all duration-300 h-full"
          whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
        >
          <div 
            className="floating-3d-element text-[#A3FF12] text-4xl mb-6 inline-block"
          >
            <Icon size={40} />
          </div>
          <h3 className="text-2xl font-bold mb-3">{title}</h3>
          <p className="text-gray-300">
            {description}
          </p>
        </motion.div>
      </CSS3DCard>
    </RevealWrapper>
  );
};

export default ServiceCard;
