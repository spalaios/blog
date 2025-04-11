import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="mono-container">
      <nav className="mono-nav">
        <Link to="/" className="mono-nav-link active">Home</Link>
        <Link to="/blog" className="mono-nav-link">Blog</Link>
        <Link to="/" className="mono-nav-link">About</Link>
        <Link to="/" className="mono-nav-link">Now</Link>
      </nav>
      
      <div className="mono-split-layout">
        <div className="mono-intro">
          <h1 className="mono-title">blag</h1>
          <p className="mono-description">
            Personal blog by Suraj. I write about web development, React, and other topics that interest me.
          </p>
        </div>
        
        <div className="mono-blog-links">
          <h2 className="mono-section-title">2024</h2>
          <div className="mono-links-grid">
            <Link to="/blog/1" className="mono-link-item">
              <span className="mono-link-title">Getting Started with React</span>
            </Link>
            <Link to="/blog/2" className="mono-link-item">
              <span className="mono-link-title">CSS Tips and Tricks</span>
            </Link>
            <Link to="/blog/3" className="mono-link-item">
              <span className="mono-link-title">JavaScript Best Practices</span>
            </Link>
            <Link to="/blog/4" className="mono-link-item">
              <span className="mono-link-title">Building Neural Networks</span>
            </Link>
          </div>
          
          <h2 className="mono-section-title" style={{ marginTop: '2rem' }}>2023</h2>
          <div className="mono-links-grid">
            <Link to="/" className="mono-link-item">
              <span className="mono-link-title">Setting up a React Project</span>
            </Link>
            <Link to="/" className="mono-link-item">
              <span className="mono-link-title">Understanding React Hooks</span>
            </Link>
            <Link to="/" className="mono-link-item">
              <span className="mono-link-title">Creating Custom Hooks</span>
            </Link>
          </div>
          
          <h2 className="mono-section-title" style={{ marginTop: '2rem' }}>2022</h2>
          <div className="mono-links-grid">
            <Link to="/" className="mono-link-item">
              <span className="mono-link-title">Introduction to Web Development</span>
            </Link>
            <Link to="/" className="mono-link-item">
              <span className="mono-link-title">HTML Fundamentals</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 