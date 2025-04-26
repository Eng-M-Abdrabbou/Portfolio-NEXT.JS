// src/app/components/sections/Hero.tsx
import React from 'react';
// Import the new icon
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div id="home" className="min-h-screen flex flex-col justify-center items-start max-w-4xl mx-auto px-6 pt-32 pb-16 md:pt-40">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-lg text-neon-green font-mono mb-3"
      >
        Hi, my name is
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-lightest-slate mb-3"
      >
        Mahmoud Abdrabbou.
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate mb-6"
      >
        <span className="neon-text">Software Engineer</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-base md:text-lg max-w-xl text-light-slate mb-8"
      >
        I'm a passionate Full Stack Developer specializing in building efficient and scalable solutions. Currently focused on leveraging my skills in Java, Python, React, and Node.js to create impactful applications. Experienced in optimizing systems, integrating diverse platforms, and driving innovation.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex space-x-6 mt-4"
      >
        <a
          href="https://github.com/YOUR_GITHUB_USERNAME" // Replace with your GitHub URL
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="icon-link"
        >
          <FaGithub />
        </a>
        <a
          href="https://linkedin.com/in/YOUR_LINKEDIN_PROFILE" // Replace with your LinkedIn URL
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="icon-link"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://leetcode.com/YOUR_LEETCODE_USERNAME" // Replace with your LeetCode URL
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LeetCode"
          className="icon-link"
        >
          <SiLeetcode />
        </a>
        {/* --- Added Resume Link --- */}
        <a
          // IMPORTANT: Replace this href with the path to your resume in the /public folder
          // OR your Google Docs shareable link
          href="/Mahmoud_Abdrabbou_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Resume"
          className="icon-link"
        >
          <FaFileAlt />
        </a>
        {/* --- End Added Resume Link --- */}
      </motion.div>
      {/* Optional: Add a subtle scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
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