import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import { LucideIcon } from "lucide-react";
import RevealWrapper from "./RevealWrapper";
import CSS3DCard from "./3d/CSS3DCard";

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
      <CSS3DCard>
        <motion.div 
          className="bg-[#0A0A0A] rounded-lg overflow-hidden border border-white/10 gradient-border card-glow transition-all duration-300 h-full"
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
        >
          <div className="h-48 bg-black/40 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="text-5xl text-[#A3FF12] opacity-30"
                animate={{ 
                  rotateY: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Icon size={64} />
              </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0A0A0A] to-transparent h-1/2"></div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-300 text-sm mb-4">{description}</p>
            
            <div className="mb-4 flex flex-wrap">
              {techs.map((tech, index) => (
                <motion.span 
                  key={index}
                  className="text-xs font-mono text-[#A3FF12] bg-black/30 px-2 py-1 rounded mr-2 mb-2 inline-block floating-3d-element"
                  whileHover={{ scale: 1.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            
            <Button variant="primary" size="sm">
              View Demo
            </Button>
          </div>
        </motion.div>
      </CSS3DCard>
    </RevealWrapper>
  );
};

export default ProjectCard;
