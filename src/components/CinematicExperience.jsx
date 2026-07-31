import React, { useRef, useLayoutEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { ParticleMorphSystem } from './ParticleMorphSystem';
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

    // Scene 1: The Void
    tl.to(camera.position, {
      z: 2,
      duration: 10,
      ease: "power1.inOut"
    }, 0);

    // Trigger ball shape (childhood)
    tl.call(() => {
      if (window.morphTo) window.morphTo('ball', 3);
    }, [], 8);

    // Return to sphere
    tl.call(() => {
      if (window.morphTo) window.morphTo('sphere', 3);
    }, [], 15);

    // Trigger house shape (purpose)
    tl.call(() => {
      if (window.morphTo) window.morphTo('house', 4);
    }, [], 23);

    // Scene 3: The Date
    tl.to(camera.position, {
      z: 0.5,
      duration: 5,
      ease: "power2.inOut"
    }, 30);

    tl.call(() => {
      if (window.morphTo) window.morphTo('sphere', 3);
    }, [], 32);

    // Trigger Cross/Star (hope)
    tl.call(() => {
      if (window.morphTo) window.morphTo('cross', 3);
    }, [], 64);

    // Scene 4 & 5: Golden World
    tl.to(camera.position, {
      z: 2.5,
      duration: 10,
      ease: "power2.inOut"
    }, 60);

    // Return to sphere
    tl.call(() => {
      if (window.morphTo) window.morphTo('sphere', 3);
    }, [], 75);

    // Trigger Heart (love)
    tl.call(() => {
      if (window.morphTo) window.morphTo('heart', 4);
    }, [], 85);

    // Scene 6: The Blessing
    tl.to(camera.position, {
      x: 1,
      y: 0.5,
      duration: 20,
      ease: "linear"
    }, 85);

    // Trigger Portrait assembly
    tl.call(() => {
      if (window.morphTo) window.morphTo('portrait', 6);
    }, [], 112);

    // Final ending (Camera pulls way back, fading to infinity)
    tl.to(camera.position, {
      z: 15,
      x: 0,
      y: 0,
      duration: 15,
      ease: "power2.inOut"
    }, 115);

    // Dissolve portrait
    tl.call(() => {
      if (window.morphTo) window.morphTo('sphere', 5);
    }, [], 122);

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
      <ParticleMorphSystem />
    </group>
  );
}
