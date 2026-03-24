import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import Reveal from './Reveal';
import './Certs.css';

const CERTS = [
  { name:'OCI 2025 Certified AI Foundations Associate', fullName:'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate', issuer:'Oracle University', date:'October 30, 2025', credId:'103034414OCI25AICFA', valid:'Valid until Oct 30, 2027', cat:'AI/ML', color:'#C74634', certImg:'/cert-oci-ai-1.jpg', verifyUrl:'#', isOracle:true },
  { name:'OCI 2025 Certified Data Science Professional', fullName:'Oracle Cloud Infrastructure 2025 Certified Data Science Professional', issuer:'Oracle University', date:'October 31, 2025', credId:'103034414OCI25DSOCP', valid:'Valid until Oct 31, 2027', cat:'Data Sci', color:'#C74634', certImg:'/cert-oci-ds-1.jpg', verifyUrl:'#', isOracle:true },
  { name:'OCI 2025 Certified Generative AI Professional', fullName:'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional', issuer:'Oracle University', date:'October 31, 2025', credId:'103034414OCI25GAIOCP', valid:'Valid until Oct 31, 2027', cat:'Gen AI', color:'#C74634', certImg:'/cert-oci-genai-1.jpg', verifyUrl:'#', isOracle:true },
  { name:'The Bits and Bytes of Computer Networking', fullName:'The Bits and Bytes of Computer Networking', issuer:'Google (via Coursera)', date:'September 13, 2024', credId:'CHSLLV6035T7', valid:'', cat:'Networking', color:'#4285F4', certImg:'/cert-google-net-1.jpg', verifyUrl:'https://coursera.org/verify/CHSLLV6035T7', isOracle:false },
  { name:'Introduction to Hardware and Operating Systems', fullName:'Introduction to Hardware and Operating Systems', issuer:'IBM (via Coursera)', date:'September 13, 2024', credId:'SOXRKZU6T2FC', valid:'', cat:'Hardware/OS', color:'#1F70C1', certImg:'/cert-ibm-hw-1.jpg', verifyUrl:'https://coursera.org/verify/SOXRKZU6T2FC', isOracle:false },
  { name:'HACKVERSE 2024 — Certificate of Participation', fullName:'HACKVERSE 2024 Certificate of Participation', issuer:'Linux Socials / OASIS — LPU', date:'March 28–29, 2024', credId:'HV24/134', valid:'24-hour Hackathon', cat:'Hackathon', color:'#14b8a6', certImg:'/cert-hackverse-1.jpg', verifyUrl:'#', isOracle:false },
];

function Lightbox({ cert, onClose }) {
  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lightbox__inner" onClick={e=>e.stopPropagation()}>
        <button className="lightbox__close" onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <img src={cert.certImg} alt={cert.fullName} className="lightbox__img" decoding="async"/>
        <div className="lightbox__footer">
          <div>
            <h3 className="lightbox__title">{cert.fullName}</h3>
            <p className="lightbox__meta">{cert.issuer} · {cert.date}</p>
            <p className="lightbox__id">Credential ID: {cert.credId}</p>
            {cert.valid && <p className="lightbox__valid">{cert.valid}</p>}
          </div>
          {cert.verifyUrl !== '#' && (
            <a href={cert.verifyUrl} target="_blank" rel="noreferrer" className="btn btn-primary lightbox__verify">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              Verify
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function HoloCard({ cert, delay }) {
  const [open, setOpen] = useState(false);
  const ref   = useRef(null);
  const sheen = useRef(null);
  const throttleRef = useRef(0);

  const onMove = (e) => {
    const now = Date.now();
    if (now - throttleRef.current < 16) return; // Throttle to ~60fps
    throttleRef.current = now;

    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX-rect.left)/rect.width - 0.5;
    const y = (e.clientY-rect.top)/rect.height  - 0.5;
    gsap.to(ref.current, { rotateY:x*12, rotateX:-y*12, z:15, duration:0.2, ease:'power1.out', transformPerspective:800 });
    if (sheen.current) {
      const px = (e.clientX-rect.left)/rect.width*100;
      const py = (e.clientY-rect.top)/rect.height*100;
      sheen.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.12) 0%, rgba(20,184,166,0.04) 30%, transparent 65%)`;
      sheen.current.style.opacity = '1';
    }
  };
  const onLeave = () => {
    gsap.to(ref.current, { rotateY:0, rotateX:0, z:0, duration:0.5, ease:'power2.out' });
    if (sheen.current) sheen.current.style.opacity = '0';
  };

  return (
    <>
      <Reveal delay={delay}>
        <div ref={ref} className="cert__holo" onMouseMove={onMove} onMouseLeave={onLeave} onClick={()=>setOpen(true)}>
          <div ref={sheen} className="cert__sheen"/>
          <div className="card cert__card">
            <div className="cert__img-wrap">
              <img src={cert.certImg} alt={cert.name} className="cert__img" loading="lazy" decoding="async" fetchpriority="low"/>
              <div className="cert__overlay">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M13 12H3"/></svg>
                View Certificate
              </div>
              <div className="cert__bar" style={{background:cert.color}}/>
            </div>
            <div className="cert__body">
              <div className="cert__top">
                <span className="cert__issuer">{cert.isOracle?'🔴 Oracle':cert.issuer.includes('Google')?'🔵 Google':cert.issuer.includes('IBM')?'💙 IBM':'🏆 HACKVERSE'}</span>
                <span className="badge cert__cat" style={{background:`${cert.color}14`,borderColor:`${cert.color}30`,color:cert.color}}>{cert.cat}</span>
              </div>
              <h3 className="cert__name">{cert.name}</h3>
              <p className="cert__desc">{cert.valid || cert.issuer}</p>
              <div className="cert__foot">
                <span className="cert__date">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  {cert.date}
                </span>
                <span className="cert__verified">✓ Verified</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
      {open && <Lightbox cert={cert} onClose={()=>setOpen(false)}/>}
    </>
  );
}

export default function Certs() {
  return (
    <section id="certs" className="section certs">
      <div className="container">
        <Reveal>
          <p className="s-eyebrow">Professional credentials</p>
          <h2 className="s-title"><span className="gt">Certifi</span>cations</h2>
          <p className="s-sub">Hover for holographic 3D effect · Click to view full certificate · 6 verified credentials.</p>
          <div className="rule"/>
        </Reveal>

        {/* Oracle banner */}
        <Reveal delay={100} direction="none">
          <div className="certs__oracle-bar">
            <div className="certs__oracle-left">
              <div className="certs__oracle-icon">🏆</div>
              <div>
                <div className="certs__oracle-title">Oracle Certified Professional — 3 AI/ML Certifications</div>
                <div className="certs__oracle-sub">OCI AI Foundations · Data Science Professional · Generative AI Professional · Valid until 2027 · Oracle University</div>
              </div>
            </div>
            <div className="certs__oracle-badges">
              {['AI Foundations','Data Science','Generative AI'].map((b,i)=>(
                <div key={b} className="certs__badge-item">
                  <div className="certs__badge-circle" style={{background:i===0?'linear-gradient(135deg,#C74634,#e05a45)':i===1?'linear-gradient(135deg,#C74634,#c94b2a)':'linear-gradient(135deg,#C74634,#d44434)'}}>
                    <span style={{fontSize:'10px',fontWeight:'800',color:'#fff',textAlign:'center',lineHeight:'1.2'}}>{b.split(' ')[0]}<br/>{b.split(' ')[1]||''}</span>
                  </div>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="certs__grid">
          {CERTS.map((cert,i)=><HoloCard key={cert.credId} cert={cert} delay={i*80}/>)}
        </div>
      </div>
    </section>
  );
}
