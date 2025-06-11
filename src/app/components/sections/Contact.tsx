// src/app/components/sections/Contact.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const Contact = () => {
  // Basic form state - replace with a proper form handler (like react-hook-form)
  // and submission logic (like EmailJS, Formspree, or a backend API) for a real app.
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        // Handle error - maybe show an error message to the user
        console.error('Failed to send message');
        alert('There was an error sending your message. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again later.');
    } finally {
      setIsLoading(false);
      setFormData({ name: '', email: '', message: '' }); // Clear form
      // Optionally reset the success message after a delay
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <section id="contact" className="section-container flex-4 flex-col-2 gap-16 text-center py-16 bg-dark-navy w-[90%]">
      <h2 className="bg-clip-text bg-gradient-to-b from-white/80 to-white/20 bg-opacity-50 text-4xl text-center text-transparent md:text-7xl">
        Contact
      </h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col lg:flex-row gap-16 mx-auto w-full mb-8"
      >
        {/* Contact Form Section */}
        <div className="bg-opacity-50 rounded-xl bg-navy p-4 h-[600px] w-[90%] rounded-lg shadow-xl text-left border border-lightest-navy ">
          <h2 className="text-3xl md:text-4xl font-semibold text-lightest-slate mb-8 text-center p-4">Get In Touch</h2>
          {isSubmitted ? (
            <p className="text-neon-green text-lg mb-8 text-center rounded-xl p-4">Thank you for your message! I&apos;ll get back to you soon.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-light-slate">Full name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="rounded-xl p-4 bg-lightest-navy border border-light-slate text-lightest-slate text-sm rounded-lg focus:ring-neon-green focus:border-neon-green block w-full p-3.5 placeholder-slate transition duration-300"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-light-slate">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="rounded-xl p-4 bg-lightest-navy border border-light-slate text-lightest-slate text-sm rounded-lg focus:ring-neon-green focus:border-neon-green block w-full p-3.5 placeholder-slate transition duration-300"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-light-slate">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="rounded-xl p-4 bg-lightest-navy border border-light-slate text-lightest-slate text-sm rounded-lg focus:ring-neon-green focus:border-neon-green block w-full p-3.5 placeholder-slate transition duration-300"
                  placeholder="I would love to hear from you!"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={` px-8 mb-8 rounded-xl text-neon-green border border-neon-green hover:bg-neon-green hover:text-navy focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-3 text-center transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Contact Information Section */}
        <div className="bg-opacity-50 rounded-xl p-4 bg-navy p-8 rounded-lg shadow-xl w-full text-left flex flex-col justify-center border border-lightest-navy">
          <h2 className="text-3xl md:text-4xl font-semibold text-lightest-slate mb-8 text-center p-4">Contact Information</h2>
          <div className="space-y-6 text-light-slate">
            <div id='hover' className="cursor-can-hover rounded-xl p-4 bg-lightest-navy border border-light-slate text-lightest-slate text-sm rounded-lg focus:ring-neon-green focus:border-neon-green flex items-center p-4 border border-light-slate rounded-lg shadow-md">
              {/* Icon Placeholder - Replace with actual icons */}
              <span className="mr-4 text-neon-green text-xl" id='hover'><img src="/img/location.svg" alt="Location" width={24} height={24} /></span>
              <p>Abu Dhabi, UAE</p>
            </div>
            <div id='hover' className="cursor-can-hover rounded-xl p-4 bg-lightest-navy border border-light-slate text-lightest-slate text-sm rounded-lg focus:ring-neon-green focus:border-neon-green flex items-center p-4 border border-light-slate rounded-lg shadow-md">
              {/* Icon Placeholder - Replace with actual icons */}
              <span className="mr-4 text-neon-green text-xl" id='hover'><img src="/img/phone.svg" alt="Phone" width={24} height={24} /></span>
              <p>+971 56 696 7995</p>
            </div>
            <div id='hover' className="cursor-can-hover rounded-xl p-4 bg-lightest-navy border border-light-slate text-lightest-slate text-sm rounded-lg focus:ring-neon-green focus:border-neon-green flex items-center p-4 border border-light-slate rounded-lg shadow-md">
              {/* Icon Placeholder - Replace with actual icons */}
              <span className="mr-4 text-neon-green text-xl" id='hover'><img src="/img/mail.svg" alt="Email" width={24} height={24} /></span>
              <p>Mahmoud.F.Abdrabbou@gmail.com</p>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex space-x-6 mt-4 pointer-events-auto justify-center"
          >
            <a
              href="https://github.com/Eng-M-Abdrabbou"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="icon-link"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/mahmoud-abdrabbou-18b170350/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="icon-link"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://leetcode.com/u/MANSAMUSAA/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LeetCode"
              className="icon-link"
            >
              <SiLeetcode />
            </a>
            <a
              href="/Mahmoud_Abdrabbou_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume"
              className="icon-link"
            >
              <FaFileAlt />
            </a>
            {/* --- End Added Resume Link --- */}
          </motion.div>
        </div>
      </motion.div>

      {/* Footer - Kept as is, outside the flex container
         <footer className="mt-24 text-center text-sm text-dark-slate font-mono">
             <p>Designed & Built with ❤️ by Mahmoud Abdrabbou</p>
             <p> {new Date().getFullYear()}</p>
         </footer> */}
    </section>
  );
};

export default Contact;