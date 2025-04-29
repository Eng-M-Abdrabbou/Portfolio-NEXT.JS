import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar'; // Import Navbar

import { blogPosts } from './posts';

const BlogIndexPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar /> {/* Add Navbar */}
      <div className="container mx-auto px-4 py-24"> {/* Adjusted padding for fixed navbar */}
        <h1 className="text-5xl font-extrabold mb-12 text-center text-gray-900 dark:text-white">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"> {/* Increased gap */}
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} passHref>
              <div className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer border border-gray-200 dark:border-gray-700"> {/* Refined card styling */}
                {/* Optional: Add an image here if posts have covers */}
                <div className="p-7"> {/* Increased padding */}
                  <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white leading-tight">{post.title}</h2> {/* Adjusted title styling */}
                  <p className="text-gray-700 dark:text-gray-300 text-base">{post.description}</p> {/* Adjusted description styling */}
                  {/* Optional: Add date/author here */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogIndexPage;