import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  imageSrc: string;
  reverseLayout?: boolean;
}

const ProjectCard = ({ title, description, tags, imageSrc, reverseLayout = false }: ProjectProps) => {
  return (
    <div className="bg-[#050505] rounded-[2.5rem] w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row overflow-hidden border border-white/10 mb-12 shadow-2xl">
      {/* Image container */}
      <div className={`relative w-full lg:w-[50%] min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] ${reverseLayout ? 'lg:order-2' : 'lg:order-1'}`}>
        <Image src={imageSrc} alt={title} fill className="object-cover" />
      </div>
      
      {/* Content container */}
      <div className={`w-full lg:w-[50%] flex flex-col justify-center p-8 md:p-12 lg:p-16 ${reverseLayout ? 'lg:order-1' : 'lg:order-2'}`}>
        <div className="flex flex-wrap gap-3 mb-8">
          {tags.map((tag, index) => (
             <span key={index} className="bg-[#00ff00] text-black text-xs md:text-sm font-bold px-4 py-1.5 rounded-full">
               {tag}
             </span>
          ))}
        </div>
        
        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {title}
        </h2>
        
        <p className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed font-sans">
          {description}
        </p>
        
        <div>
          <button className="bg-gradient-to-r from-[#00ff22] to-[#00cc11] hover:from-[#00e61e] hover:to-[#00b30f] text-black font-bold text-lg px-8 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)]">
            View Project 
            <ArrowUpRight className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ProjectShowcaseList() {
  return (
    <section className="w-full bg-[#000000] py-20 px-4 md:px-8">
      <ProjectCard 
        title="Doctor Booking Web Application"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
        tags={["Ui/Ux Design", "Website Design", "Wire Frame"]}
        imageSrc="/doctor_mockup.png"
        reverseLayout={false}
      />
       <ProjectCard 
        title="SaaS Application"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
        tags={["Landing Page", "Website Design", "Wire Frame"]}
        imageSrc="/saas_mockup.png"
        reverseLayout={true}
      />
    </section>
  );
}
