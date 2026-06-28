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
  const completionFlash = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(checkOpacity, {
      toValue: completed ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [completed, checkOpacity]);

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.96, duration: 70, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 120, useNativeDriver: true }),
    ]).start();

    if (!completed) {
      Animated.sequence([
        Animated.timing(completionFlash, { toValue: 1, duration: 150, useNativeDriver: true }),
        Animated.timing(completionFlash, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]).start();
    }

    onToggle();
  };

  const isSideQuest = item.isSideQuest;

  return (
    <Pressable onPress={handlePress} style={({ pressed }) => [pressed && { opacity: 0.75 }]}>
      <Animated.View
        style={[
          styles.container,
          {
            borderBottomColor: colors.border,
            transform: [{ scale }],
            borderLeftWidth: isSideQuest ? 3 : 0,
            borderLeftColor: isSideQuest ? colors.sideQuest : 'transparent',
          },
        ]}
      >
        {/* Completion flash overlay */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: colors.primary,
              opacity: completionFlash.interpolate({ inputRange: [0, 1], outputRange: [0, 0.06] }),
            },
          ]}
        />

        <Pressable
          onPress={handlePress}
          style={[
            styles.checkbox,
            {
              borderColor: completed ? colors.primary : isSideQuest ? colors.sideQuest : colors.border,
              backgroundColor: completed ? colors.primary : 'transparent',
            },
          ]}
        >
          <Animated.View style={{ opacity: checkOpacity }}>
            <Feather name="check" size={11} color={colors.primaryForeground} />
          </Animated.View>
        </Pressable>

        <View style={styles.content}>
          {isSideQuest && !completed && (
            <View style={[styles.sideQuestBadge, { backgroundColor: colors.sideQuest + '28', borderColor: colors.sideQuest }]}>
              <Text style={[styles.sideQuestText, { color: colors.sideQuestFg }]}>SIDE QUEST</Text>
            </View>
          )}
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
            <Text style={[styles.description, { color: colors.mutedForeground }]} numberOfLines={2}>
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
              <Text style={[styles.tip, { color: colors.mutedForeground }]} numberOfLines={3}>
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
    backgroundColor: 'transparent',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  sideQuestBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 2,
  },
  sideQuestText: {
    fontSize: 9,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1.2,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Inter_500Medium',
    lineHeight: 20,
  },
  description: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 17,
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
    marginTop: 1,
  },
  tip: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    flex: 1,
    lineHeight: 16,
  },
});
