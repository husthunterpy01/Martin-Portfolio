import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiArrowRight, PiArrowUpRight } from 'react-icons/pi';
import highlight from './highlight';
import avatarImg from '../image/my_avatar.jpg';

const results = [
  {
    value: '500+',
    label: 'concurrent users supported by ASP.NET Core APIs built with CQRS',
  },
  {
    value: '42% to 80%+',
    label: 'unit test coverage after introducing XUnit suites',
  },
  {
    value: '200',
    label: 'machines deployed to at once from a single WPF tool',
  },
  {
    value: '80%',
    label: 'less manual follow-up through Power Automate workflows',
  },
];

const featured = [
  {
    tag: 'Published research',
    title: 'Bee sound identification, Ecological Informatics',
    text: 'Deep learning on hive audio spectrograms with CNN models to classify colony health. Peer-reviewed and published by Elsevier in 2023.',
    stats: ['Elsevier, 2023', 'CNN on spectrograms'],
    href: 'https://doi.org/10.1016/j.ecoinf.2023.102274',
    cta: 'Read the paper',
    external: true,
  },
  {
    tag: 'In production',
    title: 'Autonomous Vehicle Job Profiles',
    text: 'A job board and skill-trend dashboard for the autonomous vehicle industry, fed by dbt pipelines and an LLM classifier.',
    stats: ['1000+ postings classified', '86% classifier accuracy', '38 ATS sources'],
    href: '/projects',
    cta: 'See the architecture',
  },
  {
    tag: 'Enterprise scale',
    title: 'Pension payroll platform at FPT Software',
    text: 'ASP.NET Core APIs with Clean Architecture and CQRS, plus a WPF tool that rolled software out to many machines in one go.',
    stats: ['500+ concurrent users', 'Tests 42% to 80%+', '200 machines at once'],
    href: '/experience',
    cta: 'View experience',
  },
];

const exploreLinks = [
  { to: '/about', label: 'About', hint: 'Background, skills and education' },
  { to: '/experience', label: 'Experience', hint: 'Work and volunteer roles' },
  { to: '/projects', label: 'Projects', hint: 'Apps and experiments' },
  { to: '/contact', label: 'Contact', hint: 'Get in touch' },
];

const PHRASES = [
  'building data pipelines',
  'shipping backend services',
  'training small ML models',
  'automating the boring stuff',
];

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Types each phrase, holds, deletes, then moves to the next. Static when motion is reduced.
function Terminal() {
  const [text, setText] = useState(reducedMotion() ? PHRASES[0] : '');

  useEffect(() => {
    if (reducedMotion()) return undefined;
    let phrase = 0;
    let len = 0;
    let deleting = false;
    let timer;
    const tick = () => {
      const full = PHRASES[phrase];
      len += deleting ? -1 : 1;
      setText(full.slice(0, len));
      let delay = deleting ? 30 : 65 + Math.random() * 60;
      if (!deleting && len === full.length) {
        deleting = true;
        delay = 1600;
      } else if (deleting && len === 0) {
        deleting = false;
        phrase = (phrase + 1) % PHRASES.length;
        delay = 350;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <p
      className="hero-term rise"
      style={{ '--i': 3 }}
      aria-label="Currently building data pipelines, backend services and ML tools"
    >
      <span className="hero-term-prompt" aria-hidden="true">martin@perth:~$</span>
      <span aria-hidden="true">{text}</span>
      <span className="hero-term-cursor" aria-hidden="true" />
    </p>
  );
}

// 8x10 grid of blocks that blink out in random order, like a sprite loading in.
const COLS = 8;
const ROWS = 10;
function PixelReveal() {
  const [done, setDone] = useState(reducedMotion());
  const cells = useMemo(
    () => Array.from({ length: COLS * ROWS }, () => Math.round(Math.random() * 900)),
    []
  );
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2200);
    return () => clearTimeout(t);
  }, []);
  if (done) return null;
  return (
    <div
      className="pixel-reveal"
      aria-hidden="true"
      style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
    >
      {cells.map((delay, i) => (
        <span key={i} style={{ animationDelay: `${300 + delay}ms` }} />
      ))}
    </div>
  );
}

function Home() {
  return (
    <>
      <section id="home" className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow rise" style={{ '--i': 0 }}>
              Software Engineer
            </p>
            <h1 className="hero-title rise" style={{ '--i': 1 }}>
              Martin Dang
            </h1>
            <p className="hero-description rise" style={{ '--i': 2 }}>
              Backend services, data pipelines and AI tools. Automation
              developer in Perth, finishing a Master&apos;s at UWA.
            </p>
            <Terminal />
            <div className="hero-actions rise" style={{ '--i': 4 }}>
              <Link to="/projects" className="btn primary">
                View Projects
                <PiArrowRight aria-hidden="true" />
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
          </div>

          <div className="hero-portrait rise tilt" data-tilt="9" style={{ '--i': 2 }}>
            <img src={avatarImg} alt="Portrait of Martin Dang" />
            <PixelReveal />
            <span className="tilt-glare" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="section results reveal">
        <div className="container">
          <h2 className="section-title">Results from past roles</h2>
          <dl className="results-grid">
            {results.map((item) => (
              <div key={item.value} className="result">
                <dt className="result-value">{item.value}</dt>
                <dd className="result-label">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section featured reveal">
        <div className="container">
          <h2 className="section-title">Special work</h2>
          <div className="featured-grid">
            {featured.map((f) => (
              <article key={f.title} className="featured-card tilt" data-tilt="5">
                <p className="featured-tag">{f.tag}</p>
                <h3 className="featured-title">{f.title}</h3>
                <p className="featured-text">{f.text}</p>
                <ul className="featured-stats">
                  {f.stats.map((st) => (
                    <li key={st}>{highlight(st)}</li>
                  ))}
                </ul>
                {f.external ? (
                  <a href={f.href} target="_blank" rel="noreferrer" className="text-link">
                    {f.cta} <PiArrowUpRight aria-hidden="true" />
                  </a>
                ) : (
                  <Link to={f.href} className="text-link">
                    {f.cta} <PiArrowRight aria-hidden="true" />
                  </Link>
                )}
                <span className="tilt-glare" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section explore reveal">
        <div className="container">
          <h2 className="section-title">Explore</h2>
          <ul className="explore-list">
            {exploreLinks.map(({ to, label, hint }) => (
              <li key={to}>
                <Link to={to} className="explore-row">
                  <span className="explore-label">{label}</span>
                  <span className="explore-hint">{hint}</span>
                  <PiArrowRight className="explore-arrow" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Home;
