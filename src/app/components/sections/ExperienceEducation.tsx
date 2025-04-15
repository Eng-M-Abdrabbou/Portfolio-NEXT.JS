// src/app/components/sections/ExperienceEducation.tsx
import React from 'react';
import { motion } from 'framer-motion';

const ExperienceEducation = () => {
  return (
    <section id="experience" className="section-container">
      <h2 className="section-heading">Experience & Education</h2>

      {/* Experience Section */}
      <div className="mb-16">
        <h3 className="text-xl md:text-2xl font-semibold text-lightest-slate mb-6">Work Experience</h3>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-8 p-6 bg-light-navy rounded-lg shadow-md transition-shadow hover:shadow-xl"
        >
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
            <h4 className="text-lg font-medium text-lightest-slate">Software Engineer Intern</h4>
            <p className="text-sm text-light-slate font-mono">Sep 2024 – Present</p>
          </div>
          <p className="text-md text-neon-green mb-3">Federal Transformers Company LLC | Abu Dhabi, UAE</p>
          <ul className="list-disc list-outside space-y-2 pl-5 text-base text-light-slate">
            <li>Revolutionized attendance tracking by designing and developing BASYS, reducing operation time from 48 hours to 25 seconds using JavaScript, Bootstrap, Python, Node, Express, MySQL.</li>
            <li>Engineered customizable reporting features with PDF/Excel exports for data-driven insights.</li>
            <li>Integrated biometric platform with HR systems and devices, ensuring 99.9% data accuracy.</li>
            <li>Optimized system reliability and scalability by over 95% through algorithm innovation and pipeline streamlining.</li>
            <li>Identified system bottlenecks and implemented automation solutions to enhance workflow efficiency.</li>
          </ul>
        </motion.div>
        {/* Add more experience items here if needed */}
      </div>

      {/* Education Section */}
      <div>
        <h3 className="text-xl md:text-2xl font-semibold text-lightest-slate mb-6">Education</h3>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 p-6 bg-light-navy rounded-lg shadow-md transition-shadow hover:shadow-xl"
        >
          <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
            <h4 className="text-lg font-medium text-lightest-slate">Bachelor of Science in Software Engineering (Honors)</h4>
            <p className="text-sm text-light-slate font-mono">Graduated Feb 2025</p>
          </div>
          <p className="text-md text-neon-green mb-3">Al Ain University | Abu Dhabi, UAE</p>
           <p className="text-base text-light-slate mb-3">CGPA: 3.81/4.0 (Grade: Excellent)</p>
          <ul className="list-disc list-outside space-y-2 pl-5 text-base text-light-slate">
            <li>Acquired UAE Golden Visa (Distinguished Students category).</li>
            <li>Received full 100% scholarship for academic excellence (Top 5 nationwide).</li>
            <li>Awarded University & College of Engineering honor lists for 5 consecutive semesters.</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceEducation;