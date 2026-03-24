import React, { useState, useEffect } from 'react';
import './ResumeModal.css';

export default function ResumeModal({ isOpen, onClose }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIframeLoaded(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="resume-modal__overlay" onClick={onClose}>
      <div className="resume-modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="resume-modal__close" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        
        <div className="resume-modal__header">
          <h2>Resume</h2>
          <a href="/Sarthak_CV.pdf" download="Sarthak_Kumar_Chaubey_CV.pdf" className="btn btn-secondary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download
          </a>
        </div>

        <div className="resume-modal__body">
          {!iframeLoaded && <div className="resume-modal__skeleton" />}
          <iframe 
            src="/Sarthak_CV.pdf" 
            title="Resume"
            className="resume-modal__iframe"
            onLoad={() => setIframeLoaded(true)}
            style={{ display: iframeLoaded ? 'block' : 'none' }}
          />
        </div>
      </div>
    </div>
  );
}
