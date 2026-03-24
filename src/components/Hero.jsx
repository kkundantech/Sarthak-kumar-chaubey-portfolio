import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

const ROLES  = ['Data Scientist', 'ML Engineer', 'Python Developer', 'Data Analyst'];
const TAGS   = ['Python','Pandas','NumPy','Matplotlib','Scikit-learn','Power BI','PostgreSQL','Oracle OCI'];
const GLITCH = 'SARTHAK KUMAR CHAUBEY';

/* Particles */
function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d');
    let W, H, pts = [], raf;
    const r = (a,b) => Math.random()*(b-a)+a;
    const resize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    const init = () => { pts = Array.from({length:22}, () => ({x:r(0,W),y:r(0,H),vx:r(-0.12,0.12),vy:r(-0.12,0.12),rad:r(1,2),a:r(0.1,0.45)})); };
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
        ctx.beginPath();ctx.arc(p.x,p.y,p.rad,0,Math.PI*2);ctx.fillStyle=`rgba(20,184,166,${p.a})`;ctx.fill();
      });
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<110){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(20,184,166,${0.07*(1-d/110)})`;ctx.lineWidth=.5;ctx.stroke();}
      }
      raf=requestAnimationFrame(draw);
    };
    resize();init();draw();
    window.addEventListener('resize',()=>{resize();init();});
    return()=>{cancelAnimationFrame(raf);};
  },[]);
  return <canvas ref={ref} className="hero__canvas"/>;
}

/* Typewriter */
function Typewriter() {
  const [text,setText] = useState('');
  const ch=useRef(0),ph=useRef('type'),ri=useRef(0);
  useEffect(()=>{
    let t;
    const tick=()=>{
      const role=ROLES[ri.current];
      if(ph.current==='type'){ch.current++;setText(role.slice(0,ch.current));if(ch.current>=role.length){ph.current='pause';t=setTimeout(tick,1800);}else t=setTimeout(tick,75);}
      else if(ph.current==='pause'){ph.current='erase';t=setTimeout(tick,50);}
      else{ch.current--;setText(role.slice(0,ch.current));if(ch.current<=0){ri.current=(ri.current+1)%ROLES.length;ph.current='type';t=setTimeout(tick,400);}else t=setTimeout(tick,38);}
    };
    t=setTimeout(tick,1200);return()=>clearTimeout(t);
  },[]);
  return <span className="hero__tw">{text}<span className="hero__tw-cursor">|</span></span>;
}

/* Glitch Name */
function GlitchName() {
  const ref = useRef(null);
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&';
    let frame=0;const total=45;
    const id=setInterval(()=>{
      el.innerText=GLITCH.split('').map((c,i)=>{
        if(c===' ')return ' ';
        if(frame>(i/GLITCH.length)*total)return c;
        return chars[Math.floor(Math.random()*chars.length)];
      }).join('');
      frame++;if(frame>total){el.innerText=GLITCH;clearInterval(id);}
    },42);
    return()=>clearInterval(id);
  },[]);
  return <span ref={ref} className="hero__glitch">{GLITCH}</span>;
}

/* Data science floating stats */
function FloatingStat({ val, label, icon, delay }) {
  return (
    <div className="hero__stat" style={{ animationDelay: `${delay}s` }}>
      <span className="hero__stat-icon">{icon}</span>
      <div><div className="hero__stat-val">{val}</div><div className="hero__stat-label">{label}</div></div>
    </div>
  );
}

export default function Hero() {
  const blobRef = useRef(null);
  const [blobsActive, setBlobsActive] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setBlobsActive(true);
    }, { threshold: 0.1 });
    if (blobRef.current) observer.observe(blobRef.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <section id="hero" className="hero" ref={blobRef}>
      <Particles />
      <div className={`hero__blob hero__blob--a ${blobsActive ? 'hero__blob--animate' : ''}`}/>
      <div className={`hero__blob hero__blob--b ${blobsActive ? 'hero__blob--animate' : ''}`}/>
      <div className="hero__grid"/>

      <div className="container hero__content">
        <div className="hero__status">
          <span className="hero__status-dot"/>
          Open to Data Science & ML Roles
        </div>

        <div className="hero__photo-wrap">
          <div className="hero__photo-ring">
            <img src="/sarthak-photo.jpg" alt="Sarthak Kumar Chaubey" className="hero__photo"/>
          </div>
          <div className="hero__photo-glow"/>
        </div>

        <h1 className="hero__name"><GlitchName/></h1>
        <p className="hero__role"><Typewriter/></p>
        <p className="hero__desc">
          Transforming raw data into actionable insights — I specialize in Machine Learning,
          data visualization, and building models that solve real-world problems.
        </p>

        <div className="hero__tags">
          {TAGS.map(t => <span key={t} className="badge hero__tag">{t}</span>)}
        </div>

        <div className="hero__actions">
          <a href="#projects" className="btn btn-primary hero__btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            View My Work
          </a>
          <a href="/Sarthak_CV.pdf" download="Sarthak_Kumar_Chaubey_CV.pdf" className="btn btn-ghost hero__btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download CV
          </a>
          <a href="https://github.com/sarthak3924" target="_blank" rel="noreferrer" className="btn btn-ghost hero__icon-btn" aria-label="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
          </a>
          <a href="https://linkedin.com/in/sarthakkumarchaubey" target="_blank" rel="noreferrer" className="btn btn-ghost hero__icon-btn" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>

        {/* Floating DS stats */}
        <div className="hero__stats-row">
          <FloatingStat val="3+" label="Projects" icon="📊" delay={1.2}/>
          <FloatingStat val="7" label="Certifications" icon="🏆" delay={1.35}/>
          <FloatingStat val="3" label="Oracle Certs" icon="☁️" delay={1.5}/>
          <FloatingStat val="LPU" label="University" icon="🎓" delay={1.65}/>
        </div>

        <div className="hero__scroll">
          <div className="hero__scroll-mouse"><div className="hero__scroll-wheel"/></div>
          <span>Scroll</span>
        </div>
      </div>
    </section>
  );
}
