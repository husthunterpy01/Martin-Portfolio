import React from 'react';
import { PiLinkedinLogo, PiGithubLogo, PiEnvelopeSimple } from 'react-icons/pi';

const links = [
  {
    href: 'https://linkedin.com/in/martin-dang-a19420251',
    label: 'LinkedIn',
    icon: PiLinkedinLogo,
  },
  {
    href: 'https://github.com/husthunterpy01',
    label: 'GitHub',
    icon: PiGithubLogo,
  },
  {
    href: 'mailto:martindang2801@gmail.com',
    label: 'Email',
    icon: PiEnvelopeSimple,
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} Martin Dang. All rights reserved.
        </p>
        <ul className="footer-links">
          {links.map(({ href, label, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="footer-link"
              >
                <Icon aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
