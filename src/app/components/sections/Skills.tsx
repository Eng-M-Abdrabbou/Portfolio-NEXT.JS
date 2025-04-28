// src/app/components/sections/Skills.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Globe, Layers, Database, Wrench, Cloud, PenTool, Award, Brain } from 'lucide-react'; // Added Cloud, Brain

const skillsData = {
  programming: ["Java", "Python", "JavaScript", "Dart", "PHP", "SQL", "Matlab"],
  web: ["HTML", "CSS", "JavaScript", "Typescript", "BootStrap", "REST API’s"], // Updated Bootstrap capitalization and API text
  frameworks: ["React.js", "Node.js", "Express.js", "Spring boot", "Flask", "Flutter", "Pytorch", "Torchvision", "Scikit learn"], // Added Flutter, Pytorch, Torchvision, Scikit learn
  databases: ["MySQL", "PostgreSQL", "MongoDB"],
  tools: ["Git", "GitHub", "Postman", "Docker"], // Updated tools list
  cloud: ["AWS", "Kubernetes"], // Added cloud category
  ui_ux: ["Figma", "Bootsrap Studio", "Spline"], // Updated Bootstrap capitalization
  misc: ["Google(operators, queries)", "Prompt Engineering", "Data modelling", "Developer tools", "Agile Development and Scrum"], // Updated misc list
  // Removed 'soft' and 'ai_ml' as per new structure
  activities: [ // Kept activities separate
    "Winner: UAE National Scientific Excellence Competition",
    "IEEE Member & Competition Participant",
    "5th Place: University Chess Tournament",
    "Volunteer: 23rd IEEE ACIT Conference",
    "Finalist: Expo Innovation Programme",
    "Finalist: Sundouq al Watan Youth Startup",
    "Winner: University Programming Competitions",
  ],
};

const SkillCategory = ({ title, skills, icon }: { title: string; skills: string[]; icon: React.ReactNode }) => {
  // Create an icon mapping for skills
  type SkillIconMap = Record<string, string>;
  const skillIcons: SkillIconMap = {
    "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    "Dart": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg", // Added Dart
    "PHP": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    "SQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg", // Using Azure SQL icon for generic SQL
    "Matlab": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg",
    "HTML": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    "CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    "Typescript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    "BootStrap": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", // Updated capitalization
    "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "Node.js": "https://cdn.simpleicons.org/nodedotjs/339933",
    "Express.js": "https://skillicons.dev/icons?i=express",
    "Spring boot": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", // Updated capitalization
    "Flask": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    "Flutter": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", // Added Flutter
    "Pytorch": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg", // Added Pytorch
    "Scikit learn": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg", // Added Scikit learn
    "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    "GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    "Postman": "https://cdn.simpleicons.org/postman/FF6C37",
    "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", // Added Docker
    "AWS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", // Switched to simpleicons for AWS
    "Kubernetes": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg", // Added Kubernetes
    "Figma": "https://cdn.simpleicons.org/figma/F24E1E",
    "Bootsrap Studio": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg", // Updated capitalization, reusing Bootstrap
    //"Spline": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spline/spline-original.svg",
    // Skills without specific icons will be rendered text-only:
    // "REST API’s", "Torchvision", "Google(operators, queries)", "Prompt Engineering",
    // "Data modelling", "Developer tools", "Agile Development and Scrum"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="mb-6 ml-auto mr-auto bg-lightest-navy/10 backdrop-blur-sm w-11/12 rounded-lg p-4 border border-lightest-navy/30 hover:border-neon-green hover:bg-lightest-navy/20 transition-all duration-300"
    >
      <div className="flex items-center mb-4">
        <div className="mr-3 text-neon-green">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-lightest-slate">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => {
          const iconSrc = skillIcons[skill];
          return (
            <div
              key={index}
              className="flex items-center bg-lightest-navy/20 backdrop-blur-sm rounded-lg p-2 border border-lightest-navy/30 hover:border-neon-green hover:bg-lightest-navy/30 transition-all duration-300"
            >
              {iconSrc && ( // Conditionally render the image only if iconSrc exists
                <img
                  src={iconSrc}
                  alt={`${skill} logo`} // Improved alt text
                  className="w-5 h-5 mr-2"
                  // Add error handling for images if needed, e.g., onError
                />
              )}
              <span className={`text-sm text-light-slate ${!iconSrc ? 'ml-1' : ''}`}>{skill}</span> {/* Adjust margin if no icon */}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="ml-auto mr-auto justify-center w-screen min-h-screen py-16 md:py-24" > {/* Adjusted height and padding */}
      <h2 className="section-heading flex items-center justify-center">Skills & Activities</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-8">
        {/* Column 1 */}
        <div>
          <SkillCategory
            title="Programming" // Updated title
            skills={skillsData.programming} // Use updated programming skills
            icon={<Code size={20} />}
          />
          <SkillCategory
            title="Web Development"
            skills={skillsData.web}
            icon={<Globe size={20} />}
          />
          <SkillCategory
            title="Frameworks/Libraries" // Updated title
            skills={skillsData.frameworks} // Use updated frameworks skills
            icon={<Layers size={20} />}
          />
           <SkillCategory
            title="Databases"
            skills={skillsData.databases}
            icon={<Database size={20} />}
          />
           <SkillCategory
            title="UI/UX" // Updated title
            skills={skillsData.ui_ux} // Use updated ui_ux skills
            icon={<PenTool size={20} />}
          />
        </div>
        {/* Column 2 */}
        <div>
           <SkillCategory
            title="Tools" // Updated title
            skills={skillsData.tools} // Use updated tools skills
            icon={<Wrench size={20} />}
          />
          <SkillCategory
            title="Cloud Technologies" // New category
            skills={skillsData.cloud} // Use new cloud skills
            icon={<Cloud size={20} />} // Use Cloud icon
          />
          <SkillCategory
            title="Misc" // Updated title
            skills={skillsData.misc} // Use updated misc skills
            icon={<Brain size={20} />} // Using Brain icon for Misc
          />

          {/* Activities Section (Kept as is) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="mb-8 mr-auto ml-auto w-11/12 bg-lightest-navy/10 backdrop-blur-sm rounded-lg p-4 border border-lightest-navy/30 hover:border-neon-green hover:bg-lightest-navy/20 transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="mr-3 text-neon-green">
                <Award size={20} />
              </div>
              <h3 className="text-xl font-semibold text-lightest-slate border-lightest-navy/30 hover:border-neon-green hover:bg-lightest-navy/20 transition-all duration-300">Notable Activities & Achievements</h3>
            </div>
            {/* Changed ul to div and applied flex wrap */}
            <div className="flex flex-wrap gap-3 border-lightest-navy/30 hover:border-neon-green hover:bg-lightest-navy/20 transition-all duration-300">
              {skillsData.activities.map((activity, index) => (
                // Changed li to div and applied skill item styling
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }} // Adjusted initial animation slightly
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  // Applied styles from skill items
                  className="flex items-center bg-lightest-navy/20 backdrop-blur-sm rounded-lg p-2 border border-lightest-navy/30 hover:border-neon-green hover:bg-lightest-navy/30 transition-all duration-300"
                >
                  {/* Removed list styling, kept text */}
                  <span className="text-sm text-light-slate">{activity}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;