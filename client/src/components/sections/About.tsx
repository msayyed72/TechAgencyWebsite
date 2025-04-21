import { Eye, Rocket } from "lucide-react";
import RevealWrapper from "../ui/RevealWrapper";

const About = () => {
  return (
    <section id="about" className="py-20 bg-[#121212] relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <RevealWrapper>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Story</h2>
          </RevealWrapper>
          
          <RevealWrapper delay={0.1}>
            <div className="w-20 h-1 bg-[#A3FF12] mx-auto mb-8"></div>
          </RevealWrapper>
        </div>
        
        <RevealWrapper delay={0.2} className="max-w-4xl mx-auto mb-16">
          <p className="text-lg text-gray-300 leading-relaxed">
            Founded by a visionary who rose from humble beginnings in a slum, our agency was born from a deep passion for technology and its transformative power. With firsthand experience of how digital innovation can change lives, we've built an agency dedicated to providing all-in-one digital solutions that empower businesses to thrive in the digital landscape.
          </p>
        </RevealWrapper>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <RevealWrapper delay={0.3}>
            <div className="bg-[#0A0A0A] p-8 rounded-lg border border-white/10 gradient-border card-glow transition-all duration-300 h-full">
              <div className="text-[#A3FF12] text-4xl mb-4">
                <Eye size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-300">
                To democratize technology and create a digital ecosystem where businesses of all sizes can leverage cutting-edge tools to compete and excel globally.
              </p>
            </div>
          </RevealWrapper>
          
          <RevealWrapper delay={0.4}>
            <div className="bg-[#0A0A0A] p-8 rounded-lg border border-white/10 gradient-border card-glow transition-all duration-300 h-full">
              <div className="text-[#A3FF12] text-4xl mb-4">
                <Rocket size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-300">
                Delivering innovative, accessible, and scalable digital solutions that empower our clients to overcome technical challenges and achieve market dominance.
              </p>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
};

export default About;
