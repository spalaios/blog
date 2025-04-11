import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="mono-container">
      <nav className="mono-nav">
        <Link to="/" className="mono-nav-link active">Home</Link>
        <Link to="/blog" className="mono-nav-link">Blog</Link>
      </nav>
      
      <div className="mono-split-layout">
        <div className="mono-intro">
          <h1 className="mono-title">Hi, I'm <span className="mono-accent">Suraj</span>.</h1>
          <h2 className="mono-subtitle">$ sudo developer --web-enthusiast</h2>
          <p className="mono-description">
            {`> Software engineer specializing in modern web development.`}<br/>
            {`> Currently working on creating clean, functional interfaces.`}
          </p>
          <div className="mono-terminal">
            <div className="mono-terminal-header">
              <span className="mono-terminal-dot"></span>
              <span className="mono-terminal-dot"></span>
              <span className="mono-terminal-dot"></span>
              <span className="mono-terminal-title">terminal</span>
            </div>
            <div className="mono-terminal-body">
              <p className="mono-terminal-line">$ ./about-me.sh</p>
              <p className="mono-terminal-line">{'>'} Passionate about clean code</p>
              <p className="mono-terminal-line">{'>'} Building accessible interfaces</p>
              <p className="mono-terminal-line">{'>'} Learning new tech daily</p>
              <p className="mono-terminal-line">$ _</p>
            </div>
          </div>
        </div>
        
        <div className="mono-blog-links">
          <h2 className="mono-section-title"># Recent Posts</h2>
          <div className="mono-links-grid">
            <Link to="/blog/1" className="mono-link-item">
              <span className="mono-link-title">Getting Started with React</span>
              <span className="mono-link-arrow">→</span>
            </Link>
            <Link to="/blog/2" className="mono-link-item">
              <span className="mono-link-title">CSS Tips and Tricks</span>
              <span className="mono-link-arrow">→</span>
            </Link>
            <Link to="/blog/3" className="mono-link-item">
              <span className="mono-link-title">JavaScript Best Practices</span>
              <span className="mono-link-arrow">→</span>
            </Link>
            <Link to="/blog" className="mono-link-item mono-view-all">
              <span className="mono-link-title">cd ./all-posts</span>
              <span className="mono-link-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 