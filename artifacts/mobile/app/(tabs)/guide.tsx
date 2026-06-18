import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CategoryCard } from '@/components/CategoryCard';
import { categories, getCategoriesBySection, getCompletionPercent, getSectionPercent, SECTIONS } from '@/data/rdr2Data';
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

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Fixed Header */}
      <View style={[styles.fixedHeader, { paddingTop: topInset + 8, backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <Text style={[styles.screenTitle, { color: colors.primary }]}>Completion Guide</Text>

        {/* Search */}
        <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="search" size={15} color={colors.mutedForeground} />
          <TextInput
            style={[styles.searchInput, { color: colors.foreground }]}
            placeholder="Search categories..."
            placeholderTextColor={colors.mutedForeground}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')}>
              <Feather name="x" size={15} color={colors.mutedForeground} />
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
        contentContainerStyle={[styles.listContent, { paddingBottom: bottomInset + 100 }]}
        showsVerticalScrollIndicator={false}
      >
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
              {/* Section Header */}
              <Pressable
                onPress={() => toggleSection(section.key)}
                style={({ pressed }) => [
                  styles.sectionHeader,
                  { borderBottomColor: colors.border, opacity: pressed ? 0.75 : 1 },
                ]}
              >
                <View style={[styles.sectionIconWrap, { backgroundColor: colors.secondary }]}>
                  <Feather name={section.iconName as any} size={14} color={colors.primary} />
                </View>
                <View style={styles.sectionHeaderText}>
                  <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{section.label}</Text>
                  <Text style={[styles.sectionMeta, { color: colors.mutedForeground }]}>
                    {sectionCats.length} {sectionCats.length === 1 ? 'category' : 'categories'} · {sectionPct}% complete
                  </Text>
                </View>
                <View style={styles.sectionRight}>
                  {/* Mini progress bar */}
                  <View style={[styles.miniTrack, { backgroundColor: colors.secondary }]}>
                    <View
                      style={[
                        styles.miniFill,
                        {
                          width: `${sectionPct}%` as any,
                          backgroundColor: sectionPct === 100 ? colors.primary : '#C8922A',
                        },
                      ]}
                    />
                  </View>
                  <Feather
                    name={isCollapsed ? 'chevron-down' : 'chevron-up'}
                    size={16}
                    color={colors.mutedForeground}
                  />
                </View>
              </Pressable>

              {/* Category cards */}
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

        {/* Empty state */}
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
  screenTitle: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  searchInput: { flex: 1, fontSize: 14, fontFamily: 'Inter_400Regular' },
  filterRow: { flexDirection: 'row', gap: 8, paddingVertical: 2 },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterTabText: { fontSize: 12, fontFamily: 'Inter_500Medium' },
  list: { flex: 1 },
  listContent: { padding: 16, gap: 0 },

  sectionBlock: { marginBottom: 16 },
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
  sectionTitle: { fontSize: 14, fontFamily: 'Inter_700Bold', textTransform: 'uppercase', letterSpacing: 1 },
  sectionMeta: { fontSize: 11, fontFamily: 'Inter_400Regular' },
  sectionRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  miniTrack: { width: 48, height: 4, borderRadius: 2, overflow: 'hidden' },
  miniFill: { height: '100%', borderRadius: 2 },
  sectionCards: { gap: 0 },

  empty: { alignItems: 'center', gap: 12, paddingTop: 60 },
  emptyText: { fontSize: 16, fontFamily: 'Inter_400Regular' },
});
