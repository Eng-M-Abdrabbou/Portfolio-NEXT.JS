'use client';

import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
    } else {
      // Default to dark theme if no theme is stored
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const isDark = theme === 'dark';
  const ariaLabel = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <div className="fixed top-4 left-4 z-[1000] flex items-center space-x-2">
      <button
        onClick={toggleTheme}
        aria-label={ariaLabel}
        aria-pressed={theme === 'light'}
        className="p-2 rounded-full bg-gray-800 text-white shadow-lg transition-colors duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        {isDark ? (
          // Moon icon for dark theme
          <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="#64FFDA"
          stroke="#64FFDA"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-moon"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      ) : (
        // Sun icon for light theme
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F7DC6F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-sun"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        )}
      </button>
      <AutoScrollButton />
    </div>
  );
};

import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AutoScrollButton = () => {
  const [autoScroll, setAutoScroll] = useState(false);

  useEffect(() => {
    let auto: gsap.core.Timeline | null = null;

    if (autoScroll) {
      auto = gsap.timeline({ repeat: -1 })
        .to(
          {},
          {
            onUpdate: () => {
              window.scrollBy(0, 3);
            },
            duration: 0.01,
            ease: "none",
          }
        );

      window.addEventListener("wheel", () => auto?.kill());
    }

    return () => {
      auto?.kill();
      window.removeEventListener("wheel", () => auto?.kill());
    };
  }, [autoScroll]);

  const toggleAutoScroll = () => {
    setAutoScroll(!autoScroll);
  };

  return (
    <button
      onClick={toggleAutoScroll}
      aria-label={autoScroll ? 'Disable auto scroll' : 'Enable auto scroll'}
      className="p-2 rounded-full bg-gray-800 text-neon-green shadow-lg transition-colors duration-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
    >
      {autoScroll ? 'Stop' : 'Auto Scroll'}
    </button>
  );
};

export default ThemeToggle;