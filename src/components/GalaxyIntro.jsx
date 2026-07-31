import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion, AnimatePresence } from 'framer-motion';

function StarField(props) {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function GalaxyIntro({ onEnter }) {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < 2) {
      setStep(prev => prev + 1);
    } else {
      onEnter();
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <StarField />
        </Canvas>
      </div>

      <div className="relative z-10 text-center px-4" onClick={nextStep}>
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.5 }}
              className="cursor-pointer"
            >
              <h1 className="text-3xl md:text-5xl font-light tracking-wider text-white">Before you continue...</h1>
              <p className="mt-4 text-white/50 text-sm">(Click anywhere)</p>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.5 }}
              className="cursor-pointer"
            >
              <h1 className="text-3xl md:text-5xl font-light tracking-wider text-white">I created a little universe for someone special.</h1>
              <p className="mt-4 text-white/50 text-sm">(Click anywhere)</p>
            </motion.div>
          )}

          {step === 2 && (
            <motion.button
              key="step2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 1 }}
              onClick={(e) => {
                e.stopPropagation();
                nextStep();
              }}
              className="px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white text-xl tracking-wider hover:bg-white/10 transition-colors gold-text pink-glow"
            >
              Enter Payo's World ✨
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
