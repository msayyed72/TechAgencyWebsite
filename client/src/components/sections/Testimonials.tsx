import { useQuery } from "@tanstack/react-query";
import RevealWrapper from "../ui/RevealWrapper";
import { Loader2, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

// Define testimonial type from API
interface Testimonial {
  id: number;
  clientName: string;
  clientTitle: string;
  companyName: string;
  content: string;
  rating: number;
  avatarUrl: string;
  featured: boolean;
  orderIndex: number;
}

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  // Generate stars based on rating
  const stars = Array(5).fill(0).map((_, i) => (
    <StarIcon 
      key={i} 
      className={`h-4 w-4 ${i < testimonial.rating ? "text-[#A3FF12]" : "text-gray-500"}`} 
      fill={i < testimonial.rating ? "#A3FF12" : "none"} 
    />
  ));

  return (
    <RevealWrapper direction="up" delay={testimonial.orderIndex * 0.1}>
      <Card className="bg-[#1A1A1A] border-gray-800 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-14 w-14 border-2 border-[#A3FF12]">
              <AvatarImage src={testimonial.avatarUrl} alt={testimonial.clientName} />
              <AvatarFallback className="bg-[#2A2A2A] text-[#A3FF12]">
                {testimonial.clientName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold text-lg">{testimonial.clientName}</h4>
              <p className="text-sm text-gray-400">{testimonial.clientTitle}, {testimonial.companyName}</p>
            </div>
          </div>
          
          <div className="relative">
            <Quote className="h-8 w-8 text-[#A3FF12] opacity-20 absolute -top-2 -left-1" />
            <p className="text-gray-300 italic pl-6 relative z-10">{testimonial.content}</p>
          </div>
          
          <div className="flex mt-4">
            {stars}
          </div>
        </CardContent>
      </Card>
    </RevealWrapper>
  );
};

const Testimonials = () => {
  // Fetch testimonials from API
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
    retry: 1,
  });

  return (
    <section id="testimonials" className="py-20 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <RevealWrapper>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Client Testimonials</h2>
          </RevealWrapper>
          
          <RevealWrapper delay={0.1}>
            <div className="w-20 h-1 bg-[#A3FF12] mx-auto mb-8"></div>
          </RevealWrapper>
          
          <RevealWrapper delay={0.2}>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </RevealWrapper>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-[#A3FF12]" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            <p>Error loading testimonials. Please try again later.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials && testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;