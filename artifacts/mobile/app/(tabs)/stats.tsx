import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProgressRing } from '@/components/ProgressRing';
import { useProgress } from '@/context/ProgressContext';
import { categories, getCompletionPercent, totalItems } from '@/data/rdr2Data';
import { useColors } from '@/hooks/useColors';

const REQUIRED_IDS = categories.filter(c => c.requiredFor100).flatMap(c => c.items.map(i => i.id));

export default function StatsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { completedIds } = useProgress();
  const topInset = Platform.OS === 'web' ? 67 : insets.top;
  const bottomInset = Platform.OS === 'web' ? 34 : 0;

  const overallPercent = getCompletionPercent(completedIds);
  const requiredComplete = REQUIRED_IDS.filter(id => completedIds.has(id)).length;
  const requiredTotal = REQUIRED_IDS.length;
  const requiredPercent = Math.round((requiredComplete / requiredTotal) * 100);

  const groupedSections = [
    {
      label: 'Story',
      cats: categories.filter(c => ['prologue','chapter1','chapter2','chapter3','chapter4','chapter5','chapter6','epilogue1','epilogue2'].includes(c.id)),
    },
    {
      label: 'Challenges',
      cats: categories.filter(c => ['bandit','explorer','gambler','herbalist','horseman','hunter','sharpshooter','survivalist','weapons'].includes(c.id)),
    },
    {
      label: 'Activities',
      cats: categories.filter(c => ['strangers','hunting_requests','ambient'].includes(c.id)),
    },
    {
      label: 'Collectibles & Hunting',
      cats: categories.filter(c => ['collectibles','legendary_animals','legendary_fish','points_of_interest'].includes(c.id)),
    },
  ];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { paddingTop: topInset + 16, paddingBottom: bottomInset + 100 }]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.screenTitle, { color: colors.primary }]}>Progress Stats</Text>

      {/* Overall rings */}
      <View style={[styles.ringsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.ringsRow}>
          <View style={styles.ringItem}>
            <ProgressRing percent={overallPercent} size={110} label="overall" />
            <Text style={[styles.ringLabel, { color: colors.foreground }]}>All Items</Text>
          </View>
          <View style={[styles.ringDivider, { backgroundColor: colors.border }]} />
          <View style={styles.ringItem}>
            <ProgressRing percent={requiredPercent} size={110} label="required" />
            <Text style={[styles.ringLabel, { color: colors.foreground }]}>For 100%</Text>
          </View>
        </View>
        <View style={[styles.summaryRow, { borderTopColor: colors.border }]}>
          <Text style={[styles.summaryText, { color: colors.mutedForeground }]}>
            {completedIds.size} of {totalItems} items completed • {requiredComplete}/{requiredTotal} required
          </Text>
        </View>
      </View>

      {/* Sections breakdown */}
      {groupedSections.map(section => {
        const sectionItems = section.cats.flatMap(c => c.items);
        const sectionDone = sectionItems.filter(i => completedIds.has(i.id)).length;
        const sectionPct = sectionItems.length > 0 ? Math.round((sectionDone / sectionItems.length) * 100) : 0;

        return (
          <View key={section.label} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{section.label}</Text>
              <Text style={[styles.sectionPct, { color: sectionPct === 100 ? colors.primary : colors.mutedForeground }]}>
                {sectionPct}% ({sectionDone}/{sectionItems.length})
              </Text>
            </View>

            <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {section.cats.map((cat, idx) => {
                const pct = getCompletionPercent(completedIds, cat.id);
                const done = cat.items.filter(i => completedIds.has(i.id)).length;
                const isLast = idx === section.cats.length - 1;

                return (
                  <Pressable
                    key={cat.id}
                    onPress={() => router.push(`/category/${cat.id}`)}
                    style={({ pressed }) => [
                      styles.catRow,
                      {
                        borderBottomColor: colors.border,
                        borderBottomWidth: isLast ? 0 : StyleSheet.hairlineWidth,
                        opacity: pressed ? 0.75 : 1,
                      },
                    ]}
                  >
                    <View style={styles.catRowLeft}>
                      <View style={[styles.catDot, { backgroundColor: pct === 100 ? colors.primary : cat.color }]} />
                      <Text style={[styles.catName, { color: colors.foreground }]} numberOfLines={1}>
                        {cat.title}
                      </Text>
                    </View>
                    <View style={styles.catRowRight}>
                      <View style={[styles.miniTrack, { backgroundColor: colors.secondary }]}>
                        <View style={[styles.miniFill, { width: `${pct}%` as any, backgroundColor: pct === 100 ? colors.primary : cat.color }]} />
                      </View>
                      <Text style={[styles.catCount, { color: colors.mutedForeground }]}>
                        {done}/{cat.items.length}
                      </Text>
                      <Feather name="chevron-right" size={12} color={colors.mutedForeground} />
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 16, gap: 16 },
  screenTitle: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  ringsCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  ringsRow: {
    flexDirection: 'row',
    padding: 20,
    gap: 16,
  },
  ringItem: { flex: 1, alignItems: 'center', gap: 8 },
  ringLabel: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  ringDivider: { width: StyleSheet.hairlineWidth, marginVertical: 4 },
  summaryRow: {
    borderTopWidth: StyleSheet.hairlineWidth,
    padding: 12,
    alignItems: 'center',
  },
  summaryText: { fontSize: 12, fontFamily: 'Inter_400Regular', textAlign: 'center' },
  section: { gap: 8 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 14, fontFamily: 'Inter_600SemiBold', textTransform: 'uppercase', letterSpacing: 0.8 },
  sectionPct: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  sectionCard: { borderRadius: 10, borderWidth: 1, overflow: 'hidden' },
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  catRowLeft: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  catDot: { width: 8, height: 8, borderRadius: 4 },
  catName: { fontSize: 14, fontFamily: 'Inter_400Regular', flex: 1 },
  catRowRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  miniTrack: { width: 60, height: 4, borderRadius: 2, overflow: 'hidden' },
  miniFill: { height: '100%', borderRadius: 2 },
  catCount: { fontSize: 11, fontFamily: 'Inter_500Medium', minWidth: 32, textAlign: 'right' },
});
