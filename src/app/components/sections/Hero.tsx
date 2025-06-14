// src/app/components/sections/Hero.tsx
import React, { useState, useRef } from 'react';
import GradientSpots from '../../components/GradientSpots';
// Import the new icon
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
const Hero = () => {
  const originalImageSrc = "/img/hero.jpg";
  const gifImageSrc = "/img/El-Gatito.gif";
  const [currentImageSrc, setCurrentImageSrc] = useState(originalImageSrc);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseOver = () => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  
    timerRef.current = setTimeout(() => {
      setCurrentImageSrc(gifImageSrc);
  
      // const audio = new Audio('your-audio-file.mp3'); 
      // audio.play();
    }, 500); // 800ms delay
  };

  const handleMouseLeave = () => {
    // Clear the timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    // Revert to original image if currently showing the GIF
    if (currentImageSrc === gifImageSrc) {
      setCurrentImageSrc(originalImageSrc);
    }
  };

  return (
      <div id="home" className="mt-auto hero-section min-h-screen flex flex-col justify-center items-start max-w-5xl mx-auto px-6 pt-16 pb-16 md:pt-16 relative pointer-events-none">
        <GradientSpots />
        <div className="flex items-center mt-10">
          <div className="relative tooltip-container image-container"> {/* Added image-container class */}
            {/* Circular timeline SVG */}
            <svg className="circular-timeline" viewBox="0 0 100 100">
              <circle className="bg-circle" cx="50" cy="50" r="45"></circle>
              <circle className="progress-circle" cx="50" cy="50" r="45"></circle>
            </svg>
            <img
              src={currentImageSrc}
              alt="Mahmoud Abdrabbou"
              className="rounded-full w-44 h-44 mr-4 object-cover tooltip-trigger pointer-events-auto"
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            />
            <div className="tooltip">This is Rico 😺 <br /> aka El-Gatito</div>
          </div>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-neon-green font-mono mb-3"
            >
              Hi <motion.span
                animate={{
                  x: [0, -5, 5, -5, 0], // Smoother horizontal wave
                  rotate: [0, -5, 5, -5, 0], // Gentle rotation
                }}
                transition={{
                  duration: 1.5, // Longer duration for smoother motion
                  repeat: Infinity,
                  ease: "easeInOut" // Smoother easing
                }}
                style={{ display: 'inline-block' }} // Keep inline-block for proper positioning
              >
                👋
              </motion.span>, my name is
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl mb-7 sm:text-5xl md:text-6xl lg:text-7xl font-bold text-lightest-slate"
            >
              Mahmoud <br /> Abdrabbou.
            </motion.h1>
          </div>
        </div>
        {/* Spline Component */}
        <div className="absolute inset-0 w-screen h-screen z-[-10] pointer-events-auto animate-subtle-move-5 ml-2000- mt-820 "> {/* Container for Spline */}
          <Spline
              scene="https://prod.spline.design/lkGNG3gU2mkL3QWP/scene.splinecode"
            className="w-full h-full"
          />
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate mb-6"
        >
          <span className="neon-text">Software Engineer</span>
          <div className="text-sm text-light-slate">📍 Based in UAE (🇦🇪)</div>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-base md:text-lg max-w-5xl text-light-slate mb-8"
        >
         I&apos;m a Full Stack Developer skilled in Java, Python, React, and Node.js. <br />
         I build reliable systems, streamline integrations, and improve performance.
        </motion.p>
        <motion.div
          initial={{ opacity: 1, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex space-x-8 mt-8 pointer-events-auto" // Increased space-x for better label spacing
        >
          {/* GitHub Icon with Label */}
          <a
            href="https://github.com/Eng-M-Abdrabbou"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile of Mahmoud Abdrabbou" // More descriptive aria-label
            className="flex flex-col items-center group" // Group for icon and label
          >
            <FaGithub className="icon-link text-3xl group-hover:text-accent-color transition-colors duration-300" />
            <span className="mt-1 text-xs text-slate group-hover:text-accent-color transition-colors duration-300">
              GitHub
            </span>
          </a>

          {/* LinkedIn Icon with Label */}
          <a
            href="https://www.linkedin.com/in/mahmoud-abdrabbou-18b170350/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile of Mahmoud Abdrabbou"
            className="flex flex-col items-center group"
          >
            <FaLinkedin className="icon-link text-3xl group-hover:text-accent-color transition-colors duration-300" />
            <span className="mt-1 text-xs text-slate group-hover:text-accent-color transition-colors duration-300">
              LinkedIn
            </span>
          </a>

          {/* LeetCode Icon with Label */}
          <a
            href="https://leetcode.com/u/MANSAMUSAA/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode profile of Mahmoud Abdrabbou"
            className="flex flex-col items-center group"
          >
            <SiLeetcode className="icon-link text-3xl group-hover:text-accent-color transition-colors duration-300" />
            <span className="mt-1 text-xs text-slate group-hover:text-accent-color transition-colors duration-300">
              LeetCode
            </span>
          </a>

          {/* Resume Icon with Label */}
          <a
            href="/Mahmoud_Abdrabbou_Resume.pdf" // Ensure this path is correct
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Mahmoud Abdrabbou's Resume (PDF)"
            className="flex flex-col items-center group"
          >
            <FaFileAlt className="icon-link text-3xl group-hover:text-accent-color transition-colors duration-300" />
            <span className="mt-1 text-xs text-slate group-hover:text-accent-color transition-colors duration-300">
              Resume
            </span>
          </a>
        </motion.div>
        <div className="flex flex-row items-center mt-8 space-x-4 pointer-events-auto">
          <div className="cursor-can-hover bg-navy/80 rounded-md p-4 w-1/3 backdrop-blur-lgm border border-lightest-navy/30 hover:border-neon-green rounded-xl">
            <p className="text-neon-green text-center">
              &quot;The only true wisdom is in knowing you know nothing.&quot;
              <span className="text-light-slate"> ~ Socrates</span>
            </p>
          </div>
          <div className="cursor-can-hover bg-navy/80 rounded-md p-4 w-1/3 backdrop-blur-lgm border border-lightest-navy/30 hover:border-neon-green rounded-xl">
            <p className="text-neon-green text-center">
              &quot;How you interpret the world shapes its reality.&quot;
              <span className="text-light-slate"> ~ Mahmoud Abdrabbou</span>
            </p>
          </div>
          <div className="cursor-can-hover bg-navy/80 rounded-md p-4 w-1/3 backdrop-blur-lgm border border-lightest-navy/30 hover:border-neon-green rounded-xl">
            <p className="text-neon-green text-center">
              &quot;He who has a why to live can bear almost any how.&quot;
              <span className="text-light-slate"> ~ Friedrich Nietzsche</span>
            </p>
          </div>
        </div>
        <br />
        {/* Optional: Add a subtle scroll down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5, ease: 'easeInOut' }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <svg className="w-6 h-6 text-neon-green" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </div>
  );
};

export default Hero;

// Remember to replace placeholder URLs (GitHub, LinkedIn, LeetCode, and the Resume href) with your actual links!