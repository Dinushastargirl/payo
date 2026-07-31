import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import GalaxyIntro from './components/GalaxyIntro';
import BirthdayScene from './components/BirthdayScene';
import MemoryGarden from './components/MemoryGarden';
import TimelineExperience from './components/TimelineExperience';
import LoveLetter from './components/LoveLetter';
import FinaleScene from './components/FinaleScene';

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    // Only init lenis if we have passed the intro
    if (introFinished) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
      };
    }
  }, [introFinished]);

  return (
    <div className="bg-[#0b0c10] text-white min-h-screen">
      {!introFinished ? (
        <GalaxyIntro onEnter={() => setIntroFinished(true)} />
      ) : (
        <main>
          {/* We use distinct sections for scrolling */}
          <section className="relative z-10">
            <BirthdayScene />
          </section>
          
          <section className="relative z-20 bg-gradient-to-b from-transparent to-[#1a0b2e]/50">
            <MemoryGarden />
          </section>

          <section className="relative z-30 bg-gradient-to-b from-transparent to-black">
            <TimelineExperience />
          </section>

          <section className="relative z-40 bg-black/50">
            <LoveLetter />
          </section>

          <section className="relative z-50">
            <FinaleScene />
          </section>
        </main>
      )}
    </div>
  );
}
