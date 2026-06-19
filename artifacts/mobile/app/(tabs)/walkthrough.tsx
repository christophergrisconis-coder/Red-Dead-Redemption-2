import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useProgress } from '@/context/ProgressContext';
import { getWalkthroughsByChapter, WALKTHROUGH_CHAPTERS } from '@/data/walkthroughs';
import { useColors } from '@/hooks/useColors';

export default function WalkthroughScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { completedIds, toggleItem } = useProgress();
  const [activeChapter, setActiveChapter] = useState('ch4');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const topInset = Platform.OS === 'web' ? 67 : insets.top;
  const bottomInset = Platform.OS === 'web' ? 34 : 0;

  const missions = getWalkthroughsByChapter(activeChapter);
  const activeChapterInfo = WALKTHROUGH_CHAPTERS.find(c => c.key === activeChapter);

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const completedInChapter = missions.filter(({ id }) => completedIds.has(id)).length;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.fixedHeader, { paddingTop: topInset + 8, backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={[styles.screenTitle, { color: colors.primary }]}>Walkthroughs</Text>
            <Text style={[styles.screenSub, { color: colors.mutedForeground }]}>
              {activeChapterInfo?.label} · {activeChapterInfo?.subtitle}
            </Text>
          </View>
          <View style={[styles.progressPill, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
            <Feather name="check-circle" size={12} color={completedInChapter === missions.length ? colors.primary : colors.mutedForeground} />
            <Text style={[styles.progressPillText, { color: completedInChapter === missions.length ? colors.primary : colors.mutedForeground }]}>
              {completedInChapter}/{missions.length}
            </Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chapterTabs}>
          {WALKTHROUGH_CHAPTERS.map(ch => {
            const isActive = activeChapter === ch.key;
            const chMissions = getWalkthroughsByChapter(ch.key);
            const done = chMissions.filter(({ id }) => completedIds.has(id)).length;
            const pct = chMissions.length > 0 ? Math.round((done / chMissions.length) * 100) : 0;
            return (
              <Pressable
                key={ch.key}
                onPress={() => setActiveChapter(ch.key)}
                style={[
                  styles.chapterTab,
                  {
                    backgroundColor: isActive ? colors.primary : colors.card,
                    borderColor: isActive ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text style={[styles.chapterTabLabel, { color: isActive ? colors.primaryForeground : colors.foreground }]}>
                  {ch.label}
                </Text>
                <Text style={[styles.chapterTabPct, { color: isActive ? colors.primaryForeground + 'AA' : colors.mutedForeground }]}>
                  {pct}%
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={[styles.listContent, { paddingBottom: bottomInset + 110 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Decorative chapter banner */}
        <View style={[styles.chapterBanner, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <LinearGradient
            colors={[colors.primary + '18', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.bannerInner}>
            <Feather name="book-open" size={16} color={colors.primary} />
            <View style={styles.bannerText}>
              <Text style={[styles.bannerTitle, { color: colors.foreground }]}>{activeChapterInfo?.label}</Text>
              <Text style={[styles.bannerSub, { color: colors.mutedForeground }]}>
                {missions.length} missions · tap any mission to expand walkthrough
              </Text>
            </View>
          </View>
        </View>

        {missions.map(({ id, wt }) => {
          const isExpanded = expandedIds.has(id);
          const isDone = completedIds.has(id);
          const cardBorderColor = isDone ? colors.primary : wt.isSideQuest ? colors.sideQuest : colors.border;

          return (
            <View
              key={id}
              style={[styles.missionCard, { backgroundColor: colors.card, borderColor: cardBorderColor }]}
            >
              {/* Mission row header */}
              <Pressable
                onPress={() => toggleExpand(id)}
                style={({ pressed }) => [styles.missionRow, { opacity: pressed ? 0.8 : 1 }]}
              >
                <Pressable
                  onPress={() => toggleItem(id)}
                  style={[
                    styles.checkbox,
                    {
                      borderColor: isDone ? colors.primary : colors.border,
                      backgroundColor: isDone ? colors.primary : 'transparent',
                    },
                  ]}
                  hitSlop={8}
                >
                  {isDone && <Feather name="check" size={11} color={colors.primaryForeground} />}
                </Pressable>

                <View style={styles.missionInfo}>
                  {wt.isSideQuest && (
                    <View style={[styles.sideQuestBadge, { backgroundColor: colors.sideQuest + '30', borderColor: colors.sideQuest }]}>
                      <Text style={[styles.sideQuestText, { color: colors.sideQuestFg }]}>SIDE QUEST</Text>
                    </View>
                  )}
                  <Text
                    style={[
                      styles.missionTitle,
                      {
                        color: isDone ? colors.mutedForeground : colors.foreground,
                        textDecorationLine: isDone ? 'line-through' : 'none',
                      },
                    ]}
                    numberOfLines={2}
                  >
                    {wt.title}
                  </Text>
                  {!isExpanded && (
                    <Text style={[styles.tapHint, { color: colors.mutedForeground }]}>
                      {wt.steps.length} steps{wt.goldTips ? ' · gold tips included' : ''}
                    </Text>
                  )}
                </View>

                <Feather
                  name={isExpanded ? 'chevron-up' : 'chevron-down'}
                  size={15}
                  color={isExpanded ? colors.primary : colors.mutedForeground}
                />
              </Pressable>

              {/* Expanded walkthrough body */}
              {isExpanded && (
                <View style={[styles.walkthroughBody, { borderTopColor: colors.border }]}>
                  <View style={styles.stepsContainer}>
                    {wt.steps.map((step, i) => (
                      <View key={i} style={styles.stepRow}>
                        <View style={[styles.stepBullet, { backgroundColor: colors.primary }]}>
                          <Text style={[styles.stepNum, { color: colors.primaryForeground }]}>{i + 1}</Text>
                        </View>
                        <View style={styles.stepLine}>
                          {i < wt.steps.length - 1 && (
                            <View style={[styles.stepConnector, { backgroundColor: colors.border }]} />
                          )}
                        </View>
                        <Text style={[styles.stepText, { color: colors.foreground }]}>{step}</Text>
                      </View>
                    ))}
                  </View>

                  {wt.goldTips && wt.goldTips.length > 0 && (
                    <View style={[styles.goldBox, { backgroundColor: colors.gold + '12', borderColor: colors.goldDim }]}>
                      <View style={styles.goldHeader}>
                        <Feather name="star" size={12} color={colors.gold} />
                        <Text style={[styles.goldLabel, { color: colors.gold }]}>GOLD MEDAL TIPS</Text>
                      </View>
                      {wt.goldTips.map((tip, i) => (
                        <Text key={i} style={[styles.goldTipText, { color: colors.foreground }]}>{tip}</Text>
                      ))}
                    </View>
                  )}

                  {wt.honorNote && (
                    <View style={[styles.honorBox, { backgroundColor: colors.accent + '15', borderColor: colors.accent + '60' }]}>
                      <Feather name="shield" size={11} color={colors.accent} />
                      <Text style={[styles.honorText, { color: colors.foreground }]}>{wt.honorNote}</Text>
                    </View>
                  )}

                  <Pressable
                    onPress={() => toggleItem(id)}
                    style={[
                      styles.markCompleteBtn,
                      {
                        backgroundColor: isDone ? colors.secondary : colors.primary,
                        borderColor: isDone ? colors.border : colors.primary,
                      },
                    ]}
                  >
                    <Feather name={isDone ? 'x-circle' : 'check-circle'} size={14} color={isDone ? colors.mutedForeground : colors.primaryForeground} />
                    <Text style={[styles.markCompleteBtnText, { color: isDone ? colors.mutedForeground : colors.primaryForeground }]}>
                      {isDone ? 'Mark Incomplete' : 'Mark Complete'}
                    </Text>
                  </Pressable>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  fixedHeader: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 10,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  screenTitle: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  screenSub: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  progressPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  progressPillText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
  chapterTabs: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 2,
  },
  chapterTab: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    minWidth: 90,
  },
  chapterTabLabel: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 0.3,
  },
  chapterTabPct: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
    marginTop: 1,
  },
  list: { flex: 1 },
  listContent: { padding: 14, gap: 0 },
  chapterBanner: {
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 14,
    overflow: 'hidden',
  },
  bannerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
  },
  bannerText: { flex: 1 },
  bannerTitle: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 0.5,
  },
  bannerSub: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    marginTop: 2,
  },
  missionCard: {
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    overflow: 'hidden',
  },
  missionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  missionInfo: {
    flex: 1,
    gap: 4,
  },
  sideQuestBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  sideQuestText: {
    fontSize: 9,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1,
  },
  missionTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    lineHeight: 20,
  },
  tapHint: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
  },
  walkthroughBody: {
    borderTopWidth: StyleSheet.hairlineWidth,
    padding: 14,
    gap: 12,
  },
  stepsContainer: {
    gap: 0,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 12,
  },
  stepBullet: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 1,
  },
  stepLine: {
    position: 'absolute',
    left: 10,
    top: 22,
    bottom: -12,
    width: 2,
  },
  stepConnector: {
    flex: 1,
    width: 2,
  },
  stepNum: {
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
  },
  stepText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 20,
  },
  goldBox: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    gap: 6,
  },
  goldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  goldLabel: {
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    letterSpacing: 1.2,
  },
  goldTipText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
  },
  honorBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
  },
  honorText: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
  },
  markCompleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  markCompleteBtnText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
});
