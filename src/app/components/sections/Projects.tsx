"use client"; // Required for useState and useEffect

import React, { useState, useEffect, useCallback } from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"; // Import 3d-card components
import { FloatingDock } from "@/components/ui/floating-dock"; // Import FloatingDock
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"; // Import Carousel components
import useEmblaCarousel from 'embla-carousel-react'; // Assuming this hook is available
import Autoplay from 'embla-carousel-autoplay';
import { Button } from "@/components/ui/button"; // Import Button component
import { GithubIcon, ExternalLinkIcon, CodeIcon, TerminalIcon, LayoutDashboardIcon } from 'lucide-react'; // Import icons from lucide-react, added CodeIcon, TerminalIcon, and LayoutDashboardIcon
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiReact, SiJavascript, SiBootstrap, SiHtml5, SiCss3, SiSpringboot, SiPython, SiNodedotjs, SiMysql, SiFlask, SiPandas, SiScikitlearn, SiFlutter } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { BiBrain } from "react-icons/bi";
import { LiaCss3Alt, LiaJsSquare, LiaReact } from "react-icons/lia";
import { IoIosLeaf } from "react-icons/io";
import { ShineBorder } from "@/components/magicui/shine-border";

// Define Project type with updated structure
interface Project {
  title: string;
  description: string;
  frontendTags: string[];
  backendTags: string[];
  github: string | null;
  live: string | null;
  image?: string; // Optional image property for the card
  screenshots: string[]; // Array of screenshot/gif URLs for the carousel
}

const icons: { [key: string]: React.ReactNode } = {
  "Next.js": <SiNextdotjs className="h-20 w-20 text-navy" />,
  "TypeScript": <SiTypescript className="h-20 w-20 text-navy" />,
  "Tailwind CSS": <SiTailwindcss className="h-20 w-20 text-navy" />,
  "React": <SiReact className="h-20 w-20 text-navy" />,
  "JavaScript": <SiJavascript className="h-20 w-20 text-navy" />,
  "Bootstrap": <SiBootstrap className="h-20 w-20 text-navy" />,
  "HTML": <SiHtml5 className="h-20 w-20 text-navy" />,
  "CSS3": <LiaCss3Alt className="h-20 w-20 text-navy" />,
  "Java": <FaJava className="h-20 w-20 text-navy" />,
  "Spring Boot": <SiSpringboot className="h-20 w-20 text-navy" />,
  "Python": <SiPython className="h-20 w-20 text-navy" />,
  "Node.js": <SiNodedotjs className="h-20 w-20 text-navy" />,
  "MySQL": <SiMysql className="h-20 w-20 text-navy" />,
  "Flask": <SiFlask className="h-20 w-20 text-navy" />,
  "Pandas": <SiPandas className="h-20 w-20 text-navy" />,
  "SciKit-Learn": <SiScikitlearn className="h-20 w-20 text-navy" />,
  "Flutter": <SiFlutter className="h-20 w-20 text-navy" />,
  "AI/ML": <BiBrain className="h-20 w-20 text-navy" />,
  "Express": <img src="https://www.svgrepo.com/show/353724/express.svg" className="text-navy h-20 w-20" alt="Express" />,
  "PyTorch": <img src="https://www.svgrepo.com/show/306619/pytorch.svg" className="text-navy " alt="PyTorch" />,
  "WebSockets": <img src="https://www.svgrepo.com/show/354553/websocket.svg" className="text-navy " alt="WebSockets" />,
  "OpenCV": <CodeIcon className="h-20 w-20 text-navy" />,
  "Torchvision": <CodeIcon className="h-20 w-20 text-navy" />,
  "Maven": <img src="https://www.svgrepo.com/show/376335/maven.svg" className="text-navy " alt="Maven" />,
  "ReactJS": <LiaReact className="h-20 w-20 text-navy" />,
  "Axios": <LiaJsSquare className="h-20 w-20 text-navy" />,
  "CSS": <LiaCss3Alt className="h-20 w-20 text-navy" />,
  "Leaflet": <IoIosLeaf className="h-20 w-20 text-navy" />,
};

const projectsData: Project[] = [
  {
    title: "VisionAid",
    description: "Flutter app for visually impaired with real-time object detection, scene analysis, OCR, hazard alerts, voice commands, and text-to-speech.",
    frontendTags: ["Flutter"],
    backendTags: ["Python", "Flask", "MySQL", "WebSockets", "AI/ML", "PyTorch"],
    github: "https://github.com/YOUR_GITHUB/VisionAid", // Replace with actual link
    live: null, // Add live link if available
    image: "/img/p1.jpg", 
    screenshots: ["/img/VisualAid/A (1).jpeg", "/img/VisualAid/A(2).jpeg", "/img/VisualAid/A (3).jpeg", "/img/VisualAid/A(4).jpeg", "/img/VisualAid/A(5).jpeg", "/img/VisualAid/A(6).jpeg","/img/VisualAid/A(7).jpeg", "/img/VisualAid/A (8).jpeg", "/img/VisualAid/A (9).jpeg","/img/VisualAid/A(10).jpeg"] // Placeholder screenshots
  },
  {
    title: "StreamHUB",
    description: "AI-powered movie streaming platform with chat, forums, AI recommenders, and admin controls.",
    frontendTags: ["Bootstrap"],
    backendTags: ["Python", "Node.js", "Express", "MySQL", "Flask", "Pandas", "SciKit-Learn"],
    github: "https://github.com/YOUR_GITHUB/StreamHUB", 
    live: null,
    image: "/img/p2.png",
    screenshots: ["/img/StreamHUB/Picture1.png", "/img/StreamHUB/Picture2.jpeg", "/img/StreamHUB/Picture3.jpeg", "/img/StreamHUB/Picture4.jpeg"] // Placeholder screenshots
  },
  {
    title: "BASYS (Biometric Attendance System)",
    description: "Attendance management system for real-time tracking, shift scheduling, customizable reporting, email notifications, and biometric device integration.",
    frontendTags: ["JavaScript", "Bootstrap", "HTML"],
    backendTags: ["Python", "Node.js", "Express", "MySQL"],
    github: "https://github.com/YOUR_GITHUB/BASYS", 
    live: null,
    image: "/img/p3.PNG",
    screenshots: ["/img/BASYS/Dashboard.png", "/img/BASYS/General Attendance Report.png", "/img/BASYS/MusterRoll.PNG", "/img/BASYS/Picture1.png"] // Placeholder screenshots
  },
  // Add more projects as needed
  {
    title: "Weather Forecast & Analysis App",
    description: "ReactJS frontend & Java Spring Boot backend weather app with real-time data, AQI & interactive map via OpenWeatherMap API.",
    frontendTags: ["ReactJS", "JavaScript", "Axios", "CSS3", "Leaflet"],
    backendTags: ["Java", "Spring Boot", "Maven"],
    github: null, // Add actual link if available
    live: "Weather App Demo", // Assuming "Weather App Demo" is the live link text, replace with actual URL if available
    image: "/img/p4.png", 
    screenshots: ["/img/p4.png", "/img/p5.png", "/img/p1.jpg"] // Placeholder screenshots
  },
  {
    title: "This Portfolio",
    description: "My personal portfolio website built with Next.js, TypeScript, and Tailwind CSS, showcasing my projects, skills, and experience.",
    frontendTags: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    backendTags: ["Node.js"], // No backend technologies listed
    github: "https://github.com/YOUR_GITHUB/YOUR_REPO", // Replace with actual GitHub link for this repo
    live: null, // Add live link if available
    image: "/img/p5.png", 
    screenshots: ["/img/p5.png", "/img/p1.jpg", "/img/p2.png"] // Placeholder screenshots
  },
];

const Projects = () => {
  // State for selected project, initialized to the first project
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    projectsData.length > 0 ? projectsData[0] : null
  );

  // Embla Carousel hook for the auto-play carousel

  return (
    <section id="projects" className="py-82 md:py-82 text-light-slate min-h-screen flex flex-col items-center justify-center px-4">
      <h2 className="bg-clip-text bg-gradient-to-b from-white/80 to-white/20 bg-opacity-50 text-4xl text-center text-transparent md:text-7xl">
        Projects
      </h2>
      <br />
      {/* Two-column layout container with fixed height for scrolling */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-2 w-full max-w-7xl flex-grow h-[70vh] mr-8 ml-8 [&::-webkit-scrollbar]:w-12"> {/* Adjust max-w and h as needed */}

        {/* Left Column: Project Cards (Scrollable) */}
        <div className="md:col-span-1 overflow-y-auto pr-14 scrollbar-thin scrollbar-thumb-slate scrollbar-track-light-navy border border-slate/50 rounded-xl">
          <h2 className="text-2xl font-bold mb-4 ml-10 text-center mt-6">Select a Project:</h2>
          {projectsData.map((project, index) => (
            <div // Added wrapper div for clickability
              key={index} // Moved key to the wrapper div
              onClick={() => setSelectedProject(project)} // Moved onClick here
              className="cursor-pointer -mb-2 ml-6" // Moved cursor-pointer here, added negative margin for tighter spacing
            >

              <CardContainer // Original CardContainer
                className="inter-var w-full -mb-16 -mt-16 -mr-8" // Keep original CardContainer class
                
              >
                <CardBody // Original CardBody
                  className={`relative group/card border-slate/50 w-full h-auto rounded-xl p-4 border transition-all duration-300 ${selectedProject?.title === project.title ? 'border-neon-green shadow-neon-glow' : 'hover:border-neon-green/50 hover:shadow-md'}`} // Removed cursor-pointer
                >
                                <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                  <CardItem
                    translateZ="50"
                    className="text-lg font-bold text-lightest-slate group-hover:text-neon-green transition-colors"
                  >
                    {project.title} 
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-400 text-xs max-w-sm mt-1" // Short description snippet
                  >
                    {project.description}
                  </CardItem>
                  {/* Example of adding an image if available */}
                  {project.image && (
                    <CardItem translateZ="100" className="w-full mt-4">
                      <img
                        src={project.image}
                        height="1000"
                        width="1000"
                        className="w-auto max-w-[80%] mx-auto object-contain rounded-md h-[300px]"
                        alt={project.title}
                      />
                    </CardItem>
                  )}
                </CardBody>
              </CardContainer>
            </div>
          ))}
        </div>

        {/* Right Column: Project Details (Scrollable) */}
        <div className="md:col-span-2 overflow-y-auto pl-2 scrollbar-thin scrollbar-thumb-slate scrollbar-track-light-navy backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate/50">
          {selectedProject ? (
            <div className="animate-fade-in pr-12 pl-12"> {/* Simple fade-in animation */}
              {/* Centered Title */}
              <h3 className="text-4xl font-bold text-lightest-slate mb-4 text-center justify-center">{selectedProject.title}</h3>

              {/* Technology Docks */}
              <div className="flex mt-4 mb-4 w-fit mx-auto justify-center">
              <div className="mr-4">
              <h4 className="text-lg font-semibold text-neon-green mb-3 text-center">Frontend</h4>
                <FloatingDock items={selectedProject.frontendTags.map(tag => ({
                  title: tag,
                  icon: icons[tag as keyof typeof icons] ||  <CodeIcon className="h-4 w-4 text-neon-green" />,
                  href: '#'
                }))} desktopClassName="bg-navy" mobileClassName="bg-navy" />
                </div>
                <div>
              <h4 className="text-lg font-semibold text-neon-green mb-3 text-center">Backend</h4>
                <FloatingDock items={selectedProject.backendTags.map(tag => ({
                  title: tag,
                  icon: icons[tag as keyof typeof icons] || <TerminalIcon className="h-4 w-4 text-neon-green" />,
                  href: '#'
                }))} desktopClassName="bg-navy" mobileClassName="bg-navy" />
                </div>
              </div>

              {/* Centered Subtitle */}
              <h4 className="text-lg font-semibold text-neon-green mb-3 text-center w-fit mx-auto justify-center">Project Overview</h4>

              {/* Short Description */}
              <p className="text-base text-light-slate mb-2 leading-relaxed mx-auto justify-center">{selectedProject.description}</p>

              {/* Links */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-neon-green mb-3">Links:</h4>
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                  {selectedProject.github && (
                    <Button className='px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28'
                      asChild // Keep asChild
                    >
                      <a 
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${selectedProject.title} GitHub Repository`}
                      >
                         <span className="flex items-center gap-2"> {/* Wrap icon and text in span */}
                           <GithubIcon className="h-4 w-4 justify-center" /> GitHub
                         </span>
                      </a>
                    </Button>
                  )}
                  {selectedProject.live && (
                     <Button className='px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28'
                       asChild // Keep asChild
                    >
                      <a
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${selectedProject.title} Live Demo`}
                      >
                        <span className="flex items-center gap-2 justify-center"> {/* Wrap icon and text in span */}
                          <ExternalLinkIcon className="mr-2 h-4 w-4" /> Live Demo
                        </span>
                      </a>
                    </Button>
                  )}
                </div>
                {!selectedProject.github && !selectedProject.live && (
                   <p className="text-sm text-slate mt-2">No external links available for this project.</p>
                )}
              </div>

              <h4 className="text-lg font-semibold text-neon-green mb-4  justify-center text-center">Features Showcase</h4>

              <Carousel className="w-full h-full max-w-xl mx-auto mb-8 -mt-20 text-center justify-center" plugins={[Autoplay({ delay: 1000 })]}>
                <CarouselContent>
                  {selectedProject.screenshots.map((screenshot, index) => (
                    <CarouselItem key={index} className="aspect-video text-center justify-center">
                      <div className="p-1 text-center justify-center">
                        <img
                          src={screenshot}
                          alt={`Screenshot ${index + 1} of ${selectedProject.title}`}
                          className="w-auto max-w-[90%] mx-auto object-contain rounded-md h-[500px]"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>


            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-xl text-slate">Select a project from the left to view details.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;

// Remember to replace placeholder GitHub URLs and screenshot paths!
// Consider adding actual icons for the FloatingDock items.
// Add a simple fade-in animation in globals.css if desired:
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
