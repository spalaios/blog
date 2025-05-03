import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="mono-container">
      <div className="mono-split-layout">
        <div className="mono-intro">
          <h1 className="mono-title">Hi, I'm Suraj.</h1>
          <h2 className="mono-subtitle">a software engineer by profession and a curious technologist by nature.</h2>
          <p className="mono-description">
          I enjoy diving deep into how things work under the hood whether it’s software systems or everyday technology.
          When I’m not building or debugging something, you’ll probably find me reading a book or playing games.
          </p>
        </div>
        
        <div className="mono-blog-links">
          <h2 className="mono-section-title">Recent Posts</h2>
          <div className="mono-links-grid">
            <Link to="/blog/1" className="mono-link-item" aria-label="Read blog post: Understanding HyperLogLog" tabIndex="0">
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