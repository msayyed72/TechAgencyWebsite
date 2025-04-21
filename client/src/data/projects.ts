import { 
  Code, 
  Mic, 
  Languages, 
  Footprints, 
  ShoppingCart, 
  Globe, 
  ShoppingBag 
} from "lucide-react";

export const projects = [
  {
    title: "AI-Based Bar Bending Schedule",
    description: "Automated calculation system for construction industry that reduced manual errors by 95%",
    techs: ["Python", "React", "ML"],
    icon: Code
  },
  {
    title: "AI Video Dubbing Tool",
    description: "Multilingual video dubbing platform with natural-sounding AI voice synthesis",
    techs: ["React", "Whisper AI", "TTS"],
    icon: Mic
  },
  {
    title: "AI Modi Lipi Translator",
    description: "ML-powered tool that translates ancient Modi script to modern Marathi with 92% accuracy",
    techs: ["Python", "ML", "OCR"],
    icon: Languages
  },
  {
    title: "Turf Booking Admin Panel",
    description: "Comprehensive management system for sports facilities with dynamic scheduling",
    techs: ["React", "Flutter", "Firebase"],
    icon: Footprints
  },
  {
    title: "E-commerce Backend System",
    description: "Scalable API-driven backend that processes 10,000+ transactions daily",
    techs: ["React", "Node.js", "MongoDB"],
    icon: ShoppingCart
  },
  {
    title: "Drake Theme 3D Portfolio",
    description: "Immersive 3D web experience with interactive elements and stunning animations",
    techs: ["React", "Three.js", "GSAP"],
    icon: Globe
  },
  {
    title: "The Essential India",
    description: "Complete branding and web presence for an eco-friendly product line",
    techs: ["Branding", "Web", "Social"],
    icon: ShoppingBag
  }
];
