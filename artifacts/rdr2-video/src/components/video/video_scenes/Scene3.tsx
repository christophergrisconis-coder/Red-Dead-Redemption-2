import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

const SECTIONS = [
  "Main Story",
  "Side Quests",
  "Collectibles",
  "Challenges",
  "Treasure Hunts",
  "Special Items",
  "Hunting & Fishing",
  "Activities"
];

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 8500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center p-24"
      {...sceneTransitions.slideLeft}
    >
      <div className="w-1/3 pr-16 relative z-10">
        <motion.h2 
          className="text-[6vw] font-display text-text-primary leading-tight"
          initial={{ opacity: 0, x: -50 }}
          animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <span className="text-primary block text-[8vw]">8</span>
          Distinct<br/>Sections
        </motion.h2>
        
        <motion.div 
          className="w-24 h-1 bg-primary mt-8"
          initial={{ scaleX: 0 }}
          animate={phase >= 1 ? { scaleX: 1 } : { scaleX: 0 }}
          style={{ transformOrigin: 'left' }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </div>

      <div className="w-2/3 h-full flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-2 gap-6">
          {SECTIONS.map((section, i) => (
            <motion.div
              key={section}
              className="bg-bg-light/80 border border-secondary/30 p-6 rounded-sm backdrop-blur-sm"
              initial={{ opacity: 0, x: 100, rotateX: 45 }}
              animate={phase >= 2 ? { opacity: 1, x: 0, rotateX: 0 } : { opacity: 0, x: 100, rotateX: 45 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1], 
                delay: i * 0.15 
              }}
            >
              <div className="w-8 h-8 rounded-full border border-primary/50 mb-4 flex items-center justify-center text-primary/50">
                <div className="w-2 h-2 bg-primary/50 rounded-full" />
              </div>
              <h3 className="text-[1.8vw] font-body text-text-primary">{section}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
