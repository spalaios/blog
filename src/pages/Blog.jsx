import React from 'react';
import { Link } from 'react-router-dom';

// Mock blog data - in a real app this would come from an API or data source
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with React',
    date: 'July 15, 2023',
    excerpt: 'Learn how to build your first React application from scratch, set up your development environment, and understand the core concepts of React.',
    content: 'Full content would go here...'
  },
  {
    id: 2,
    title: 'CSS Tips and Tricks',
    date: 'June 30, 2023',
    excerpt: 'Discover some useful CSS techniques to enhance your web design including flexbox, grid layouts, and responsive design principles.',
    content: 'Full content would go here...'
  },
  {
    id: 3,
    title: 'JavaScript Best Practices',
    date: 'June 15, 2023',
    excerpt: 'Explore the best practices for writing clean, efficient, and maintainable JavaScript code that will impress your colleagues.',
    content: 'Full content would go here...'
  },
  {
    id: 4,
    title: 'Introduction to TypeScript',
    date: 'May 20, 2023',
    excerpt: 'Why TypeScript is becoming the preferred language for many developers and how it can improve your development workflow.',
    content: 'Full content would go here...'
  }
];

const Blog = () => {
  return (
    <div className="mono-container">
      <nav className="mono-nav">
        <Link to="/" className="mono-nav-link">Home</Link>
        <Link to="/blog" className="mono-nav-link active">Blog</Link>
      </nav>
      
      <div className="mono-blog-container">
        <div className="mono-blog-heading">
          <h1 className="mono-title">$ cat blog-posts.md</h1>
          <p className="mono-description">A collection of thoughts, tutorials, and insights on web development.</p>
        </div>
        
        {blogPosts.map(post => (
          <div key={post.id} className="mono-blog-post">
            <h2 className="mono-blog-post-title">{post.title}</h2>
            <p className="mono-blog-post-date">{post.date}</p>
            <p className="mono-blog-post-excerpt">{post.excerpt}</p>
            <Link to={`/blog/${post.id}`} className="mono-blog-post-link">
              Read Full Post <span className="mono-link-arrow">→</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog; 