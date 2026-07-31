import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const memories = [
  {
    id: 1,
    title: "The Little Moments",
    message: "Every small moment with you feels like a beautiful dream. You have this magical ability to make the ordinary extraordinary.",
    image: "/images/memory1.jpg", // Placeholder
    flowerColor: "from-pink-500 to-purple-500",
  },
  {
    id: 2,
    title: "The Beautiful Memories",
    message: "Looking back, all my favorite memories have you in them. You are the brightest star in my sky.",
    image: "/images/memory2.jpg", // Placeholder
    flowerColor: "from-purple-500 to-indigo-500",
  },
  {
    id: 3,
    title: "What Makes Payo Special",
    message: "Your kindness, your smile, and your heart of gold. The world is simply a better place because you are in it.",
    image: "/images/memory3.jpg", // Placeholder
    flowerColor: "from-yellow-400 to-orange-500",
  }
];

export default function MemoryGarden() {
  const [activeMemory, setActiveMemory] = useState(null);

  return (
    <div className="relative min-h-screen w-full bg-transparent py-24 px-4 flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl gold-text mb-16 text-center">Memory Garden</h2>
      
      <div className="flex flex-col md:flex-row gap-12 md:gap-24 justify-center items-center max-w-6xl w-full">
        {memories.map((memory) => (
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: memory.id * 0.2 }}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setActiveMemory(memory)}
          >
            {/* Abstract Flower Shape */}
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              className={`w-32 h-32 rounded-full bg-gradient-to-tr ${memory.flowerColor} opacity-80 shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center`}
            >
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm" />
            </motion.div>
            
            <h3 className="mt-6 text-xl text-white font-medium text-center">{memory.title}</h3>
            <p className="text-sm text-white/50 mt-2">Click to bloom</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMemory(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel p-8 max-w-lg w-full relative overflow-hidden"
            >
              {/* Optional: Actual image reveal */}
              <div className="w-full h-48 bg-white/10 rounded-lg mb-6 flex items-center justify-center border border-white/5">
                <p className="text-white/30 text-sm italic">Image placeholder: {activeMemory.image}</p>
              </div>
              
              <h3 className="text-3xl gold-text mb-4 font-serif">{activeMemory.title}</h3>
              <p className="text-lg text-white/90 leading-relaxed handwriting">
                {activeMemory.message}
              </p>
              
              <button 
                onClick={() => setActiveMemory(null)}
                className="mt-8 px-6 py-2 rounded-full border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
