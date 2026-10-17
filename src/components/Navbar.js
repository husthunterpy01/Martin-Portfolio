import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { PiSun, PiMoon, PiList, PiX, PiQuestion } from 'react-icons/pi';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/references', label: 'References' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = ({ theme, toggleTheme, onHelp }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <nav className="navbar-inner" aria-label="Primary">
        <NavLink to="/" className="logo" onClick={() => setOpen(false)}>
          Martin Portfolio
        </NavLink>

        <ul
          className={`nav-links ${open ? 'open' : ''}`}
          onClick={() => setOpen(false)}
        >
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

        <div className="nav-actions">
          <button
            type="button"
            className="icon-btn"
            onClick={onHelp}
            aria-label="Open site guide"
            title="Site guide (?)"
          >
            <PiQuestion />
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <PiMoon /> : <PiSun />}
          </button>
          <button
            type="button"
            className="icon-btn mobile-nav-toggle"
            onClick={() => setOpen((s) => !s)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <PiX /> : <PiList />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
