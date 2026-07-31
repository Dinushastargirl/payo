import React, { useMemo, useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

const vertexShader = `
  uniform float uProgress;
  uniform float uTime;
  attribute vec3 targetPosition;
  attribute vec3 currentPosition;
  attribute vec3 targetColor;
  attribute vec3 currentColor;
  varying vec3 vColor;

  void main() {
    vec3 pos = mix(currentPosition, targetPosition, uProgress);
    vColor = mix(currentColor, targetColor, uProgress);

    // Add gentle noise/floating effect
    pos.x += sin(uTime + pos.y * 2.0) * 0.02 * (1.0 - uProgress);
    pos.y += cos(uTime + pos.x * 2.0) * 0.02 * (1.0 - uProgress);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (10.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  void main() {
    // Make particles circular and soft
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.2, dist);
    
    gl_FragColor = vec4(vColor, alpha);
  }
`;

export function ParticleMorphSystem() {
  const meshRef = useRef();
  const materialRef = useRef();
  const { viewport } = useThree();
  const [particlesLoaded, setParticlesLoaded] = useState(false);

  // Store the geometries for shapes
  const geometryData = useRef({});
  const numParticles = 15000;

  useEffect(() => {
    // 1. Generate Sphere (Universe)
    const spherePos = new Float32Array(numParticles * 3);
    const sphereCol = new Float32Array(numParticles * 3);
    for (let i = 0; i < numParticles; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = Math.cbrt(Math.random()) * 8; 
      spherePos[i*3] = r * Math.sin(phi) * Math.cos(theta);
      spherePos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      spherePos[i*3+2] = r * Math.cos(phi);
      // Soft ivory color for stars
      sphereCol[i*3] = 1.0; sphereCol[i*3+1] = 0.97; sphereCol[i*3+2] = 0.90;
    }
    geometryData.current['sphere'] = { pos: spherePos, col: sphereCol };

    // 2. Generate Heart
    const heartPos = new Float32Array(numParticles * 3);
    const heartCol = new Float32Array(numParticles * 3);
    for (let i = 0; i < numParticles; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.5 + 0.5; // Fill inside
      const x = r * 16 * Math.pow(Math.sin(t), 3);
      const y = r * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
      heartPos[i*3] = x * 0.1;
      heartPos[i*3+1] = y * 0.1;
      heartPos[i*3+2] = (Math.random() - 0.5) * 0.5;
      // Pink/Gold colors
      heartCol[i*3] = 1.0; heartCol[i*3+1] = 0.4; heartCol[i*3+2] = 0.6;
    }
    geometryData.current['heart'] = { pos: heartPos, col: heartCol };

    // 3. Generate House
    const housePos = new Float32Array(numParticles * 3);
    const houseCol = new Float32Array(numParticles * 3);
    for (let i = 0; i < numParticles; i++) {
      let x = (Math.random() - 0.5) * 4;
      let y = (Math.random() - 0.5) * 4;
      let z = (Math.random() - 0.5) * 0.5;
      if (y > 1) {
        x = (Math.random() - 0.5) * (4 - (y - 1) * 2);
      } else {
        x = (Math.random() - 0.5) * 3;
      }
      housePos[i*3] = x; housePos[i*3+1] = y - 1; housePos[i*3+2] = z;
      houseCol[i*3] = 0.83; houseCol[i*3+1] = 0.68; houseCol[i*3+2] = 0.21; 
    }
    geometryData.current['house'] = { pos: housePos, col: houseCol };

    // 4. Generate Ball (Childhood/Play)
    const ballPos = new Float32Array(numParticles * 3);
    const ballCol = new Float32Array(numParticles * 3);
    for (let i = 0; i < numParticles; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.5; 
      ballPos[i*3] = r * Math.sin(phi) * Math.cos(theta);
      ballPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      ballPos[i*3+2] = r * Math.cos(phi);
      // Soft colorful colors
      ballCol[i*3] = Math.random() * 0.5 + 0.5; 
      ballCol[i*3+1] = Math.random() * 0.5 + 0.5; 
      ballCol[i*3+2] = Math.random() * 0.5 + 0.5;
    }
    geometryData.current['ball'] = { pos: ballPos, col: ballCol };

    // 5. Generate Cross (Faith/Hope)
    const crossPos = new Float32Array(numParticles * 3);
    const crossCol = new Float32Array(numParticles * 3);
    for (let i = 0; i < numParticles; i++) {
      let x = 0, y = 0, z = (Math.random() - 0.5) * 0.2;
      if (Math.random() > 0.3) {
        // Vertical beam
        y = (Math.random() - 0.5) * 6;
        x = (Math.random() - 0.5) * 1;
      } else {
        // Horizontal beam
        x = (Math.random() - 0.5) * 4;
        y = (Math.random() - 0.5) * 1 + 1;
      }
      crossPos[i*3] = x; crossPos[i*3+1] = y; crossPos[i*3+2] = z;
      crossCol[i*3] = 0.5; crossCol[i*3+1] = 0.8; crossCol[i*3+2] = 1.0; // Blue glow
    }
    geometryData.current['cross'] = { pos: crossPos, col: crossCol };

    // 6. Load Image for Portrait
    const img = new Image();
    img.src = '/images/payo.jpg';
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const size = 150;
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, 0, 0, size, size);
      const imgData = ctx.getImageData(0, 0, size, size).data;
      
      const portraitPos = new Float32Array(numParticles * 3);
      const portraitCol = new Float32Array(numParticles * 3);
      
      let pIdx = 0;
      // Randomly sample pixels for the particles
      for (let i = 0; i < numParticles; i++) {
        let x = Math.floor(Math.random() * size);
        let y = Math.floor(Math.random() * size);
        let index = (y * size + x) * 4;
        
        // Scale and center positions
        portraitPos[i*3] = (x / size - 0.5) * 4;
        portraitPos[i*3+1] = -(y / size - 0.5) * 4; // Invert Y
        portraitPos[i*3+2] = (Math.random() - 0.5) * 0.2; // slight depth
        
        portraitCol[i*3] = imgData[index] / 255;
        portraitCol[i*3+1] = imgData[index+1] / 255;
        portraitCol[i*3+2] = imgData[index+2] / 255;
      }
      geometryData.current['portrait'] = { pos: portraitPos, col: portraitCol };
      setParticlesLoaded(true);
    };

    // Make global morph function for GSAP timeline
    window.morphTo = (shapeName, duration = 2) => {
      if (!meshRef.current || !geometryData.current[shapeName]) return;
      
      const geom = meshRef.current.geometry;
      const mat = materialRef.current;
      
      // The current target becomes the current state
      const targetPos = geom.attributes.targetPosition.array;
      const targetCol = geom.attributes.targetColor.array;
      geom.setAttribute('currentPosition', new THREE.BufferAttribute(new Float32Array(targetPos), 3));
      geom.setAttribute('currentColor', new THREE.BufferAttribute(new Float32Array(targetCol), 3));
      
      // Set new target
      geom.setAttribute('targetPosition', new THREE.BufferAttribute(geometryData.current[shapeName].pos, 3));
      geom.setAttribute('targetColor', new THREE.BufferAttribute(geometryData.current[shapeName].col, 3));
      
      mat.uniforms.uProgress.value = 0;
      gsap.to(mat.uniforms.uProgress, {
        value: 1,
        duration: duration,
        ease: "power2.inOut"
      });
    };
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    // Rotate entire particle group slowly if it's the universe
    if (meshRef.current && materialRef.current && materialRef.current.uniforms.uProgress.value === 1) {
      // Only rotate when stable, or always rotate slightly
      meshRef.current.rotation.y += 0.001;
    }
  });

  if (!particlesLoaded) return null;

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[geometryData.current['sphere'].pos, 3]} />
        <bufferAttribute attach="attributes-currentPosition" args={[geometryData.current['sphere'].pos, 3]} />
        <bufferAttribute attach="attributes-targetPosition" args={[geometryData.current['sphere'].pos, 3]} />
        <bufferAttribute attach="attributes-currentColor" args={[geometryData.current['sphere'].col, 3]} />
        <bufferAttribute attach="attributes-targetColor" args={[geometryData.current['sphere'].col, 3]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uProgress: { value: 1.0 },
          uTime: { value: 0 }
        }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
