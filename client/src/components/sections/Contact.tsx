import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Github, Linkedin, MessageCircle, Mail, MapPin } from "lucide-react";
import Button from "../ui/Button";
import RevealWrapper from "../ui/RevealWrapper";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setFormSubmitted(true);
    setFormData({ name: "", email: "", service: "", message: "" });
    
    // After 5 seconds, reset the form submitted state
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-20 bg-black relative">
      <div className="tech-bg absolute inset-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <RevealWrapper>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          </RevealWrapper>
          
          <RevealWrapper delay={0.1}>
            <div className="w-20 h-1 bg-[#A3FF12] mx-auto mb-8"></div>
          </RevealWrapper>
          
          <RevealWrapper delay={0.2}>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to dominate your market? Let's start a conversation about your project.
            </p>
          </RevealWrapper>
        </div>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8">
          <RevealWrapper delay={0.3} className="md:col-span-3">
            <form onSubmit={handleSubmit} className="bg-[#0A0A0A] p-8 rounded-lg border border-white/10">
              {formSubmitted ? (
                <motion.div 
                  className="text-center py-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-[#A3FF12] text-5xl mb-4">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="64" 
                      height="64" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      className="mx-auto"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-gray-300">
                    Thank you for reaching out. We'll get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/20 rounded px-4 py-3 text-white focus:border-[#A3FF12] focus:outline-none transition-colors" 
                      placeholder="Your name" 
                      required 
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/20 rounded px-4 py-3 text-white focus:border-[#A3FF12] focus:outline-none transition-colors" 
                      placeholder="your@email.com" 
                      required 
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="service" className="block text-gray-300 mb-2">Service Needed</label>
                    <select 
                      id="service" 
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/20 rounded px-4 py-3 text-white focus:border-[#A3FF12] focus:outline-none transition-colors"
                    >
                      <option value="" disabled>Select a service</option>
                      <option value="web-development">Website Development</option>
                      <option value="branding">Branding & Identity</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="ai-tools">AI Tools & Automation</option>
                      <option value="creative-media">Reels Editing & Creative Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                    <textarea 
                      id="message" 
                      rows={5} 
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-black border border-white/20 rounded px-4 py-3 text-white focus:border-[#A3FF12] focus:outline-none transition-colors" 
                      placeholder="Tell us about your project..."
                      required
                    ></textarea>
                  </div>
                  
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </>
              )}
            </form>
          </RevealWrapper>
          
          <RevealWrapper delay={0.4} className="md:col-span-2">
            <div className="bg-[#0A0A0A] p-8 rounded-lg border border-white/10 h-full flex flex-col">
              <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
              
              <p className="text-gray-300 mb-8">
                Have questions or want to discuss your project? Reach out through your preferred channel.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center">
                  <div className="text-[#A3FF12] text-xl mr-4">
                    <Mail size={24} />
                  </div>
                  <span className="text-gray-300">hello@debugdominate.com</span>
                </div>
                
                <div className="flex items-center">
                  <div className="text-[#A3FF12] text-xl mr-4">
                    <MapPin size={24} />
                  </div>
                  <span className="text-gray-300">Mumbai, Maharashtra, India</span>
                </div>
              </div>
              
              <div className="mt-auto">
                <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="text-white hover:text-[#A3FF12] transition-colors text-2xl"
                    aria-label="Instagram"
                  >
                    <Instagram size={24} />
                  </a>
                  <a 
                    href="#" 
                    className="text-white hover:text-[#A3FF12] transition-colors text-2xl"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle size={24} />
                  </a>
                  <a 
                    href="#" 
                    className="text-white hover:text-[#A3FF12] transition-colors text-2xl"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a 
                    href="#" 
                    className="text-white hover:text-[#A3FF12] transition-colors text-2xl"
                    aria-label="GitHub"
                  >
                    <Github size={24} />
                  </a>
                </div>
              </div>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
};

export default Contact;
