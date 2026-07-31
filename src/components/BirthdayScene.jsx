import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Center, Text3D, MeshWobbleMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';

function Cake() {
  const cakeRef = useRef();
  
  useFrame((state, delta) => {
    if (cakeRef.current) {
      cakeRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={cakeRef}>
      {/* Base */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[2.2, 2.2, 0.2, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.8} />
      </mesh>
      
      {/* Tier 1 */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2, 2, 2, 32]} />
        <MeshWobbleMaterial factor={0.1} speed={1} color="#ffb6c1" />
      </mesh>

      {/* Tier 2 */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 1, 32]} />
        <MeshWobbleMaterial factor={0.15} speed={1.5} color="#d4af37" />
      </mesh>

      {/* Candle */}
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Flame */}
      <mesh position={[0, 3.2, 0]}>
        <coneGeometry args={[0.15, 0.4, 16]} />
        <meshStandardMaterial color="#ffcc00" emissive="#ffcc00" emissiveIntensity={2} />
        <pointLight color="#ffcc00" intensity={2} distance={10} decay={2} />
      </mesh>
    </group>
  );
}

export default function BirthdayScene() {
  const sentence = "Happy Birthday Payo ❤️";
  const letters = sentence.split("");
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.5 * i },
    }),
  };
  
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: { opacity: 0, y: 20 },
  };

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ffb6c1" />
          
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <Cake />
          </Float>
          
          {/* We're letting the user gently look around without moving the cake too far */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            maxPolarAngle={Math.PI / 2 + 0.2}
            minPolarAngle={Math.PI / 2 - 0.5}
          />
        </Canvas>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-end pb-24 md:pb-32 pointer-events-none">
        <motion.div
          className="text-4xl md:text-6xl lg:text-8xl font-bold pink-glow mb-4 flex space-x-2"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {letters.map((letter, index) => (
            <motion.span variants={child} key={index} className="gold-text">
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 3, duration: 1.5 }}
          className="text-lg md:text-2xl text-white/80 max-w-2xl text-center px-4 handwriting"
        >
          Today isn't just another day... <br/>
          It's the day someone amazing entered this world.
        </motion.p>
      </div>
    </div>
  );
}
