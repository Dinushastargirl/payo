import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export function TypographyOverlay() {
  const containerRef = useRef();

  useLayoutEffect(() => {
    const tl = gsap.timeline({ paused: true });

    // Assuming we sync this with the main 3D timeline or trigger it via custom events.
    
    tl.to('.text-1', { opacity: 1, duration: 2, ease: "power2.inOut" }, 2)
      .to('.text-1', { opacity: 0, duration: 2, ease: "power2.inOut" }, 6)
      
      .to('.text-2', { opacity: 1, duration: 2, ease: "power2.inOut" }, 8)
      .to('.text-2', { opacity: 0, duration: 2, ease: "power2.inOut" }, 12)
      
      .to('.text-3', { opacity: 1, duration: 2, ease: "power2.inOut" }, 14)
      .to('.text-3', { opacity: 0, duration: 2, ease: "power2.inOut" }, 18)

      .to('.text-4', { opacity: 1, duration: 2, ease: "power2.inOut" }, 23)
      .to('.text-4', { opacity: 0, duration: 2, ease: "power2.inOut" }, 27)

      .to('.text-5', { opacity: 1, duration: 2, ease: "power2.inOut" }, 29)
      .to('.text-5', { opacity: 0, duration: 2, ease: "power2.inOut" }, 33)

      .to('.text-6', { opacity: 1, duration: 2, ease: "power2.inOut" }, 36)
      .to('.text-6', { opacity: 0, duration: 2, ease: "power2.inOut" }, 40)

      .to('.text-7', { opacity: 1, duration: 2, ease: "power2.inOut" }, 42)
      .to('.text-7', { opacity: 0, duration: 2, ease: "power2.inOut" }, 46)

      .to('.text-8', { opacity: 1, duration: 2, ease: "power2.inOut" }, 52)
      .to('.text-8', { opacity: 0, duration: 2, ease: "power2.inOut" }, 56)

      .to('.text-9', { opacity: 1, duration: 2, ease: "power2.inOut" }, 58)
      .to('.text-9', { opacity: 0, duration: 2, ease: "power2.inOut" }, 62)

      .to('.text-10', { opacity: 1, duration: 2, ease: "power2.inOut" }, 64)
      .to('.text-10', { opacity: 0, duration: 2, ease: "power2.inOut" }, 68)

      .to('.text-11', { opacity: 1, duration: 2, ease: "power2.inOut" }, 70)
      .to('.text-11', { opacity: 0, duration: 2, ease: "power2.inOut" }, 74)

      .to('.text-12', { opacity: 1, duration: 2, ease: "power2.inOut" }, 76)
      .to('.text-12', { opacity: 0, duration: 2, ease: "power2.inOut" }, 80)

      .to('.text-13', { opacity: 1, duration: 2, ease: "power2.inOut" }, 82)
      .to('.text-13', { opacity: 0, duration: 2, ease: "power2.inOut" }, 86)

      .to('.text-14', { opacity: 1, duration: 2, ease: "power2.inOut" }, 89)
      .to('.text-14', { opacity: 0, duration: 2, ease: "power2.inOut" }, 93)

      .to('.text-15', { opacity: 1, duration: 2, ease: "power2.inOut" }, 95)
      .to('.text-15', { opacity: 0, duration: 2, ease: "power2.inOut" }, 99)

      .to('.text-16', { opacity: 1, duration: 2, ease: "power2.inOut" }, 101)
      .to('.text-16', { opacity: 0, duration: 2, ease: "power2.inOut" }, 105)

      .to('.text-17', { opacity: 1, duration: 2, ease: "power2.inOut" }, 107)
      .to('.text-17', { opacity: 0, duration: 2, ease: "power2.inOut" }, 111)

      .to('.text-18', { opacity: 1, duration: 2, ease: "power2.inOut" }, 113)
      .to('.text-18', { opacity: 0, duration: 2, ease: "power2.inOut" }, 117)

      // The Ending
      .to('.text-19', { opacity: 1, duration: 2, ease: "power2.inOut" }, 120)
      .to('.text-19', { opacity: 0, duration: 2, ease: "power2.inOut" }, 125)

      .to('.text-20', { opacity: 1, duration: 3, ease: "power2.inOut" }, 127);

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
      
      <div className="text-4" style={textStyle}>Every star shines with purpose.</div>
      <div className="text-5" style={textStyle}>And some... are meant to change the world.</div>
      
      <div className="text-6" style={textStyle}>On this day...</div>
      <div className="text-7" style={textStyle}>A beautiful light entered this world.</div>

      <div className="text-8" style={textStyle}>You were never created by accident.</div>
      <div className="text-9" style={textStyle}>You were created with purpose.</div>
      <div className="text-10" style={textStyle}>There is hope inside you.</div>
      <div className="text-11" style={textStyle}>There is strength within you.</div>
      <div className="text-12" style={textStyle}>There is beauty in your story.</div>
      <div className="text-13" style={textStyle}>There is a future... waiting for you.</div>

      <div className="text-14" style={textStyle}>May God's favor go before you.</div>
      <div className="text-15" style={textStyle}>May His peace remain with you.</div>
      <div className="text-16" style={textStyle}>May His wisdom guide your steps.</div>
      <div className="text-17" style={textStyle}>May your dreams grow beyond your imagination.</div>
      <div className="text-18" style={textStyle}>And may your heart... always know His love.</div>

      <div className="text-19" style={textStyle}>The world is brighter because you are in it.</div>
      <div className="text-20" style={{...textStyle, fontSize: '5rem', fontFamily: 'var(--font-title-cinzel)'}}>Happy Birthday, Payo.</div>
    </div>
  );
}
