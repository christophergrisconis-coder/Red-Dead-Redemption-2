import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Category, getCompletionPercent } from '@/data/rdr2Data';
import { useColors } from '@/hooks/useColors';
import { useProgress } from '@/context/ProgressContext';

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}

export function CategoryCard({ category, onPress }: CategoryCardProps) {
  const colors = useColors();
  const { completedIds } = useProgress();
  const percent = getCompletionPercent(completedIds, category.id);
  const completedCount = category.items.filter(item => completedIds.has(item.id)).length;
  const total = category.items.length;
  const isComplete = percent === 100;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: isComplete ? colors.primary : colors.border,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View style={styles.header}>
        <View style={[styles.iconWrapper, { backgroundColor: category.color + '22' }]}>
          <Feather name={category.iconName as any} size={18} color={category.color} />
        </View>
        <View style={styles.titleBlock}>
          <Text style={[styles.title, { color: colors.foreground }]} numberOfLines={1}>
            {category.title}
          </Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]} numberOfLines={1}>
            {category.subtitle}
          </Text>
        </View>
        <View style={styles.rightBlock}>
          <Text style={[styles.percent, { color: isComplete ? colors.primary : colors.mutedForeground }]}>
            {percent}%
          </Text>
          <Feather name="chevron-right" size={16} color={colors.mutedForeground} />
        </View>
      </View>

      <View style={styles.progressRow}>
        <View style={[styles.trackBg, { backgroundColor: colors.secondary }]}>
          <View
            style={[
              styles.trackFill,
              { width: `${percent}%` as any, backgroundColor: isComplete ? colors.primary : category.color },
            ]}
          />
        </View>
        <Text style={[styles.count, { color: colors.mutedForeground }]}>
          {completedCount}/{total}
        </Text>
      </View>

      {category.requiredFor100 && (
        <View style={[styles.badge, { backgroundColor: colors.accent + '33' }]}>
          <Feather name="star" size={9} color={colors.accent} />
          <Text style={[styles.badgeText, { color: colors.accent }]}>Required for 100%</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBlock: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Inter_600SemiBold',
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  rightBlock: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  percent: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  trackBg: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  trackFill: {
    height: '100%',
    borderRadius: 2,
  },
  count: {
    fontSize: 11,
    fontFamily: 'Inter_500Medium',
    minWidth: 36,
    textAlign: 'right',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
  },
});
