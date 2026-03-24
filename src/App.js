import React, { useEffect, useState, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LoadingScreen from './components/LoadingScreen';
import Cursor        from './components/Cursor';
import Navbar        from './components/Navbar';
import Hero          from './components/Hero';
import About         from './components/About';
import Skills        from './components/Skills';
import Projects      from './components/Projects';
import Certs         from './components/Certs';
import Education     from './components/Education';
import Contact       from './components/Contact';
import Footer        from './components/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loaded,   setLoaded]   = useState(false);
  const [theme,    setTheme]    = useState('dark');
  const [progress, setProgress] = useState(0);

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Load saved theme preference
  useEffect(() => {
    const saved = localStorage.getItem('sarthak-theme');
    if (saved) setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('sarthak-theme', next);
  };

  // Lenis smooth scroll + GSAP
  useEffect(() => {
    if (!loaded) return;
    const lenis = new Lenis({
      duration: 0.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
    });
    let lastUpdate = 0;
    lenis.on('scroll', () => {
      const now = Date.now();
      if (now - lastUpdate > 33) { // Throttle to 30fps for smoother scroll
        ScrollTrigger.update();
        lastUpdate = now;
      }
      const el  = document.documentElement;
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight) * 100;
      setProgress(pct);
    });
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Section heading parallax
    gsap.utils.toArray('.s-title').forEach(el => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        y: 30, opacity: 0, duration: 0.4, ease: 'power4.out',
      });
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [loaded]);

  const handleLoaded = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <LoadingScreen onDone={handleLoaded} />}
      {loaded && (
        <>
          <div className="scroll-bar" style={{ width:`${progress}%` }}/>
          <Cursor />
          <Navbar theme={theme} onToggleTheme={toggleTheme} />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Certs />
            <Education />
            <Contact />
          </main>
          <Footer />
          <button
            className={`back-top ${progress > 15 ? 'back-top--visible' : ''}`}
            onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
            aria-label="Back to top"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </button>
        </>
      )}
    </>
  );
}
