import { useEffect, useState } from "react";
import { 
  Instagram, 
  Github, 
  Linkedin, 
  MessageCircle
} from "lucide-react";
import Logo from "@/assets/logo";
import { smoothScroll } from "@/utils/scrollUtils";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    smoothScroll(id);
  };

  return (
    <footer className="bg-[#0A0A0A] py-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <div className="h-10 w-10 mb-4">
              <Logo />
            </div>
            <p className="text-gray-400 max-w-md">
              Empowering businesses with innovative digital solutions to overcome technical challenges and achieve market dominance.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#hero" 
                    className="text-gray-400 hover:text-[#A3FF12] transition-colors"
                    onClick={(e) => handleClick(e, "hero")}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="#about" 
                    className="text-gray-400 hover:text-[#A3FF12] transition-colors"
                    onClick={(e) => handleClick(e, "about")}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a 
                    href="#services" 
                    className="text-gray-400 hover:text-[#A3FF12] transition-colors"
                    onClick={(e) => handleClick(e, "services")}
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a 
                    href="#projects" 
                    className="text-gray-400 hover:text-[#A3FF12] transition-colors"
                    onClick={(e) => handleClick(e, "projects")}
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    className="text-gray-400 hover:text-[#A3FF12] transition-colors"
                    onClick={(e) => handleClick(e, "contact")}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#services" className="text-gray-400 hover:text-[#A3FF12] transition-colors">
                    Website Development
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-400 hover:text-[#A3FF12] transition-colors">
                    Branding & Identity
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-400 hover:text-[#A3FF12] transition-colors">
                    Digital Marketing
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-400 hover:text-[#A3FF12] transition-colors">
                    AI Tools & Automation
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-400 hover:text-[#A3FF12] transition-colors">
                    Creative Media
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} DebugDominate. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="text-gray-400 hover:text-[#A3FF12] transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-[#A3FF12] transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={20} />
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-[#A3FF12] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="#" 
              className="text-gray-400 hover:text-[#A3FF12] transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
