import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowRight,
  FaUser,
  FaBriefcase,
  FaFolderOpen,
  FaEnvelope,
} from 'react-icons/fa';
import avatarImg from '../image/my_avatar.jpg';

const highlights = [
  'Backend Development',
  'Machine Learning',
  'Cloud & Data',
];

const exploreLinks = [
  {
    to: '/about',
    label: 'About',
    hint: 'Background, skills & education',
    icon: FaUser,
  },
  {
    to: '/experience',
    label: 'Experience',
    hint: 'Work & volunteer roles',
    icon: FaBriefcase,
  },
  {
    to: '/projects',
    label: 'Projects',
    hint: 'Apps & experiments',
    icon: FaFolderOpen,
  },
  {
    to: '/contact',
    label: 'Contact',
    hint: 'Get in touch',
    icon: FaEnvelope,
  },
];

function Home() {
  return (
    <section id="home" className="hero intro-page armor-assemble">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-scan" aria-hidden="true" />
      <span className="hero-corner hero-corner-tl" aria-hidden="true" />
      <span className="hero-corner hero-corner-tr" aria-hidden="true" />
      <span className="hero-corner hero-corner-bl" aria-hidden="true" />
      <span className="hero-corner hero-corner-br" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-intro">
          <div className="hero-avatar">
            <img src={avatarImg} alt="Martin Dang" />
          </div>
          <p className="hero-tag">Hello, I&apos;m</p>
          <h1 className="hero-title">Martin Dang</h1>
          <p className="hero-subtitle">
            Software Engineer · Machine Learning &amp; Data Enthusiast
          </p>

          <ul className="hero-highlights" aria-label="Focus areas">
            {highlights.map((item) => (
              <li key={item} className="hero-highlight">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-divider" aria-hidden="true" />

        <div className="hero-body">
          <p className="hero-description">
            I build data-driven applications, backend services, and AI-powered
            tools — turning complex problems into clean, scalable systems.
          </p>

          <div className="hero-actions">
            <Link to="/projects" className="btn primary">
              View Projects
              <FaArrowRight className="btn-icon" aria-hidden="true" />
            </Link>
            <a
              href="https://drive.google.com/file/d/1kRKkoFhlW6BJZf6_g_SNKiJGusAt62K3/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="btn outline"
            >
              View My CV
            </a>
          </div>

          <div className="hero-explore">
            <p className="hero-explore-label">Explore</p>
            <div className="hero-explore-grid">
              {exploreLinks.map(({ to, label, hint, icon: Icon }) => (
                <Link key={to} to={to} className="hero-explore-card">
                  <span className="hero-explore-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="hero-explore-text">
                    <span className="hero-explore-title">{label}</span>
                    <span className="hero-explore-hint">{hint}</span>
                  </span>
                  <FaArrowRight
                    className="hero-explore-arrow"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
