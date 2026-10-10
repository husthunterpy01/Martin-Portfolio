import React, { useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Project';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import TerminalDock from './components/TerminalDock';
import KeyboardBackground from './components/KeyboardBackground';
import GameClear from './components/GameClear';
import SiteGuide from './components/SiteGuide';
import PixelCat, { triggerCat } from './components/PixelCat';

function AppContent() {
  const location = useLocation();
  const prefersDark =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : true;
  const [guideOpen, setGuideOpen] = useState(false);
  const [theme, setTheme] = useState(prefersDark ? 'dark' : 'light');

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    triggerCat();
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  // Reveal-on-scroll: shows each .reveal block once it enters the viewport.
  // The hidden state only applies after `reveal-ready` is set, so a failed
  // script never leaves content invisible.
  useEffect(() => {
    const root = document.documentElement;
    if (typeof IntersectionObserver === 'undefined') return undefined;

    root.classList.add('reveal-ready');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [location.pathname]);

  // "?" opens the site guide (ignored while typing in a field).
  useEffect(() => {
    const onKey = (e) => {
      const el = e.target;
      if (el.closest?.('input, textarea, select, [contenteditable]')) return;
      if (e.key === '?') setGuideOpen((o) => !o);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // 3D pointer tilt: any element with the `tilt` class leans toward the cursor.
  // Skipped for touch input and for people who prefer reduced motion.
  useEffect(() => {
    const ok =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    if (!ok) return undefined;

    let current = null;
    const reset = (el) => {
      el.classList.remove('tilt-active');
      el.style.transform = '';
    };
    const onMove = (e) => {
      const el = e.target.closest?.('.tilt');
      if (current && current !== el) reset(current);
      current = el || null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const max = Number(el.dataset.tilt) || 6;
      el.classList.add('tilt-active');
      el.style.setProperty('--mx', `${x * 100}%`);
      el.style.setProperty('--my', `${y * 100}%`);
      el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * max * 2}deg) rotateY(${(x - 0.5) * max * 2}deg) translateZ(0)`;
    };
    const onLeave = () => {
      if (current) reset(current);
      current = null;
    };
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerleave', onLeave);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="App">
      <KeyboardBackground />
      <Navbar theme={theme} toggleTheme={toggleTheme} onHelp={() => setGuideOpen(true)} />
      <main>
        <div key={location.pathname} className="page-3d">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/volunteer" element={<Navigate to="/experience#volunteer" replace />} />
          <Route path="/education" element={<Navigate to="/about#education" replace />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </main>
      <Footer />
      <PixelCat />
      <GameClear />
      <TerminalDock theme={theme} setTheme={setTheme} onGuide={() => setGuideOpen(true)} />
      {guideOpen && <SiteGuide onClose={() => setGuideOpen(false)} />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
