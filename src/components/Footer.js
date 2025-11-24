import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          © {new Date().getFullYear()} Martin Dang. All rights reserved.
        </p>
        <div className="footer-social-links">
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noreferrer"
            className="footer-social-link"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="footer-social-icon" />
            <span>LinkedIn</span>
          </a>
          <a 
            href="https://github.com/husthunterpy01" 
            target="_blank" 
            rel="noreferrer"
            className="footer-social-link"
            aria-label="GitHub"
          >
            <FaGithub className="footer-social-icon" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

