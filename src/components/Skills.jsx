import React, { useState, useMemo, memo } from 'react';
import Reveal from './Reveal';
import { useInView } from './useInView';
import './Skills.css';

const CATS = ['All Skills','Languages','Data Science','Visualization','Tools'];
const SKILLS = [
  // Languages
  { id:1, name:'Python',      icon:'🐍', level:'Advanced', cat:'Languages'    },
  { id:2, name:'Java',        icon:'☕', level:'Medium', cat:'Languages'    },
  { id:3, name:'C++',         icon:'⚙️', level:'Medium', cat:'Languages'    },
  // Data Science
  { id:4, name:'NumPy',       icon:'🔢', level:'Advanced', cat:'Data Science' },
  { id:5, name:'Pandas',      icon:'🐼', level:'Advanced', cat:'Data Science' },
  { id:6, name:'Scikit-learn',icon:'🤖', level:'Medium', cat:'Data Science' },
  { id:7, name:'Machine Learning',icon:'🧠',level:'Advanced',cat:'Data Science'},
  { id:8, name:'Seaborn',     icon:'📊', level:'Basic', cat:'Data Science' },
  { id:9, name:'PostgreSQL',  icon:'🐘', level:'Advanced', cat:'Data Science' },
  // Visualization
  { id:10, name:'Matplotlib',  icon:'📈', level:'Advanced', cat:'Visualization'},
  { id:11, name:'Power BI',    icon:'💹', level:'Advanced', cat:'Visualization'},
  { id:12, name:'MS Excel',    icon:'📋', level:'Advanced', cat:'Visualization'},
  // Tools
  { id:13, name:'Git',         icon:'🔧', level:'Advanced', cat:'Tools'        },
  { id:14, name:'GitHub',      icon:'🐙', level:'Advanced', cat:'Tools'        },
  { id:15, name:'VS Code',     icon:'💻', level:'Advanced', cat:'Tools'        },
  { id:16, name:'Oracle OCI',  icon:'☁️', level:'Medium', cat:'Tools'        },
];
const SOFT = ['Problem-Solving','Communication','Team Collaboration','Time Management','Adaptable'];

const SkillCard = memo(function SkillCard({ skill, delay }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`card skills__card ${inView ? 'skills__card--visible' : ''}`} style={{ transitionDelay:`${delay}ms` }}>
      <div className="skills__card-row">
        <span className="skills__icon">{skill.icon}</span>
        <div className="skills__info"><div className="skills__name">{skill.name}</div><div className="skills__cat-label">{skill.cat}</div></div>
        <span className="skills__level">{skill.level}</span>
      </div>
    </div>
  );
});

export default function Skills() {
  const [active, setActive] = useState('All Skills');
  const filtered = useMemo(() => active === 'All Skills' ? SKILLS : SKILLS.filter(s => s.cat === active), [active]);
  
  return (
    <section id="skills" className="section skills">
      <div className="skills__bg"/>
      <div className="container">
        <Reveal>
          <p className="s-eyebrow">What I work with</p>
          <h2 className="s-title">Technical <span className="gt">Skills</span></h2>
          <p className="s-sub">My data science toolkit — from raw data wrangling to ML model deployment on Oracle OCI.</p>
          <div className="rule"/>
        </Reveal>
        <Reveal delay={100}>
          <div className="skills__tabs">
            {CATS.map(c => (
              <button key={c} className={`skills__tab ${active===c?'skills__tab--on':''}`} onClick={()=>setActive(c)}>{c}</button>
            ))}
          </div>
        </Reveal>
        <div className="skills__grid">
          {filtered.map((s,i) => <SkillCard key={s.id} skill={s} delay={(i%6)*60}/>)}
        </div>
        <Reveal delay={200}>
          <div className="skills__soft">
            <span className="skills__soft-label">Soft Skills</span>
            <div className="skills__soft-row">
              {SOFT.map((s, idx) => <span key={idx} className="badge skills__soft-badge">{s}</span>)}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
