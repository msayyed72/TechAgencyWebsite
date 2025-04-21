import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/assets/logo";
import { smoothScroll } from "@/utils/scrollUtils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    smoothScroll(id);
    closeMenu();
  };

  const navLinks = [
    { title: "About", id: "about" },
    { title: "Services", id: "services" },
    { title: "Projects", id: "projects" },
    { title: "Contact", id: "contact" }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a 
          href="#hero" 
          className="flex items-center space-x-2"
          onClick={(e) => handleClick(e, "hero")}
        >
          <div className="h-8 w-8">
            <Logo />
          </div>
          <span className="font-bold text-lg hidden md:block">DebugDominate</span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.id}
              href={`#${link.id}`} 
              className="hover:text-[#A3FF12] transition-colors duration-300"
              onClick={(e) => handleClick(e, link.id)}
            >
              {link.title}
            </a>
          ))}
        </div>
        
        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-white focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <div className={`md:hidden bg-black/95 absolute w-full border-b border-white/10 py-4 transition-transform duration-300 ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="container mx-auto px-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a 
              key={link.id}
              href={`#${link.id}`} 
              className="py-2 hover:text-[#A3FF12] transition-colors"
              onClick={(e) => handleClick(e, link.id)}
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
