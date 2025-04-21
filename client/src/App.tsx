import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "./lib/queryClient";

// Layout Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Section Components
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";

function App() {
  useEffect(() => {
    // Set page title
    document.title = "DebugDominate | Tech Agency";
    
    // Add meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'DebugDominate - We Debug. You Dominate. Full-service tech agency providing web development, branding, digital marketing, AI tools, and creative media solutions.';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen flex flex-col bg-black text-white">
          <Navbar />
          <main className="flex-grow">
            <Hero />
            <About />
            <Services />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
