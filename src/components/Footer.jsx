import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <Link to="/" className="logo-link">
              <span className="logo-text footer-logo-text">Suraj<span className="accent-dot">.</span></span>
            </Link>
            <p className="footer-tagline">Building modern web experiences</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-column">
              <h3 className="footer-heading">Navigation</h3>
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/blog" className="footer-link">Blog</Link>
            </div>
            
            <div className="footer-links-column">
              <h3 className="footer-heading">Social</h3>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link">Twitter</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">&copy; {new Date().getFullYear()} Suraj Palai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 