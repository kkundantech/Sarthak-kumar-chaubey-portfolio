import React, { useEffect, useRef, useState } from 'react';
import './Cursor.css';

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const rafRef  = useRef(null);
  const [hover, setHover] = useState(false);
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 900) return;
    const onMove = (e) => { pos.current.x = e.clientX; pos.current.y = e.clientY; };
    const onDown = () => { setClick(true); setTimeout(() => setClick(false), 150); };
    const onOver = (e) => { setHover(!!e.target.closest('a,button,input,textarea,[data-hover]')); };
    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (dotRef.current)  { dotRef.current.style.transform  = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`; }
      if (ringRef.current) { ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`; }
      rafRef.current = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseover', onOver);
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className={`cur__dot  ${click ? 'cur__dot--click' : ''}`} />
      <div ref={ringRef} className={`cur__ring ${hover ? 'cur__ring--hover' : ''}`} />
    </>
  );
}
