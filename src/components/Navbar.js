import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = ({ theme, toggleTheme }) => {
  const [open, setOpen] = useState(false);

  const toggleNav = () => setOpen((s) => !s);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="logo" onClick={() => setOpen(false)}>
          Martin Portfolio
        </NavLink>
        <div className="nav-actions">
          <button
            className="mobile-nav-toggle"
            onClick={toggleNav}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>

          <ul className={`nav-links ${open ? 'mobile open' : ''}`} onClick={() => setOpen(false)}>
            {navItems.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
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