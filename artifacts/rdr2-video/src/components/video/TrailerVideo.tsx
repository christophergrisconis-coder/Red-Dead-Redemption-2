import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';

// Palette
const colors = {
  charcoal: '#0d0a08',
  bloodRed: '#8b1a1a',
  gold: '#c9a227',
  boneWhite: '#f0e8d8',
  ash: '#2a1f15',
};

const SCENE_DURATIONS = {
  intro: 3000,
  title: 5000,
  fastCuts: 8000,
  showcase: 8000,
  landscape: 6000,
  guide: 4000,
  outro: 4000,
};

// ==========================================
// SCENES
// ==========================================

function IntroScene() {
  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-[#0d0a08]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Ember */}
      <motion.div 
        className="absolute w-2 h-2 rounded-full bg-[#8b1a1a]"
        style={{ boxShadow: '0 0 10px 5px rgba(139,26,26,0.5)' }}
        initial={{ y: '20vh', opacity: 0 }}
        animate={{ y: '-20vh', opacity: [0, 1, 0] }}
        transition={{ duration: 3, ease: 'easeOut' }}
      />
      
      <motion.h1 
        className="text-[12vw] tracking-[0.2em] text-[#f0e8d8]"
        style={{ fontFamily: "'Cinzel', serif" }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: [0, 1, 0], scale: 1.05 }}
        transition={{ duration: 3, times: [0, 0.5, 1] }}
      >
        OUTLAWS
      </motion.h1>
    </motion.div>
  );
}

function TitleScene() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 4800), // Gunshot flash at 4.8s
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const text = "RED DEAD REDEMPTION II";

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d0a08]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Dust particles */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#f0e8d8] rounded-full"
            initial={{ 
              x: `${Math.random() * 100}vw`, 
              y: `${Math.random() * 100}vh`,
              opacity: Math.random() 
            }}
            animate={{ 
              x: `+=${Math.random() * 10 - 5}vw`,
              y: `-=${Math.random() * 5 + 5}vh`
            }}
            transition={{ duration: 5, ease: 'linear' }}
          />
        ))}
      </div>

      <motion.div 
        className="h-[2px] bg-[#c9a227] mb-8"
        initial={{ width: 0 }}
        animate={phase >= 1 ? { width: '60vw' } : { width: 0 }}
        transition={{ duration: 1.5, ease: 'circOut' }}
      />

      <h1 
        className="text-[5vw] tracking-[0.15em] text-[#f0e8d8] text-center"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: i * 0.05 + 0.5, duration: 0.5 }}
          >
            {char}
          </motion.span>
        ))}
      </h1>

      {/* Gunshot flash */}
      {phase >= 2 && (
        <motion.div 
          className="absolute inset-0 bg-white z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'circOut' }}
        />
      )}
    </motion.div>
  );
}

function FastCutsScene() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // 0-2s: COMPLETE WALKTHROUGH
    // 2-3.5s: 16 LEGENDARY ANIMALS
    // 3.5-5s: 24 GOLD BAR LOCATIONS
    // 5-6.5s: 144 CIGARETTE CARDS
    // 6.5-8s: INTERACTIVE MAP + APPLE PENCIL
    const timers = [
      setTimeout(() => setPhase(1), 2000),
      setTimeout(() => setPhase(2), 3500),
      setTimeout(() => setPhase(3), 5000),
      setTimeout(() => setPhase(4), 6500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 bg-[#0d0a08] flex items-center justify-center overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="cut1" className="relative"
            initial={{ scale: 1.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-[7vw] font-bold text-[#8b1a1a] tracking-tighter" style={{ fontFamily: "'Cinzel', serif" }}>
              COMPLETE WALKTHROUGH
            </h2>
            <motion.div 
              className="absolute top-1/2 left-[-10%] right-[-10%] h-[1vw] bg-[#8b1a1a]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>
        )}
        {phase === 1 && (
          <motion.div key="cut2" className="flex flex-col items-center"
            initial={{ x: '100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '-100vw' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="w-[15vw] h-[15vw] rounded-full border-[1vw] border-[#c9a227] flex items-center justify-center mb-8">
              <div className="w-[8vw] h-[8vw] bg-[#c9a227]" style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }} />
            </div>
            <h2 className="text-[5vw] text-[#f0e8d8]" style={{ fontFamily: "'Cinzel', serif" }}>
              16 LEGENDARY ANIMALS
            </h2>
          </motion.div>
        )}
        {phase === 2 && (
          <motion.div key="cut3" className="flex flex-col items-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="w-[15vw] h-[15vw] rounded-full bg-[#c9a227] mb-8 border-[0.5vw] border-[#f0e8d8]"
              animate={{ rotateY: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <h2 className="text-[5vw] text-[#f0e8d8]" style={{ fontFamily: "'Cinzel', serif" }}>
              24 GOLD BAR LOCATIONS
            </h2>
          </motion.div>
        )}
        {phase === 3 && (
          <motion.div key="cut4" className="flex flex-col items-center"
            initial={{ y: '100vh' }}
            animate={{ y: 0 }}
            exit={{ y: '-100vh' }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          >
            <div className="flex space-x-[-5vw] mb-8">
              {[...Array(5)].map((_, i) => (
                <motion.div 
                  key={i}
                  className="w-[8vw] h-[12vw] bg-[#f0e8d8] border-[0.2vw] border-[#0d0a08]"
                  initial={{ rotate: 0, y: 0 }}
                  animate={{ rotate: (i - 2) * 15, y: Math.abs(i - 2) * 20 }}
                  transition={{ duration: 0.5 }}
                />
              ))}
            </div>
            <h2 className="text-[5vw] text-[#f0e8d8]" style={{ fontFamily: "'Cinzel', serif" }}>
              144 CIGARETTE CARDS
            </h2>
          </motion.div>
        )}
        {phase === 4 && (
          <motion.div key="cut5" className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h2 className="text-[4.5vw] text-[#c9a227] text-center max-w-[80vw]" style={{ fontFamily: "'Cinzel', serif" }}>
              INTERACTIVE MAP + APPLE PENCIL
            </h2>
            <div className="w-[60vw] h-[20vw] mt-8 relative">
              <motion.div 
                className="absolute top-[50%] left-0 h-[0.5vw] bg-[#8b1a1a]"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1 }}
              />
              <motion.div 
                className="absolute top-[20%] w-[2vw] h-[10vw] bg-[#f0e8d8] rounded-full"
                style={{ rotate: '45deg' }}
                initial={{ left: 0 }}
                animate={{ left: '100%' }}
                transition={{ duration: 1 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Three phone mockups showing the actual app UI
const APP_SCREENS = [
  {
    img: '/rdr2-video/images/app_welcome.jpg',
    label: 'Complete Walkthrough',
    sub: 'All Chapters · Gold Tips',
    delay: 0,
    fromX: '-120%',
    rotate: -8,
  },
  {
    img: '/rdr2-video/images/app_all_screens.jpg',
    label: 'Every Collectible',
    sub: '16 Animals · 24 Gold Bars · 144 Cards',
    delay: 0.4,
    fromX: '0%',
    rotate: 0,
  },
  {
    img: '/rdr2-video/images/app_screen1.jpg',
    label: 'Interactive Map',
    sub: 'Draw with Apple Pencil Pro',
    delay: 0.8,
    fromX: '120%',
    rotate: 8,
  },
];

function AppShowcaseScene() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 5500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 bg-[#0d0a08] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(8px)' }}
      transition={{ duration: 0.6 }}
    >
      {/* Subtle vignette bg */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, rgba(201,162,39,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Top label */}
      <motion.p
        className="text-[1.4vw] tracking-[0.4em] text-[#c9a227] uppercase mb-[3vh]"
        style={{ fontFamily: "'Cinzel', serif" }}
        initial={{ opacity: 0, y: -16 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.8 }}
      >
        See It In Action
      </motion.p>

      {/* Three phones */}
      <div className="flex items-end justify-center gap-[3vw]">
        {APP_SCREENS.map((screen, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center gap-[1.5vh]"
            initial={{ opacity: 0, x: screen.fromX, rotate: screen.rotate, y: 40 }}
            animate={
              phase >= 1
                ? { opacity: 1, x: '0%', rotate: i === 1 ? 0 : screen.rotate * 0.3, y: i === 1 ? -12 : 0 }
                : { opacity: 0, x: screen.fromX, rotate: screen.rotate, y: 40 }
            }
            transition={{ duration: 0.9, delay: screen.delay, type: 'spring', stiffness: 120, damping: 18 }}
          >
            {/* Phone frame */}
            <div
              style={{
                width: i === 1 ? '14vw' : '11vw',
                height: i === 1 ? '28vh' : '22vh',
                background: '#1a1410',
                borderRadius: '2.5vw',
                border: `0.2vw solid ${i === 1 ? '#c9a227' : 'rgba(201,162,39,0.3)'}`,
                boxShadow: i === 1
                  ? '0 0 40px rgba(201,162,39,0.25), 0 20px 60px rgba(0,0,0,0.8)'
                  : '0 10px 40px rgba(0,0,0,0.7)',
                overflow: 'hidden',
                position: 'relative',
                flexShrink: 0,
              }}
            >
              {/* Notch */}
              <div
                style={{
                  position: 'absolute',
                  top: '1vw',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '3vw',
                  height: '0.5vw',
                  background: '#0d0a08',
                  borderRadius: '1vw',
                  zIndex: 10,
                }}
              />
              {/* Screenshot */}
              <img
                src={screen.img}
                alt={screen.label}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
              />
              {/* Screen sheen */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Label under phone */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.6, delay: screen.delay + 0.5 }}
            >
              <p
                className="text-[#f0e8d8]"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: i === 1 ? '1.3vw' : '1vw',
                  letterSpacing: '0.1em',
                }}
              >
                {screen.label}
              </p>
              <p
                className="text-[#c9a227]"
                style={{
                  fontFamily: "'Crimson Text', serif",
                  fontSize: i === 1 ? '1vw' : '0.85vw',
                  opacity: 0.8,
                  marginTop: '0.3vh',
                }}
              >
                {screen.sub}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Bottom tagline — fades in late */}
      <motion.p
        className="text-[1.2vw] text-[#f0e8d8]/50 tracking-[0.25em] mt-[3vh]"
        style={{ fontFamily: "'Crimson Text', serif", fontStyle: 'italic' }}
        initial={{ opacity: 0 }}
        animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        "The most complete RDR2 companion ever made"
      </motion.p>
    </motion.div>
  );
}

function LandscapeScene() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1500),
      setTimeout(() => setPhase(2), 3000),
      setTimeout(() => setPhase(3), 4500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 bg-[#0d0a08] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Sky & Moon */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1410] to-[#0d0a08]" />
      <div className="absolute top-[10vh] right-[15vw] w-[10vw] h-[10vw] rounded-full bg-[#f0e8d8] opacity-80" style={{ boxShadow: '0 0 50px rgba(240,232,216,0.3)' }}>
        <div className="absolute top-[-1vw] right-[1vw] w-[9vw] h-[9vw] rounded-full bg-[#1a1410]" />
      </div>

      {/* Hills */}
      <div className="absolute bottom-[-10vh] left-[-10vw] w-[70vw] h-[40vh] bg-[#080605] rounded-[50%]" />
      <div className="absolute bottom-[-5vh] right-[-20vw] w-[80vw] h-[35vh] bg-[#050403] rounded-[50%]" />
      <div className="absolute bottom-0 left-[20vw] w-[60vw] h-[25vh] bg-[#000000] rounded-[50%]" />

      {/* Lone Tree */}
      <div className="absolute bottom-[20vh] left-[35vw] w-[1vw] h-[10vh] bg-[#000000]">
        <div className="absolute top-[-3vh] left-[-3vw] w-[7vw] h-[6vh] bg-[#000000] rounded-full" />
        <div className="absolute top-[-5vh] left-[0vw] w-[5vw] h-[5vh] bg-[#000000] rounded-full" />
      </div>

      {/* Campfire glow & embers */}
      <motion.div 
        className="absolute bottom-[-20vh] left-[40vw] w-[40vw] h-[40vh] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(139,26,26,0.4) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[5vh] w-[0.5vw] h-[0.5vw] bg-[#c9a227] rounded-full"
          style={{ left: `${45 + Math.random() * 10}vw` }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: '-50vh', opacity: [0, 1, 0], x: `+=${Math.random() * 10 - 5}vw` }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3 }}
        />
      ))}

      {/* Text reveal */}
      <div className="absolute top-[20vh] left-[10vw]" style={{ fontFamily: "'Crimson Text', serif" }}>
        <motion.p className="text-[3vw] text-[#f0e8d8] mb-4" initial={{ opacity: 0 }} animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 1 }}>Every secret.</motion.p>
        <motion.p className="text-[3vw] text-[#f0e8d8] mb-4" initial={{ opacity: 0 }} animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 1 }}>Every location.</motion.p>
        <motion.p className="text-[3vw] text-[#c9a227]" initial={{ opacity: 0 }} animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 1 }}>Every gold medal.</motion.p>
      </div>
    </motion.div>
  );
}

function GuideScene() {
  return (
    <motion.div 
      className="absolute inset-0 bg-[#0d0a08] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="relative p-12">
        <motion.div 
          className="absolute inset-0 border-[0.2vw] border-[#c9a227]/30"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        <motion.h1 
          className="text-[6vw] text-[#f0e8d8] text-center"
          style={{ fontFamily: "'Cinzel', serif", textShadow: '0 0 30px rgba(201,162,39,0.5)' }}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5 }}
        >
          THE COMPLETE<br/>GUIDE
        </motion.h1>
      </div>
    </motion.div>
  );
}

function OutroScene() {
  return (
    <motion.div 
      className="absolute inset-0 bg-black flex flex-col items-center justify-center"
      initial={{ scale: 1.2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }} // Hard smash cut
    >
      <h1 
        className="text-[8vw] text-white tracking-widest text-center"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        RDR2 INTERACTIVE<br/>GUIDE
      </h1>
      <div className="w-[40vw] h-[0.5vw] bg-[#8b1a1a] mt-4 mb-8" />
      <p 
        className="text-[2.5vw] text-[#c9a227] tracking-widest"
        style={{ fontFamily: "'Crimson Text', serif" }}
      >
        Available on Itch.io · $4.99
      </p>
    </motion.div>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================

export function TrailerVideo() {
  const { currentSceneKey } = useVideoPlayer({ durations: SCENE_DURATIONS, loop: true });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Crimson+Text:ital,wght@0,400;0,700;1,400&display=swap');
      `}</style>
      <div className="relative w-full h-screen overflow-hidden bg-black select-none pointer-events-none">
        <AnimatePresence mode="popLayout">
          {currentSceneKey === 'intro' && <IntroScene key="intro" />}
          {currentSceneKey === 'title' && <TitleScene key="title" />}
          {currentSceneKey === 'fastCuts' && <FastCutsScene key="fastCuts" />}
          {currentSceneKey === 'showcase' && <AppShowcaseScene key="showcase" />}
          {currentSceneKey === 'landscape' && <LandscapeScene key="landscape" />}
          {currentSceneKey === 'guide' && <GuideScene key="guide" />}
          {currentSceneKey === 'outro' && <OutroScene key="outro" />}
        </AnimatePresence>
      </div>
    </>
  );
}
