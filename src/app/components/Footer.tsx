import React, { ReactElement } from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-navy text-light-slate py-2 w-[90%]">
      <div className="container mx-auto px-2 grid grid-cols-2 md:grid-cols-3 gap-2 text-center md:text-left">
        {/* Contact Section */}
        <div className="ml-8">
          <h3 className="text-xl font-semibold mb-4 text-lightest-slate">Contact</h3>
          <p>Email: mahmoud.f.abdrabbou@gmail.com</p>
          <p>Phone: +971 56 696 7995</p>
          <p>Address: Abu Dhabi, UAE</p>
        </div>

        {/* Socials Section */}
        <div className="ml-16">
          <h3 className="text-xl font-semibold mb-4 text-lightest-slate">Socials</h3>
          <ul>
            <li><a href="https://www.linkedin.com/in/mahmoud-abdrabbou-18b170350/" className="hover:text-neon-green transition duration-300">LinkedIn</a></li>
            <li><a href="https://github.com/Eng-M-Abdrabbou" className="hover:text-neon-green transition duration-300">GitHub</a></li>
            <li><a href="#" className="hover:text-neon-green transition duration-300">Twitter</a></li>
          </ul>
        </div>

        {/* Location Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-lightest-slate">Location</h3>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d30042.231164414392!2d54.3795948063214!3d24.457551288879788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sae!4v1746131621619!5m2!1sen!2sae" 
            width="500" 
            height="150" 
            style={{ border: '0' }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <div className="text-center mt-8 mt-24 text-center text-sm text-dark-slate font-mono">
        <p>Designed & Built with ❤️ by Mahmoud Abdrabbou</p>
        <p>© {new Date().getFullYear()}</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;