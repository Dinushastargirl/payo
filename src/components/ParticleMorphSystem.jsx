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
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.2, dist);
    gl_FragColor = vec4(vColor, alpha);
  }
`;

export function ParticleMorphSystem() {
  const meshRef = useRef();
  const materialRef = useRef();
  const [particlesLoaded, setParticlesLoaded] = useState(false);
  const geometryData = useRef({});
  const numParticles = 15000;

  useEffect(() => {
    // 0. Sphere (Universe)
    const spherePos = new Float32Array(numParticles * 3);
    const sphereCol = new Float32Array(numParticles * 3);
    for (let i = 0; i < numParticles; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = Math.cbrt(Math.random()) * 8; 
      spherePos[i*3] = r * Math.sin(phi) * Math.cos(theta);
      spherePos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      spherePos[i*3+2] = r * Math.cos(phi);
      sphereCol[i*3] = 1.0; sphereCol[i*3+1] = 0.97; sphereCol[i*3+2] = 0.90;
    }
    geometryData.current['sphere'] = { pos: spherePos, col: sphereCol };

    // Helper to generate shapes
    const buildShape = (name, logic) => {
      const pos = new Float32Array(numParticles * 3);
      const col = new Float32Array(numParticles * 3);
      for (let i = 0; i < numParticles; i++) {
        const {x, y, z, r, g, b} = logic(i, numParticles);
        pos[i*3] = x; pos[i*3+1] = y; pos[i*3+2] = z;
        col[i*3] = r; col[i*3+1] = g; col[i*3+2] = b;
      }
      geometryData.current[name] = { pos, col };
    };

    // 1. Gift Box
    buildShape('giftbox', () => {
      let x = (Math.random() - 0.5) * 3;
      let y = (Math.random() - 0.5) * 3;
      let z = (Math.random() - 0.5) * 3;
      let r = 0.9, g = 0.2, b = 0.3; // Red box
      // Ribbons
      if (Math.abs(x) < 0.2 || Math.abs(y) < 0.2) { r = 1; g = 0.8; b = 0.2; }
      return { x, y, z, r, g, b };
    });

    // 2. Candle
    buildShape('candle', () => {
      let x = (Math.random() - 0.5) * 1;
      let y = (Math.random() - 0.5) * 4;
      let z = (Math.random() - 0.5) * 1;
      let r = 0.9, g = 0.9, b = 0.9;
      if (y > 1.8) {
        // Flame
        x = (Math.random() - 0.5) * (3 - y);
        z = (Math.random() - 0.5) * (3 - y);
        r = 1; g = 0.6; b = 0.1;
      }
      return { x, y, z, r, g, b };
    });

    // 3. Star
    buildShape('star', () => {
      const angle = Math.random() * Math.PI * 2;
      const rad = Math.random() * 3;
      const spikes = 5;
      const inner = 1.0, outer = 3.0;
      const rot = Math.PI / 2 * 3;
      const step = Math.PI / spikes;
      // Simplistic procedural star map
      let x = Math.cos(angle) * rad;
      let y = Math.sin(angle) * rad;
      return { x, y, z: (Math.random()-0.5)*0.5, r: 1, g: 0.9, b: 0.4 };
    });

    // 4. House
    buildShape('house', () => {
      let x = (Math.random() - 0.5) * 4;
      let y = (Math.random() - 0.5) * 4;
      let z = (Math.random() - 0.5) * 0.5;
      if (y > 1) { x = (Math.random() - 0.5) * (4 - (y - 1) * 2); } 
      else { x = (Math.random() - 0.5) * 3; }
      return { x, y: y - 1, z, r: 0.83, g: 0.68, b: 0.21 };
    });

    // 5. Key
    buildShape('key', () => {
      let x = (Math.random() - 0.5) * 4;
      let y = (Math.random() - 0.5) * 1;
      let z = (Math.random() - 0.5) * 0.2;
      if (x < -1) { y = (Math.random() - 0.5) * 2; } // Handle
      if (x > 1 && y < -0.2) { y = (Math.random() - 1) * 1.5; } // Teeth
      return { x, y, z, r: 0.8, g: 0.7, b: 0.3 };
    });

    // 6. Girl on Road
    buildShape('girl_road', () => {
      let x = (Math.random() - 0.5) * 4;
      let y = (Math.random() - 0.5) * 4;
      let z = (Math.random() - 0.5) * 4;
      let r = 0.5, g = 0.6, b = 1.0;
      if (y < -1) {
        // Road
        z = y * 2; x = x * (y + 3);
        r = 0.3; g = 0.3; b = 0.4;
      } else {
        // Girl (triangle body, round head)
        x = x * 0.3; z = 0;
        if (y > 1.5) { x = (Math.random() - 0.5)*0.5; y = 1.5 + Math.random()*0.5; r=1; g=0.8; b=0.7; }
        else { x = x * (1.5 - y); r = 0.8; g = 0.2; b = 0.4; } // Dress
      }
      return { x, y, z, r, g, b };
    });

    // 7. Bicycle
    buildShape('bicycle', () => {
      let r = 1.0, g = 0.8, b = 0.2;
      let type = Math.random();
      let x, y, z = (Math.random()-0.5)*0.2;
      if (type < 0.4) {
        // Wheel 1
        let a = Math.random() * Math.PI * 2, rad = Math.random();
        x = -1.5 + Math.cos(a)*rad; y = -1 + Math.sin(a)*rad;
      } else if (type < 0.8) {
        // Wheel 2
        let a = Math.random() * Math.PI * 2, rad = Math.random();
        x = 1.5 + Math.cos(a)*rad; y = -1 + Math.sin(a)*rad;
      } else {
        // Frame
        x = (Math.random() - 0.5) * 3;
        y = (Math.random() - 0.5) * 2;
        r = 0.9; g = 0.1; b = 0.1;
      }
      return { x, y, z, r, g, b };
    });

    // 8. Books
    buildShape('books', () => {
      let x = (Math.random() - 0.5) * 3;
      let y = (Math.random() - 0.5) * 3;
      let z = (Math.random() - 0.5) * 2;
      // Create horizontal layers
      y = Math.floor(y * 3) / 3 + Math.random() * 0.1;
      let r = 0.2 + Math.random()*0.5, g = 0.4 + Math.random()*0.5, b = 0.8;
      return { x, y, z, r, g, b };
    });

    // 9. Spotlight
    buildShape('spotlight', () => {
      let y = Math.random() * 5 - 2.5; // -2.5 to 2.5
      let rad = (2.5 - y) * 0.5; // wider at bottom
      let a = Math.random() * Math.PI * 2;
      let x = Math.cos(a) * Math.random() * rad;
      let z = Math.sin(a) * Math.random() * rad;
      return { x, y, z, r: 1, g: 0.9, b: 0.8 };
    });

    // 10. Heart
    buildShape('heart', (i) => {
      const t = Math.random() * Math.PI * 2;
      const rad = Math.random() * 0.5 + 0.5; 
      const x = rad * 16 * Math.pow(Math.sin(t), 3);
      const y = rad * (13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
      return { x: x*0.1, y: y*0.1, z: (Math.random()-0.5)*0.5, r: 1, g: 0.4, b: 0.6 };
    });

    // Portrait (Fallback to sphere until loaded)
    geometryData.current['portrait'] = { pos: new Float32Array(spherePos), col: new Float32Array(sphereCol) };

    const img = new Image();
    img.src = '/images/payo.jpg';
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
      
      for (let i = 0; i < numParticles; i++) {
        let x = Math.floor(Math.random() * size);
        let y = Math.floor(Math.random() * size);
        let index = (y * size + x) * 4;
        
        portraitPos[i*3] = (x / size - 0.5) * 4;
        portraitPos[i*3+1] = -(y / size - 0.5) * 4; 
        portraitPos[i*3+2] = (Math.random() - 0.5) * 0.2; 
        
        portraitCol[i*3] = imgData[index] / 255;
        portraitCol[i*3+1] = imgData[index+1] / 255;
        portraitCol[i*3+2] = imgData[index+2] / 255;
      }
      geometryData.current['portrait'] = { pos: portraitPos, col: portraitCol };
    };

    window.morphTo = (shapeName, duration = 2) => {
      if (!meshRef.current || !geometryData.current[shapeName]) return;
      const geom = meshRef.current.geometry;
      const mat = materialRef.current;
      
      const targetPos = geom.attributes.targetPosition.array;
      const targetCol = geom.attributes.targetColor.array;
      geom.setAttribute('currentPosition', new THREE.BufferAttribute(new Float32Array(targetPos), 3));
      geom.setAttribute('currentColor', new THREE.BufferAttribute(new Float32Array(targetCol), 3));
      
      geom.setAttribute('targetPosition', new THREE.BufferAttribute(geometryData.current[shapeName].pos, 3));
      geom.setAttribute('targetColor', new THREE.BufferAttribute(geometryData.current[shapeName].col, 3));
      
      mat.uniforms.uProgress.value = 0;
      gsap.to(mat.uniforms.uProgress, { value: 1, duration: duration, ease: "power2.inOut" });
    };
  }, []);

  useFrame((state) => {
    if (materialRef.current) materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    if (meshRef.current && materialRef.current && materialRef.current.uniforms.uProgress.value === 1) {
      meshRef.current.rotation.y += 0.001;
    }
  });

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
        uniforms={{ uProgress: { value: 1.0 }, uTime: { value: 0 } }}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
