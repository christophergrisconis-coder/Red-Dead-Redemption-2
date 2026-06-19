import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface Props {
  onDismiss: () => void;
}

const STAR_POSITIONS = Array.from({ length: 28 }, (_, i) => ({
  x: (((i * 137.5) % 1) || (i / 28)) * width,
  y: Math.abs(((i * 97.3) % 0.8)) * height * 0.75 + 40,
  size: (i % 3) + 1,
  opacity: 0.15 + (i % 5) * 0.08,
}));

export function WelcomeScene({ onDismiss }: Props) {
  const bgFade = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(30)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const dividerScale = useRef(new Animated.Value(0)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const badgeOpacity = useRef(new Animated.Value(0)).current;
  const btnOpacity = useRef(new Animated.Value(0)).current;
  const exitFade = useRef(new Animated.Value(1)).current;
  const starOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(bgFade, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(starOpacity, { toValue: 1, duration: 1400, useNativeDriver: true }),
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
  }, []);

  const handleDismiss = () => {
    Animated.timing(exitFade, { toValue: 0, duration: 650, useNativeDriver: true }).start(() => {
      onDismiss();
    });
  };

  return (
    <Animated.View style={[styles.root, { opacity: exitFade }]}>
      <LinearGradient
        colors={['#060400', '#0D0800', '#1A1005', '#0D0800', '#060400']}
        locations={[0, 0.2, 0.5, 0.8, 1]}
        style={StyleSheet.absoluteFill}
      />

      {STAR_POSITIONS.map((s, i) => (
        <Animated.View
          key={i}
          style={[
            styles.star,
            {
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              opacity: starOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, s.opacity],
              }),
            },
          ]}
        />
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
  star: {
    position: 'absolute',
    borderRadius: 10,
    backgroundColor: '#EDD9A3',
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
