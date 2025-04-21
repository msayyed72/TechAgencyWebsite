import { projects } from "@/data/projects";
import ProjectCard from "../ui/ProjectCard";
import RevealWrapper from "../ui/RevealWrapper";

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-[#121212] relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <RevealWrapper>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Work</h2>
          </RevealWrapper>
          
          <RevealWrapper delay={0.1}>
            <div className="w-20 h-1 bg-[#A3FF12] mx-auto mb-8"></div>
          </RevealWrapper>
          
          <RevealWrapper delay={0.2}>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our innovative projects that blend creativity with cutting-edge technology.
            </p>
          </RevealWrapper>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              techs={project.techs}
              icon={project.icon}
              delay={index + 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
