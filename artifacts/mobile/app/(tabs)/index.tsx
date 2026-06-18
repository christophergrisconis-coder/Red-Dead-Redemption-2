import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CategoryCard } from '@/components/CategoryCard';
import { ProgressRing } from '@/components/ProgressRing';
import { useProgress } from '@/context/ProgressContext';
import { categories, getCompletionPercent, totalItems } from '@/data/rdr2Data';
import { useColors } from '@/hooks/useColors';

const FEATURED_CATS = ['prologue', 'chapter1', 'chapter2', 'chapter3', 'challenges'];

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { completedIds, resetAll } = useProgress();
  const percent = getCompletionPercent(completedIds);
  const completed = completedIds.size;

  const topInset = Platform.OS === 'web' ? 67 : insets.top;
  const bottomInset = Platform.OS === 'web' ? 34 : 0;

  const inProgressCats = categories
    .filter(c => {
      const p = getCompletionPercent(completedIds, c.id);
      return p > 0 && p < 100;
    })
    .slice(0, 4);

  const handleReset = () => {
    Alert.alert(
      'Reset All Progress',
      'This will clear all your completed items. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: resetAll },
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { paddingTop: topInset + 16, paddingBottom: bottomInset + 100 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Header */}
      <View style={[styles.hero, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.heroTop}>
          <View style={styles.heroText}>
            <Text style={[styles.heroTitle, { color: colors.primary }]}>Red Dead Redemption 2</Text>
            <Text style={[styles.heroSub, { color: colors.mutedForeground }]}>Interactive Completion Guide</Text>
            <Text style={[styles.heroSub, { color: colors.mutedForeground }]}>PlayStation 5 Edition</Text>
          </View>
          <ProgressRing percent={percent} size={90} strokeWidth={8} label="complete" />
        </View>

        <View style={[styles.statRow, { borderTopColor: colors.border }]}>
          <View style={styles.stat}>
            <Text style={[styles.statNum, { color: colors.foreground }]}>{completed}</Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Completed</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.stat}>
            <Text style={[styles.statNum, { color: colors.foreground }]}>{totalItems - completed}</Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Remaining</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.stat}>
            <Text style={[styles.statNum, { color: colors.foreground }]}>{totalItems}</Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>Total Items</Text>
          </View>
        </View>
      </View>

      {/* Quick links */}
      <View style={styles.quickLinks}>
        <Pressable
          style={[styles.quickBtn, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/(tabs)/guide')}
        >
          <Feather name="list" size={18} color={colors.primaryForeground} />
          <Text style={[styles.quickBtnText, { color: colors.primaryForeground }]}>Full Guide</Text>
        </Pressable>
        <Pressable
          style={[styles.quickBtn, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}
          onPress={() => router.push('/(tabs)/map')}
        >
          <Feather name="map" size={18} color={colors.primary} />
          <Text style={[styles.quickBtnText, { color: colors.primary }]}>World Map</Text>
        </Pressable>
      </View>

      {/* In Progress */}
      {inProgressCats.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            <Feather name="clock" size={14} color={colors.primary} /> {'  In Progress'}
          </Text>
          {inProgressCats.map(cat => (
            <CategoryCard key={cat.id} category={cat} onPress={() => router.push(`/category/${cat.id}`)} />
          ))}
        </View>
      )}

      {/* Story Chapters quick access */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          <Feather name="book" size={14} color={colors.primary} /> {'  Story Chapters'}
        </Text>
        {categories.filter(c => ['prologue','chapter1','chapter2','chapter3','chapter4','chapter5','chapter6','epilogue1','epilogue2'].includes(c.id)).map(cat => (
          <CategoryCard key={cat.id} category={cat} onPress={() => router.push(`/category/${cat.id}`)} />
        ))}
      </View>

      {/* Reset button */}
      <Pressable onPress={handleReset} style={[styles.resetBtn, { borderColor: colors.destructive }]}>
        <Feather name="trash-2" size={14} color={colors.destructive} />
        <Text style={[styles.resetText, { color: colors.destructive }]}>Reset All Progress</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 16, gap: 16 },
  hero: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    gap: 12,
  },
  heroText: { flex: 1, gap: 4 },
  heroTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    lineHeight: 22,
  },
  heroSub: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },
  statRow: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingVertical: 12,
  },
  stat: { flex: 1, alignItems: 'center', gap: 2 },
  statNum: { fontSize: 20, fontFamily: 'Inter_700Bold' },
  statLabel: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  statDivider: { width: StyleSheet.hairlineWidth, marginVertical: 4 },
  quickLinks: { flexDirection: 'row', gap: 10 },
  quickBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 10,
  },
  quickBtnText: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  section: { gap: 6 },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 8,
  },
  resetText: { fontSize: 14, fontFamily: 'Inter_500Medium' },
});
