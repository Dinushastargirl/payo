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
    window.playVoice = (num) => {
      const v = document.getElementById(`voice${num}`);
      if (v) {
        v.currentTime = 0;
        v.play();
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

      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
        <audio key={num} id={`voice${num}`}>
          <source src={`/audio/voice${num}.mp3`} type="audio/mpeg" />
        </audio>
      ))}
    </div>
  );
}

export default App;
