import React from 'react';
function Home() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <p className="hero-tag">Hello, I'm</p>
        <h1 className="hero-title">Martin Dang</h1>
        <p className="hero-subtitle">
          Software Engineer · Machine Learning & Data Enthusiast
        </p>

        <p className="hero-description">
          I build data-driven applications, backend services, and AI-powered tools.
          I enjoy turning complex problems into clean, scalable systems.
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn primary">View Projects</a>
          <a
            href="https://drive.google.com/file/d/1kRKkoFhlW6BJZf6_g_SNKiJGusAt62K3/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="btn outline"
          >
            View My CV
          </a>
        </div>
      </div>
    </section>
  );
}

export default Home;
