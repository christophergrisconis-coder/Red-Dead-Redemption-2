import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 3000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center"
      {...sceneTransitions.zoomThrough}
    >
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          className="flex overflow-hidden mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {['6', '0', '3'].map((digit, i) => (
            <motion.span
              key={i}
              className="text-[18vw] font-display text-primary leading-none"
              style={{ textShadow: '0 20px 50px rgba(0,0,0,0.9)' }}
              initial={{ y: '100%', opacity: 0 }}
              animate={phase >= 1 ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
              transition={{ 
                duration: 1, 
                ease: [0.16, 1, 0.3, 1], 
                delay: i * 0.15 
              }}
            >
              {digit}
            </motion.span>
          ))}
        </motion.div>
        
        <motion.div
          className="overflow-hidden"
        >
          <motion.h2
            className="text-[4vw] text-text-primary tracking-[0.3em] font-body font-light uppercase"
            initial={{ y: '-100%', opacity: 0 }}
            animate={phase >= 2 ? { y: '0%', opacity: 1 } : { y: '-100%', opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            Items to Discover
          </motion.h2>
        </motion.div>

        <motion.p
          className="text-[1.5vw] text-text-muted mt-8 max-w-2xl text-center"
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          Leave no stone unturned. Track every detail of your 100% completion journey.
        </motion.p>
      </div>

      {/* Decorative large numbers in background */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 6, ease: 'linear' }}
      >
        <span className="text-[50vw] font-display text-primary font-bold">100%</span>
      </motion.div>
    </motion.div>
  );
}
