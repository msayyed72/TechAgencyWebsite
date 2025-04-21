import { services } from "@/data/services";
import ServiceCard from "../ui/ServiceCard";
import RevealWrapper from "../ui/RevealWrapper";

const Services = () => {
  return (
    <section id="services" className="py-20 bg-black relative">
      <div className="tech-bg absolute inset-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <RevealWrapper>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">What We Do</h2>
          </RevealWrapper>
          
          <RevealWrapper delay={0.1}>
            <div className="w-20 h-1 bg-[#A3FF12] mx-auto mb-8"></div>
          </RevealWrapper>
          
          <RevealWrapper delay={0.2}>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our comprehensive suite of services covers every aspect of your digital journey.
            </p>
          </RevealWrapper>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              delay={index + 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
