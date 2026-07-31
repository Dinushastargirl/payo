import React, { useRef, useLayoutEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { StarryVoid } from './StarryVoid';
import gsap from 'gsap';

export function CinematicExperience() {
  const { camera } = useThree();
  const timelineRef = useRef();

  useLayoutEffect(() => {
    // Master GSAP Timeline for the 3D Scene
    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power2.inOut" }
    });

    // Scene 1: The Void -> Scene 2: The Chosen Star
    tl.to(camera.position, {
      z: 2,
      duration: 10,
      ease: "power1.inOut"
    }, 0);

    // Scene 3: The Date
    // Camera pushes in more
    tl.to(camera.position, {
      z: 0.5,
      duration: 5,
      ease: "power2.inOut"
    }, 30);

    // Scene 4 & 5: Golden World (Camera pulls back a bit)
    tl.to(camera.position, {
      z: 2.5,
      duration: 10,
      ease: "power2.inOut"
    }, 60);

    // Scene 6: The Blessing (Camera moves slowly across)
    tl.to(camera.position, {
      x: 1,
      y: 0.5,
      duration: 20,
      ease: "linear"
    }, 85);

    // Final ending (Camera pulls way back, fading to infinity)
    tl.to(camera.position, {
      z: 15,
      x: 0,
      y: 0,
      duration: 15,
      ease: "power2.inOut"
    }, 115);

    timelineRef.current = tl;

    // Start playing after a small delay
    setTimeout(() => {
      tl.play();
    }, 1000);

    return () => {
      tl.kill();
    };
  }, [camera]);

  return (
    <group>
      <StarryVoid />
      {/* Other components like PhotoMorph, GlassShatter, etc., will be added here and toggled/animated via GSAP */}
    </group>
  );
}
