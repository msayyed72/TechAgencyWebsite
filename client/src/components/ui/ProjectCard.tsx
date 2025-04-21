import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import { LucideIcon } from "lucide-react";
import RevealWrapper from "./RevealWrapper";

interface ProjectCardProps {
  title: string;
  description: string;
  techs: string[];
  icon: LucideIcon;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  techs,
  icon: Icon,
  delay = 0
}) => {
  return (
    <RevealWrapper delay={delay * 0.1}>
      <motion.div 
        className="bg-[#0A0A0A] rounded-lg overflow-hidden border border-white/10 gradient-border card-glow transition-all duration-300 h-full"
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
      >
        <div className="h-48 bg-black/40 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-5xl text-[#A3FF12] opacity-20">
              <Icon size={64} />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A0A0A] to-transparent h-1/2"></div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-300 text-sm mb-4">{description}</p>
          
          <div className="mb-4 flex flex-wrap">
            {techs.map((tech, index) => (
              <span 
                key={index}
                className="text-xs font-mono text-[#A3FF12] bg-black/30 px-2 py-1 rounded mr-2 mb-2 inline-block"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <Button variant="primary" size="sm">
            View Demo
          </Button>
        </div>
      </motion.div>
    </RevealWrapper>
  );
};

export default ProjectCard;
