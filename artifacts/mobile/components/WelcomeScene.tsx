import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Easing, Pressable, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface Props {
  onDismiss: () => void;
}

type Scene = 'A' | 'B' | 'C';

// ── Video-matching visual tokens ──
const TOKENS = {
  charcoal: '#0D0A08',
  bone: '#F0E8D8',
  gold: '#C9A227',
  goldBright: '#D4A840',
  goldDim: '#7A5A18',
  ash: '#2A1F15',
  blood: '#8B1A1A',
};

// ═══════════════════════════════════════════
// SCENE A — Cinematic Title Reveal (0–5s)
// ═══════════════════════════════════════════

const DUST_COUNT = 24;
const DUST = Array.from({ length: DUST_COUNT }, (_, i) => ({
  x: (Math.sin(i * 2.7) * 0.5 + 0.5) * width,
  y: height * 0.3 + (Math.cos(i * 1.9) * 0.3) * height * 0.5,
  size: 1 + (i % 3),
  delay: (i * 210) % 3000,
  duration: 2000 + (i * 300) % 2000,
}));

const EMBER_COUNT = 14;
const EMBERS = Array.from({ length: EMBER_COUNT }, (_, i) => ({
  x: width * 0.3 + (((i * 73) % 100) / 100) * width * 0.4,
  size: 2 + (i % 3),
  color: i % 3 === 0 ? '#FF6820' : i % 3 === 1 ? '#FFB830' : '#FF4400',
  delay: (i * 400) % 4000,
  duration: 3000 + (i * 400) % 2500,
  driftX: ((i % 5) - 2) * 20,
}));

function DustParticle({ x, y, size, delay, duration }: typeof DUST[0]) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.sequence([
            Animated.timing(opacity, { toValue: 0.6, duration: duration * 0.2, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 0, duration: duration * 0.8, useNativeDriver: true }),
          ]),
          Animated.timing(translateY, {
            toValue: -60 - Math.random() * 40,
            duration,
            useNativeDriver: true,
            easing: Easing.out(Easing.quad),
          }),
        ]),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: size,
        backgroundColor: TOKENS.bone,
        opacity,
        transform: [{ translateY }],
      }}
    />
  );
}

function Ember({ x, size, color, delay, duration, driftX }: { x: number; size: number; color: string; delay: number; duration: number; driftX: number }) {
  const y = useRef(new Animated.Value(height * 0.88)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const startAnim = () => {
      y.setValue(height * 0.88 + Math.random() * 20);
      translateX.setValue(0);
      opacity.setValue(0);
      scale.setValue(1);
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0.9, duration: 300, useNativeDriver: true }),
          Animated.timing(y, {
            toValue: height * 0.88 - (120 + Math.random() * 180),
            duration,
            useNativeDriver: true,
            easing: Easing.out(Easing.quad),
          }),
          Animated.timing(translateX, {
            toValue: driftX + (Math.random() - 0.5) * 30,
            duration,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.sin),
          }),
          Animated.sequence([
            Animated.timing(opacity, { toValue: 0.9, duration: duration * 0.3, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 0, duration: duration * 0.7, useNativeDriver: true }),
          ]),
          Animated.timing(scale, { toValue: 0.2, duration, useNativeDriver: true }),
        ]),
      ]).start(() => {
        timeoutRef.current = setTimeout(startAnim, Math.random() * 1000);
      });
    };
    startAnim();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: 0,
        width: size,
        height: size,
        borderRadius: size,
        backgroundColor: color,
        opacity,
        transform: [{ translateY: y }, { translateX }, { scale }],
        shadowColor: color,
        shadowOpacity: 0.8,
        shadowRadius: 4,
      }}
    />
  );
}

function CampfireGlow() {
  const flicker = useRef(new Animated.Value(0.6)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(flicker, { toValue: 0.9, duration: 180, useNativeDriver: true, easing: Easing.inOut(Easing.quad) }),
          Animated.timing(scale, { toValue: 1.08, duration: 180, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(flicker, { toValue: 0.5, duration: 220, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 0.94, duration: 220, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(flicker, { toValue: 0.8, duration: 150, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 1.04, duration: 150, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(flicker, { toValue: 0.6, duration: 300, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 1, duration: 300, useNativeDriver: true }),
        ]),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: height * 0.1,
        left: width * 0.5 - 80,
        width: 160,
        height: 60,
        borderRadius: 80,
        backgroundColor: '#FF6820',
        opacity: flicker,
        transform: [{ scaleX: scale }],
      }}
    />
  );
}

// ═══════════════════════════════════════════
// SCENE B — Feature Flash (5–10s)
// ═══════════════════════════════════════════

const FEATURES = [
  { icon: '📖', label: 'Full Walkthrough', sub: 'All Chapters · Gold Medals' },
  { icon: '🗺️', label: 'Interactive Map', sub: 'Draw & Annotate with Apple Pencil' },
  { icon: '🦌', label: '16 Legendary Animals', sub: 'Exact Piggyback Locations' },
  { icon: '🎣', label: '14 Legendary Fish', sub: 'Lures · Strategies · Maps' },
  { icon: '💰', label: '24 Gold Bar Locations', sub: 'Lockbox Puzzles Solved' },
  { icon: '🎴', label: '144 Cigarette Cards', sub: 'All 12 Sets · Atlas #601–630' },
];

// ═══════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════

export function WelcomeScene({ onDismiss }: Props) {
  const [scene, setScene] = useState<Scene>('A');
  const [featureIdx, setFeatureIdx] = useState(0);
  const [phase, setPhase] = useState(0);
  const exitFade = useRef(new Animated.Value(1)).current;

  // Scene timing orchestration
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    if (scene === 'A') {
      timers.push(setTimeout(() => setPhase(1), 500));
      timers.push(setTimeout(() => setPhase(2), 2000));
      timers.push(setTimeout(() => setPhase(3), 3500));
      timers.push(setTimeout(() => { setScene('B'); setPhase(0); setFeatureIdx(0); }, 5000));
    } else if (scene === 'B') {
      timers.push(setTimeout(() => setFeatureIdx(1), 1200));
      timers.push(setTimeout(() => setFeatureIdx(2), 2000));
      timers.push(setTimeout(() => setFeatureIdx(3), 2800));
      timers.push(setTimeout(() => setFeatureIdx(4), 3600));
      timers.push(setTimeout(() => setFeatureIdx(5), 4400));
      timers.push(setTimeout(() => { setScene('C'); setPhase(0); }, 6000));
    } else if (scene === 'C') {
      timers.push(setTimeout(() => setPhase(1), 600));
      timers.push(setTimeout(() => setPhase(2), 1800));
      timers.push(setTimeout(() => setPhase(3), 3200));
    }
    return () => timers.forEach(t => clearTimeout(t));
  }, [scene]);

  const handleDismiss = () => {
    Animated.timing(exitFade, { toValue: 0, duration: 700, useNativeDriver: true }).start(() => {
      onDismiss();
    });
  };

  return (
    <Animated.View style={[styles.root, { opacity: exitFade }]}>
      {/* Cinematic background — radial gradient matching video */}
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: TOKENS.charcoal,
        }}
      >
        <LinearGradient
          colors={['transparent', 'transparent', '#3D1A06', '#0D0602']}
          locations={[0, 0.5, 0.75, 1]}
          style={StyleSheet.absoluteFill}
        />
      </View>

      {/* Campfire glow at bottom */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: width * 0.2,
          right: width * 0.2,
          height: height * 0.35,
          backgroundColor: 'transparent',
        }}
      >
        <LinearGradient
          colors={['transparent', 'rgba(220,100,20,0.25)', 'transparent']}
          locations={[0, 0.5, 1]}
          style={StyleSheet.absoluteFill}
        />
      </View>
      <CampfireGlow />

      {/* Horizon line */}
      <View
        style={{
          position: 'absolute',
          bottom: height * 0.18,
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: 'transparent',
        }}
      >
        <LinearGradient
          colors={['transparent', 'rgba(200,140,40,0.4)', 'rgba(220,160,60,0.6)', 'rgba(200,140,40,0.4)', 'transparent']}
          locations={[0, 0.2, 0.5, 0.8, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </View>

      {/* Dust particles */}
      {DUST.map((d, i) => (
        <DustParticle key={i} x={d.x} y={d.y} size={d.size} delay={d.delay} duration={d.duration} />
      ))}

      {/* Rising embers */}
      {EMBERS.map((e, i) => (
        <Ember key={i} x={e.x} size={e.size} color={e.color} delay={e.delay} duration={e.duration} driftX={e.driftX} />
      ))}

      <Pressable style={styles.touchArea} onPress={handleDismiss}>

        {/* ═══ SCENE A: Title Reveal ═══ */}
        {scene === 'A' && (
          <View style={styles.sceneContainer}>
            {/* Top rule */}
            <Animated.View
              style={[
                styles.rule,
                { backgroundColor: TOKENS.gold, width: 100, opacity: phase >= 1 ? 1 : 0 },
              ]}
            />

            <Animated.Text
              style={[
                styles.gameLabel,
                { opacity: phase >= 1 ? 1 : 0 },
              ]}
            >
              RED DEAD REDEMPTION II
            </Animated.Text>

            <Animated.Text
              style={[
                styles.outlawTitle,
                {
                  opacity: phase >= 2 ? 1 : 0,
                  transform: [{ scale: phase >= 2 ? 1 : 0.92 }],
                },
              ]}
            >
              THE OUTLAW'S
            </Animated.Text>

            <Animated.Text
              style={[
                styles.guideTitle,
                {
                  opacity: phase >= 2 ? 1 : 0,
                  transform: [{ scale: phase >= 2 ? 1 : 0.92 }],
                },
              ]}
            >
              COMPLETE GUIDE
            </Animated.Text>

            <Animated.View
              style={[
                styles.rule,
                { backgroundColor: TOKENS.gold, width: 120, opacity: phase >= 2 ? 1 : 0 },
              ]}
            />

            <Animated.Text
              style={[
                styles.ps5Badge,
                { opacity: phase >= 3 ? 1 : 0 },
              ]}
            >
              PS5 EDITION
            </Animated.Text>
          </View>
        )}

        {/* ═══ SCENE B: Feature Flash ═══ */}
        {scene === 'B' && (
          <View style={styles.sceneContainer}>
            <Animated.Text
              style={[
                styles.everythingLabel,
                { opacity: phase >= 0 ? 1 : 0 },
              ]}
            >
              EVERYTHING YOU NEED
            </Animated.Text>

            <Animated.View
              style={[
                styles.featureBlock,
                { opacity: 1 },
              ]}
            >
              <Text style={styles.featureIcon}>{FEATURES[featureIdx].icon}</Text>
              <Text style={styles.featureLabel}>{FEATURES[featureIdx].label}</Text>
              <Text style={styles.featureSub}>{FEATURES[featureIdx].sub}</Text>
            </Animated.View>

            {/* Progress dots */}
            <View style={styles.dotsRow}>
              {FEATURES.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    {
                      width: i === featureIdx ? 24 : 6,
                      backgroundColor: i === featureIdx ? TOKENS.gold : 'rgba(200,160,60,0.3)',
                    },
                  ]}
                />
              ))}
            </View>
          </View>
        )}

        {/* ═══ SCENE C: Logo Lock-up + CTA ═══ */}
        {scene === 'C' && (
          <View style={styles.sceneContainer}>
            <Animated.View
              style={[
                styles.itBadge,
                { opacity: phase >= 1 ? 1 : 0, transform: [{ scale: phase >= 1 ? 1 : 0.9 }] },
              ]}
            >
              <Text style={styles.itBadgeText}>INTERACTIVE GUIDE</Text>
            </Animated.View>

            <Animated.Text
              style={[
                styles.rdr2Title,
                { opacity: phase >= 1 ? 1 : 0 },
              ]}
            >
              RDR2
            </Animated.Text>

            <Animated.View
              style={[
                styles.ruleGradient,
                { opacity: phase >= 2 ? 1 : 0 },
              ]}
            >
              <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(200,160,60,0.7)' }} />
            </Animated.View>

            <Animated.View
              style={[
                styles.tagRow,
                { opacity: phase >= 2 ? 1 : 0 },
              ]}
            >
              {['Walkthrough', 'Collectibles', 'Map + Drawing', 'Stats'].map(tag => (
                <Text key={tag} style={styles.tagText}>{tag}</Text>
              ))}
            </Animated.View>

            <Animated.View
              style={[
                styles.beginBtn,
                {
                  opacity: phase >= 3 ? 1 : 0,
                  transform: [{ scale: phase >= 3 ? 1 : 0.9 }],
                },
              ]}
            >
              <Text style={styles.beginBtnText}>BEGIN YOUR JOURNEY</Text>
              <Text style={styles.beginArrow}> →</Text>
            </Animated.View>

            <Animated.Text style={[styles.tapHint, { opacity: phase >= 3 ? 0.5 : 0 }]}>
              tap anywhere to enter
            </Animated.Text>
          </View>
        )}

      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
  touchArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sceneContainer: {
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 32,
  },
  // ── Scene A ──
  rule: {
    height: 1,
    opacity: 0.6,
    marginVertical: 8,
  },
  gameLabel: {
    color: TOKENS.gold,
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 5,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  outlawTitle: {
    color: TOKENS.bone,
    fontSize: 42,
    fontFamily: 'Inter_900Black',
    letterSpacing: 3,
    textTransform: 'uppercase',
    textAlign: 'center',
    lineHeight: 50,
    textShadowColor: 'rgba(220,120,20,0.5)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 40,
  },
  guideTitle: {
    color: TOKENS.gold,
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 4,
    textTransform: 'uppercase',
    textAlign: 'center',
    lineHeight: 40,
    textShadowColor: 'rgba(220,120,20,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 20,
  },
  ps5Badge: {
    color: '#A08050',
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginTop: 12,
  },
  // ── Scene B ──
  everythingLabel: {
    color: '#A08050',
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: 24,
  },
  featureBlock: {
    alignItems: 'center',
    gap: 8,
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  featureLabel: {
    color: TOKENS.bone,
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
    textShadowColor: 'rgba(220,120,20,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 20,
  },
  featureSub: {
    color: TOKENS.gold,
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 24,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  // ── Scene C ──
  itBadge: {
    borderWidth: 1,
    borderColor: 'rgba(200,160,60,0.6)',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 2,
    marginBottom: 16,
  },
  itBadgeText: {
    color: TOKENS.gold,
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  rdr2Title: {
    color: TOKENS.bone,
    fontSize: 52,
    fontFamily: 'Inter_900Black',
    letterSpacing: 2,
    textAlign: 'center',
    textShadowColor: 'rgba(220,120,20,0.6)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 40,
  },
  ruleGradient: {
    width: 160,
    height: 1,
    marginVertical: 16,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tagText: {
    color: '#A08050',
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  beginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: '#8B4A0A',
    borderRadius: 3,
    shadowColor: '#B4700A',
    shadowOpacity: 0.5,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 4 },
  },
  beginBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  beginArrow: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
  },
  tapHint: {
    color: '#4A3010',
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 1,
    marginTop: 12,
  },
});
