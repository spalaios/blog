import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="mono-container">
      <div className="mono-split-layout">
        <div className="mono-intro">
          <h1 className="mono-title">Hi, I'm Suraj.</h1>
          {/* <h2 className="mono-subtitle">Software engineer specializing in web development</h2> */}
          <p className="mono-description">
          Programmer, gamer, wanderer, reader. I've spent 8 years building backend applications, but I'm equally passionate about getting lost in a great book or exploring a new city. Currently working through my PS5 backlog while planning my next trip.
          </p>
        </div>
        
        <div className="mono-blog-links">
          <h2 className="mono-section-title">Recent Posts</h2>
          <div className="mono-links-grid">
            <Link to="/blog/1" className="mono-link-item" aria-label="Read blog post: Probabilistic Counting with HyperLogLog" tabIndex="0">
              <span className="mono-link-title">Probabilistic Counting with HyperLogLog : Under the Hood - 1</span>
              <span className="mono-link-arrow">→</span>
            </Link>
            <Link to="/blog/2" className="mono-link-item" aria-label="Read blog post: Probabilistic Counting with HyperLogLog Part 2" tabIndex="0">
              <span className="mono-link-title">Probabilistic Counting with HyperLogLog : Under the Hood - 2</span>
              <span className="mono-link-arrow">→</span>
            </Link>
            <Link to="/blog" className="mono-link-item mono-view-all" aria-label="View all blog posts" tabIndex="0">
              <span className="mono-link-title">View all posts</span>
              <span className="mono-link-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
      
      <footer className="home-footer">
        <div className="home-footer-content">
          <h3 className="home-footer-title">Let's connect</h3>
          <div className="home-footer-links">
            <a 
              href="mailto:surajpalai@example.com" 
              className="home-footer-link"
              aria-label="Send email to Suraj Palai"
            >
              <span className="home-footer-icon">✉</span>
              palaisuraj@gmail.com
            </a>
            <a 
              href="https://www.linkedin.com/in/surajpalai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="home-footer-link"
              aria-label="Visit Suraj Palai's LinkedIn profile"
            >
              <span className="home-footer-icon">in</span>
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 