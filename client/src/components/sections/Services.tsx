import { useQuery } from "@tanstack/react-query";
import ServiceCard from "../ui/ServiceCard";
import RevealWrapper from "../ui/RevealWrapper";
import { Loader2 } from "lucide-react";
import * as LucideIcons from "lucide-react";

// Define the service type from our API
interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  iconName: string; // This should match the backend field
  featured: boolean;
  orderIndex: number;
}

const Services = () => {
  // Fetch services from the API
  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ['/api/services'],
    retry: 1,
  });

  // Function to get icon dynamically by name
  const getIconByName = (iconName: string) => {
    // Database field is icon_name, but comes back camelCase as iconName
    // Convert from snake_case if needed
    const formattedIconName = iconName.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    const IconComponent = (LucideIcons as any)[formattedIconName] || LucideIcons.Code;
    return IconComponent;
  };

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
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-[#A3FF12]" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            <p>Error loading services. Please try again later.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services && services.map((service, index) => {
              const Icon = getIconByName(service.iconName);
              return (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  icon={Icon}
                  delay={index * 0.1 + 0.3}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
