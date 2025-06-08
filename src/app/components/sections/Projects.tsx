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
import { GithubIcon, ExternalLinkIcon, CodeIcon, TerminalIcon, LayoutDashboardIcon, BookOpenIcon } from 'lucide-react'; // Import icons from lucide-react, added CodeIcon, TerminalIcon, and LayoutDashboardIcon
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
  "GSAP": <img src="img/gsap.svg" className="h-20 w-20 text-navy filter grayscale(100%)" alt="Gsap" />,
  "Framer Motion": <img src="img/framer.svg" className="h-20 w-20 text-navy" alt="Framer Motion" />,
  "Gemini SDK": <img src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg" className="h-20 w-20 text-navy" alt="Gemini" />,
  "Spline": <img className='' src="data:image/jpeg;base64,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"></img>,
   
};

const projectsData: Project[] = [
  {
    title: "BlinkAI - VisionAid",
    description: `VisionAid aka blinkAI Companion 👁️ 
Illuminate the World with Fearless Innovation Built for IEEE 2025, VisionAid Companion is a Flutter-powered lifeline, fusing real-time computer vision with heartfelt design for the visually impaired. 🌍`,
    frontendTags: ["Flutter"],
    backendTags: ["Python", "Flask", "MySQL", "WebSockets", "AI/ML", "PyTorch"],
    github: "https://github.com/Eng-M-Abdrabbou/Full-Stack_AI-VisualAid_Flutter_Python", 
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
    github: "https://github.com/Eng-M-Abdrabbou/StreamHUB-Platform-Fullstack-NodeJS-ExpressJS",
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
    github: "https://github.com/Eng-M-Abdrabbou/Biometric-Attendance-HR-System-NodeJS-ExpressJS",
    live: null,
    image: "/img/p3.PNG",
    screenshots: ["/img/BASYS/Dashboard.PNG", "/img/BASYS/General Attendance Report.PNG", "/img/BASYS/MusterRoll.PNG", "/img/BASYS/Picture1.png"], // Placeholder screenshots
    features: ["Biometric Precision Strike 🖐️: Fingerprint and facial recognition ensure foolproof, real-time clock-ins, eliminating buddy punching and errors.","Shift Scheduling Mastery 📅: Design intricate shift patterns with drag-and-drop simplicity, optimizing staffing for peak performance.","Overtime Oracle ⏰: Auto-calculate overtime with customizable rules, ensuring compliance and fair compensation every time.","Reporting Rocket 📊: Craft detailed daily, weekly, or monthly reports, exportable in PDF/Excel, with fully customizable templates for strategic insights.","Notification Blitz 📩: Send instant, tailored alerts for absences, late arrivals, or reminders, keeping your team razor-sharp and aligned.","User Control Citadel 🔒: Manage accounts with role-based permissions, locking down sensitive data with enterprise-grade encryption.","Integration Infinity 🔗: Sync effortlessly with biometric devices and HR platforms like SAP or Workday, streamlining payroll and employee data.","Audit Trail Aegis 🛡️: Log every action for airtight compliance, making audits or disputes a breeze with transparent records.","Mobile Empowerment 📱: Let employees clock in/out, view records, or request leave via a sleek mobile app, boosting engagement on the go.","Analytics Alchemy 📉: Transform attendance data into actionable metrics, optimizing staffing, cutting costs, and driving operational supremacy.",],
    associatedWith: "Federal Transformers Company LLC Branch 1",
    whyChooseBASYS: ["🚀 Turbocharge Productivity: Slash manual errors and unlock a leaner, smarter workforce that runs like a well-oiled machine.","🔐 Unbreakable Security: Biometric precision and robust encryption safeguard your data from threats, now and forever.","💡 Genius-Level Insights: Actionable analytics empower you to outsmart challenges and dominate workforce planning.","⏳ Reclaim Your Hours: Automate tedious tasks and focus on crushing your business goals with ruthless efficiency.","🌟 Future-Ready Innovation: Stay ahead of the curve with a system built to scale, adapt, and evolve with your needs.","💸 Slash Costs: Minimize payroll errors and optimize staffing to save big without sacrificing quality.","🤝 Empower Your Team: Give employees tools to thrive, fostering loyalty and performance that fuel your success.",],
    Conclusion: "This isn’t just a system—it’s your ticket to a workforce revolution. Outpace competitors, obliterate inefficiencies, and seize control of time like never before. Act now and claim your edge! 💥"
  },
  {
        "title": "Weather Forecast & Analysis App",
        "description": "A full-stack weather application with a ReactJS frontend and Java Spring Boot backend, delivering real-time weather data, AQI, a 5-day forecast, and an interactive map, all powered by the OpenWeatherMap API.",
        "frontendTags": ["ReactJS", "JavaScript", "Axios", "CSS3", "Leaflet"],
        "backendTags": ["Java", "Spring Boot", "Maven"],
        "github": "https://github.com/Eng-M-Abdrabbou/Weather_Prediction_Analysis-FullStack-App", 
        "live": null, 
        "image": "/img/p4.png", 
        "screenshots": ["/img/wthr/WthrInfo.png", "/img/wthr/Map.png", "/img/wthr/HrForecast.png","/img/wthr/AQI.png"], 
        "features": [
          "Dynamic City Search 🏙️: Instantly fetch real-time weather for any city across the globe with a simple search.",
          "Comprehensive Weather Dashboard 🌡️: Get a full, at-a-glance view of current conditions—temperature, humidity, wind speed, pressure, and visibility.",
          "5-Day Forecast Forecaster 📅: Plan your week with precision using a detailed 5-day forecast broken down into 3-hour intervals.",
          "Air Quality Index (AQI) Insights 🌬️: Stay informed with real-time AQI data and a breakdown of major atmospheric pollutants.",
          "Interactive Leaflet Map 🗺️: Visualize the searched city's geographical location with a dynamic and responsive map.",
          "Robust Spring Boot Backend ☕: Powered by a resilient and efficient Java Spring Boot backend for fast and reliable data processing.",
          "Sleek React Frontend ⚛️: Experience a modern, responsive, and intuitive single-page application built with React.",
          "Seamless API Integration 🔗: Leverages the OpenWeatherMap API to deliver accurate and up-to-date weather information."
        ],
        "associatedWith": "Personal Project",
        "whyChoose": [
          "💡 Instant Weather Clarity: Get all the critical weather details you need in one clean, easy-to-navigate interface.",
          "🌍 Plan with Confidence: The detailed forecast empowers you to plan everything from daily commutes to future trips.",
          "💨 Breathe Smarter: Make healthier decisions about outdoor activities with essential AQI data at your fingertips.",
          "⚙️ Full-Stack Excellence: Showcases the powerful synergy of a Java backend and a dynamic React frontend.",
          "🗺️ Visualize Your World: The interactive map provides geographical context that static reports can't offer.",
          "⚡ Fast & Responsive: Access weather data on the go, from any device, without sacrificing speed or functionality."
        ],
        "Conclusion": "This isn’t just another weather app—it’s a powerful demonstration of full-stack development. By seamlessly integrating a robust Java backend with a sleek React frontend, it delivers precise, real-time weather data with exceptional style and efficiency. 🌦️"
      },
    {
          "title": "This Portfolio",
          "description": "My personal portfolio, engineered with Next.js, TypeScript, and Tailwind CSS. It's a cosmic-themed, interactive showcase of my projects and skills, featuring 3D animations, a Gemini-powered chatbot, and a pixel-perfect responsive design.",
          "frontendTags": ["Next.js", "TypeScript", "Tailwind CSS", "React", "Framer Motion", "GSAP", "Spline"],
          "backendTags": ["Node.js", "Gemini SDK"], 
          "github": "https://github.com/Eng-M-Abdrabbou/Portfolio-NEXT.JS", 
          "live": "https://portfolio-next-js-eng-m-abdrabbous-projects.vercel.app/", 
          "image": "/img/p5.png", 
          "screenshots": ["/img/Portfolio/6.png", "/img/Portfolio/2.png", "/img/Portfolio/3.png","/img/Portfolio/4.png","/img/Portfolio/5.png"], 
          "features": [
            "Interactive 3D Laptop ⌨️: Engage with a custom Spline 3D Laptop where each key reveals a technical skill upon interaction.",
            "Dynamic Animation Suite ✨: Utilizes GSAP and Framer Motion for fluid, captivating animations on scroll, hover, and page load.",
            "Immersive Cosmic Theme 🌌: Explore projects in a stunning space-themed UI with animated particles for an unforgettable digital journey.",
            "AI-Powered Chatbot 🤖: Interact with an integrated chatbot powered by the Gemini SDK for instant answers and engagement.",
            "Cutting-Edge UI/UX 🚀: Built with a modern tech stack including Aceternity UI and Shadcn for a clean, intuitive, and innovative user experience.",
            "Full Multimedia Experience 🎶: Features a built-in music player, auto-playing carousels, and an integrated blog to enrich the user experience.",
            "Seamless Navigation Tools 🧭: Offers effortless Browse with features like auto-scroll, a light/dark mode, and dynamic project showcases.",
            "Pixel-Perfect Responsive Design 📱: Delivers a flawless and optimized experience across all devices, from widescreen monitors to mobile phones."
          ],
          "associatedWith": "Personal Project",
          "whyChoose": [
            "🎨 Witness Creative Engineering: It’s not just a portfolio; it's a statement of cutting-edge design and development.",
            "🚀 Explore Next-Gen Tech: See the power of Next.js, TypeScript, and interactive 3D working in perfect harmony.",
            "✨ Feel the Polished Difference: Every scroll and click is meticulously crafted to deliver an exceptionally smooth user experience.",
            "💡 A Showcase of Mastery: This site demonstrates a deep understanding of both frontend aesthetics and modern web technologies.",
            "🤖 Interact with the Future: The built-in AI chatbot showcases a commitment to leveraging innovative, cutting-edge technology.",
            "💼 More Than a Resume: It's a living project that proves capability through immersive, hands-on action."
          ],
          "Conclusion": "This portfolio is more than a list of projects—it’s an experience. Crafted with bleeding-edge technologies and a passion for innovative design, it serves as a testament to what’s possible when code meets creativity. Explore, interact, and see the future of web development in action. 🚀"
        }
      ]

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
                    {selectedProject.title === "BlinkAI - VisionAid" && (
                      <Button className='px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-36'
                        asChild
                      >
                        <a
                          href="https://drive.google.com/file/d/104L8sGQ5AXa2Eb6zkhgpD5zuPuo19iYd/view?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="VisionAid User Manual"
                        >
                          <span className="flex items-center gap-2 justify-center w-16"> {/* Wrap icon and text in span */}
                            <BookOpenIcon className="mr-2 h-4 w-8" />User Manual
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
