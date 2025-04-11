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

const Blog: React.FC = () => {
  return (
    <div className="container">
      <div className="blog-list">
        <h1 style={{ marginBottom: '40px' }}>My Blog</h1>
        
        {blogPosts.map(post => (
          <div key={post.id} className="blog-card">
            <h2 className="blog-title">{post.title}</h2>
            <p className="blog-date">{post.date}</p>
            <p className="blog-excerpt">{post.excerpt}</p>
            <Link to={`/blog/${post.id}`} className="read-more">Read More →</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog; 