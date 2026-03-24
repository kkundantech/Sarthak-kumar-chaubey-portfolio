import React, { useState, useEffect, memo } from 'react';
import ThemeToggle from './ThemeToggle';
import ResumeModal from './ResumeModal';
import './Navbar.css';

const LINKS = [
  { label: 'About',    href: '#about'    },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Projects', href: '#projects' },
  { label: 'Education',href: '#education'},
  { label: 'Certs',    href: '#certs'    },
  { label: 'Contact',  href: '#contact'  },
];

const Navbar = memo(function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="container nav__inner">
          <a href="#hero" className="nav__logo" onClick={() => setOpen(false)}>
            <div className="nav__logo-mark">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <span className="nav__logo-text">Sarthak.dev</span>
          </a>

          <nav className="nav__links">
            {LINKS.map(({ label, href }) => (
              <a key={href} href={href} className="nav__link" onClick={() => setOpen(false)}>
                {label}<span className="nav__link-bg" />
              </a>
            ))}
          </nav>

          <div className="nav__right">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <div className="nav__resume-group">
              <button onClick={() => setResumeModalOpen(true)} className="btn btn-secondary nav__resume-view">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                View
              </button>
              <a href="/Sarthak_CV.pdf" download="Sarthak_Kumar_Chaubey_CV.pdf" className="btn btn-primary nav__resume-download">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download
              </a>
            </div>
            <button className={`nav__burger ${open ? 'nav__burger--open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className={`nav__drawer ${open ? 'nav__drawer--open' : ''}`}>
        <div className="nav__drawer-inner">
          {LINKS.map(({ label, href }, i) => (
            <a key={href} href={href} className="nav__drawer-link"
              style={{ transitionDelay: open ? `${i * 55}ms` : '0ms' }}
              onClick={() => setOpen(false)}>
              <span className="nav__drawer-num">0{i+1}</span>{label}
            </a>
          ))}
          <div className="nav__drawer-resume-group">
            <button onClick={() => { setResumeModalOpen(true); setOpen(false); }} className="btn btn-secondary nav__drawer-resume-view">View Resume</button>
            <a href="/Sarthak_CV.pdf" download="Sarthak_Kumar_Chaubey_CV.pdf" className="btn btn-primary nav__drawer-resume-download">Download Resume</a>
          </div>
        </div>
      </div>

      <ResumeModal isOpen={resumeModalOpen} onClose={() => setResumeModalOpen(false)} />
    </>
  );
});

export default Navbar;
