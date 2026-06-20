import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

// 15-second Itch.io cover video: 3 scenes × ~5s each
// Scene A: Title reveal (0–5s)
// Scene B: Feature flash (5–10s)
// Scene C: Logo lock-up + CTA (10–15s)

const FEATURES = [
  { icon: '📖', label: 'Full Walkthrough', sub: 'All Chapters · Gold Medals' },
  { icon: '🗺️', label: 'Interactive Map', sub: 'Draw & Annotate with Apple Pencil' },
  { icon: '🦌', label: '16 Legendary Animals', sub: 'Exact Piggyback Locations' },
  { icon: '🎣', label: '14 Legendary Fish', sub: 'Lures · Strategies · Maps' },
  { icon: '💰', label: '24 Gold Bar Locations', sub: 'Lockbox Puzzles Solved' },
  { icon: '🎴', label: '144 Cigarette Cards', sub: 'All 12 Sets · Atlas #601–630' },
];

export function CoverVideo() {
  const [scene, setScene] = useState<'A' | 'B' | 'C'>('A');
  const [featureIdx, setFeatureIdx] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setPhase(3), 3200),
      // Scene B
      setTimeout(() => { setScene('B'); setPhase(0); }, 5000),
      setTimeout(() => setFeatureIdx(1), 6400),
      setTimeout(() => setFeatureIdx(2), 7200),
      setTimeout(() => setFeatureIdx(3), 8000),
      setTimeout(() => setFeatureIdx(4), 8600),
      setTimeout(() => setFeatureIdx(5), 9200),
      // Scene C
      setTimeout(() => { setScene('C'); setPhase(0); }, 10000),
      setTimeout(() => setPhase(1), 10600),
      setTimeout(() => setPhase(2), 12000),
      setTimeout(() => setPhase(3), 13500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <div
      className="relative w-full h-full overflow-hidden flex items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at 50% 80%, #3d1a06 0%, #1a0d03 40%, #0a0604 100%)',
        fontFamily: "'Georgia', serif",
      }}
    >
      {/* Animated stars */}
      <Stars />

      {/* Campfire glow at bottom */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: '60%',
          height: '35%',
          background: 'radial-gradient(ellipse at 50% 100%, rgba(220,100,20,0.35) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.6, 1, 0.7, 0.9, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Horizon line */}
      <div
        className="absolute"
        style={{
          bottom: '18%',
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(200,140,40,0.4) 30%, rgba(220,160,60,0.6) 50%, rgba(200,140,40,0.4) 70%, transparent 100%)',
        }}
      />

      {/* ── SCENE A: Title Reveal ── */}
      <AnimatePresence>
        {scene === 'A' && (
          <motion.div
            key="sceneA"
            className="absolute inset-0 flex flex-col items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 0.8 }}
          >
            {/* Thin top rule */}
            <motion.div
              style={{ width: '120px', height: '1px', background: 'rgba(200,160,60,0.6)' }}
              initial={{ scaleX: 0 }}
              animate={phase >= 1 ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />

            <motion.p
              style={{ color: '#c8a040', letterSpacing: '0.4em', fontSize: '1.1vw', textTransform: 'uppercase' }}
              initial={{ opacity: 0, y: 10 }}
              animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.8 }}
            >
              Red Dead Redemption II
            </motion.p>

            <motion.h1
              style={{
                fontSize: '9vw',
                fontWeight: 900,
                color: '#f5e6c0',
                lineHeight: 0.9,
                textAlign: 'center',
                textShadow: '0 4px 40px rgba(220,120,20,0.5)',
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
              }}
              initial={{ opacity: 0, filter: 'blur(24px)', scale: 0.92 }}
              animate={phase >= 2 ? { opacity: 1, filter: 'blur(0px)', scale: 1 } : { opacity: 0, filter: 'blur(24px)', scale: 0.92 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
            >
              Interactive
              <br />
              <span style={{ color: '#c8a040' }}>Guide</span>
            </motion.h1>

            <motion.div
              style={{ width: '120px', height: '1px', background: 'rgba(200,160,60,0.6)' }}
              initial={{ scaleX: 0 }}
              animate={phase >= 2 ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            />

            <motion.p
              style={{ color: '#a08050', letterSpacing: '0.35em', fontSize: '0.95vw', textTransform: 'uppercase' }}
              initial={{ opacity: 0 }}
              animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1 }}
            >
              PS5 · Complete Edition
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SCENE B: Feature Flash ── */}
      <AnimatePresence>
        {scene === 'B' && (
          <motion.div
            key="sceneB"
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              style={{ color: '#a08050', letterSpacing: '0.3em', fontSize: '0.9vw', textTransform: 'uppercase', marginBottom: '3vh' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Everything You Need
            </motion.p>

            <AnimatePresence mode="wait">
              <motion.div
                key={featureIdx}
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0, y: 30, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 1.02 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <span style={{ fontSize: '6vw' }}>{FEATURES[featureIdx].icon}</span>
                <h2
                  style={{
                    fontSize: '4.5vw',
                    fontWeight: 800,
                    color: '#f5e6c0',
                    textAlign: 'center',
                    textShadow: '0 2px 20px rgba(220,120,20,0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {FEATURES[featureIdx].label}
                </h2>
                <p style={{ color: '#c8a040', fontSize: '1.5vw', letterSpacing: '0.15em' }}>
                  {FEATURES[featureIdx].sub}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="flex gap-2 mt-8">
              {FEATURES.map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    width: i === featureIdx ? '24px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    backgroundColor: i === featureIdx ? '#c8a040' : 'rgba(200,160,60,0.3)',
                  }}
                  animate={{ width: i === featureIdx ? '24px' : '6px' }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── SCENE C: Logo Lock-up + CTA ── */}
      <AnimatePresence>
        {scene === 'C' && (
          <motion.div
            key="sceneC"
            className="absolute inset-0 flex flex-col items-center justify-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Gold badge */}
            <motion.div
              style={{
                border: '1px solid rgba(200,160,60,0.6)',
                padding: '6px 24px',
                borderRadius: '2px',
                color: '#c8a040',
                letterSpacing: '0.4em',
                fontSize: '0.85vw',
                textTransform: 'uppercase',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={phase >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
            >
              Available Now on Itch.io
            </motion.div>

            <motion.h1
              style={{
                fontSize: '7vw',
                fontWeight: 900,
                color: '#f5e6c0',
                textAlign: 'center',
                lineHeight: 1,
                textShadow: '0 4px 40px rgba(220,120,20,0.6)',
                textTransform: 'uppercase',
                letterSpacing: '0.02em',
              }}
              initial={{ opacity: 0, filter: 'blur(16px)' }}
              animate={phase >= 1 ? { opacity: 1, filter: 'blur(0px)' } : { opacity: 0, filter: 'blur(16px)' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              RDR2<br />
              <span style={{ color: '#c8a040', fontSize: '5.5vw' }}>Interactive Guide</span>
            </motion.h1>

            <motion.div
              style={{ width: '160px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(200,160,60,0.7), transparent)' }}
              initial={{ scaleX: 0 }}
              animate={phase >= 2 ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.2 }}
            />

            <motion.div
              style={{ display: 'flex', gap: '3vw', alignItems: 'center' }}
              initial={{ opacity: 0, y: 16 }}
              animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.8 }}
            >
              {['Walkthrough', 'Collectibles', 'Map + Drawing', 'Stats'].map(tag => (
                <span key={tag} style={{ color: '#a08050', fontSize: '1.1vw', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              style={{
                marginTop: '1vh',
                padding: '12px 40px',
                background: 'linear-gradient(135deg, #8b4a0a, #c8700a)',
                borderRadius: '3px',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.4vw',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                boxShadow: '0 4px 24px rgba(180,80,10,0.5)',
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={phase >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
            >
              $4.99 · Get It Now
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating embers */}
      <Embers />
    </div>
  );
}

function Stars() {
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 55,
    size: Math.random() * 1.5 + 0.5,
    delay: Math.random() * 4,
  }));
  return (
    <>
      {stars.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: '#fffde0',
          }}
          animate={{ opacity: [0.2, 1, 0.3, 0.8, 0.2] }}
          transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}
    </>
  );
}

function Embers() {
  const embers = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: 42 + Math.random() * 16,
    delay: Math.random() * 4,
    size: Math.random() * 3 + 2,
    drift: (Math.random() - 0.5) * 8,
  }));
  return (
    <>
      {embers.map(e => (
        <motion.div
          key={e.id}
          className="absolute rounded-full"
          style={{
            left: `${e.x}%`,
            bottom: '18%',
            width: e.size,
            height: e.size,
            background: `rgba(${220 + Math.random() * 35 | 0},${60 + Math.random() * 60 | 0},10,0.9)`,
            boxShadow: '0 0 4px rgba(255,120,20,0.8)',
          }}
          animate={{
            y: [0, -120 - Math.random() * 80],
            x: [0, e.drift * 10],
            opacity: [0, 0.9, 0.6, 0],
            scale: [1, 0.8, 0.4, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: e.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </>
  );
}
