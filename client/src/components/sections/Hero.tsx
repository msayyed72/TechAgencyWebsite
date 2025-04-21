import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Button from "../ui/Button";
import Logo from "@/assets/logo";
import { smoothScroll } from "@/utils/scrollUtils";

const Hero = () => {
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
      
      <div className="container mx-auto px-6 py-12 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="mb-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05, transition: { duration: 0.5 } }}
          >
            <div className="w-64 md:w-80 mx-auto">
              <Logo />
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            We <span className="text-[#A3FF12] glow">Debug.</span> You <span className="text-[#A3FF12] glow">Dominate.</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto"
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
          >
            <Button 
              size="lg" 
              variant="primary"
              onClick={handleExploreClick}
            >
              Explore Services
            </Button>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-0 right-0 flex justify-center"
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
