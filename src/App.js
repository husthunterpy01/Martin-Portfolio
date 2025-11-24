import React, { useEffect, useState } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Project';
import Contact from './components/Contact';
import Education from './components/Education';
import Experience from './components/Experience';
import Footer from './components/Footer';
import KeyboardBackground from './components/KeyboardBackground';
import CodeTypingBackground from './components/CodeTypingBackground';
import CelestialBackground from './components/CelestialBackground';

function App() {
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
    // Intersection Observer for scroll-triggered animations
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

    // Observe all sections except hero (which animates on load)
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Scroll progress indicator
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
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
  }, []);

  return (
    <div className="App">
      <CodeTypingBackground />
      <CelestialBackground />
      <KeyboardBackground />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Home />
        <About />
        <Experience />
        <Education/>
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
