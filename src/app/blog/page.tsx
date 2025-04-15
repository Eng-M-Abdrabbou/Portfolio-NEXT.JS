// src/app/blog/page.tsx
import React from 'react';
import Link from 'next/link';

const BlogPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-navy text-lightest-slate p-8">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <p className="text-lg text-slate mb-8 text-center max-w-md">
        Coming Soon! This section will feature articles and insights on software development, technology trends, and personal projects.
      </p>
      {/* Add placeholder content or a list of future posts */}
      <div className="bg-light-navy p-6 rounded-lg shadow-lg mb-4 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-neon-green mb-2">Example Post Title</h2>
        <p className="text-light-slate">A brief description of what this future blog post might cover...</p>
      </div>
       <div className="bg-light-navy p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-neon-green mb-2">Another Future Topic</h2>
        <p className="text-light-slate">Exploring another interesting concept here...</p>
      </div>
      <Link href="/" className="mt-10 inline-block bg-neon-green text-navy font-medium py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors duration-300">
          Return Home
      </Link>
       <footer className="absolute bottom-8 text-center text-sm text-dark-slate font-mono">
           <p>© {new Date().getFullYear()} Mahmoud Abdrabbou</p>
       </footer>
    </div>
  );
};

export default BlogPage;