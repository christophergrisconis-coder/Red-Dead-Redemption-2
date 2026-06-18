import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

const REQUIRED_IDS = categories
  .filter(c => c.requiredFor100)
  .flatMap(c => c.items.map(i => i.id));

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
            <ProgressRing percent={overallPercent} size={110} strokeWidth={8} label="all items" />
            <Text style={[styles.ringLabel, { color: colors.foreground }]}>All Items</Text>
          </View>
          <View style={[styles.ringDivider, { backgroundColor: colors.border }]} />
          <View style={styles.ringItem}>
            <ProgressRing percent={requiredPercent} size={110} strokeWidth={8} label="required" />
            <Text style={[styles.ringLabel, { color: colors.foreground }]}>For 100%</Text>
          </View>
        </View>
        <View style={[styles.summaryRow, { borderTopColor: colors.border }]}>
          <Text style={[styles.summaryText, { color: colors.mutedForeground }]}>
            {completedIds.size} of {totalItems} items · {requiredComplete}/{requiredTotal} required for 100%
          </Text>
        </View>
      </View>

      {/* Per-section breakdown */}
      {SECTIONS.map(section => {
        const sectionCats = getCategoriesBySection(section.key);
        const sectionPct = getSectionPercent(completedIds, section.key);
        const totalInSection = sectionCats.reduce((s, c) => s + c.items.length, 0);
        const doneInSection = sectionCats.reduce(
          (s, c) => s + c.items.filter(i => completedIds.has(i.id)).length,
          0
        );

        return (
          <View key={section.key} style={styles.section}>
            {/* Section header row */}
            <View style={styles.sectionRow}>
              <View style={[styles.sectionIcon, { backgroundColor: colors.secondary }]}>
                <Feather name={section.iconName as any} size={13} color={colors.primary} />
              </View>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{section.label}</Text>
              <Text style={[styles.sectionPct, { color: sectionPct === 100 ? colors.primary : colors.mutedForeground }]}>
                {sectionPct}% ({doneInSection}/{totalInSection})
              </Text>
            </View>

            {/* Category rows */}
            <View style={[styles.catCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {sectionCats.map((cat, idx) => {
                const pct = getCompletionPercent(completedIds, cat.id);
                const done = cat.items.filter(i => completedIds.has(i.id)).length;
                const isLast = idx === sectionCats.length - 1;

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
                    <View style={[styles.catDot, { backgroundColor: pct === 100 ? colors.primary : cat.color }]} />
                    <Text style={[styles.catName, { color: colors.foreground }]} numberOfLines={1}>
                      {cat.title}
                    </Text>
                    {cat.requiredFor100 && (
                      <Feather name="star" size={9} color={colors.accent} style={styles.starIcon} />
                    )}
                    <View style={[styles.miniTrack, { backgroundColor: colors.secondary }]}>
                      <View
                        style={[
                          styles.miniFill,
                          { width: `${pct}%` as any, backgroundColor: pct === 100 ? colors.primary : cat.color },
                        ]}
                      />
                    </View>
                    <Text style={[styles.catCount, { color: colors.mutedForeground }]}>
                      {done}/{cat.items.length}
                    </Text>
                    <Feather name="chevron-right" size={11} color={colors.mutedForeground} />
                  </Pressable>
                );
              })}
            </View>
          </View>
        );
      })}

      {/* Legend */}
      <View style={[styles.legend, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.legendRow}>
          <Feather name="star" size={11} color={colors.accent} />
          <Text style={[styles.legendText, { color: colors.mutedForeground }]}>Required for 100% completion</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
          <Text style={[styles.legendText, { color: colors.mutedForeground }]}>Fully completed</Text>
        </View>
      </View>
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
  ringsCard: { borderRadius: 12, borderWidth: 1, overflow: 'hidden' },
  ringsRow: { flexDirection: 'row', padding: 20, gap: 16 },
  ringItem: { flex: 1, alignItems: 'center', gap: 8 },
  ringLabel: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  ringDivider: { width: StyleSheet.hairlineWidth, marginVertical: 4 },
  summaryRow: { borderTopWidth: StyleSheet.hairlineWidth, padding: 12, alignItems: 'center' },
  summaryText: { fontSize: 12, fontFamily: 'Inter_400Regular', textAlign: 'center' },

  section: { gap: 6 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionIcon: { width: 24, height: 24, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { fontSize: 13, fontFamily: 'Inter_600SemiBold', textTransform: 'uppercase', letterSpacing: 0.7, flex: 1 },
  sectionPct: { fontSize: 12, fontFamily: 'Inter_500Medium' },

  catCard: { borderRadius: 10, borderWidth: 1, overflow: 'hidden' },
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 11,
    gap: 7,
  },
  catDot: { width: 7, height: 7, borderRadius: 4, flexShrink: 0 },
  catName: { fontSize: 13, fontFamily: 'Inter_400Regular', flex: 1 },
  starIcon: { flexShrink: 0 },
  miniTrack: { width: 52, height: 3, borderRadius: 2, overflow: 'hidden', flexShrink: 0 },
  miniFill: { height: '100%', borderRadius: 2 },
  catCount: { fontSize: 10, fontFamily: 'Inter_500Medium', minWidth: 30, textAlign: 'right' },

  legend: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
    gap: 8,
  },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, fontFamily: 'Inter_400Regular' },
});
