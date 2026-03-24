import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

export default function LoadingScreen({ onDone }) {
  const [phase, setPhase] = useState('enter');
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 900);
    const t2 = setTimeout(() => setPhase('exit'), 2200);
    const t3 = setTimeout(() => onDone(), 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div className={`loader ${phase === 'exit' ? 'loader--exit' : ''}`}>
      <div className="loader__grid" />
      {/* Data science floating dots */}
      <div className="loader__dots">
        {[...Array(3)].map((_, i) => <div key={i} className="loader__dot" style={{ animationDelay: `${i * 0.15}s` }} />)}
      </div>
      <div className={`loader__mark ${phase !== 'enter' ? 'loader__mark--visible' : ''}`}>
        <svg viewBox="0 0 100 100" className="loader__ring-svg">
          <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(20,184,166,0.15)" strokeWidth="1"/>
          <circle cx="50" cy="50" r="44" fill="none" stroke="url(#lg2)" strokeWidth="1.5"
            strokeDasharray="276" strokeDashoffset="276" className="loader__ring-dash"/>
          <defs>
            <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6"/>
              <stop offset="100%" stopColor="#10b981"/>
            </linearGradient>
          </defs>
        </svg>
        <div className="loader__initials">SKC</div>
      </div>
      <div className={`loader__name ${phase === 'hold' || phase === 'exit' ? 'loader__name--visible' : ''}`}>
        <span>Sarthak</span><span className="loader__name-acc">Kumar Chaubey</span>
      </div>
      <div className="loader__role-text">Data Science & Machine Learning</div>
      <div className="loader__bar-wrap">
        <div className={`loader__bar ${phase !== 'enter' ? 'loader__bar--fill' : ''}`} />
      </div>
      <div className={`loader__curtain loader__curtain--l ${phase === 'exit' ? 'loader__curtain--out' : ''}`} />
      <div className={`loader__curtain loader__curtain--r ${phase === 'exit' ? 'loader__curtain--out' : ''}`} />
    </div>
  );
}
