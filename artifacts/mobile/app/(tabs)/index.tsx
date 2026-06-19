import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CategoryCard } from '@/components/CategoryCard';
import { ProgressRing } from '@/components/ProgressRing';
import { useProgress } from '@/context/ProgressContext';
import {
  categories,
  getCategoriesBySection,
  getCompletionPercent,
  getSectionPercent,
  SECTIONS,
  totalItems,
} from '@/data/rdr2Data';
import { useColors } from '@/hooks/useColors';

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
    .slice(0, 5);

  const handleReset = () => {
    Alert.alert(
      'Reset All Progress',
      'This will clear ALL completed items across every category. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset Everything', style: 'destructive', onPress: resetAll },
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { paddingTop: topInset + 16, paddingBottom: bottomInset + 100 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Western header */}
      <View style={styles.westernHeader}>
        <View style={[styles.westernRule, { backgroundColor: colors.border }]} />
        <Text style={[styles.westernStar, { color: colors.goldDim }]}>✦</Text>
        <View style={[styles.westernRule, { backgroundColor: colors.border }]} />
      </View>
      <Text style={[styles.westernQuote, { color: colors.mutedForeground }]}>
        "Be loyal to what matters."  — Arthur Morgan
      </Text>

      {/* Hero Card */}
      <View style={[styles.hero, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.heroTop}>
          <View style={styles.heroText}>
            <Text style={[styles.heroGame, { color: colors.primary }]}>RED DEAD REDEMPTION II</Text>
            <Text style={[styles.heroSub, { color: colors.foreground }]}>The Outlaw's Complete Guide</Text>
            <Text style={[styles.heroSub, { color: colors.mutedForeground }]}>PlayStation 5 Edition</Text>
          </View>
          <ProgressRing percent={percent} size={88} strokeWidth={7} label="complete" />
        </View>

        <View style={[styles.statRow, { borderTopColor: colors.border }]}>
          <View style={styles.stat}>
            <Text style={[styles.statNum, { color: colors.primary }]}>{completed}</Text>
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
      <Pressable
        style={[styles.quickBtnPrimary, { backgroundColor: colors.primary }]}
        onPress={() => router.push('/(tabs)/guide')}
      >
        <Feather name="list" size={18} color={colors.primaryForeground} />
        <Text style={[styles.quickBtnText, { color: colors.primaryForeground }]}>Completion Guide</Text>
      </Pressable>
      <View style={styles.quickLinks}>
        <Pressable
          style={[styles.quickBtn, { backgroundColor: colors.card, borderColor: colors.goldDim, borderWidth: 1 }]}
          onPress={() => router.push('/(tabs)/walkthrough')}
        >
          <Feather name="book-open" size={16} color={colors.gold} />
          <Text style={[styles.quickBtnText, { color: colors.gold }]}>Walkthroughs</Text>
        </Pressable>
        <Pressable
          style={[styles.quickBtn, { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }]}
          onPress={() => router.push('/(tabs)/map')}
        >
          <Feather name="map" size={16} color={colors.primary} />
          <Text style={[styles.quickBtnText, { color: colors.primary }]}>World Map</Text>
        </Pressable>
      </View>

      {/* In Progress */}
      {inProgressCats.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Feather name="clock" size={13} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>In Progress</Text>
          </View>
          {inProgressCats.map(cat => (
            <CategoryCard key={cat.id} category={cat} onPress={() => router.push(`/category/${cat.id}`)} />
          ))}
        </View>
      )}

      {/* Section overview cards */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Feather name="grid" size={13} color={colors.primary} />
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Browse by Category</Text>
        </View>
        <View style={styles.sectionGrid}>
          {SECTIONS.map(section => {
            const pct = getSectionPercent(completedIds, section.key);
            const cats = getCategoriesBySection(section.key);
            const totalInSection = cats.reduce((s, c) => s + c.items.length, 0);
            const doneInSection = cats.reduce(
              (s, c) => s + c.items.filter(i => completedIds.has(i.id)).length,
              0
            );
            const isComplete = pct === 100;

            return (
              <Pressable
                key={section.key}
                onPress={() => router.push({ pathname: '/(tabs)/guide', params: { section: section.key } })}
                style={({ pressed }) => [
                  styles.sectionCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: isComplete ? colors.primary : colors.border,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <View style={[styles.sectionIconWrap, { backgroundColor: isComplete ? colors.primary + '22' : colors.secondary }]}>
                  <Feather name={section.iconName as any} size={16} color={isComplete ? colors.primary : colors.mutedForeground} />
                </View>
                <Text style={[styles.sectionCardTitle, { color: colors.foreground }]} numberOfLines={2}>
                  {section.label}
                </Text>
                <View style={[styles.sectionTrack, { backgroundColor: colors.secondary }]}>
                  <View style={[styles.sectionFill, { width: `${pct}%` as any, backgroundColor: isComplete ? colors.primary : '#C8922A' }]} />
                </View>
                <Text style={[styles.sectionCardStat, { color: isComplete ? colors.primary : colors.mutedForeground }]}>
                  {doneInSection}/{totalInSection}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Recent: Story chapters shortcut */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Feather name="book" size={13} color={colors.primary} />
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Main Story</Text>
          <Pressable onPress={() => router.push('/(tabs)/guide')}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>See all →</Text>
          </Pressable>
        </View>
        {getCategoriesBySection('MAIN STORY').map(cat => (
          <CategoryCard key={cat.id} category={cat} onPress={() => router.push(`/category/${cat.id}`)} />
        ))}
      </View>

      {/* Reset */}
      <Pressable
        onPress={handleReset}
        style={[styles.resetBtn, { borderColor: colors.destructive + '66' }]}
      >
        <Feather name="trash-2" size={14} color={colors.destructive} />
        <Text style={[styles.resetText, { color: colors.destructive }]}>Reset All Progress</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 16, gap: 14 },
  westernHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: -4,
  },
  westernRule: { flex: 1, height: StyleSheet.hairlineWidth },
  westernStar: { fontSize: 10 },
  westernQuote: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 0.3,
  },
  hero: { borderRadius: 12, borderWidth: 1, overflow: 'hidden' },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    gap: 12,
  },
  heroText: { flex: 1, gap: 4 },
  heroGame: { fontSize: 15, fontFamily: 'Inter_700Bold', lineHeight: 20, letterSpacing: 0.8 },
  heroSub: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  quickBtnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 10,
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
  section: { gap: 8 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 2 },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    flex: 1,
  },
  seeAll: { fontSize: 13, fontFamily: 'Inter_500Medium' },

  sectionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  sectionCard: {
    width: '47%',
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
    gap: 8,
  },
  sectionIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionCardTitle: { fontSize: 13, fontFamily: 'Inter_600SemiBold', lineHeight: 18 },
  sectionTrack: { height: 3, borderRadius: 2, overflow: 'hidden' },
  sectionFill: { height: '100%', borderRadius: 2 },
  sectionCardStat: { fontSize: 11, fontFamily: 'Inter_500Medium' },

  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 4,
  },
  resetText: { fontSize: 14, fontFamily: 'Inter_500Medium' },
});
