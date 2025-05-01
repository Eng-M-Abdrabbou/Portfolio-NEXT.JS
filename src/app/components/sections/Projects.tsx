"use client"; // Required for useState

import React, { useState } from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card"; // Import 3d-card components

const projectsData = [
  {
    title: "VisionAid",
    description: "Cross-platform visual assistance app with real-time object detection, scene analysis, OCR, hazard alerts, voice commands, and text-to-speech for the visually impaired. Built with Flutter, Python/Flask backend, PyTorch (COCO/KITTI), MySQL, WebSockets, adhering to IEEE standards.",
    tags: ["Python", "Flask", "PyTorch", "Torchvision", "MySQL", "Flutter", "WebSockets", "OpenCV", "AI/ML"],
    github: "https://github.com/YOUR_GITHUB/VisionAid", // Replace with actual link
    live: null, // Add live link if available
    image: "/img/Photos_0ieqY6zk6V.jpg" // Optional: Add image paths if needed for CardItem
  },
  {
    title: "StreamHUB",
    description: "AI-powered movie streaming platform featuring social media elements (real-time chat, forums), content-based & item-based AI recommenders, and admin controls. Built with Python, Bootstrap, Node.js/Express, MySQL, Flask, Pandas, Scikit-Learn.",
    tags: ["Python", "Bootstrap", "Node.js", "Express.js", "MySQL", "Flask", "Pandas", "SciKit-Learn", "AI/ML"],
    github: "https://github.com/YOUR_GITHUB/StreamHUB", // Replace with actual link
    live: null,
    image: "/img/Picture1.png"
  },
  {
    title: "BASYS (Biometric Attendance System)",
    description: "HR attendance management system for real-time tracking, shift scheduling, overtime, customizable reporting (PDF/Excel), email notifications, and integration with HR systems/biometric devices. Built with JavaScript, Bootstrap, Python, Node/Express, MySQL.",
    tags: ["JavaScript", "Bootstrap", "Python", "Node.js", "Express", "MySQL", "HTML", "CSS"],
    github: "https://github.com/YOUR_GITHUB/BASYS", // Replace with actual link
    live: null,
    image: "/img/Dashboard.png"
  },
  // Add more projects as needed
];

// Define Project type
interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string | null;
  live: string | null;
  image?: string; // Optional image property
}

const Projects = () => {
  // State for selected project, initialized to the first project
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    projectsData.length > 0 ? projectsData[0] : null
  );

  return (
    <section id="projects" className="py-16 md:py-24 bg-navy text-light-slate min-h-screen flex flex-col items-center justify-center px-4">
      <h2 className="text-3xl md:text-5xl font-bold text-lightest-slate mb-12 text-center">
        Projects
      </h2>
      {/* Two-column layout container with fixed height for scrolling */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl flex-grow h-[70vh]"> {/* Adjust max-w and h as needed */}

        {/* Left Column: Project Cards (Scrollable) */}
        <div className="md:col-span-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-slate scrollbar-track-light-navy">
          {projectsData.map((project, index) => (
            <div // Added wrapper div for clickability
              key={index} // Moved key to the wrapper div
              onClick={() => setSelectedProject(project)} // Moved onClick here
              className="cursor-pointer" // Moved cursor-pointer here
            >
              <CardContainer // Original CardContainer
                className="inter-var w-full" // Keep original CardContainer class
              >
                <CardBody // Original CardBody
                  className={`bg-light-navy relative group/card border-slate/50 w-full h-auto rounded-xl p-4 border transition-all duration-300 ${selectedProject?.title === project.title ? 'border-neon-green shadow-neon-glow' : 'hover:border-neon-green/50 hover:shadow-md'}`} // Removed cursor-pointer
                >
                  <CardItem
                    translateZ="50"
                    className="text-lg font-bold text-lightest-slate group-hover:text-neon-green transition-colors"
                  >
                    {project.title}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-400 text-xs max-w-sm mt-1 line-clamp-2" // Short description snippet
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
                        className="h-20 w-full object-cover rounded-xl group-hover/card:shadow-xl"
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
        <div className="md:col-span-2 overflow-y-auto pl-2 scrollbar-thin scrollbar-thumb-slate scrollbar-track-light-navy bg-light-navy p-6 rounded-lg shadow-lg border border-slate/50">
          {selectedProject ? (
            <div className="animate-fade-in"> {/* Simple fade-in animation */}
              <h3 className="text-2xl font-bold text-lightest-slate mb-4">{selectedProject.title}</h3>
              <p className="text-base text-light-slate mb-6 leading-relaxed">{selectedProject.description}</p>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-neon-green mb-3">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, index) => (
                    <span key={index} className="inline-block bg-navy text-neon-green text-xs font-mono px-2 py-1 rounded-full border border-neon-green/30">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-neon-green mb-3">Links:</h4>
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${selectedProject.title} GitHub Repository`}
                      className="inline-flex items-center space-x-2 text-light-slate hover:text-neon-green transition-colors duration-300 group"
                    >
                      <FaGithub size={20} className="group-hover:scale-110 transition-transform"/>
                      <span>GitHub</span>
                    </a>
                  )}
                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${selectedProject.title} Live Demo`}
                      className="inline-flex items-center space-x-2 text-light-slate hover:text-neon-green transition-colors duration-300 group"
                    >
                      <FaExternalLinkAlt size={18} className="group-hover:scale-110 transition-transform"/>
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
                {!selectedProject.github && !selectedProject.live && (
                   <p className="text-sm text-slate mt-2">No external links available for this project.</p>
                )}
              </div>
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

// Remember to replace placeholder GitHub URLs!
// Add a simple fade-in animation in globals.css if desired:
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }