// src/app/components/sections/ExperienceEducation.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ExperienceEducation = () => {
  const [activeTab, setActiveTab] = useState('work'); // 'work' or 'education'

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <section id="experience" className="section-container">
      <h2 className="section-heading">Experience & Education</h2>

      <div className="flex justify-center mb-8 border border-light-slate rounded-lg overflow-hidden"> {/* Added border and rounded corners */}
        <button
          className={`flex-1 px-6 py-3 text-lg font-medium text-center focus:outline-none transition-colors duration-300 ${
            activeTab === 'work'
              ? 'bg-light-slate text-navy' // Adjusted active colors
              : 'bg-transparent text-light-slate hover:bg-light-navy' // Adjusted inactive colors
          }`}
          onClick={() => handleTabChange('work')}
        >
          Work
        </button>
        <button
          className={`flex-1 px-6 py-3 text-lg font-medium text-center focus:outline-none transition-colors duration-300 ${
            activeTab === 'education'
              ? 'bg-light-slate text-navy' // Adjusted active colors
              : 'bg-transparent text-light-slate hover:bg-light-navy' // Adjusted inactive colors
          }`}
          onClick={() => handleTabChange('education')}
        >
          Studies
        </button>
      </div>

      <div className="relative">
        {/* Timeline content will go here, conditionally rendered */}
        {activeTab === 'work' && (
          <motion.div
            key="work-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative pl-8 border-l-2 border-light-navy" // Timeline line
          >
            {/* Work Experience Timeline Items */}
            {/* Existing work experience content adapted into timeline items */}
            <div className="mb-8 relative">
              {/* Replace with company icon/image */}
              <div className="absolute -left-9 mt-1 w-14 h-14 rounded-full bg-light-navy border-2 border-navy flex items-center justify-center">
                {/* Placeholder for IEEE icon */}
                <span className="text-lightest-slate text-xs">IEEE</span>
                {/* You can replace the span with an img tag for the logo */}
                {/* <img src="/path/to/ieee-logo.png" alt="IEEE Logo" className="w-full h-full rounded-full object-cover" /> */}
              </div>
              <div className="p-6 bg-light-navy rounded-lg shadow-md border border-light-navy"> {/* Added border */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                  <h4 className="text-lg font-medium text-lightest-slate">Software Engineer | Full Stack & AI/ML</h4>
                  <p className="text-sm text-light-slate font-mono">February 2025 – Present</p>
                </div>
                <p className="text-md text-neon-green mb-3">Institute of Electrical and Electronics Engineers | UAE – Abu Dhabi</p>
                <ul className="list-disc list-outside space-y-2 pl-5 text-base text-light-slate">
                  <li>Engineered VisionAid, a visual assistance app with real-time object detection, scene analysis, and OCR (92% precision).</li>
                  <li>Architected a multi-modal AI pipeline for seamless text-to-speech feedback.</li>
                  <li>Optimized WebSocket communication for low-latency audio alerts (40% reduction).</li>
                  <li>Led cross-functional collaboration for an accessibility-first UI (95% user satisfaction).</li>
                  <li>Delivered comprehensive technical documentation and user manual.</li>
                </ul>
              </div>
            </div>
            <div className="mb-8 relative">
              {/* Replace with company icon/image */}
              <div className="absolute -left-9 mt-1 w-14 h-14 rounded-full bg-light-navy border-2 border-navy flex items-center justify-center">
                {/* Placeholder for Federal Transformers Company LLC icon */}
                <span className="text-lightest-slate text-xs text-center">FTC</span>
                {/* You can replace the span with an img tag for the logo */}
                {/* <img src="/path/to/ftc-logo.png" alt="Federal Transformers Company LLC Logo" className="w-full h-full rounded-full object-cover" /> */}
              </div>
              <div className="p-6 bg-light-navy rounded-lg shadow-md border border-light-navy"> {/* Added border */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                  <h4 className="text-lg font-medium text-lightest-slate">Software Engineer in the Software Development Team</h4>
                  <p className="text-sm text-light-slate font-mono">September 2024 – March 2025</p>
                </div>
                <p className="text-md text-neon-green mb-3">Federal Transformers Company LLC | UAE – Abu Dhabi</p>
                <ul className="list-disc list-outside space-y-2 pl-5 text-base text-light-slate">
                  <li>Spearheaded BASYS development, cutting attendance tracking time from 2 days to under 25 seconds.</li>
                  <li>Engineered customizable reporting features for rapid, actionable insights.</li>
                  <li>Orchestrated integration with HR systems and biometric devices (99.9% data accuracy).</li>
                  <li>Innovated algorithms boosting system reliability and scaling performance by over 95%.</li>
                  <li>Identified bottlenecks and implemented automation for enhanced workflow efficiency.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'education' && (
          <motion.div
            key="education-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative pl-8 border-l-2 border-light-navy" // Timeline line
          >
            {/* Education Timeline Items */}
            {/* Existing education content adapted into timeline items */}
             <div className="mb-8 relative">
               {/* Replace with university icon/image */}
               <div className="absolute -left-9 mt-1 w-14 h-14 rounded-full bg-light-navy border-2 border-navy flex items-center justify-center">
                 {/* Placeholder for Al Ain University icon */}
                 <span className="text-lightest-slate text-xs text-center">AAU</span>
                 {/* You can replace the span with an img tag for the logo */}
                 {/* <img src="/path/to/aau-logo.png" alt="Al Ain University Logo" className="w-full h-full rounded-full object-cover" /> */}
               </div>
               <div className="p-6 bg-light-navy rounded-lg shadow-md border border-light-navy"> {/* Added border */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                  <h4 className="text-lg font-medium text-lightest-slate">Bachelor of Science in Software Engineering (Honors) - ABET Accredited</h4>
                  <p className="text-sm text-light-slate font-mono">Graduated on 2025/Feb</p>
                </div>
                <p className="text-md text-neon-green mb-3">Al Ain University | Abu Dhabi UAE</p>
                 <p className="text-base text-light-slate mb-3">CGPA of 3.81/4.0 (Grade: Excellent)</p>
                <ul className="list-disc list-outside space-y-2 pl-5 text-base text-light-slate">
                  <li>Acquired the UAE Golden Visa for distinguished students’ category.</li>
                  <li>Recipient of a full-ride 100% scholarship in AAU for academic excellence (Top 5 nationwide).</li>
                  <li>Awarded University & College of Engineering honor lists for 5 consecutive semesters till graduation.</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ExperienceEducation;