import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, Share, StyleSheet, Text, TextInput, View } from 'react-native';
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
  const { completedIds, exportCode, importCode, resetAll } = useProgress();
  const topInset = Platform.OS === 'web' ? 67 : insets.top;
  const bottomInset = Platform.OS === 'web' ? 34 : 0;

  const [showRestore, setShowRestore] = useState(false);
  const [restoreText, setRestoreText] = useState('');
  const [restoreStatus, setRestoreStatus] = useState<'idle' | 'ok' | 'err'>('idle');

  const overallPercent = getCompletionPercent(completedIds);
  const requiredComplete = REQUIRED_IDS.filter(id => completedIds.has(id)).length;
  const requiredTotal = REQUIRED_IDS.length;
  const requiredPercent = Math.round((requiredComplete / requiredTotal) * 100);

  const handleBackup = async () => {
    const code = exportCode();
    if (completedIds.size === 0) {
      Alert.alert('Nothing to Back Up', 'You have not checked off any items yet.');
      return;
    }
    try {
      await Share.share({
        message: code,
        title: 'RDR2 Guide — Progress Backup',
      });
    } catch {}
  };

  const handleRestore = () => {
    if (!restoreText.trim()) {
      setRestoreStatus('err');
      return;
    }
    const ok = importCode(restoreText);
    if (ok) {
      setRestoreStatus('ok');
      setRestoreText('');
      setTimeout(() => {
        setShowRestore(false);
        setRestoreStatus('idle');
      }, 1500);
    } else {
      setRestoreStatus('err');
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Reset All Progress',
      'This will permanently clear every checked item. Back up your progress first.',
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

      {/* ── Backup & Restore ─────────────────────────────── */}
      <View style={[styles.backupCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.backupHeader}>
          <Feather name="shield" size={14} color={colors.primary} />
          <Text style={[styles.backupTitle, { color: colors.foreground }]}>Backup & Restore</Text>
        </View>
        <Text style={[styles.backupDesc, { color: colors.mutedForeground }]}>
          Save your progress to Notes or iMessage. If you ever lose your checkmarks, paste the code here to restore everything instantly.
        </Text>

        <View style={styles.backupButtons}>
          <Pressable
            onPress={handleBackup}
            style={({ pressed }) => [styles.backupBtn, { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 }]}
          >
            <Feather name="upload" size={14} color={colors.primaryForeground} />
            <Text style={[styles.backupBtnText, { color: colors.primaryForeground }]}>Back Up Now</Text>
          </Pressable>

          <Pressable
            onPress={() => { setShowRestore(v => !v); setRestoreStatus('idle'); }}
            style={({ pressed }) => [styles.backupBtn, { backgroundColor: colors.secondary, opacity: pressed ? 0.8 : 1 }]}
          >
            <Feather name="download" size={14} color={colors.foreground} />
            <Text style={[styles.backupBtnText, { color: colors.foreground }]}>Restore</Text>
          </Pressable>
        </View>

        {showRestore && (
          <View style={styles.restoreBox}>
            <TextInput
              style={[
                styles.restoreInput,
                {
                  backgroundColor: colors.background,
                  borderColor: restoreStatus === 'err' ? '#e74c3c' : restoreStatus === 'ok' ? colors.primary : colors.border,
                  color: colors.foreground,
                },
              ]}
              placeholder="Paste your backup code here…"
              placeholderTextColor={colors.mutedForeground}
              value={restoreText}
              onChangeText={t => { setRestoreText(t); setRestoreStatus('idle'); }}
              multiline
              numberOfLines={3}
              autoCorrect={false}
              autoCapitalize="none"
            />
            {restoreStatus === 'ok' && (
              <Text style={[styles.restoreFeedback, { color: colors.primary }]}>✓ Progress restored!</Text>
            )}
            {restoreStatus === 'err' && (
              <Text style={[styles.restoreFeedback, { color: '#e74c3c' }]}>Invalid code. Make sure you pasted the full backup.</Text>
            )}
            <Pressable
              onPress={handleRestore}
              style={({ pressed }) => [styles.restoreConfirmBtn, { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 }]}
            >
              <Text style={[styles.backupBtnText, { color: colors.primaryForeground }]}>Restore My Progress</Text>
            </Pressable>
          </View>
        )}
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
            <View style={styles.sectionRow}>
              <View style={[styles.sectionIcon, { backgroundColor: colors.secondary }]}>
                <Feather name={section.iconName as any} size={13} color={colors.primary} />
              </View>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>{section.label}</Text>
              <Text style={[styles.sectionPct, { color: sectionPct === 100 ? colors.primary : colors.mutedForeground }]}>
                {sectionPct}% ({doneInSection}/{totalInSection})
              </Text>
            </View>

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

      {/* Reset */}
      <Pressable
        onPress={handleReset}
        style={({ pressed }) => [styles.resetBtn, { borderColor: '#e74c3c', opacity: pressed ? 0.7 : 1 }]}
      >
        <Feather name="trash-2" size={13} color="#e74c3c" />
        <Text style={[styles.resetText, { color: '#e74c3c' }]}>Reset All Progress</Text>
      </Pressable>
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
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  ringsRow: { flexDirection: 'row', padding: 20, gap: 16 },
  ringItem: { flex: 1, alignItems: 'center', gap: 8 },
  ringLabel: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  ringDivider: { width: StyleSheet.hairlineWidth, marginVertical: 4 },
  summaryRow: { borderTopWidth: StyleSheet.hairlineWidth, padding: 12, alignItems: 'center' },
  summaryText: { fontSize: 12, fontFamily: 'Inter_400Regular', textAlign: 'center' },

  backupCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 2,
  },
  backupHeader: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  backupTitle: { fontSize: 14, fontFamily: 'Inter_700Bold', textTransform: 'uppercase', letterSpacing: 1 },
  backupDesc: { fontSize: 12, fontFamily: 'Inter_400Regular', lineHeight: 18 },
  backupButtons: { flexDirection: 'row', gap: 10 },
  backupBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 11,
    borderRadius: 8,
  },
  backupBtnText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  restoreBox: { gap: 8, marginTop: 4 },
  restoreInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    minHeight: 70,
    textAlignVertical: 'top',
  },
  restoreFeedback: { fontSize: 12, fontFamily: 'Inter_500Medium' },
  restoreConfirmBtn: {
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: 'center',
  },

  section: { gap: 6 },
  sectionRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionIcon: { width: 24, height: 24, borderRadius: 6, alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { fontSize: 13, fontFamily: 'Inter_600SemiBold', textTransform: 'uppercase', letterSpacing: 0.7, flex: 1 },
  sectionPct: { fontSize: 12, fontFamily: 'Inter_500Medium' },

  catCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
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
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 1,
  },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontSize: 12, fontFamily: 'Inter_400Regular' },

  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1,
  },
  resetText: { fontSize: 13, fontFamily: 'Inter_500Medium' },
});
