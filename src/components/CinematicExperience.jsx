import React, { useRef, useLayoutEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { ParticleMorphSystem } from './ParticleMorphSystem';
import gsap from 'gsap';

export function CinematicExperience() {
  const { camera } = useThree();
  const timelineRef = useRef();

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power2.inOut" }
    });

    const triggerEvent = (time, voiceNum, shape, camZ = 2, camX = 0, camY = 0) => {
      // Move camera
      tl.to(camera.position, { z: camZ, x: camX, y: camY, duration: 5, ease: "power1.inOut" }, time - 2);
      
      // Play audio & morph shape
      tl.call(() => {
        if (window.playVoice && voiceNum > 0) window.playVoice(voiceNum);
        if (window.morphTo) window.morphTo(shape, 3);
      }, [], time);
      
      // Return to sphere softly before next shape
      if (shape !== 'heart') {
        tl.call(() => {
          if (window.morphTo) window.morphTo('sphere', 3);
        }, [], time + 6);
      }
    };

    tl.to(camera.position, { z: 2, duration: 5 }, 0);

    // 1. Gift Box
    triggerEvent(5, 1, 'giftbox');
    // 2. Candle
    triggerEvent(15, 2, 'candle');
    // 3. Star
    triggerEvent(25, 3, 'star');
    // 4. House
    triggerEvent(35, 4, 'house');
    // 5. Key
    triggerEvent(45, 5, 'key');
    // 6. Girl on Road
    triggerEvent(55, 6, 'girl_road');
    // 7. Bicycle
    triggerEvent(65, 7, 'bicycle');
    // 8. Books
    triggerEvent(75, 8, 'books');
    // 9. Spotlight
    triggerEvent(85, 9, 'spotlight');
    // 10. Heart
    triggerEvent(95, 10, 'heart', 1.5);

    // Finale: Portrait
    tl.call(() => {
      if (window.morphTo) window.morphTo('portrait', 5); // Assembly
    }, [], 105);

    // Enlarge Portrait
    tl.to(camera.position, {
      z: 0.8,
      duration: 6,
      ease: "power2.inOut"
    }, 107);

    // Dissolve Portrait back to sphere
    tl.call(() => {
      if (window.morphTo) window.morphTo('sphere', 6);
    }, [], 116);

    // Final ending (Camera pulls way back)
    tl.to(camera.position, {
      z: 15,
      duration: 15,
      ease: "power2.inOut"
    }, 120);

    timelineRef.current = tl;

    setTimeout(() => {
      tl.play();
    }, 1000);

    return () => {
      tl.kill();
    };
  }, [camera]);

  return (
    <group>
      <ParticleMorphSystem />
    </group>
  );
}
