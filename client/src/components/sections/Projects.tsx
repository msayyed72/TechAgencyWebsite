import { useQuery } from "@tanstack/react-query";
import ProjectCard from "../ui/ProjectCard";
import RevealWrapper from "../ui/RevealWrapper";
import { Loader2, Code } from "lucide-react";
import * as LucideIcons from "lucide-react";

// Define the project type from our API
interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  imageUrl: string | null;
  technologies: string[];
  featured: boolean;
  category: string | null;
  demoUrl: string | null;
  githubUrl: string | null;
}

// Map categories to icons
const categoryIconMap: Record<string, keyof typeof LucideIcons> = {
  "E-commerce": "ShoppingCart",
  "Mobile": "Smartphone",
  "Business Intelligence": "BarChart",
  "Web Development": "Globe",
  "AI": "Brain",
  "AR/VR": "Glasses",
  "IoT": "Wifi",
  "Blockchain": "Link"
};

const Projects = () => {
  // Fetch projects from the API with proper typing
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
    retry: 1,
  });

  // Function to get icon based on project category
  const getIconForProject = (project: Project) => {
    if (!project.category) return Code;
    const iconName = categoryIconMap[project.category] || "Code";
    return (LucideIcons as any)[iconName] || LucideIcons.Code;
  };

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
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-[#A3FF12]" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            <p>Error loading projects. Please try again later.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects && projects.map((project, index) => {
              const Icon = getIconForProject(project);
              return (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  techs={project.technologies}
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

export default Projects;
