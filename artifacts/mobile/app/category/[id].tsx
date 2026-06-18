import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CheckItem } from '@/components/CheckItem';
import { useProgress } from '@/context/ProgressContext';
import { getCategoryById, getCompletionPercent } from '@/data/rdr2Data';
import { useColors } from '@/hooks/useColors';

type FilterMode = 'all' | 'incomplete' | 'complete';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { completedIds, toggleItem } = useProgress();
  const [filter, setFilter] = useState<FilterMode>('all');
  const topInset = Platform.OS === 'web' ? 67 : insets.top;
  const bottomInset = Platform.OS === 'web' ? 34 : 0;

  const category = useMemo(() => getCategoryById(id ?? ''), [id]);

  const percent = useMemo(
    () => (category ? getCompletionPercent(completedIds, category.id) : 0),
    [completedIds, category]
  );

  const filteredItems = useMemo(() => {
    if (!category) return [];
    switch (filter) {
      case 'complete': return category.items.filter(i => completedIds.has(i.id));
      case 'incomplete': return category.items.filter(i => !completedIds.has(i.id));
      default: return category.items;
    }
  }, [category, filter, completedIds]);

  const completedCount = category?.items.filter(i => completedIds.has(i.id)).length ?? 0;

  if (!category) {
    return (
      <View style={[styles.notFound, { backgroundColor: colors.background }]}>
        <Text style={[styles.notFoundText, { color: colors.foreground }]}>Category not found</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={[styles.backLink, { color: colors.primary }]}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: topInset + 8,
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={20} color={colors.primary} />
        </Pressable>

        <View style={styles.headerContent}>
          <View style={styles.titleRow}>
            <View style={[styles.iconWrap, { backgroundColor: category.color + '22' }]}>
              <Feather name={category.iconName as any} size={16} color={category.color} />
            </View>
            <View style={styles.titleStack}>
              <Text style={[styles.title, { color: colors.foreground }]}>{category.title}</Text>
              <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>{category.subtitle}</Text>
            </View>
            {category.requiredFor100 && (
              <View style={[styles.requiredBadge, { backgroundColor: colors.accent + '22' }]}>
                <Feather name="star" size={10} color={colors.accent} />
              </View>
            )}
          </View>

          {/* Progress bar */}
          <View style={styles.progressRow}>
            <View style={[styles.track, { backgroundColor: colors.secondary }]}>
              <View
                style={[
                  styles.fill,
                  { width: `${percent}%` as any, backgroundColor: percent === 100 ? colors.primary : category.color },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: percent === 100 ? colors.primary : colors.mutedForeground }]}>
              {completedCount}/{category.items.length} ({percent}%)
            </Text>
          </View>

          {/* Filter pills */}
          <View style={styles.filterRow}>
            {(['all', 'incomplete', 'complete'] as FilterMode[]).map(f => {
              const active = filter === f;
              const label = f === 'all' ? `All (${category.items.length})` : f === 'incomplete' ? `Todo (${category.items.length - completedCount})` : `Done (${completedCount})`;
              return (
                <Pressable
                  key={f}
                  onPress={() => setFilter(f)}
                  style={[
                    styles.filterPill,
                    {
                      backgroundColor: active ? colors.primary : colors.card,
                      borderColor: active ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Text style={[styles.filterPillText, { color: active ? colors.primaryForeground : colors.mutedForeground }]}>
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      {/* Items list */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={[styles.listContent, { paddingBottom: bottomInset + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {filteredItems.length === 0 ? (
          <View style={styles.empty}>
            <Feather
              name={filter === 'complete' ? 'check-circle' : 'list'}
              size={36}
              color={colors.mutedForeground}
            />
            <Text style={[styles.emptyTitle, { color: colors.foreground }]}>
              {filter === 'complete' ? 'Nothing completed yet' : filter === 'incomplete' ? 'All done!' : 'No items'}
            </Text>
            {filter === 'incomplete' && percent === 100 && (
              <Text style={[styles.emptyDesc, { color: colors.primary }]}>
                Category complete! 🏆
              </Text>
            )}
          </View>
        ) : (
          <View style={[styles.itemsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {filteredItems.map(item => (
              <CheckItem
                key={item.id}
                item={item}
                completed={completedIds.has(item.id)}
                onToggle={() => toggleItem(item.id)}
              />
            ))}
          </View>
        )}

        {/* Quick complete all / clear all */}
        {filteredItems.length > 0 && (
          <View style={styles.bulkActions}>
            <Pressable
              style={[styles.bulkBtn, { borderColor: colors.primary }]}
              onPress={() => {
                const incomplete = category.items.filter(i => !completedIds.has(i.id));
                incomplete.forEach(i => toggleItem(i.id));
              }}
            >
              <Feather name="check-square" size={14} color={colors.primary} />
              <Text style={[styles.bulkBtnText, { color: colors.primary }]}>Complete All</Text>
            </Pressable>
            <Pressable
              style={[styles.bulkBtn, { borderColor: colors.border }]}
              onPress={() => {
                const done = category.items.filter(i => completedIds.has(i.id));
                done.forEach(i => toggleItem(i.id));
              }}
            >
              <Feather name="x-square" size={14} color={colors.mutedForeground} />
              <Text style={[styles.bulkBtnText, { color: colors.mutedForeground }]}>Clear All</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  headerContent: { paddingHorizontal: 16, gap: 10 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconWrap: { width: 32, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  titleStack: { flex: 1, gap: 2 },
  title: { fontSize: 18, fontFamily: 'Inter_700Bold' },
  subtitle: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  requiredBadge: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  track: { flex: 1, height: 5, borderRadius: 3, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 3 },
  progressText: { fontSize: 12, fontFamily: 'Inter_500Medium', minWidth: 80, textAlign: 'right' },
  filterRow: { flexDirection: 'row', gap: 6 },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterPillText: { fontSize: 12, fontFamily: 'Inter_500Medium' },
  list: { flex: 1 },
  listContent: { padding: 16, gap: 12 },
  itemsCard: { borderRadius: 10, borderWidth: 1, overflow: 'hidden' },
  empty: { alignItems: 'center', gap: 10, paddingTop: 60 },
  emptyTitle: { fontSize: 16, fontFamily: 'Inter_500Medium' },
  emptyDesc: { fontSize: 14, fontFamily: 'Inter_400Regular' },
  bulkActions: { flexDirection: 'row', gap: 10 },
  bulkBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 11,
    borderRadius: 8,
    borderWidth: 1,
  },
  bulkBtnText: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  notFoundText: { fontSize: 16, fontFamily: 'Inter_500Medium' },
  backLink: { fontSize: 14, fontFamily: 'Inter_500Medium' },
});
