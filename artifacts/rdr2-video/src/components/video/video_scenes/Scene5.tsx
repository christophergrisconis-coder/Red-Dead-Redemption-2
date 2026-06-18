import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 2000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-black"
      {...sceneTransitions.fadeBlur}
    >
      {/* Cowboy Silhouette Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: 'easeOut' }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}images/cowboy.png`}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center px-12 mt-48">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <h2 className="text-[2vw] text-primary tracking-[0.4em] uppercase font-body mb-4">
            Built for PlayStation 5
          </h2>
          <h1 className="text-[6vw] font-display text-text-primary leading-none shadow-black drop-shadow-2xl">
            YOUR JOURNEY AWAITS
          </h1>
        </motion.div>

        <motion.div 
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          <div className="w-[15vw] h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  );
}
