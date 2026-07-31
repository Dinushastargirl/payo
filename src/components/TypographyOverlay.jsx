import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export function TypographyOverlay() {
  const containerRef = useRef();

  useLayoutEffect(() => {
    const tl = gsap.timeline({ paused: true });

    // Assuming we sync this with the main 3D timeline or trigger it via custom events.
    // For simplicity, we'll just set up the animation logic that can be triggered.
    
    // Initial fade in for the first texts
    tl.to('.text-1', { opacity: 1, duration: 2, ease: "power2.inOut" }, 2)
      .to('.text-1', { opacity: 0, duration: 2, ease: "power2.inOut" }, 6)
      
      .to('.text-2', { opacity: 1, duration: 2, ease: "power2.inOut" }, 7)
      .to('.text-2', { opacity: 0, duration: 2, ease: "power2.inOut" }, 11)
      
      .to('.text-3', { opacity: 1, duration: 2, ease: "power2.inOut" }, 12)
      .to('.text-3', { opacity: 0, duration: 2, ease: "power2.inOut" }, 16);

    // Make the timeline globally accessible or use React Context to sync it.
    window.typographyTimeline = tl;
    
    // Auto-play for now, in sync with 3D scene (1 second delay)
    setTimeout(() => {
      tl.play();
    }, 1000);

    return () => tl.kill();
  }, []);

  const textStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: 0,
    textAlign: 'center',
    width: '80%',
    fontFamily: 'var(--font-title-main)',
    fontSize: '3rem',
    letterSpacing: '0.05em',
    textShadow: '0 0 20px rgba(255,248,231,0.5)',
  };

  return (
    <div ref={containerRef} className="fullscreen html-overlay">
      <div className="text-1" style={textStyle}>Before your first breath...</div>
      <div className="text-2" style={textStyle}>Before your first smile...</div>
      <div className="text-3" style={textStyle}>You were already known.</div>
    </div>
  );
}
