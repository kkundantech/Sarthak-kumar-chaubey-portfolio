import React, { useRef } from 'react';
import Reveal from './Reveal';
import './About.css';

const FACTS = [
  { icon:'📍', label:'Location',   value:'Phagwara, Punjab'       },
  { icon:'🎓', label:'Education',  value:'B.Tech CSE — LPU'       },
  { icon:'🧠', label:'Focus',      value:'Data Science & ML'      },
  { icon:'📊', label:'CGPA',       value:'6.5 / 10'               },
];
const HOBBIES = ['📊 Data Visualization','🤖 AI & Machine Learning','📈 Statistical Analysis','💻 Open Source Projects'];

function SpotlightCard({ children, className='' }) {
  const ref = useRef(null);
  const throttleRef = useRef(0);
  const handleMove = (e) => {
    const now = Date.now();
    if (now - throttleRef.current < 32) return; // Throttle to ~30fps for better perf
    throttleRef.current = now;
    
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', ((e.clientX-rect.left)/rect.width*100).toFixed(0)+'%');
    ref.current.style.setProperty('--my', ((e.clientY-rect.top)/rect.height*100).toFixed(0)+'%');
  };
  const handleLeave = () => {
    ref.current.style.setProperty('--mx', '50%');
    ref.current.style.setProperty('--my', '50%');
  };
  return <div ref={ref} className={`card ${className}`} onMouseMove={handleMove} onMouseLeave={handleLeave}>{children}</div>;
}

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <Reveal>
          <p className="s-eyebrow">Who I am</p>
          <h2 className="s-title">About <span className="gt">Me</span></h2>
          <div className="rule"/>
        </Reveal>
        <div className="about__grid">
          <div className="about__left">
            <Reveal delay={100}>
              <SpotlightCard className="about__facts-card">
                <h3 className="about__card-h">Quick Facts</h3>
                {FACTS.map(f => (
                  <div key={f.label} className="about__fact">
                    <span className="about__fact-icon">{f.icon}</span>
                    <div>
                      <div className="about__fact-label">{f.label}</div>
                      <div className="about__fact-val">{f.value}</div>
                    </div>
                  </div>
                ))}
              </SpotlightCard>
            </Reveal>
            <Reveal delay={200}>
              <SpotlightCard className="about__hobbies-card">
                <h3 className="about__card-h">Interests</h3>
                <div className="about__hobbies">
                  {HOBBIES.map(h => <div key={h} className="about__hobby">{h}</div>)}
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
          <div className="about__right">
            <Reveal delay={150} direction="right">
              <SpotlightCard className="about__story-card">
                <div className="about__story-header">
                  <div className="about__dot"/>
                  <h3 className="about__story-h">My Journey</h3>
                </div>
                <p className="about__text">
                  Hello! I'm <strong className="about__hl">Sarthak Kumar Chaubey</strong>, a passionate Data Science student pursuing B.Tech in Computer Science at Lovely Professional University, Punjab. I'm deeply interested in transforming complex datasets into meaningful insights that drive real-world decisions.
                </p>
                <p className="about__text">
                  My journey in data science started with Python and has expanded into machine learning model building, statistical analysis, and data visualization. I've worked on projects ranging from predicting EV driving ranges using Random Forest models to building AI-powered art critique bots.
                </p>
                <div className="about__story-header" style={{marginTop:'24px'}}>
                  <div className="about__dot about__dot--2"/>
                  <h3 className="about__story-h">My Approach</h3>
                </div>
                <p className="about__text">
                  I believe data is the new oil — but only when refined. I combine statistical rigour with clean code and compelling visualizations to make data speak clearly. I'm also Oracle OCI certified in AI, Data Science, and Generative AI, validating my cloud-based ML expertise.
                </p>
                <div className="about__chips">
                  <a href="https://github.com/sarthak3924" target="_blank" rel="noreferrer" className="about__chip">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                    GitHub
                  </a>
                  <a href="https://linkedin.com/in/sarthakkumarchaubey" target="_blank" rel="noreferrer" className="about__chip">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                    LinkedIn
                  </a>
                  <a href="mailto:sarthak.chaubey06@gmail.com" className="about__chip">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    Email
                  </a>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
