import React, { useRef } from 'react';
import Reveal from './Reveal';
import './Projects.css';

/* ── Custom DS SVG Mockups ── */
const EVRangeMockup = () => (
  <svg viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg" className="proj__svg">
    <rect width="380" height="200" fill="#05080f"/>
    <rect width="380" height="32" fill="#0e1420"/>
    <text x="16" y="21" fill="#14b8a6" fontSize="10" fontWeight="700" fontFamily="sans-serif">⚡ EV Range Prediction Dashboard</text>
    <text x="300" y="21" fill="#475569" fontSize="8" fontFamily="sans-serif">Random Forest</text>

    {/* Model comparison bars */}
    {[{label:'Linear Reg',val:68,color:'#475569'},{label:'Poly Reg',val:78,color:'#8b5cf6'},{label:'Random Forest',val:94,color:'#14b8a6'}].map((m,i)=>(
      <g key={m.label}>
        <text x="16" y={58+i*38} fill="#94a3b8" fontSize="8" fontFamily="sans-serif">{m.label}</text>
        <rect x="100" y={46+i*38} width="200" height="16" rx="4" fill="#131a2a"/>
        <rect x="100" y={46+i*38} width={200*m.val/100} height="16" rx="4" fill={m.color}/>
        <text x={308} y={58+i*38} fill={m.color} fontSize="9" fontWeight="700" fontFamily="sans-serif">{m.val}%</text>
      </g>
    ))}

    {/* Metrics */}
    {[{label:'MAE',val:'4.2',x:16},{label:'MSE',val:'28.6',x:110},{label:'RMSE',val:'5.3',x:210},{label:'R²',val:'0.94',x:310}].map(m=>(
      <g key={m.label}>
        <rect x={m.x} y="162" width="82" height="32" rx="6" fill="#0e1420" stroke="#192135" strokeWidth="1"/>
        <text x={m.x+8} y="175" fill="#475569" fontSize="7" fontFamily="sans-serif">{m.label}</text>
        <text x={m.x+8} y="188" fill="#14b8a6" fontSize="11" fontWeight="700" fontFamily="sans-serif">{m.val}</text>
      </g>
    ))}

    <text x="16" y="145" fill="#475569" fontSize="8" fontFamily="sans-serif">Tech: Python · Pandas · NumPy · Scikit-learn · Matplotlib</text>
  </svg>
);

const AICritiqueMockup = () => (
  <svg viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg" className="proj__svg">
    <rect width="380" height="200" fill="#05080f"/>
    <rect width="380" height="32" fill="#0e1420"/>
    <text x="16" y="21" fill="#8b5cf6" fontSize="10" fontWeight="700" fontFamily="sans-serif">🎨 AI Art Critique Bot</text>
    <text x="290" y="21" fill="#475569" fontSize="8" fontFamily="sans-serif">Machine Learning</text>

    {/* Art canvas placeholder */}
    <rect x="16" y="40" width="110" height="100" rx="6" fill="#131a2a" stroke="#192135" strokeWidth="1"/>
    <text x="35" y="85" fill="#192135" fontSize="22" fontFamily="sans-serif">🖼</text>
    <text x="25" y="105" fill="#475569" fontSize="7" fontFamily="sans-serif">artwork.jpg</text>
    <text x="25" y="118" fill="#475569" fontSize="7" fontFamily="sans-serif">1024 × 768px</text>

    {/* Analysis panel */}
    <rect x="138" y="40" width="226" height="100" rx="6" fill="#131a2a" stroke="#8b5cf6" strokeWidth="1"/>
    <text x="150" y="58" fill="#8b5cf6" fontSize="9" fontWeight="700" fontFamily="sans-serif">AI Analysis Results</text>

    {[{label:'Composition',score:87,color:'#14b8a6'},{label:'Color Harmony',score:92,color:'#8b5cf6'},{label:'Style Match',score:79,color:'#f59e0b'}].map((a,i)=>(
      <g key={a.label}>
        <text x="150" y={76+i*22} fill="#94a3b8" fontSize="8" fontFamily="sans-serif">{a.label}</text>
        <rect x="240" y={65+i*22} width="100" height="10" rx="3" fill="#192135"/>
        <rect x="240" y={65+i*22} width={a.score} height="10" rx="3" fill={a.color}/>
        <text x="348" y={75+i*22} fill={a.color} fontSize="8" fontWeight="700" fontFamily="sans-serif">{a.score}</text>
      </g>
    ))}

    {/* Feedback box */}
    <rect x="16" y="152" width="348" height="36" rx="6" fill="#131a2a" stroke="#192135" strokeWidth="1"/>
    <text x="26" y="165" fill="#8b5cf6" fontSize="8" fontWeight="700" fontFamily="sans-serif">AI Feedback:</text>
    <text x="26" y="178" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Strong composition with balanced color. Rule of thirds well applied. Consider warmer highlights.</text>
  </svg>
);

const MortalityMockup = () => (
  <svg viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg" className="proj__svg">
    <rect width="380" height="200" fill="#05080f"/>
    <rect width="380" height="32" fill="#0e1420"/>
    <text x="16" y="21" fill="#10b981" fontSize="10" fontWeight="700" fontFamily="sans-serif">📊 US Mortality Trends — Data Analysis</text>

    {/* Line chart */}
    <rect x="16" y="40" width="348" height="110" rx="6" fill="#0e1420" stroke="#192135" strokeWidth="1"/>

    {/* Y-axis labels */}
    {['High','Mid','Low'].map((l,i)=>(
      <text key={l} x="20" y={62+i*32} fill="#475569" fontSize="7" fontFamily="sans-serif">{l}</text>
    ))}

    {/* Grid lines */}
    {[0,1,2].map(i=>(
      <line key={i} x1="44" y1={55+i*32} x2="358" y2={55+i*32} stroke="#131a2a" strokeWidth="1"/>
    ))}

    {/* Data lines */}
    <polyline points="44,105 90,98 136,88 182,95 228,72 274,80 320,65 358,58" fill="none" stroke="#14b8a6" strokeWidth="2"/>
    <polyline points="44,120 90,115 136,108 182,118 228,100 274,110 320,95 358,88" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4,2"/>
    <polyline points="44,135 90,138 136,130 182,125 228,132 274,118 320,125 358,120" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2,3"/>

    {/* Legend */}
    <rect x="52" y="160" width="8" height="3" fill="#14b8a6"/>
    <text x="64" y="164" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif">Heart Disease</text>
    <rect x="150" y="160" width="8" height="3" fill="#8b5cf6"/>
    <text x="162" y="164" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif">Cancer</text>
    <rect x="218" y="160" width="8" height="3" fill="#f59e0b"/>
    <text x="230" y="164" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif">Respiratory</text>

    <text x="16" y="185" fill="#475569" fontSize="8" fontFamily="sans-serif">Tech: Python · Pandas · NumPy · Matplotlib · Seaborn</text>
  </svg>
);

const ElectionMockup = () => (
  <svg viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg" className="proj__svg">
    <rect width="380" height="200" fill="#05080f"/>
    <rect width="380" height="32" fill="#0e1420"/>
    <text x="16" y="21" fill="#f59e0b" fontSize="10" fontWeight="700" fontFamily="sans-serif">🗳 Election Data Analytics Dashboard</text>
    <text x="300" y="21" fill="#475569" fontSize="8" fontFamily="sans-serif">MS Excel</text>

    {/* Slicer filters */}
    {['All States','Top 5 Parties','Constituency'].map((f,i)=>(
      <g key={f}>
        <rect x={16+i*112} y="40" width="104" height="18" rx="4" fill={i===0?'#f59e0b':'#131a2a'} stroke={i===0?'#f59e0b':'#192135'} strokeWidth="1"/>
        <text x={22+i*112} y="53" fill={i===0?'#05080f':'#475569'} fontSize="8" fontWeight={i===0?'700':'400'} fontFamily="sans-serif">{f}</text>
      </g>
    ))}

    {/* Bar chart - party votes */}
    {[{p:'BJP',v:180,c:'#f97316'},{p:'INC',v:100,c:'#3b82f6'},{p:'AAP',v:65,c:'#6366f1'},{p:'TMC',v:42,c:'#14b8a6'},{p:'NCP',v:28,c:'#8b5cf6'}].map((b,i)=>(
      <g key={b.p}>
        <text x="16" y={83+i*22} fill="#94a3b8" fontSize="8" fontFamily="sans-serif">{b.p}</text>
        <rect x="44" y={72+i*22} width="220" height="14" rx="3" fill="#131a2a"/>
        <rect x="44" y={72+i*22} width={b.v} height="14" rx="3" fill={b.c}/>
        <text x={272} y={83+i*22} fill={b.c} fontSize="8" fontWeight="700" fontFamily="sans-serif">{b.v}M</text>
      </g>
    ))}

    {/* KPI cards */}
    {[{label:'Total Seats',val:'543',color:'#f59e0b'},{label:'Turnout',val:'67.4%',color:'#14b8a6'},{label:'NOTA',val:'1.06M',color:'#8b5cf6'}].map((k,i)=>(
      <g key={k.label}>
        <rect x={286} y={40+i*52} width="78" height="44" rx="6" fill="#131a2a" stroke="#192135" strokeWidth="1"/>
        <text x={296} y={57+i*52} fill="#475569" fontSize="7" fontFamily="sans-serif">{k.label}</text>
        <text x={296} y={74+i*52} fill={k.color} fontSize="13" fontWeight="700" fontFamily="sans-serif">{k.val}</text>
      </g>
    ))}

    <text x="16" y="190" fill="#475569" fontSize="8" fontFamily="sans-serif">Tech: MS Excel · PivotTables · Charts · Slicers · Data Visualization</text>
  </svg>
);

const MOCKUPS = { ev: <EVRangeMockup/>, ai: <AICritiqueMockup/>, mortality: <MortalityMockup/>, election: <ElectionMockup/> };

const PROJECTS = [
  {
    id:'ev',
    title:'EV Range Prediction Using Machine Learning',
    desc:'Built a machine learning model to predict the electric driving range of EVs using the Electric Vehicle Population dataset. Compared Linear Regression, Polynomial Regression, and Random Forest — achieving best accuracy with Random Forest (R² = 0.94).',
    tech:['Python','Pandas','NumPy','Matplotlib','Scikit-learn','Random Forest'],
    tags:['ML','Data Science'],
    github:'https://sarthak.link/evrange',
    date:'Nov–Dec 2025',
    featured:true,
    color:'#14b8a6',
    highlights:['Data cleaning, preprocessing & feature engineering with Pandas/NumPy','Implemented & compared Linear, Polynomial & Random Forest models','Evaluated with MAE, MSE, RMSE & R² — RF achieved best accuracy'],
  },
  {
    id:'ai',
    title:'AI Art Critique Bot',
    desc:'Developed an AI-based bot to analyze and critique digital artwork automatically. Uses composition, color harmony, and style analysis to generate automated feedback for artists.',
    tech:['Python','Machine Learning','Image Processing','AI'],
    tags:['AI/ML','Python'],
    github:'https://github.com/sarthak3924/Art-Critique-Bot',
    date:'Apr 2021 – May 2025',
    featured:true,
    color:'#8b5cf6',
    highlights:['AI logic evaluates composition, color harmony & style analysis','Generates automated feedback to help artists improve work quality','Modular Python system with AI & image processing tool integration'],
  },
  {
    id:'mortality',
    title:'US Mortality Trends — Data Visualization',
    desc:'End-to-end data analysis on U.S. mortality datasets to examine trends in potentially excess deaths across major disease categories. Built line plots, comparative charts, and heatmaps.',
    tech:['Python','Pandas','NumPy','Matplotlib','Seaborn'],
    tags:['Data Analysis','Visualization'],
    github:'https://github.com/sarthak3924/Visualizing-Trends-in-Potentially-Excess-Deaths-from-Leading-Causes-in-the-U.S.',
    date:'Mar–Apr 2025',
    featured:false,
    color:'#10b981',
    highlights:['Exploratory analysis to identify deviations from baseline mortality expectations','Line charts, comparative graphs, and heatmaps for public health insights','Data-driven findings on abnormal mortality patterns'],
  },
  {
    id:'election',
    title:'Election Data Analytics & Interactive Dashboard',
    desc:'Interactive Excel dashboard analyzing Indian parliamentary constituency data — voting patterns, party performance, and voter behavior with PivotTables, charts, and slicers.',
    tech:['MS Excel','PivotTables','Data Visualization','Analysis'],
    tags:['Data Analysis','Dashboard'],
    github:'#',
    date:'Jan 2025',
    featured:false,
    color:'#f59e0b',
    highlights:['Top 5 parties by total EVM votes, state-wise vote share & turnout vs NOTA','Dynamic PivotTables & slicers for effortless exploration','Constituency-level winning candidates & party-wise seat performance'],
  },
];

/* Draggable Carousel */
export default function Projects() {
  const trackRef  = useRef(null);
  const isDragging = useRef(false);
  const startX     = useRef(0);
  const scrollLeft = useRef(0);
  const velX       = useRef(0);
  const lastX      = useRef(0);
  const rafRef     = useRef(null);

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = trackRef.current.scrollLeft;
    lastX.current = e.clientX;
    velX.current = 0;
    trackRef.current.style.cursor = 'grabbing';
    cancelAnimationFrame(rafRef.current);
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    velX.current = e.clientX - lastX.current;
    lastX.current = e.clientX;
    trackRef.current.scrollLeft = scrollLeft.current - (e.clientX - startX.current);
  };
  const onMouseUp = () => {
    isDragging.current = false;
    trackRef.current.style.cursor = 'grab';
    const momentum = () => {
      velX.current *= 0.92;
      trackRef.current.scrollLeft -= velX.current;
      if (Math.abs(velX.current) > 0.5) rafRef.current = requestAnimationFrame(momentum);
    };
    rafRef.current = requestAnimationFrame(momentum);
  };

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <Reveal>
          <p className="s-eyebrow">What I've built</p>
          <h2 className="s-title">Featured <span className="gt">Projects</span></h2>
          <p className="s-sub">Drag to explore · Each card shows the actual project interface.</p>
          <div className="rule"/>
        </Reveal>
      </div>

      <div className="proj__outer">
        <div ref={trackRef} className="proj__track"
          onMouseDown={onMouseDown} onMouseMove={onMouseMove}
          onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
          <div className="proj__spacer"/>
          {PROJECTS.map(p => (
            <div key={p.id} className="proj__card card">
              <div className="proj__mockup" style={{'--pc': p.color}}>
                {MOCKUPS[p.id]}
                <div className="proj__mockup-fade"/>
                <div className="proj__glow" style={{background: p.color}}/>
                {p.featured && <span className="proj__featured">Featured</span>}
              </div>
              <div className="proj__body">
                <div className="proj__top">
                  <span className="proj__date">{p.date}</span>
                  <div className="proj__tag-row">
                    {p.tags.map(t=><span key={t} className="badge proj__tag" style={{background:`${p.color}14`,borderColor:`${p.color}30`,color:p.color}}>{t}</span>)}
                  </div>
                </div>
                <h3 className="proj__title">{p.title}</h3>
                <p className="proj__desc">{p.desc}</p>
                <ul className="proj__points">
                  {p.highlights.map((h,j)=>(
                    <li key={j} className="proj__point">
                      <span className="proj__dot" style={{background:p.color}}/>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="proj__tech">
                  {p.tech.map(t=><span key={t} className="proj__tech-tag">{t}</span>)}
                </div>
                <div className="proj__footer">
                  <a href={p.github} target="_blank" rel="noreferrer" className="proj__link" onClick={e=>e.stopPropagation()}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                    View Project →
                  </a>
                </div>
              </div>
            </div>
          ))}
          <div className="proj__spacer"/>
        </div>
        <div className="proj__hint">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 8l4 4-4 4M6 8l-4 4 4 4M2 12h20"/></svg>
          Drag to explore all projects
        </div>
      </div>
    </section>
  );
}
