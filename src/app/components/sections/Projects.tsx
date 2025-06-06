"use client"; // Required for useState and useEffect

import React, { useState, useEffect, useCallback } from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import useEmblaCarousel from 'embla-carousel-react'; // Assuming this hook is available
import Autoplay from 'embla-carousel-autoplay';
import { Button } from "@/components/ui/button";
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
  features: string[];
  associatedWith: string;
  whyChooseBASYS?: string[];
  whyStreamHUB?: string[];
  whyVisionAid?: string[];
  whyChoose?: string[];
  Conclusion: string;
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
    description: `VisionAid Companion 👁️
Illuminate the World with Fearless InnovationBuilt for IEEE 2025, VisionAid Companion is a Flutter-powered lifeline, fusing real-time computer vision with heartfelt design for the visually impaired. 🌍`,
    frontendTags: ["Flutter"],
    backendTags: ["Python", "Flask", "MySQL", "WebSockets", "AI/ML", "PyTorch"],
    github: "https://github.com/YOUR_GITHUB/VisionAid", 
    live: null, 
    image: "/img/p1.jpg", 
    screenshots: ["/img/VisualAid/A (1).jpeg", "/img/VisualAid/A(2).jpeg", "/img/VisualAid/A (3).jpeg", "/img/VisualAid/A(4).jpeg", "/img/VisualAid/A(5).jpeg", "/img/VisualAid/A(6).jpeg","/img/VisualAid/A(7).jpeg", "/img/VisualAid/A (8).jpeg", "/img/VisualAid/A (9).jpeg","/img/VisualAid/A(10).jpeg"],
    features: ["Feature Carousel Flair 🎠: Swipe through assistive tools like object detection or barcode scanning with effortless, intuitive flow.","Object Detection Dynamo 🔍: Spots objects in near real-time via camera, announcing them clearly through configurable Text-to-Speech (TTS).","Hazard Alert Vanguard 🚨: Flags dangers like cars or obstacles with urgent TTS, vibrations, and bold visuals for ironclad safety.","Scene Description Spark 📸: Captures images to deliver vivid, concise environment descriptions—like “bustling market” or “quiet park”—via TTS.","Multilingual OCR Mastery 📖: Scans and reads text in multiple languages, from menus to signs, with crystal-clear TTS output.","Barcode Scanning Brilliance 🏷️: Scans UPC codes to fetch product details from Open Food Facts, announced via TTS for instant clarity.","Voice Command Virtuoso 🎙️: Navigate features or tweak settings with simple voice prompts, activated by a long-press for hands-free ease.","Supervision Mode Savvy 🧠: Auto-selects the ideal feature based on context, delivering seamless, situation-aware assistance.","Search Mode Superstar 🎯: Hunt specific objects with dynamic beeping that intensifies as you close in on your target.","UAE Currency Sleuth 💸: Identifies UAE dirham notes with pinpoint accuracy, empowering confident transactions via TTS.",],
    associatedWith: "Institue of Electrical and Electronics Engineers (IEEE)",
    whyVisionAid: ["💪 Shatter Every Barrier: Empower fearless independence with tech that transforms lives.","🌟 Lightning-Fast Clarity: Real-time vision tools deliver instant, game-changing awareness.","❤️ Crafted with Soul: Built for IEEE 2025 to uplift and inspire with unmatched purpose.","🔑 Unlock Boundless Freedom: Navigate the world with bold, unshakeable confidence.","🌍 Make a Global Impact: Join a movement that redefines accessibility for all.","⚡ Seamless Innovation: Intuitive design ensures every feature feels like second nature.","🤝 Empower Communities: Give users tools to thrive, fostering dignity and connection.",],
    Conclusion: "VisionAid isn’t just an app—it’s a revolution. Designed with passion and precision, it obliterates limitations and hands power back to those who need it most. Embrace the future, ignite change, and make every step unstoppable. The time is now! 💡"
  },
  {
    title: "StreamHUB",
    description: `StreamHUB 🎬
Unleash a Cinematic Social ExplosionStreamHUB isn’t streaming—it’s a pulse-pounding fusion of epic content and electric community vibes! 🎉`,
    frontendTags: ["Bootstrap","HTML","CSS","JavaScript"],
    backendTags: ["Python", "Node.js", "Express", "MySQL", "Flask", "Pandas", "SciKit-Learn"],
    github: "https://github.com/YOUR_GITHUB/StreamHUB",
    live: null,
    image: "/img/p2.png",
    screenshots: ["/img/StreamHUB/Picture1.png", "/img/StreamHUB/Picture2.jpeg", "/img/StreamHUB/Picture3.jpeg", "/img/StreamHUB/Picture4.jpeg"], // Placeholder screenshots
    features: ["Content Cosmos 🍿: Dive into a vast library of blockbusters, indie gems, and global series, curated to spark every emotion.","AI Recommendation Riser 🧠: Cutting-edge AI dissects your viewing habits and social interactions to serve up hyper-personalized content picks.","Live Chat Thunder 💬: React, banter, and bond in real-time during live events, connecting with fans worldwide.","Forum Frenzy 🔥: Build and moderate vibrant forums with full CRUD power, sharing images and fueling epic discussions.","Custom Player Pinnacle 🎥: Our bespoke player delivers flawless, adaptive streaming for crystal-clear viewing on any device.","CMS Command Hub 🛠️: A tailor-made Content Management System lets admins orchestrate content with surgical precision.","Social Sharing Surge 📲: Amplify your voice by sharing clips, reviews, or playlists to social platforms, igniting viral moments.","Watch Party Wizardry 🎉: Host synced watch parties with group chats, turning solo streams into unforgettable social showdowns.","Multi-Device Dominance 📺: Seamlessly hop between phone, tablet, or TV with instant progress syncing for non-stop thrills.","Moderation Muscle 🛡️: Robust tools ensure user-generated content stays safe and inclusive, fostering a thriving community.",],
    associatedWith: "AL Ain University",
    whyStreamHUB: ["🔥 Live the Electric Vibe: Join a global tribe where every story becomes a shared, heart-racing adventure.","🎯 Your Perfect Binge: AI nails your taste, delivering content so spot-on it feels like destiny.","⚡ Lag-Free Glory: Custom tech ensures cinematic brilliance, no matter your device or connection.","🌍 Shape the Culture: Spark trends, lead conversations, and own the entertainment spotlight.","💥 End Boredom Forever: Transform dull nights into unforgettable moments of connection and discovery.","📈 Stay Ahead of Trends: Tap into a platform that evolves with your passions and the latest hits.","🤩 Unleash Your Voice: Share, create, and connect in a space that celebrates your unique spark.",],
    Conclusion: "StreamHUB isn’t just a platform—it’s a movement. Ditch endless scrolling, embrace the thrill, and dive into a world where entertainment is personal, social, and utterly epic. Join now and redefine fun! 🌟"
  },
  {
    title: "BASYS (Biometric Attendance System)",
    description: `Projects That Ignite Unstoppable Success 🚀
Biometric Attendance System 🕒
Command Time with Surgical PrecisionFor Federal Transformers Company LLC, this biometric juggernaut redefines workforce management with seamless efficiency and ironclad security! 💼`,
    frontendTags: ["JavaScript", "Bootstrap", "HTML"],
    backendTags: ["Python", "Node.js", "Express", "MySQL"],
    github: "https://github.com/YOUR_GITHUB/BASYS",
    live: null,
    image: "/img/p3.PNG",
    screenshots: ["/img/BASYS/Dashboard.png", "/img/BASYS/General Attendance Report.png", "/img/BASYS/MusterRoll.PNG", "/img/BASYS/Picture1.png"], // Placeholder screenshots
    features: ["Biometric Precision Strike 🖐️: Fingerprint and facial recognition ensure foolproof, real-time clock-ins, eliminating buddy punching and errors.","Shift Scheduling Mastery 📅: Design intricate shift patterns with drag-and-drop simplicity, optimizing staffing for peak performance.","Overtime Oracle ⏰: Auto-calculate overtime with customizable rules, ensuring compliance and fair compensation every time.","Reporting Rocket 📊: Craft detailed daily, weekly, or monthly reports, exportable in PDF/Excel, with fully customizable templates for strategic insights.","Notification Blitz 📩: Send instant, tailored alerts for absences, late arrivals, or reminders, keeping your team razor-sharp and aligned.","User Control Citadel 🔒: Manage accounts with role-based permissions, locking down sensitive data with enterprise-grade encryption.","Integration Infinity 🔗: Sync effortlessly with biometric devices and HR platforms like SAP or Workday, streamlining payroll and employee data.","Audit Trail Aegis 🛡️: Log every action for airtight compliance, making audits or disputes a breeze with transparent records.","Mobile Empowerment 📱: Let employees clock in/out, view records, or request leave via a sleek mobile app, boosting engagement on the go.","Analytics Alchemy 📉: Transform attendance data into actionable metrics, optimizing staffing, cutting costs, and driving operational supremacy.",],
    associatedWith: "Federal Transformers Company LLC Branch 1",
    whyChooseBASYS: ["🚀 Turbocharge Productivity: Slash manual errors and unlock a leaner, smarter workforce that runs like a well-oiled machine.","🔐 Unbreakable Security: Biometric precision and robust encryption safeguard your data from threats, now and forever.","💡 Genius-Level Insights: Actionable analytics empower you to outsmart challenges and dominate workforce planning.","⏳ Reclaim Your Hours: Automate tedious tasks and focus on crushing your business goals with ruthless efficiency.","🌟 Future-Ready Innovation: Stay ahead of the curve with a system built to scale, adapt, and evolve with your needs.","💸 Slash Costs: Minimize payroll errors and optimize staffing to save big without sacrificing quality.","🤝 Empower Your Team: Give employees tools to thrive, fostering loyalty and performance that fuel your success.",],
    Conclusion: "This isn’t just a system—it’s your ticket to a workforce revolution. Outpace competitors, obliterate inefficiencies, and seize control of time like never before. Act now and claim your edge! 💥"
  },
  {
    title: "Weather Forecast & Analysis App",
    description: "ReactJS frontend & Java Spring Boot backend weather app with real-time data, AQI & interactive map via OpenWeatherMap API.",
    frontendTags: ["ReactJS", "JavaScript", "Axios", "CSS3", "Leaflet"],
    backendTags: ["Java", "Spring Boot", "Maven"],
    github: null, 
    live: "Weather App Demo", 
    image: "/img/p4.png", 
    screenshots: ["/img/wthr/wthrInfo.png", "/img/wthr/Map.png", "/img/wthr/HrForecast.png","/img/wthr/AQI.png"], 
    features: [""],
    associatedWith: "",
    whyChoose: [""],
    Conclusion: ""
  },
  {
    title: "This Portfolio",
    description: "My personal portfolio website built with Next.js, TypeScript, and Tailwind CSS, showcasing my projects, skills, and experience.",
    frontendTags: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    backendTags: ["Node.js"], 
    github: "https://github.com/YOUR_GITHUB/YOUR_REPO", 
    live: null, 
    image: "/img/p5.png", 
    screenshots: ["/img/portfolio/1.png", "/img/portfolio/2.png", "/img/portfolio/3.png","/img/portfolio/4.png","/img/portfolio/5.png"], 
    features: [""],
    associatedWith: "",
    whyChoose: [""],
    Conclusion: ""
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-2 w-full max-w-7xl flex-grow h-[70vh] mr-8 ml-8 [&::-webkit-scrollbar]:w-12"> {/* Adjust max-w and h as needed */}

          <div className="md:col-span-1 overflow-y-auto pr-14 scrollbar-thin scrollbar-thumb-slate scrollbar-track-light-navy border border-slate/50 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 ml-10 text-center mt-6">Select a Project:</h2>
            {projectsData.map((project, index) => (
              <div
                key={index}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer -mb-2 ml-6"
              >

                <CardContainer 
                  className="inter-var w-full -mb-16 -mt-16 -mr-8" 

                >
                  <CardBody 
                    className={`  relative group/card border-slate/50 w-full h-auto rounded-xl p-4 border transition-all duration-300 ${selectedProject?.title === project.title ? 'border-neon-green shadow-neon-glow' : 'hover:border-neon-green/50 hover:shadow-md'}`} 
                  >
                                  <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
                    <CardItem
                      translateZ="50"
                      className=" justify-center text-center text-lg font-bold text-lightest-slate group-hover:text-neon-green transition-colors"
                    >
                      {project.title}
                    </CardItem>
                    {project.image && (
                      <CardItem translateZ="100" className="w-full mt-4">
                        <img
                          src={project.image}
                          height="1000"
                          width="1000"
                          className="w-auto max-w-[90%] mx-auto object-contain rounded-md h-[200px]"
                          alt={project.title}
                        />
                      </CardItem>
                    )}
                  </CardBody>
                </CardContainer>
              </div>
            ))}
          </div>

          <div className="md:col-span-2 overflow-y-auto pl-2 scrollbar-thin scrollbar-thumb-slate scrollbar-track-light-navy backdrop-blur-sm p-6 rounded-xl shadow-lg border border-slate/50">
            {selectedProject ? (
              <div className="animate-fade-in pr-12 pl-12"> {/* Simple fade-in animation */}
                <h3 className="text-4xl font-bold text-lightest-slate mb-4 text-center justify-center">{selectedProject.title}</h3>

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

                <h4 className="text-lg font-semibold text-neon-green mb-3 text-center w-fit mx-auto justify-center">Project Overview</h4>

                <p className="text-base text-light-slate mb-2 leading-relaxed mx-auto justify-center">{selectedProject.description}</p>

                {selectedProject.associatedWith && selectedProject.associatedWith !== "N/A" && selectedProject.associatedWith !== "" && (
                  <h4 className="text-lg font-semibold text-neon-green mb-3 text-center">Associated With: <br /> <span className="mt-2 text-light-slate"> {selectedProject.associatedWith}</span></h4>
                )}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-neon-green mb-3">Links:</h4>
                  <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                    {selectedProject.github && (
                      <Button className='px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28'
                        asChild
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
                         asChild
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

                <h4 className="text-lg font-semibold text-neon-green mb-8 mt-8 justify-center text-center">Features Showcase</h4>

                <Carousel className="w-full h-full max-w-xl mx-auto mb-8 -mt-18 text-center justify-center" plugins={[Autoplay({ delay: 1500 })]}>
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

                {selectedProject.features && (
                  <h4 className="text-lg font-semibold text-neon-green mb-3">Features: </h4>
                )}
                {selectedProject.features && (
                  <ul className="list-disc list-outside space-y-2 pl-5 text-base text-light-slate">
                    {selectedProject.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                )}
<br /><br />
                {selectedProject.title === "BASYS (Biometric Attendance System)" && selectedProject.whyChooseBASYS && (
                  <h4 className="text-lg font-semibold text-neon-green mb-3">Why Choose BASYS (Biometric Attendance System): </h4>
                )}
                {selectedProject.whyChooseBASYS && (
                  <ul className="list-disc list-outside space-y-2 pl-5 text-base text-light-slate">
                    {selectedProject.whyChooseBASYS.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                )}
                {selectedProject.title === "StreamHUB" && selectedProject.whyStreamHUB && (
                  <h4 className="text-lg font-semibold text-neon-green mb-3">Why Choose StreamHUB: </h4>
                )}
                {selectedProject.whyStreamHUB && (
                  <ul className="list-disc list-outside space-y-2 pl-5 text-base text-light-slate">
                    {selectedProject.whyStreamHUB.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                )}

                {selectedProject.title === "VisionAid" && selectedProject.whyVisionAid && (
                  <h4 className="text-lg font-semibold text-neon-green mb-3">Why Choose VisionAid: </h4>
                )}
                                {selectedProject.whyVisionAid && (
                  <ul className="list-disc list-outside space-y-2 pl-5 text-base text-light-slate">
                    {selectedProject.whyVisionAid.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                )}
                <br /><br />
                {selectedProject.Conclusion && (
                  <h4 className="text-lg font-semibold text-neon-green mb-3">Conclusion: </h4>
                )}
                {selectedProject.Conclusion && (
                  <p className="text-base text-light-slate mb-2 leading-relaxed mx-auto justify-center">{selectedProject.Conclusion}</p>
                )}
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
