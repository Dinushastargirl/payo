import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, DepthOfField, Noise, Vignette } from '@react-three/postprocessing';
import { Html, useProgress } from '@react-three/drei';
import gsap from 'gsap';
import './index.css';

// Scene Components (To be implemented)
import { StarryVoid } from './components/StarryVoid';
import { CinematicExperience } from './components/CinematicExperience';
import { TypographyOverlay } from './components/TypographyOverlay';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: 'var(--color-ivory)', fontFamily: 'var(--font-title-main)', fontSize: '24px', letterSpacing: '0.1em' }}>
        Awakening Stars... {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

function App() {
  const [started, setStarted] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const lines = [
      "", // 0 is unused
      "Before your first breath... Before your first smile...", // 1 (gift box)
      "You were already known...", // 2 (candle)
      "Every star shines with purpose...", // 3 (star)
      "And some are meant to change the world...", // 4 (house)
      "On this day a beautiful light entered this world...", // 5 (key)
      "You were created with purpose...", // 6 (girl on a road)
      "You are not an accident...", // 7 (bicycle)
      "There is hope inside you...", // 8 (books)
      "There is strength within you... There is beauty in your story...", // 9 (spotlight)
      "There is a future waiting for you... May God's favor go before you... May His peace remain with you... May His wisdom guide your steps... And may your dreams grow beyond your imagination... And may your heart always know His love... The world is brighter because you are in it..." // 10 (heart)
    ];

    window.playVoice = (num) => {
      if ('speechSynthesis' in window && lines[num]) {
        // Cancel any currently playing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(lines[num]);
        utterance.volume = 1.0; // Max volume
        utterance.rate = 0.85; // Slightly slower for cinematic feel
        utterance.pitch = 0.9;
        
        // Try to find a good English voice
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Female') || v.name.includes('Google') || v.name.includes('Natural')));
        if (englishVoice) {
          utterance.voice = englishVoice;
        }

        window.speechSynthesis.speak(utterance);
      }
    };
  }, []);

  const handleStart = () => {
    setStarted(true);
    const bgm = document.getElementById('bgm');
    if (bgm) bgm.play();
  };

  return (
    <div ref={containerRef} className="fullscreen">
      {!started && (
        <div style={{
          position: 'absolute', zIndex: 50, top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          backgroundColor: 'var(--color-background)', cursor: 'pointer'
        }} onClick={handleStart}>
          <h1 style={{ letterSpacing: '0.1em', fontSize: '2rem', animation: 'pulse 2s infinite' }}>Begin Experience</h1>
        </div>
      )}

      {started && (
        <>
          <Canvas
            className="fullscreen canvas-container"
            camera={{ position: [0, 0, 5], fov: 45 }}
            gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
          >
            <color attach="background" args={['#02010A']} />
            <ambientLight intensity={0.2} />
            
            <Suspense fallback={<Loader />}>
              <CinematicExperience />
            </Suspense>

            <EffectComposer disableNormalPass>
              <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
              <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
              <Noise opacity={0.02} />
              <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
          </Canvas>

          <TypographyOverlay />
        </>
      )}

      <audio id="bgm" loop>
        <source src="/audio/cinematic.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;
