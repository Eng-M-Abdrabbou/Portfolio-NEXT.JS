'use client';

import { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');

  console.log('ThemeToggle component rendering'); // Debug log outside effect

  useEffect(() => {
    // Read theme from localStorage on mount
    const storedTheme = localStorage.getItem('theme');
    console.log('ThemeToggle mounted. Stored theme:', storedTheme); // Debug log inside effect
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
    } else {
      // Default to dark theme if no theme is found in localStorage
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    // Update localStorage and the data-theme attribute whenever the theme state changes
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]); // Rerun effect when theme state changes

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // SVG icons
  const SunIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
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
  );

  const MoonIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-moon"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  );

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 left-4 p-3 rounded-full shadow-lg z-[1000] transition-colors duration-300"
      style={{
        backgroundColor: theme === 'dark' ? 'var(--card-background)' : 'var(--accent-color)',
        color: theme === 'dark' ? 'var(--accent-color)' : 'var(--card-background)',
      }}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={theme === 'light'}
    >
      {theme === 'dark' ? MoonIcon : SunIcon}
    </button>
  );
};

export default ThemeToggle;