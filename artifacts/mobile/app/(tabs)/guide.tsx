import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CategoryCard } from '@/components/CategoryCard';
import { getCategoriesBySection, getCompletionPercent, getSectionPercent, SECTIONS } from '@/data/rdr2Data';
import { useColors } from '@/hooks/useColors';
import { useProgress } from '@/context/ProgressContext';

const ALL_KEY = 'ALL';

export default function GuideScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { completedIds } = useProgress();
  const [activeSection, setActiveSection] = useState(ALL_KEY);
  const [search, setSearch] = useState('');
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  const topInset = Platform.OS === 'web' ? 67 : insets.top;
  const bottomInset = Platform.OS === 'web' ? 34 : 0;

  const toggleSection = (key: string) => {
    setCollapsedSections(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const filterTabs = [
    { key: ALL_KEY, label: 'All' },
    ...SECTIONS.map(s => ({ key: s.key, label: s.label })),
  ];

  const searchLower = search.trim().toLowerCase();
  const displaySections = activeSection === ALL_KEY ? SECTIONS : SECTIONS.filter(s => s.key === activeSection);
  const overallPct = getCompletionPercent(completedIds);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Fixed Header */}
      <View style={[styles.fixedHeader, { paddingTop: topInset + 8, backgroundColor: colors.background, borderBottomColor: colors.border }]}>

        {/* Title row */}
        <View style={styles.titleRow}>
          <View>
            <Text style={[styles.screenTitle, { color: colors.primary }]}>Completion Guide</Text>
            <Text style={[styles.screenSub, { color: colors.mutedForeground }]}>
              All missions, collectibles & challenges
            </Text>
          </View>
          <View style={[styles.overallBadge, { backgroundColor: overallPct === 100 ? colors.primary + '22' : colors.secondary, borderColor: overallPct === 100 ? colors.primary : colors.border }]}>
            <Text style={[styles.overallPct, { color: overallPct === 100 ? colors.primary : colors.foreground }]}>
              {overallPct}%
            </Text>
            <Text style={[styles.overallLabel, { color: colors.mutedForeground }]}>done</Text>
          </View>
        </View>

        {/* Walkthrough shortcut */}
        <Pressable
          onPress={() => router.push('/(tabs)/walkthrough')}
          style={[styles.walkthroughShortcut, { backgroundColor: colors.card, borderColor: colors.goldDim }]}
        >
          <Feather name="book-open" size={13} color={colors.gold} />
          <Text style={[styles.walkthroughShortcutText, { color: colors.gold }]}>
            Step-by-step walkthroughs (Ch. 4 onwards) →
          </Text>
        </Pressable>

        {/* Search */}
        <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="search" size={14} color={colors.mutedForeground} />
          <TextInput
            style={[styles.searchInput, { color: colors.foreground }]}
            placeholder="Search categories..."
            placeholderTextColor={colors.mutedForeground}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')}>
              <Feather name="x" size={14} color={colors.mutedForeground} />
            </Pressable>
          )}
        </View>

        {/* Section filter tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {filterTabs.map(tab => {
            const active = activeSection === tab.key;
            return (
              <Pressable
                key={tab.key}
                onPress={() => setActiveSection(tab.key)}
                style={[
                  styles.filterTab,
                  {
                    backgroundColor: active ? colors.primary : colors.card,
                    borderColor: active ? colors.primary : colors.border,
                  },
                ]}
              >
                <Text style={[styles.filterTabText, { color: active ? colors.primaryForeground : colors.mutedForeground }]}>
                  {tab.label}
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
        {/* Side quest info banner */}
        {(activeSection === ALL_KEY || activeSection === 'MAIN STORY') && (
          <View style={[styles.sideQuestInfo, { backgroundColor: colors.sideQuest + '18', borderColor: colors.sideQuest }]}>
            <View style={[styles.sideQuestDot, { backgroundColor: colors.sideQuestFg }]} />
            <Text style={[styles.sideQuestInfoText, { color: colors.sideQuestFg }]}>
              Missions marked <Text style={{ fontFamily: 'Inter_700Bold' }}>SIDE QUEST</Text> are optional but available during that chapter
            </Text>
          </View>
        )}

        {displaySections.map(section => {
          const sectionCats = getCategoriesBySection(section.key).filter(cat =>
            searchLower === '' ||
            cat.title.toLowerCase().includes(searchLower) ||
            cat.subtitle.toLowerCase().includes(searchLower)
          );

          if (sectionCats.length === 0) return null;

          const sectionPct = getSectionPercent(completedIds, section.key);
          const isCollapsed = collapsedSections.has(section.key);

          return (
            <View key={section.key} style={styles.sectionBlock}>
              <Pressable
                onPress={() => toggleSection(section.key)}
                style={({ pressed }) => [
                  styles.sectionHeader,
                  { borderBottomColor: colors.border, opacity: pressed ? 0.75 : 1 },
                ]}
              >
                <View style={[styles.sectionIconWrap, { backgroundColor: colors.secondary }]}>
                  <Feather name={section.iconName as any} size={13} color={colors.primary} />
                </View>
                <View style={styles.sectionHeaderText}>
                  <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{section.label}</Text>
                  <Text style={[styles.sectionMeta, { color: colors.mutedForeground }]}>
                    {sectionCats.length} {sectionCats.length === 1 ? 'category' : 'categories'} · {sectionPct}% complete
                  </Text>
                </View>
                <View style={styles.sectionRight}>
                  <View style={[styles.miniTrack, { backgroundColor: colors.secondary }]}>
                    <View
                      style={[
                        styles.miniFill,
                        {
                          width: `${sectionPct}%` as any,
                          backgroundColor: sectionPct === 100 ? colors.primary : colors.gold,
                        },
                      ]}
                    />
                  </View>
                  <Feather
                    name={isCollapsed ? 'chevron-down' : 'chevron-up'}
                    size={15}
                    color={colors.mutedForeground}
                  />
                </View>
              </Pressable>

              {!isCollapsed && (
                <View style={styles.sectionCards}>
                  {sectionCats.map(cat => (
                    <CategoryCard
                      key={cat.id}
                      category={cat}
                      onPress={() => router.push(`/category/${cat.id}`)}
                    />
                  ))}
                </View>
              )}
            </View>
          );
        })}

        {displaySections.every(s => {
          const cats = getCategoriesBySection(s.key).filter(c =>
            searchLower === '' || c.title.toLowerCase().includes(searchLower)
          );
          return cats.length === 0;
        }) && (
          <View style={styles.empty}>
            <Feather name="search" size={32} color={colors.mutedForeground} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>No categories found</Text>
          </View>
        )}
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  screenTitle: {
    fontSize: 21,
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  screenSub: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    marginTop: 1,
  },
  overallBadge: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  overallPct: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
  },
  overallLabel: {
    fontSize: 9,
    fontFamily: 'Inter_400Regular',
    letterSpacing: 0.5,
  },
  walkthroughShortcut: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1,
  },
  walkthroughShortcutText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: { flex: 1, fontSize: 14, fontFamily: 'Inter_400Regular' },
  filterRow: { flexDirection: 'row', gap: 8, paddingVertical: 2 },
  filterTab: {
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterTabText: { fontSize: 12, fontFamily: 'Inter_500Medium' },
  list: { flex: 1 },
  listContent: { padding: 14, gap: 0 },
  sideQuestInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 10,
    borderLeftWidth: 3,
    padding: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1,
  },
  sideQuestDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    flexShrink: 0,
  },
  sideQuestInfoText: {
    fontSize: 11,
    fontFamily: 'Inter_400Regular',
    flex: 1,
    lineHeight: 16,
  },
  sectionBlock: { marginBottom: 14 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    marginBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sectionIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeaderText: { flex: 1, gap: 1 },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionMeta: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  sectionRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  miniTrack: { width: 48, height: 4, borderRadius: 2, overflow: 'hidden' },
  miniFill: { height: '100%', borderRadius: 2 },
  sectionCards: { gap: 0 },
  empty: { alignItems: 'center', gap: 12, paddingTop: 60 },
  emptyText: { fontSize: 16, fontFamily: 'Inter_400Regular' },
});
