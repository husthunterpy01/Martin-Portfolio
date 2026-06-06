import React, { useState } from 'react';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ theme, toggleTheme }) => {
  const [open, setOpen] = useState(false);

  const toggleNav = () => setOpen((s) => !s);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="logo">Martin Portfolio</div>
        <div className="nav-actions">
          <button
            className="mobile-nav-toggle"
            onClick={toggleNav}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>

          <ul className={`nav-links ${open ? 'mobile open' : ''}`} onClick={() => setOpen(false)}>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#volunteer">Volunteer</a></li>
          </ul>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;