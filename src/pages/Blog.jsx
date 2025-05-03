import React from 'react';
import { Link } from 'react-router-dom';

// Mock blog data - in a real app this would come from an API or data source
const blogPosts = [
  // {
  //   id: 1,
  //   title: 'Getting Started with React',
  //   date: 'July 15, 2023',
  //   excerpt: 'Learn how to build your first React application from scratch, set up your development environment, and understand the core concepts of React.',
  //   content: 'Full content would go here...'
  // },
  {
    id: 1,
    title: 'Understanding HyperLogLog',
    date: 'May 1, 2025',
    excerpt: 'How do you count billions of users or pageviews without storing every single one? Meet HyperLogLog—a clever algorithm that trades exactness for extreme efficiency. Here\'s how it works, and why it’s used by Redis, Google, and more..',
    content: 'Full content would go here...'
  }
];

const Blog = () => {
  return (
    <div className="mono-container">
      <div className="mono-blog-container">
        <div className="mono-blog-heading">
          <h1 className="mono-title">$ cat blog-posts.md</h1>
          <p className="mono-description">A collection of my learnings</p>
        </div>
        
        {blogPosts.map(post => (
          <div key={post.id} className="mono-blog-post">
            <h2 className="mono-blog-post-title">{post.title}</h2>
            <p className="mono-blog-post-date">{post.date}</p>
            <p className="mono-blog-post-excerpt">{post.excerpt}</p>
            <Link 
              to={`/blog/${post.id}`} 
              className="mono-blog-post-link"
              aria-label={`Read full post: ${post.title}`}
              tabIndex="0"
            >
              Read Full Post <span className="mono-link-arrow">→</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog; 