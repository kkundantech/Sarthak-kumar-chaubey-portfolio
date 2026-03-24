import React from 'react';
import Reveal from './Reveal';
import { useInView } from './useInView';
import './Education.css';

const EDUCATION = [
  { inst:'Lovely Professional University', loc:'Phagwara, Punjab', deg:'B.Tech — Computer Science & Engineering', grade:'CGPA: 6.5', period:'Aug 2023 – Present', icon:'🎓', current:true, color:'#14b8a6', courses:['Data Science','Machine Learning','Data Structures & Algorithms','Database Management Systems'] },
  { inst:'Scottish Central Public School',  loc:'Sasaram, Bihar',  deg:'Intermediate — Class XII', grade:'61.2%', period:'Apr 2020 – Mar 2022', icon:'📚', current:false, color:'#8b5cf6', courses:[] },
  { inst:'Harmony International School',   loc:'Chaurasia, Bihar', deg:'Matriculation — Class X',  grade:'81.4%', period:'Apr 2018 – Mar 2020', icon:'🏫', current:false, color:'#10b981', courses:[] },
];

function EduCard({ edu, i }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`edu__item ${inView?'edu__item--visible':''}`} style={{transitionDelay:`${i*120}ms`}}>
      <div className="edu__dot-wrap">
        <div className="edu__dot" style={{borderColor:edu.color,boxShadow:`0 0 0 4px ${edu.color}18`}}>
          <span>{edu.icon}</span>
        </div>
        {i < EDUCATION.length-1 && <div className="edu__line"/>}
      </div>
      <div className="card edu__card">
        <div className="edu__stripe" style={{background:edu.color}}/>
        <div className="edu__top">
          <div>
            <h3 className="edu__inst">{edu.inst}</h3>
            <p className="edu__loc">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {edu.loc}
            </p>
          </div>
          <div className="edu__right">
            <span style={{color:edu.color,fontSize:'12px',fontWeight:'600'}}>{edu.period}</span>
            {edu.current && <span className="edu__live"><span className="edu__live-dot"/>Enrolled</span>}
          </div>
        </div>
        <p className="edu__deg">{edu.deg}</p>
        <span className="badge edu__grade" style={{background:`${edu.color}14`,borderColor:`${edu.color}30`,color:edu.color}}>{edu.grade}</span>
        {edu.courses.length > 0 && (
          <div className="edu__courses">
            <span className="edu__courses-label">Key Courses</span>
            <div className="edu__courses-list">{edu.courses.map(c=><span key={c} className="edu__course">{c}</span>)}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <section id="education" className="section education">
      <div className="container">
        <Reveal>
          <p className="s-eyebrow">Academic background</p>
          <h2 className="s-title">Edu<span className="gt">cation</span></h2>
          <p className="s-sub">Building a strong CS foundation while specializing in Data Science & Machine Learning.</p>
          <div className="rule"/>
        </Reveal>
        <div className="edu__timeline">
          {EDUCATION.map((edu,i)=><EduCard key={i} edu={edu} i={i}/>)}
        </div>
      </div>
    </section>
  );
}
