import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="mono-container">
      <div className="mono-split-layout">
        <div className="mono-intro">
          <h1 className="mono-title">Hi, I'm Suraj.</h1>
          <h2 className="mono-subtitle">Software engineer specializing in web development</h2>
          <p className="mono-description">
            I build modern web applications with a focus on clean code and user experience. 
            Currently working on frontend projects and exploring new technologies.
          </p>
        </div>
        
        <div className="mono-blog-links">
          <h2 className="mono-section-title">Recent Posts</h2>
          <div className="mono-links-grid">
            <Link to="/blog/1" className="mono-link-item" aria-label="Read blog post: Getting Started with React" tabIndex="0">
              <span className="mono-link-title">Getting Started with React</span>
              <span className="mono-link-arrow">→</span>
            </Link>
            <Link to="/blog/2" className="mono-link-item" aria-label="Read blog post: CSS Tips and Tricks" tabIndex="0">
              <span className="mono-link-title">CSS Tips and Tricks</span>
              <span className="mono-link-arrow">→</span>
            </Link>
            <Link to="/blog/3" className="mono-link-item" aria-label="Read blog post: JavaScript Best Practices" tabIndex="0">
              <span className="mono-link-title">JavaScript Best Practices</span>
              <span className="mono-link-arrow">→</span>
            </Link>
            <Link to="/blog/4" className="mono-link-item" aria-label="Read blog post: Understanding HyperLogLog" tabIndex="0">
              <span className="mono-link-title">Probabilistic Counting with HyperLogLog: Under the Hood</span>
              <span className="mono-link-arrow">→</span>
            </Link>
            <Link to="/blog" className="mono-link-item mono-view-all" aria-label="View all blog posts" tabIndex="0">
              <span className="mono-link-title">View all posts</span>
              <span className="mono-link-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 