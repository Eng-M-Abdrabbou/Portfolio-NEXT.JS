import React from 'react';
import { blogPosts } from '../posts';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '../../components/Navbar'; // Import Navbar

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ params }) => {
  const { slug } = params;

  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar /> {/* Add Navbar */}
      <div className="container mx-auto px-4 py-24 max-w-3xl"> {/* Adjusted padding and max-width */}
        <article className="prose dark:prose-invert mx-auto"> {/* Center article */}
          <h1 className="text-5xl font-extrabold mb-6 text-center text-gray-900 dark:text-white">{post.title}</h1> {/* Centered and larger title */}
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-center text-lg"> {/* Centered and larger meta info */}
            By {post.author} on {post.date}
          </p>
          <div className="mt-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"> {/* Styled content box */}
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostPage;