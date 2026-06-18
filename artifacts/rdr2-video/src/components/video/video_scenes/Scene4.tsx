import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 3500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center"
      {...sceneTransitions.wipe}
    >
      {/* Background Sparks specifically for this scene */}
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-60">
        <video 
          src={`${import.meta.env.BASE_URL}videos/sparks.mp4`}
          className="w-full h-full object-cover"
          autoPlay 
          muted 
          playsInline
        />
      </div>

      <div className="absolute inset-0 flex items-center px-32 z-10">
        <div className="w-1/2 pr-24">
          <motion.h2 
            className="text-[4.5vw] font-display text-text-primary leading-tight mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            Interactive<br/>Tracking
          </motion.h2>

          <div className="space-y-8">
            {[
              { title: "Progress Rings", desc: "Visual stats per section" },
              { title: "Smart Checklists", desc: "Never lose your place" },
              { title: "World Map", desc: "Find every collectible" }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                className="flex items-center gap-6"
                initial={{ opacity: 0, x: -20 }}
                animate={phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center shrink-0">
                  <div className="w-4 h-4 bg-primary rounded-full" />
                </div>
                <div>
                  <h4 className="text-[1.5vw] font-body text-text-primary font-bold">{feature.title}</h4>
                  <p className="text-[1.2vw] text-text-muted">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="w-1/2 relative h-[80vh]">
          {/* Abstract UI Mockup */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24vw] h-[48vw] bg-bg-light rounded-[2rem] border-4 border-bg-muted overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 100, rotateY: 30, rotateZ: -10 }}
            animate={phase >= 1 ? { opacity: 1, y: "-50%", rotateY: -10, rotateZ: 5 } : { opacity: 0, y: 100 }}
            transition={{ duration: 1.5, type: 'spring', stiffness: 100 }}
          >
            {/* Mock Header */}
            <div className="h-24 bg-bg-dark border-b border-secondary/20 p-6">
              <div className="w-1/2 h-4 bg-secondary/40 rounded-full mb-3" />
              <div className="w-3/4 h-8 bg-primary/20 rounded-full" />
            </div>

            {/* Mock Progress Ring */}
            <div className="p-8 flex justify-center border-b border-secondary/20">
              <motion.div 
                className="w-32 h-32 rounded-full border-8 border-bg-muted relative flex items-center justify-center"
                initial={{ rotate: -90 }}
              >
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <motion.circle 
                    cx="64" cy="64" r="56" 
                    fill="none" 
                    stroke="var(--color-primary)" 
                    strokeWidth="8"
                    strokeDasharray="351"
                    initial={{ strokeDashoffset: 351 }}
                    animate={phase >= 3 ? { strokeDashoffset: 100 } : { strokeDashoffset: 351 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                </svg>
                <span className="text-xl font-bold text-primary">72%</span>
              </motion.div>
            </div>

            {/* Mock List Items */}
            <div className="p-6 space-y-4">
              {[1,2,3,4].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <motion.div 
                    className="w-6 h-6 rounded-sm border-2 border-primary/50 shrink-0"
                    animate={phase >= 3 && i <= 2 ? { backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-primary)' } : {}}
                    transition={{ delay: i * 0.4 }}
                  />
                  <div className="flex-1 h-3 bg-secondary/20 rounded-full" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
