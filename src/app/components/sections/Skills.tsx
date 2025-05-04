// src/app/components/sections/Skills.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Globe, Layers, Database, Wrench, Cloud, PenTool, Award, Brain, Laptop } from 'lucide-react'; // Added Cloud, Brain
const skillsData = {
  AreaOfExpertise: ["Java", "Spring boot","Python", "Flask", "JavaScript","Typescript","React.js", "Node.js", "Express.js", "Dart","Flutter","PostgreSQL"],
  programming: ["Java", "Python", "JavaScript", "Dart", "PHP", "SQL", "Matlab"],
  web: ["HTML", "CSS", "JavaScript", "Typescript", "BootStrap", "REST API’s"], 
  frameworks: ["React.js", "Node.js", "Express.js", "Spring boot", "Flask", "Flutter", "Pytorch", "Torchvision", "Scikit learn"],
  databases: ["MySQL", "PostgreSQL", "MongoDB"],
  tools: ["Git", "GitHub", "Postman", "Docker"],  
  cloud: ["AWS", "Kubernetes"], 
  ui_ux: ["Figma", "Bootsrap Studio", "Spline","Gsap","Framer Motion","AceternityUI","ShadcnUI","MagicUI"], 
  misc: ["Google(operators, queries)", "Prompt Engineering", "Data modelling", "Developer tools", "Agile Development and Scrum"], 
 
  activities: [ 
    "🏆 Winner: UAE National Scientific Excellence Competition",
    "🏆 Honors: 5 consecuitve times in university's honor list",
    "🏆 Honors: 2 consecuitve times in Dean's honor list",
    "🎖️ Top 5: AAU Full-ride scholarship for top 5 students nationwide",
    "🏆 Golden visa: Distinguished student category",
    "🏆 100%: perfect 100% highschool score in all subjects",
    "🎖️ IEEE Member & Competition Participant",
    "🧑‍💻 Volunteer: 23rd IEEE ACIT Conference",
    "🥈 Finalist: Expo Innovation Programme",
    "🥈 Finalist: Sundouq al Watan Youth Startup",
    "🥉 3rd Place: University Chess Tournament",
    "🎖️ Winner: Annual AAU Programming Competitions",
  ],
};

const SkillCategory = ({ title, skills, icon}: { title: string; skills: string[]; icon: React.ReactNode }) => {
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
    "Framer Motion": "img/framer.svg",
    "Gsap": "https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg",
    "AceternityUI": "data:image/png;base64,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",
    "ShadcnUI": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAh1BMVEX///8AAADj4+Pl5eXf39/o6Ojc3NxJSUlDQ0NGRkbU1NTX19dAQEDv7+9RUVHd3d0zMzM4ODjOzs47Ozv4+PhfX19OTk5aWlpUVFQuLi7y8vJiYmJpaWlsbGzCwsIiIiKsrKygoKC2trZ/f3++vr6dnZ0TExOKiooZGRkgICALCwspKSmSkpKWZ1X9AAAEyUlEQVR4nO3diXLiMAwG4JgrARLKkXJDKbSl1/s/3wa6O0tLrOkMshX/0f8CsqqPlCOOoyjsZPtNOhzNHzu59ErcZLmLzVceDk3pxbhIvjb/M+hJL4c/zbm5zMNYekHcaa7M96Rgr8V8bn5mJ70m1jSvGzRxW3pVjLkien4lbqWXxZcSolhMy4ie8ii9MK6UEkXq0EIUR6mNqDEfGP/zGzaixswz6cVxJB9YG8R4GTaIBgfSi+MIQdQkfenVMYQiukC4zFBEFy3p1TGEIpoiTLDeRBvSq2NI416Jhh0lGnqUaOjBJzpFJ0o1iE40QZigEg09SjT0KNHQU2uiQwSirToTHSI02KJegwh3BrVm6ERje4MYRKkGlWgAUaKhhyLaRZjgUokGHiUaepRo6CGJItyEX2+iCBOsN1GEu+/vlGjguUMnSl1FY4QJLrvoRIkGRwhEqasoPNERQoMddKIdJRp48IlaN2cp0TCiREOPEg09+EQTdKJUg0o0gNSa6ASd6BRhghk1QYQGlWjoUaKhB59oCk60TzWI8ECZPrHFdYrwNBKSKEKDSjT0KNHQo0RDD0U0VaIBhCKaIjRYa6IDhAmKE82eds97h4WEieZPf+/yeHl29PVBn9ji6oFo+/i/3NTJs6GFiS43lwVfHLQoTPTnD8z8z9qXJrr5WXS95K2QTSpE9Cu8Q+xTDfon+jVEzgqVI3rKB2OFChIt8s5XQZqo7ZcDtgqVJMo5w2oSLbJgqtCTJUr8enfkqdAjiM47PDWItNfW6q88P/20iQkm7hvM7A2aA8v5QRTRRJSombF8gKouUTO8Y6lQXaI82/grTHTK8vetMlGW8vhER0SDzJ89S0J9Y8JElNji6oFo0/1VlJqgEr05JFGWCdaaaBedaFeJ3hyK6Aid6Aid6IDl2KcKEx2yNKhE3Yb6Us890ZnwVVSJ/ib1Jsryn5aM9ZRc44Wo+wYzqkGWb357Q6JBJXpzPBAlJhijE40hiBIPCpi5P+RUmKj7BmtNdK5Ef1VBiTpNRryR4iE6ri7RCTpRng2o4woTZTn2SZgodda4Ev1VlKjbkERZGqw3UZZ7qch4IErdS6VEb04bnSj1cRSDKHG+IxPRhb3C1ANRqkHnRKeyRGfOid7LEk1ZGmxQE3R/iitFNOUhSr0G4Ym6n6AHotQEhYmy7EtRom6jRG+OEnUbJXpzpIkS5Wcsh+eNidv9pImyNEgRHXggSpzI4p7oQPgqikCUOpmMhyj1iV6YaMJCtEH8H/RB1PlVND/aK0AQjVof9gkiXEWjyD5CCKJFrLfjrWSJJmzHAD/YJohwFT3nxdIgCNHINkMYokVK38/w/PpBxhPRIs/YRIv036CJFskPV0TdH9fuj2hZtbkHovb3UdxEz+l8+3i2dj9BimjXSfn+RcWj+4d1UES7rh4ptV2NXs37W3Jgf5DidSii9+4A5Z3tfr91fw2VIOo5IkR9hiSKcKZOg5ogQoPX7y4uGnS/AdVD9uBEo8j+IHMIolGUgRMt3leAE42iHTbRyNohCtHIphSGaJF2WYMxUINRVLJRMsYhesoTNNFTrp5njEX0lP73TRRgRM9pX2402sBN8JTm57/vvSaf7veGyaT5uJoMJ6u9r28s/gDnI2itu3Hs/QAAAABJRU5ErkJggg==",
    "MagicUI": "magic.svg",
    "Spline": "data:image/jpeg;base64,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",
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
      className="mb-6 ml-auto mr-auto bg-lightest-navy/10 backdrop-blur-sm w-11/12 rounded-xl p-4 border border-lightest-navy/30 hover:border-neon-green hover:bg-lightest-navy/20 transition-all duration-300"
   >
      <div className="flex items-center mb-4 gap-2" >
        <div className="mr-3 text-neon-green">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-lightest-slate">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2 justify-center" >
        {skills.map((skill, index) => {
          const iconSrc = skillIcons[skill];
          return (
            <div 
            id='skill'
              key={index}
              className=" cursor-can-hover flex items-center bg-lightest-navy/20 backdrop-blur-sm rounded-xl p-2 border border-lightest-navy/30 hover:border-neon-green hover:bg-lightest-navy/30 transition-all duration-300"
           
            >
              {iconSrc && ( // Conditionally render the image only if iconSrc exists
                <img
                  src={iconSrc}
                  alt={`${skill} logo`} // Improved alt text
                  className="w-5 h-5 mr-2"
                  id='skill'
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
        <h2 className="bg-clip-text bg-gradient-to-b from-white/80 to-white/20 bg-opacity-50 text-4xl text-center text-transparent md:text-7xl">
          Skills & Activities
        </h2>
        {/* <SkillCategory
              title="Area of Expertise" // Updated title
              skills={skillsData.AreaOfExpertise} // Use updated programming skills
              icon={<Laptop size={20} />}
            /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-4">
          {/* Column 1 */}
          <div>
            <SkillCategory
              title="Programming"
              skills={skillsData.programming}
              icon={<Code size={20} />}
            />
                   <SkillCategory
              title="Tools"
              skills={skillsData.tools}
              icon={<Wrench size={20} />}
            />
            <SkillCategory
              title="Databases"
              skills={skillsData.databases}
              icon={<Database size={20} />}
            />
            <SkillCategory
              title="Misc"
              skills={skillsData.misc}
              icon={<Brain size={20} />}
            />
          </div>
          {/* Column 2 */}
          <div>
          <SkillCategory
              title="Web Development"
              skills={skillsData.web}
              icon={<Globe size={20} />}
            />
              <SkillCategory
              title="Frameworks/Libraries"
              skills={skillsData.frameworks}
              icon={<Layers size={20} />}
            />

                  <SkillCategory
              title="UI/UX"
              skills={skillsData.ui_ux}
              icon={<PenTool size={20} />}
            />
            <SkillCategory
              title="Cloud Technologies"
              skills={skillsData.cloud } 
              icon={<Cloud size={20} />}
            />
          </div>
        </div>
                          {/* Activities Section*/}
                          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="justify-center mb-8 mr-auto ml-auto pr-4 pl-4 w-[96%] bg-lightest-navy/10 backdrop-blur-sm rounded-lg p-4 border border-lightest-navy/30 hover:border-neon-green hover:bg-lightest-navy/20 transition-all duration-300 "
            >
              <div className="flex items-center mb-4 w-full justify-center">
                <div className="mr-3 text-neon-green">
                  <Award size={20} />
                </div>
                <h3 className="text-xl font-semibold text-lightest-slate border-lightest-navy/30 hover:border-neon-green hover:bg-lightest-navy/20 transition-all duration-300">Notable Activities & Achievements</h3>
              </div>
              <div id='skill' className="flex flex-wrap justify-center gap-3 border-lightest-navy/30 hover:border-neon-green hover:bg-lightest-navy/20 transition-all duration-300">
                {skillsData.activities.map((activity, index) => (
                  <motion.div
                  id='skill'
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center bg-lightest-navy/20 backdrop-blur-sm rounded-lg p-2 border border-lightest-navy/30 hover:border-neon-green hover:bg-lightest-navy/30 transition-all duration-300"
                  >
                    <span className="text-sm text-light-slate">{activity}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
      </section>
  );
};

export default Skills;