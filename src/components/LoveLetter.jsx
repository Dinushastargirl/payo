import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center py-24 bg-transparent overflow-hidden">
      
      {!isOpen ? (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ y: -10, scale: 1.05 }}
          className="cursor-pointer relative z-20 group"
          onClick={() => setIsOpen(true)}
        >
          <div className="w-80 h-56 bg-[#2a1b3d] rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-[#3d2b56] relative overflow-hidden flex items-center justify-center">
            {/* Envelope Flap styling */}
            <div className="absolute top-0 left-0 w-full h-1/2 border-b-2 border-[#3d2b56] transform origin-top rotate-0 z-10 bg-[#322047]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
            
            <div className="w-12 h-12 rounded-full bg-gold/80 absolute z-20 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.5)] top-[40%] group-hover:scale-110 transition-transform">
              <span className="text-[#1a0b2e] font-serif text-xl">P</span>
            </div>
            
            <p className="absolute bottom-4 text-white/50 text-sm font-light tracking-widest uppercase">Open Me</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-30 max-w-2xl w-full mx-4"
        >
          <div className="bg-[#fdfbf7] p-8 md:p-16 rounded-sm shadow-[0_0_60px_rgba(255,255,255,0.1)] relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-[#1a0b2e]/40 hover:text-[#1a0b2e] transition-colors"
            >
              Close
            </button>
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 1.5 }
                }
              }}
              className="handwriting text-3xl md:text-4xl text-[#1a0b2e] leading-relaxed space-y-8"
            >
              <motion.p
                variants={{
                  hidden: { opacity: 0, filter: 'blur(5px)' },
                  visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 2 } }
                }}
              >
                Dear Payo,
              </motion.p>
              
              <motion.p
                variants={{
                  hidden: { opacity: 0, filter: 'blur(5px)' },
                  visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 2 } }
                }}
              >
                I wanted to create something different.<br/>
                Not just a message.<br/>
                Not just a gift.
              </motion.p>

              <motion.p
                variants={{
                  hidden: { opacity: 0, filter: 'blur(5px)' },
                  visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 2 } }
                }}
              >
                A small universe that reminds you how special you are.
              </motion.p>

              <motion.p
                variants={{
                  hidden: { opacity: 0, filter: 'blur(5px)' },
                  visible: { opacity: 1, filter: 'blur(0px)', transition: { duration: 2 } }
                }}
                className="pt-8 text-[#8c1b3f]"
              >
                Happy Birthday ❤️
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
