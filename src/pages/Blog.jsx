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
    title: 'Building Neural Networks',
    date: 'May 20, 2023',
    excerpt: 'Dive into the world of neural networks and learn how to build systems that can learn and adapt to complex data patterns.',
    content: 'Full content would go here...'
  }
];

const Blog = () => {
  return (
    <div className="mono-container">
      <nav className="mono-nav">
        <Link to="/" className="mono-nav-link">Home</Link>
        <Link to="/blog" className="mono-nav-link active">Blog</Link>
        <Link to="/" className="mono-nav-link">About</Link>
        <Link to="/" className="mono-nav-link">Now</Link>
      </nav>
      
      <div className="mono-blog-container">
        <div className="mono-blog-heading">
          <h1 className="mono-title">Blog</h1>
          <p className="mono-description">All posts in chronological order.</p>
        </div>
        
        <h2 className="mono-section-title">2024</h2>
        {blogPosts.slice(0, 2).map((post, index) => (
          <div key={post.id} className="mono-blog-post">
            <h3 className="mono-blog-post-title">
              <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {index + 1}. {post.title}
              </Link>
            </h3>
          </div>
        ))}
        
        <h2 className="mono-section-title" style={{ marginTop: '2rem' }}>2023</h2>
        {blogPosts.slice(2, 4).map((post, index) => (
          <div key={post.id} className="mono-blog-post">
            <h3 className="mono-blog-post-title">
              <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {index + 1}. {post.title}
              </Link>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog; 