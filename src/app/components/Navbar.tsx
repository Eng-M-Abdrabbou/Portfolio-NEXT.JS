// src/app/components/Navbar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const navItems = [
  { id: 'home', name: 'Home' },
  { id: 'experience', name: 'Experience' },
  { id: 'skills', name: 'Skills' },
  { id: 'projects', name: 'Projects' },
  { id: 'contact', name: 'Contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 50, delay: 0.2 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-3xl z-50 bg-light-navy/80 backdrop-blur-xs rounded-full shadow-lg px-6 py-3"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Name on the left */}
        <ScrollLink
          to="home"
          smooth={true}
          duration={500}
          spy={true}
          offset={-10}
          className="text-xl font-bold text-neon-green cursor-pointer"
        >
          MA.
        </ScrollLink>

        {/* Desktop Menu Links */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <ScrollLink
              key={item.id}
              to={item.id}
              smooth={true}
              duration={500}
              spy={true}
              offset={-80} // Adjust offset as needed
              activeClass="text-neon-green"
              className="text-light-slate hover:text-neon-green cursor-pointer transition-colors duration-300 text-sm"
            >
              {item.name}
            </ScrollLink>
          ))}
          <Link href="/blog" className="text-light-slate hover:text-neon-green cursor-pointer transition-colors duration-300 text-sm">
            Blog
          </Link>
          <Link href="/achievements" className="text-light-slate hover:text-neon-green cursor-pointer transition-colors duration-300 text-sm">
            Achievements
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-lightest-slate focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden absolute top-full left-0 right-0 bg-light-navy mt-2 rounded-lg shadow-xl py-4"
        >
          <div className="flex flex-col items-center space-y-4">
            {navItems.map((item) => (
              <ScrollLink
                key={item.id}
                to={item.id}
                smooth={true}
                duration={500}
                spy={true}
                offset={-80}
                activeClass="text-neon-green font-semibold"
                className="text-light-slate hover:text-neon-green cursor-pointer transition-colors duration-300 block w-full text-center"
                onClick={toggleMenu} // Close menu on click
              >
                {item.name}
              </ScrollLink>
            ))}
            <Link href="/blog" className="text-light-slate hover:text-neon-green cursor-pointer transition-colors duration-300 block w-full text-center" onClick={toggleMenu}>
              Blog
            </Link>
            <Link href="/achievements" className="text-light-slate hover:text-neon-green cursor-pointer transition-colors duration-300 block w-full text-center" onClick={toggleMenu}>
              Achievements
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;