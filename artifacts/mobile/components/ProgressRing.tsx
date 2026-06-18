import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useColors } from '@/hooks/useColors';

interface ProgressRingProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export function ProgressRing({ percent, size = 120, strokeWidth = 10, label }: ProgressRingProps) {
  const colors = useColors();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = circumference * (percent / 100);
  const gap = circumference - filled;

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.webFallback, { width: size, height: size, borderRadius: size / 2, borderColor: colors.primary, borderWidth: strokeWidth }]}>
        <Text style={[styles.percent, { color: colors.primary, fontSize: size * 0.22 }]}>{percent}%</Text>
        {!!label && <Text style={[styles.label, { color: colors.mutedForeground, fontSize: size * 0.09 }]}>{label}</Text>}
      </View>
    );
  }

  const Svg = require('react-native-svg').Svg;
  const Circle = require('react-native-svg').Circle;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.secondary}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.primary}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${filled} ${gap}`}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View style={styles.inner}>
        <Text style={[styles.percent, { color: colors.primary, fontSize: size * 0.22 }]}>{percent}%</Text>
        {!!label && <Text style={[styles.label, { color: colors.mutedForeground, fontSize: size * 0.09 }]}>{label}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inner: {
    alignItems: 'center',
  },
  percent: {
    fontFamily: 'Inter_700Bold',
    lineHeight: undefined,
  },
  label: {
    fontFamily: 'Inter_500Medium',
    textAlign: 'center',
  },
  webFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
