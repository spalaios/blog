import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="nav">
          <div className="logo">
            <Link to="/" className="logo-link" aria-label="Go to home page" tabIndex="0">
              <span className="logo-text">Suraj Palai<span className="accent-dot">.</span></span>
            </Link>
          </div>
          <div className="nav-links">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''} aria-label="Home page" tabIndex="0">Home</Link>
            <Link to="/blog" className={location.pathname === '/blog' ? 'active' : ''} aria-label="Blog page" tabIndex="0">Blog</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 