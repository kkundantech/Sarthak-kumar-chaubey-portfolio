import React, { useState, useRef, useEffect } from 'react';
import Reveal from './Reveal';
import './Contact.css';

const INFO = [
  { icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, label:'Email', value:'sarthak.chaubey06@gmail.com', href:'mailto:sarthak.chaubey06@gmail.com', color:'#14b8a6' },
  { icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>, label:'Phone', value:'+91 7260857784', href:'tel:+917260857784', color:'#10b981' },
  { icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>, label:'LinkedIn', value:'linkedin.com/in/sarthakkumarchaubey', href:'https://linkedin.com/in/sarthakkumarchaubey', color:'#8b5cf6' },
  { icon:<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>, label:'GitHub', value:'github.com/sarthak3924', href:'https://github.com/sarthak3924', color:'#f59e0b' },
];

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [sent, setSent]   = useState(false);
  const [focus, setFocus] = useState('');
  const [ringsActive, setRingsActive] = useState(false);
  const contactRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setRingsActive(true);
    }, { threshold: 0.1 });
    if (contactRef.current) observer.observe(contactRef.current);
    return () => observer.disconnect();
  }, []);

  const change = (e) => setForm({...form,[e.target.name]:e.target.value});
  const submit = (e) => {
    e.preventDefault();
    const sub  = encodeURIComponent(`[Portfolio] ${form.subject || 'Contact from '+form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.open(`mailto:sarthak.chaubey06@gmail.com?subject=${sub}&body=${body}`);
    setSent(true);
    setTimeout(()=>{setSent(false);setForm({name:'',email:'',subject:'',message:''});}, 4000);
  };

  return (
    <section id="contact" className="section contact" ref={contactRef}>
      <div className={`contact__ring contact__ring--1 ${ringsActive ? 'contact__ring--animate' : ''}`}/>
      <div className={`contact__ring contact__ring--2 ${ringsActive ? 'contact__ring--animate' : ''}`}/>
      <div className="container">
        <Reveal>
          <p className="s-eyebrow">Let's connect</p>
          <h2 className="s-title">Get <span className="gt">In Touch</span></h2>
          <p className="s-sub">Open to Data Science roles, internships, collaborations, or just a conversation about ML!</p>
          <div className="rule"/>
        </Reveal>
        <div className="contact__grid">
          <Reveal delay={100} direction="left">
            <div className="card contact__form-card">
              <form className="contact__form" onSubmit={submit}>
                {[{name:'name',label:'Your Name',type:'text',placeholder:'Sarthak Kumar'},{name:'email',label:'Email',type:'email',placeholder:'you@example.com'},{name:'subject',label:'Subject',type:'text',placeholder:'Data Science Opportunity'}].map(f=>(
                  <div key={f.name} className={`contact__field ${focus===f.name?'contact__field--focus':''}`}>
                    <label className="contact__label">{f.label}</label>
                    <input className="contact__input" type={f.type} name={f.name} placeholder={f.placeholder} value={form[f.name]} onChange={change} onFocus={()=>setFocus(f.name)} onBlur={()=>setFocus('')} required/>
                    <div className="contact__field-line"/>
                  </div>
                ))}
                <div className={`contact__field ${focus==='message'?'contact__field--focus':''}`}>
                  <label className="contact__label">Message</label>
                  <textarea className="contact__input contact__textarea" name="message" placeholder="Tell me about the opportunity or project..." value={form.message} onChange={change} onFocus={()=>setFocus('message')} onBlur={()=>setFocus('')} required rows={5}/>
                  <div className="contact__field-line"/>
                </div>
                <button type="submit" className={`btn btn-primary contact__submit ${sent?'contact__submit--sent':''}`}>
                  {sent ? <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg> Sent!</> : <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>Send Message</>}
                </button>
              </form>
            </div>
          </Reveal>
          <div className="contact__info-col">
            <Reveal delay={200} direction="right">
              <div className="card contact__info-card">
                <h3 className="contact__info-h">Contact Information</h3>
                <div className="contact__info-list">
                  {INFO.map(item=>(
                    <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="contact__info-row">
                      <div className="contact__info-icon" style={{background:`${item.color}18`,borderColor:`${item.color}30`,color:item.color}}>{item.icon}</div>
                      <div>
                        <div className="contact__info-label">{item.label}</div>
                        <div className="contact__info-value">{item.value}</div>
                      </div>
                      <svg className="contact__arrow" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={300} direction="right">
              <div className="card contact__avail">
                <div className="contact__avail-dot"/>
                <div>
                  <div className="contact__avail-title">Available for Opportunities</div>
                  <div className="contact__avail-sub">Open to Data Science, ML Engineer & Analytics roles</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <Reveal delay={400} direction="none">
          <div className="contact__bottom">Looking forward to connecting with you 👋</div>
        </Reveal>
      </div>
    </section>
  );
}
