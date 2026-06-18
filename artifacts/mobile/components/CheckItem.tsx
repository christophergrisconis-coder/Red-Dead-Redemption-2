import { Feather } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { ChecklistItem } from '@/data/rdr2Data';
import { useColors } from '@/hooks/useColors';

interface CheckItemProps {
  item: ChecklistItem;
  completed: boolean;
  onToggle: () => void;
}

export function CheckItem({ item, completed, onToggle }: CheckItemProps) {
  const colors = useColors();
  const scale = useRef(new Animated.Value(1)).current;
  const checkOpacity = useRef(new Animated.Value(completed ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(checkOpacity, {
      toValue: completed ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [completed, checkOpacity]);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.95, duration: 80, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 80, useNativeDriver: true }),
    ]).start();
    onToggle();
  };

  return (
    <Pressable onPress={handlePress} style={({ pressed }) => [pressed && { opacity: 0.75 }]}>
      <Animated.View style={[styles.container, { borderBottomColor: colors.border, transform: [{ scale }] }]}>
        <Pressable
          onPress={handlePress}
          style={[
            styles.checkbox,
            {
              borderColor: completed ? colors.primary : colors.border,
              backgroundColor: completed ? colors.primary : 'transparent',
            },
          ]}
        >
          <Animated.View style={{ opacity: checkOpacity }}>
            <Feather name="check" size={12} color={colors.primaryForeground} />
          </Animated.View>
        </Pressable>

        <View style={styles.content}>
          <Text
            style={[
              styles.title,
              {
                color: completed ? colors.mutedForeground : colors.foreground,
                textDecorationLine: completed ? 'line-through' : 'none',
              },
            ]}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          {!!item.description && !completed && (
            <Text style={[styles.description, { color: colors.mutedForeground }]} numberOfLines={1}>
              {item.description}
            </Text>
          )}
          {!!item.location && !completed && (
            <View style={styles.locationRow}>
              <Feather name="map-pin" size={10} color={colors.primary} />
              <Text style={[styles.location, { color: colors.primary }]} numberOfLines={1}>
                {' '}{item.location}
              </Text>
            </View>
          )}
          {!!item.tip && !completed && (
            <View style={styles.tipRow}>
              <Feather name="info" size={10} color={colors.mutedForeground} />
              <Text style={[styles.tip, { color: colors.mutedForeground }]} numberOfLines={2}>
                {' '}{item.tip}
              </Text>
            </View>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  content: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    lineHeight: 20,
  },
  description: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 2,
  },
  tip: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    flex: 1,
    lineHeight: 15,
  },
});
