// src/app/components/sections/Contact.tsx
import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  // Basic form state - replace with a proper form handler (like react-hook-form)
  // and submission logic (like EmailJS, Formspree, or a backend API) for a real app.
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // ---- PLACEHOLDER: Replace with actual form submission logic ----
    console.log("Form Data:", formData);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network request
    // ---- End Placeholder ----
    setIsLoading(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' }); // Clear form
     // Optionally reset the success message after a delay
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="section-container text-center">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-lightest-slate mb-4">Get In Touch</h2>
        <p className="text-lg text-light-slate max-w-xl mx-auto mb-10">
          I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, feel free to reach out! My inbox is always open.
        </p>

        <div className="mb-10 text-light-slate">
          <p className="mb-2">Mahmoud.F.Abdrabbou@gmail.com</p>
          <p className="mb-2">+971 56 696 7995</p>
          <p>Abu Dhabi, UAE</p>
        </div>

        {isSubmitted ? (
            <p className="text-neon-green text-lg mb-8">Thank you for your message! I'll get back to you soon.</p>
        ) : (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto text-left">
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-light-slate">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-light-navy border border-lightest-navy text-lightest-slate text-sm rounded-lg focus:ring-neon-green focus:border-neon-green block w-full p-2.5 placeholder-slate transition duration-300"
              placeholder="John Doe"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-light-slate">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
               value={formData.email}
               onChange={handleChange}
              required
              className="bg-light-navy border border-lightest-navy text-lightest-slate text-sm rounded-lg focus:ring-neon-green focus:border-neon-green block w-full p-2.5 placeholder-slate transition duration-300"
              placeholder="name@example.com"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-light-slate">Your Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="bg-light-navy border border-lightest-navy text-lightest-slate text-sm rounded-lg focus:ring-neon-green focus:border-neon-green block w-full p-2.5 placeholder-slate transition duration-300"
              placeholder="Leave your message..."
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className={`text-navy bg-neon-green hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-3 text-center transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
        )}
      </motion.div>

       {/* Footer */}
       <footer className="mt-24 text-center text-sm text-dark-slate font-mono">
           <p>Designed & Built with ❤️ by Mahmoud Abdrabbou</p>
           <p>© {new Date().getFullYear()}</p>
       </footer>
    </section>
  );
};

export default Contact;