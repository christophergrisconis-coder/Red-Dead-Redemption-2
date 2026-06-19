import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, Pressable, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface Props {
  onDismiss: () => void;
}

const STAR_POSITIONS = Array.from({ length: 32 }, (_, i) => ({
  x: (((i * 137.5) % 100) / 100) * width,
  y: Math.abs(((i * 97.3) % 80) / 100) * height * 0.7 + 20,
  size: (i % 3) + 1,
  opacity: 0.12 + (i % 5) * 0.07,
  twinkleDelay: (i * 200) % 2000,
}));

const EMBER_COUNT = 18;
const EMBERS = Array.from({ length: EMBER_COUNT }, (_, i) => ({
  x: width * 0.3 + (((i * 73) % 100) / 100) * width * 0.4,
  size: 2 + (i % 3),
  color: i % 3 === 0 ? '#FF6820' : i % 3 === 1 ? '#FFB830' : '#FF4400',
  startDelay: (i * 350) % 3500,
  duration: 2800 + (i * 400) % 2200,
  driftX: ((i % 5) - 2) * 18,
}));

const RIVER_LINES = Array.from({ length: 6 }, (_, i) => ({
  y: height * 0.78 + i * 14,
  opacity: 0.06 + i * 0.015,
  width: width * (0.5 + i * 0.08),
  speed: 3200 + i * 500,
  delay: i * 400,
}));

function TwinklingStar({ x, y, size, opacity, delay }: { x: number; y: number; size: number; opacity: number; delay: number }) {
  const anim = useRef(new Animated.Value(opacity)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, { toValue: opacity * 0.3, duration: 900 + delay % 600, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.timing(anim, { toValue: opacity, duration: 900 + delay % 600, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
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
        backgroundColor: '#EDD9A3',
        opacity: anim,
      }}
    />
  );
}

function Ember({ x, size, color, delay, duration, driftX }: { x: number; size: number; color: string; delay: number; duration: number; driftX: number }) {
  const y = useRef(new Animated.Value(height * 0.88)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

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
        setTimeout(startAnim, Math.random() * 1000);
      });
    };
    startAnim();
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

function RiverLine({ y, opacity, lineWidth, speed, delay }: { y: number; opacity: number; lineWidth: number; speed: number; delay: number }) {
  const x = useRef(new Animated.Value(-lineWidth)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(x, {
          toValue: width,
          duration: speed,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
        Animated.timing(x, { toValue: -lineWidth, duration: 0, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: y,
        left: 0,
        width: lineWidth,
        height: 1.5,
        borderRadius: 1,
        backgroundColor: '#3A6A8A',
        opacity,
        transform: [{ translateX: x }],
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

export function WelcomeScene({ onDismiss }: Props) {
  const bgFade = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(30)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const dividerScale = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const badgeOpacity = useRef(new Animated.Value(0)).current;
  const btnOpacity = useRef(new Animated.Value(0)).current;
  const exitFade = useRef(new Animated.Value(1)).current;
  const horizonGlow = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(bgFade, { toValue: 1, duration: 900, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.spring(titleY, { toValue: 0, friction: 8, tension: 60, useNativeDriver: true }),
        Animated.timing(titleOpacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      ]),
      Animated.timing(dividerScale, { toValue: 1, duration: 450, useNativeDriver: true }),
      Animated.timing(subtitleOpacity, { toValue: 1, duration: 550, useNativeDriver: true }),
      Animated.timing(badgeOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(btnOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();

    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(horizonGlow, { toValue: 0.55, duration: 2200, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
        Animated.timing(horizonGlow, { toValue: 0.28, duration: 2200, useNativeDriver: true, easing: Easing.inOut(Easing.sin) }),
      ])
    );
    glowLoop.start();
    return () => glowLoop.stop();
  }, []);

  const handleDismiss = () => {
    Animated.timing(exitFade, { toValue: 0, duration: 650, useNativeDriver: true }).start(() => {
      onDismiss();
    });
  };

  return (
    <Animated.View style={[styles.root, { opacity: exitFade }]}>
      {/* Sky gradient */}
      <LinearGradient
        colors={['#02010A', '#07030F', '#0F0608', '#1A0A04', '#251206', '#1A0A04']}
        locations={[0, 0.15, 0.35, 0.55, 0.75, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Horizon campfire glow (bottom) */}
      <LinearGradient
        colors={['transparent', 'transparent', '#3A1200', '#7A2800', '#3A1200', 'transparent']}
        locations={[0, 0.55, 0.72, 0.85, 0.93, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Animated horizon pulse */}
      <Animated.View
        style={[
          styles.horizonGlowBand,
          { opacity: horizonGlow },
        ]}
      />

      {/* Campfire soft glow blob */}
      <CampfireGlow />

      {/* River shimmer lines */}
      {RIVER_LINES.map((r, i) => (
        <RiverLine key={i} y={r.y} opacity={r.opacity} lineWidth={r.width} speed={r.speed} delay={r.delay} />
      ))}

      {/* Campfire embers rising */}
      {EMBERS.map((e, i) => (
        <Ember key={i} x={e.x} size={e.size} color={e.color} delay={e.startDelay} duration={e.duration} driftX={e.driftX} />
      ))}

      {/* Twinkling stars */}
      {STAR_POSITIONS.map((s, i) => (
        <TwinklingStar key={i} x={s.x} y={s.y} size={s.size} opacity={s.opacity} delay={s.twinkleDelay} />
      ))}

      <Pressable style={styles.touchArea} onPress={handleDismiss}>
        <Animated.View style={[styles.content, { opacity: bgFade }]}>

          <Animated.View style={[styles.topRule, { opacity: bgFade }]}>
            <View style={[styles.ruleLine, { backgroundColor: '#5A3A10' }]} />
            <Text style={styles.ruleStar}>✦</Text>
            <View style={[styles.ruleLine, { backgroundColor: '#5A3A10' }]} />
          </Animated.View>

          <Animated.Text style={[styles.gameLabel, { opacity: bgFade }]}>
            RED DEAD REDEMPTION II
          </Animated.Text>

          <Animated.Text
            style={[
              styles.mainTitle,
              {
                opacity: titleOpacity,
                transform: [{ translateY: titleY }],
              },
            ]}
          >
            The Outlaw's{'\n'}Complete Guide
          </Animated.Text>

          <Animated.View style={[styles.divider, { transform: [{ scaleX: dividerScale }] }]}>
            <View style={[styles.dividerLine, { backgroundColor: '#C8901A' }]} />
            <Text style={styles.dividerStar}>✦</Text>
            <View style={[styles.dividerLine, { backgroundColor: '#C8901A' }]} />
            <Text style={styles.dividerStar}>✦</Text>
            <View style={[styles.dividerLine, { backgroundColor: '#C8901A' }]} />
          </Animated.View>

          <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>
            Missions · Walkthroughs · Collectibles{'\n'}
            Progress Tracking · Treasure Hunts
          </Animated.Text>

          <Animated.View style={[styles.editionBadge, { opacity: badgeOpacity }]}>
            <Text style={styles.editionText}>✦  PlayStation 5 Edition  ✦</Text>
          </Animated.View>

          <Animated.View style={[styles.btnWrap, { opacity: btnOpacity }]}>
            <View style={styles.beginBtn}>
              <Text style={styles.beginBtnText}>BEGIN YOUR JOURNEY</Text>
              <Text style={styles.beginArrow}> →</Text>
            </View>
            <Text style={styles.tapHint}>tap anywhere to enter</Text>
          </Animated.View>

          <Animated.View style={[styles.bottomRule, { opacity: bgFade }]}>
            <View style={[styles.ruleLine, { backgroundColor: '#5A3A10' }]} />
            <Text style={styles.ruleStar}>✦</Text>
            <View style={[styles.ruleLine, { backgroundColor: '#5A3A10' }]} />
          </Animated.View>

        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
  horizonGlowBand: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.28,
    backgroundColor: '#8A2800',
    borderTopLeftRadius: width,
    borderTopRightRadius: width,
  },
  touchArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 0,
  },
  topRule: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 24,
    gap: 8,
  },
  bottomRule: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginTop: 32,
    gap: 8,
  },
  ruleLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  ruleStar: {
    color: '#5A3A10',
    fontSize: 10,
  },
  gameLabel: {
    color: '#907558',
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: 16,
    textAlign: 'center',
  },
  mainTitle: {
    color: '#EDD9A3',
    fontSize: 38,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1.5,
    textAlign: 'center',
    lineHeight: 48,
    marginBottom: 20,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '75%',
    gap: 8,
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    opacity: 0.7,
  },
  dividerStar: {
    color: '#C8901A',
    fontSize: 11,
  },
  subtitle: {
    color: '#907558',
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 0.5,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  editionBadge: {
    borderWidth: 1,
    borderColor: '#3A2010',
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 36,
  },
  editionText: {
    color: '#C8901A',
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  btnWrap: {
    alignItems: 'center',
    gap: 10,
  },
  beginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C8901A',
    paddingHorizontal: 28,
    paddingVertical: 14,
  },
  beginBtnText: {
    color: '#C8901A',
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  beginArrow: {
    color: '#C8901A',
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
  },
  tapHint: {
    color: '#4A3010',
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 1,
  },
});
