import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Button from "../ui/Button";
import { smoothScroll } from "@/utils/scrollUtils";
import FloatingLogo from "../ui/3d/FloatingLogo";
import CSS3DCard from "../ui/3d/CSS3DCard";
import { useEffect, useState } from "react";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScroll("services");
  };

  const handleScrollDown = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScroll("about");
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="tech-bg absolute inset-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black"></div>
      
      {/* Animated background particles */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `radial-gradient(circle at ${50 + mousePosition.x * 30}% ${50 + mousePosition.y * 30}%, rgba(163, 255, 18, 0.1) 0%, transparent 50%)`,
          transition: 'background-position 0.3s ease'
        }}
      ></div>
      
      <div className="container mx-auto px-6 py-12 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* 3D Logo */}
          <div className="mb-8">
            <div className="w-64 md:w-80 mx-auto">
              <FloatingLogo animate={true} />
            </div>
          </div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight scene-overlay"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            We <span className="text-[#A3FF12] glow">Debug.</span> You <span className="text-[#A3FF12] glow">Dominate.</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto scene-overlay"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Elevating your digital presence with cutting-edge solutions, from web development to AI-powered tools.
          </motion.p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="scene-overlay"
          >
            <CSS3DCard>
              <Button 
                size="lg" 
                variant="primary"
                onClick={handleExploreClick}
                className="px-8 py-6 text-lg"
              >
                Explore Services
              </Button>
            </CSS3DCard>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-0 right-0 flex justify-center scene-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        whileHover={{ scale: 1.2 }}
      >
        <a 
          href="#about" 
          className="text-white/80 hover:text-[#A3FF12] transition-colors"
          onClick={handleScrollDown}
          aria-label="Scroll down"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
