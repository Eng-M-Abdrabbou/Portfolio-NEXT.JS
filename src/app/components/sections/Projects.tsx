// src/app/components/sections/Projects.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'; // Assuming you might add links later

const projectsData = [
  {
    title: "VisionAid",
    description: "Cross-platform visual assistance app with real-time object detection, scene analysis, OCR, hazard alerts, voice commands, and text-to-speech for the visually impaired. Built with Flutter, Python/Flask backend, PyTorch (COCO/KITTI), MySQL, WebSockets, adhering to IEEE standards.",
    tags: ["Python", "Flask", "PyTorch", "Torchvision", "MySQL", "Flutter", "WebSockets", "OpenCV", "AI/ML"],
    github: "https://github.com/YOUR_GITHUB/VisionAid", // Replace with actual link
    live: null, // Add live link if available
  },
  {
    title: "StreamHUB",
    description: "AI-powered movie streaming platform featuring social media elements (real-time chat, forums), content-based & item-based AI recommenders, and admin controls. Built with Python, Bootstrap, Node.js/Express, MySQL, Flask, Pandas, Scikit-Learn.",
    tags: ["Python", "Bootstrap", "Node.js", "Express.js", "MySQL", "Flask", "Pandas", "SciKit-Learn", "AI/ML"],
    github: "https://github.com/YOUR_GITHUB/StreamHUB", // Replace with actual link
    live: null,
  },
  {
    title: "BASYS (Biometric Attendance System)",
    description: "HR attendance management system for real-time tracking, shift scheduling, overtime, customizable reporting (PDF/Excel), email notifications, and integration with HR systems/biometric devices. Built with JavaScript, Bootstrap, Python, Node/Express, MySQL.",
    tags: ["JavaScript", "Bootstrap", "Python", "Node.js", "Express", "MySQL", "HTML", "CSS"],
    github: "https://github.com/YOUR_GITHUB/BASYS", // Replace with actual link
    live: null,
  },
  // Add more projects as needed
];

const ProjectCard = ({ title, description, tags, github, live }: typeof projectsData[0]) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5 }}
    className="bg-light-navy p-6 rounded-lg shadow-lg transition-transform transform hover:-translate-y-2 flex flex-col justify-between h-full"
  >
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-lightest-slate">{title}</h3>
        <div className="flex space-x-3">
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" aria-label={`${title} GitHub Repository`} className="text-light-slate hover:text-neon-green transition-colors duration-300">
              <FaGithub size={20} />
            </a>
          )}
          {live && (
            <a href={live} target="_blank" rel="noopener noreferrer" aria-label={`${title} Live Demo`} className="text-light-slate hover:text-neon-green transition-colors duration-300">
              <FaExternalLinkAlt size={20} />
            </a>
          )}
        </div>
      </div>
      <p className="text-base text-light-slate mb-4">{description}</p>
    </div>
    <div className="flex flex-wrap mt-auto pt-4">
      {tags.map((tag, index) => (
        <span key={index} className="tag">{tag}</span>
      ))}
    </div>
  </motion.div>
);


const Projects = () => {
  return (
    <section id="projects" className="section-container">
      <h2 className="section-heading">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;

// Remember to replace placeholder GitHub URLs!