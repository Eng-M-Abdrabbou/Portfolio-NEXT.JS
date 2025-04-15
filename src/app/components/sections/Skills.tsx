// src/app/components/sections/Skills.tsx
import React from 'react';
import { motion } from 'framer-motion';

const skillsData = {
  programming: ["Java", "Python", "JavaScript", "PHP", "SQL", "Matlab"],
  web: ["HTML", "CSS", "JavaScript", "Typescript", "Bootstrap", "RESTful API's"],
  frameworks: ["React.js", "Node.js", "Express.js", "Spring Boot", "Flask"],
  databases: ["MySQL", "PostgreSQL", "MongoDB"],
  tools: ["Git", "GitHub", "Postman", "VS Code", "IntelliJ", "Eclipse", "NetBeans"],
  ai_ml: ["PyTorch", "Torchvision", "OpenCV", "Pandas", "Scikit-Learn"],
  ui_ux: ["Figma", "Bootstrap Studio", "Spline"],
  misc: ["Google Fu", "Prompt Engineering", "Data Modelling", "DevTools", "Agile/Scrum"],
  soft: ["Data Structures & Algorithms", "OOP Principles", "Database Design", "System Design", "Requirements Engineering", "Software Testing (JUnit, Selenium)", "Project Management", "Leadership", "Problem Solving"],
  activities: [
    "Winner: UAE National Scientific Excellence Competition",
    "IEEE Member & Competition Participant",
    "5th Place: University Chess Tournament",
    "Volunteer: 23rd IEEE ACIT Conference",
    "Finalist: Expo Innovation Programme",
    "Finalist: Sundouq al Watan Youth Startup",
    "Winner: University Programming Competitions",
  ],
};

const SkillCategory = ({ title, skills }: { title: string; skills: string[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, staggerChildren: 0.1 }}
    className="mb-8"
  >
    <h3 className="text-xl font-semibold text-lightest-slate mb-4">{title}</h3>
    <div className="flex flex-wrap">
      {skills.map((skill, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="tag" // Use the global tag style
        >
          {skill}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

const Skills = () => {
  return (
    <section id="skills" className="section-container">
      <h2 className="section-heading">Skills & Activities</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        <div>
          <SkillCategory title="Programming & Core Concepts" skills={[...skillsData.programming, ...skillsData.soft.slice(0,3)]} />
          <SkillCategory title="Web Development" skills={skillsData.web} />
          <SkillCategory title="Frameworks & Libraries" skills={skillsData.frameworks} />
          <SkillCategory title="Databases" skills={skillsData.databases} />
        </div>
        <div>
          <SkillCategory title="AI/ML" skills={skillsData.ai_ml} />
          <SkillCategory title="Tools & Methodologies" skills={[...skillsData.tools, ...skillsData.misc, ...skillsData.soft.slice(3)]} />
          <SkillCategory title="UI/UX Design" skills={skillsData.ui_ux} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
           >
             <h3 className="text-xl font-semibold text-lightest-slate mb-4">Notable Activities & Achievements</h3>
             <ul className="list-disc list-outside space-y-1 pl-5 text-sm text-light-slate">
                {skillsData.activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                ))}
             </ul>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;