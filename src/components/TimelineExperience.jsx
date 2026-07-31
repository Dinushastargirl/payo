import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const timelineData = [
  {
    year: "2022",
    title: "The Beginning",
    description: "When our story started to unfold. A beautiful chapter begins.",
    image: "/images/2022.jpg"
  },
  {
    year: "2023",
    title: "Growing Together",
    description: "Every laugh, every shared secret, building a foundation of magic.",
    image: "/images/2023.jpg"
  },
  {
    year: "2024",
    title: "Unforgettable",
    description: "Moments that took my breath away and stayed in my heart forever.",
    image: "/images/2024.jpg"
  },
  {
    year: "2025",
    title: "The Present",
    description: "Right here, right now. Celebrating the amazing person you are today.",
    image: "/images/2025.jpg"
  },
  {
    year: "Today",
    title: "Happy Birthday",
    description: "To many more years of magic, joy, and beautiful memories.",
    image: "/images/today.jpg"
  }
];

export default function TimelineExperience() {
  const [activeYear, setActiveYear] = useState(timelineData[timelineData.length - 1]);

  return (
    <div className="relative min-h-screen w-full bg-transparent py-24 flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl font-light text-white mb-20">A Journey Through Time</h2>
      
      <div className="w-full max-w-5xl px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
        
        {/* Timeline Navigation */}
        <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-12 overflow-x-auto md:overflow-visible w-full md:w-auto p-4 md:p-0 hide-scrollbar">
          {timelineData.map((item, index) => (
            <div key={item.year} className="relative flex items-center group cursor-pointer" onClick={() => setActiveYear(item)}>
              <motion.div 
                className={`w-4 h-4 rounded-full border-2 transition-colors ${activeYear.year === item.year ? 'bg-gold border-gold scale-125 shadow-[0_0_15px_rgba(212,175,55,0.8)]' : 'bg-transparent border-white/30 group-hover:border-white/70'}`}
                whileHover={{ scale: 1.2 }}
              />
              <span className={`ml-6 text-xl font-medium transition-colors ${activeYear.year === item.year ? 'gold-text' : 'text-white/50 group-hover:text-white/80'}`}>
                {item.year}
              </span>
              
              {/* Connecting line for desktop */}
              {index < timelineData.length - 1 && (
                <div className="hidden md:block absolute left-[7px] top-[16px] w-[2px] h-12 bg-white/10" />
              )}
            </div>
          ))}
        </div>

        {/* Timeline Content */}
        <div className="mt-16 md:mt-0 md:ml-24 flex-1 w-full relative h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeYear.year}
              initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <div className="glass-panel p-8 md:p-12 h-full flex flex-col justify-center">
                <span className="text-6xl text-white/10 font-bold absolute top-4 right-8 select-none">
                  {activeYear.year}
                </span>
                
                <h3 className="text-3xl md:text-5xl pink-glow mb-6 relative z-10 font-serif">
                  {activeYear.title}
                </h3>
                
                <p className="text-xl text-white/80 leading-relaxed max-w-xl relative z-10">
                  {activeYear.description}
                </p>
                
                <div className="mt-8 w-full h-32 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center relative z-10 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="text-sm text-white/40 z-10 group-hover:text-white/80 transition-colors">
                    [ Image: {activeYear.image} ]
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
      </div>
    </div>
  );
}
