import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Project';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Footer from './components/Footer';
import TechBeacon from './components/TechBeacon';
import ReleaseInfo from './components/ReleaseInfo';
import NotFound from './components/NotFound';
import KeyboardBackground from './components/KeyboardBackground';
import CodeTypingBackground from './components/CodeTypingBackground';
import CelestialBackground from './components/CelestialBackground';

function AppContent() {
  const location = useLocation();
  const prefersDark =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : true;
  const [theme, setTheme] = useState(prefersDark ? 'dark' : 'light');

  useEffect(() => {
    const body = document.body;
    if (theme === 'light') {
      body.classList.add('light-mode');
    } else {
      body.classList.remove('light-mode');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
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

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach((section) => {
      section.classList.remove('animate-in');
      observer.observe(section);
    });

    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      document.documentElement.style.setProperty('--scroll-progress', `${scrollPercent}%`);
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, [location.pathname]);

  return (
    <div className="App">
      <div className="grid-overlay" aria-hidden="true" />
      <CodeTypingBackground />
      <CelestialBackground />
      <KeyboardBackground />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className={location.pathname === '/' ? 'main-home' : 'main-page'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/volunteer" element={<Navigate to="/experience#volunteer" replace />} />
          <Route path="/education" element={<Navigate to="/about#education" replace />} />
          <Route
            path="/projects"
            element={
              <>
                <Projects />
                <ReleaseInfo />
              </>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {location.pathname !== '/about' && <TechBeacon />}
      <Footer />
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
