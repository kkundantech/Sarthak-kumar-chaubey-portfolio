import React from 'react';
import { useInView } from './useInView';
import './Reveal.css';

export default function Reveal({ children, delay = 0, direction = 'up', className = '' }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`reveal reveal--${direction} ${inView ? 'reveal--visible' : ''} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}>
      {children}
    </div>
  );
}
