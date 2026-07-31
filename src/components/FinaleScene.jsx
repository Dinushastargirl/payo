import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = ["Beautiful", "Kind", "Amazing", "Special", "Loved", "Magic", "Perfect"];

export default function FinaleScene() {
  const [clicks, setClicks] = useState(0);
  const [floatingWords, setFloatingWords] = useState([]);
  const [showFinal, setShowFinal] = useState(false);
  const [boxOpen, setBoxOpen] = useState(false);

  const handleClick = useCallback((e) => {
    if (showFinal) return;
    
    setClicks(prev => prev + 1);

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Firework
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x, y },
      colors: ['#d4af37', '#ffb6c1', '#ffffff', '#a855f7']
    });

    // Add glowing word
    const newWord = {
      id: Date.now(),
      text: WORDS[Math.floor(Math.random() * WORDS.length)],
      x: e.clientX,
      y: e.clientY,
    };
    
    setFloatingWords(prev => [...prev, newWord]);
    
    // Remove word after 2s
    setTimeout(() => {
      setFloatingWords(prev => prev.filter(w => w.id !== newWord.id));
    }, 2000);

  }, [showFinal]);

  useEffect(() => {
    if (clicks > 10 && !showFinal) {
      setTimeout(() => {
        setShowFinal(true);
      }, 3000);
    }
  }, [clicks, showFinal]);

  return (
    <div 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden cursor-crosshair bg-black"
      onClick={handleClick}
    >
      {/* Background hint */}
      {!showFinal && clicks === 0 && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50 tracking-widest uppercase pointer-events-none text-center"
        >
          Click the sky <br/> to light it up
        </motion.p>
      )}

      {/* Floating words */}
      <AnimatePresence>
        {floatingWords.map(word => (
          <motion.div
            key={word.id}
            initial={{ opacity: 0, scale: 0.5, y: word.y, x: word.x - 50 }}
            animate={{ opacity: 1, scale: 1, y: word.y - 100, x: word.x - 50 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute text-3xl font-serif font-bold text-white pink-glow pointer-events-none"
            style={{ left: 0, top: 0 }}
          >
            {word.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Final Reveal Fade */}
      <AnimatePresence>
        {showFinal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
            className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            
            {!boxOpen ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5, delay: 1 }}
                className="cursor-pointer flex flex-col items-center group"
                onClick={() => setBoxOpen(true)}
              >
                {/* Minimalist Glowing Box */}
                <div className="w-32 h-32 border border-gold/50 shadow-[0_0_50px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_80px_rgba(212,175,55,0.6)] rounded-sm flex items-center justify-center bg-white/5 backdrop-blur-sm transition-all duration-500 relative">
                  {/* Ribbon cross */}
                  <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-gold/50 -translate-x-1/2" />
                  <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-gold/50 -translate-y-1/2" />
                  
                  {/* Bow */}
                  <div className="absolute -top-4 w-12 h-8 border-2 border-gold/80 rounded-full bg-black/50" />
                </div>
                <p className="mt-8 text-gold/70 tracking-widest text-sm uppercase">Open</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2 }}
                className="text-center px-4"
              >
                <h1 className="text-4xl md:text-6xl font-serif text-white mb-8 leading-tight gold-text">
                  The world became brighter <br/> the day you arrived.
                </h1>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 2 }}
                  className="handwriting text-5xl text-[#ffb6c1] mt-12"
                >
                  Happy Birthday Payo ❤️
                </motion.div>
              </motion.div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
