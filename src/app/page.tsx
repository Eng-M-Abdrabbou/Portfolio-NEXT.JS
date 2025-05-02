// src/app/page.tsx
'use client'; // Required for react-scroll and framer-motion hooks

import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import ExperienceEducation from './components/sections/ExperienceEducation';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import AnimatedBackground from './components/AnimatedBackground';
// Remove MotionWrap import if not using the HOC approach
// import MotionWrap from './components/MotionWrap';

// If using HOC, wrap components like this:
// const WrappedHero = MotionWrap(Hero, 'home');
// Otherwise, apply motion directly within components or skip section-level animation wrap
export default function Home() {
  useEffect(() => {
    document.querySelectorAll('button').forEach(btn => btn.classList.add('cursor-can-hover'));
  }, []);
  useEffect(() => {
    document.querySelectorAll('a').forEach(btn => btn.classList.add('cursor-can-hover'));
  }, []);
  
  useEffect(() => {
    document.querySelectorAll('input').forEach(btn => btn.classList.add('cursor-can-hover'));
  }, []);

  useEffect(() => {
    document.querySelectorAll('iframe').forEach(btn => btn.classList.add('cursor-can-hover'));
  }, []);

  useEffect(() => {
    document.querySelectorAll('svg').forEach(btn => btn.classList.add('cursor-can-hover'));
  }, []);

  useEffect(() => {
    document.querySelectorAll('link').forEach(btn => btn.classList.add('cursor-can-hover'));
  }, []);

  useEffect(() => {
    const element = document.querySelector('#hover'); 
    if (element) element.classList.add('cursor-can-hover');
  }, []);

  useEffect(() => {
    const element = document.querySelector('textarea'); 
    if (element) element.classList.add('cursor-can-hover');
  }, []);


  return (
    <>
      <div className="fixed top-0 z-[-1] w-screen h-screen">
        <AnimatedBackground />
      </div>
      <main className="relative z-0">
        <Navbar />
        {/* Render sections directly */}
        <Hero />
        <ExperienceEducation />
        <Skills />
        <Projects />
        <Contact />

        {/* If using HOC for animations, render wrapped components: */}
        {/* <WrappedHero />
        <WrappedExperienceEducation />
        <WrappedSkills />
        <WrappedProjects />
        <WrappedContact /> */}
      </main>
    </>
  );
}