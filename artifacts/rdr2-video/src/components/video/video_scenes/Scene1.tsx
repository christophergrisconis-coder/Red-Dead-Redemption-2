import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 4500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center"
      {...sceneTransitions.fadeBlur}
    >
      <motion.div 
        className="text-center px-12"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, ease: 'easeOut' }}
      >
        <motion.p 
          className="text-[2vw] text-primary tracking-[0.5em] uppercase font-body mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          The Complete
        </motion.p>
        
        <motion.h1 
          className="text-[8vw] font-display text-text-primary leading-none tracking-tight"
          style={{ textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}
          initial={{ opacity: 0, filter: 'blur(20px)' }}
          animate={phase >= 2 ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(20px)' }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          COMPANION
        </motion.h1>

        <motion.div 
          className="w-[1px] h-24 bg-gradient-to-b from-primary to-transparent mx-auto mt-12"
          initial={{ scaleY: 0 }}
          animate={phase >= 2 ? { scaleY: 1 } : { scaleY: 0 }}
          style={{ transformOrigin: 'top' }}
          transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
}
