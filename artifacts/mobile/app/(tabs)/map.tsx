import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

const MAP_OPTIONS = [
  {
    key: 'rdr2map',
    label: 'RDR2 Map',
    url: 'https://rdr2map.com/',
    desc: 'Full interactive map with collectibles & locations',
  },
  {
    key: 'rockstar',
    label: 'Official',
    url: 'https://www.rockstargames.com/reddeadredemption2/guide/map',
    desc: 'Rockstar official world map',
  },
];

export default function MapScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState(MAP_OPTIONS[0]);
  const [loading, setLoading] = useState(true);
  const topInset = Platform.OS === 'web' ? 67 : insets.top;
  const bottomInset = Platform.OS === 'web' ? 34 : 0;

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, paddingTop: topInset, paddingBottom: bottomInset }]}>
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.primary }]}>World Map</Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Open on mobile for full interactive map</Text>
        </View>
        <View style={styles.webContent}>
          {MAP_OPTIONS.map(opt => (
            <View key={opt.key} style={[styles.webLink, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Feather name="map" size={20} color={colors.primary} />
              <View style={styles.webLinkText}>
                <Text style={[styles.webLinkTitle, { color: colors.foreground }]}>{opt.label}</Text>
                <Text style={[styles.webLinkDesc, { color: colors.mutedForeground }]}>{opt.url}</Text>
              </View>
              <Feather name="external-link" size={16} color={colors.mutedForeground} />
            </View>
          ))}
          <Text style={[styles.webNote, { color: colors.mutedForeground }]}>
            WebView maps are available when using the app on iOS or Android via Expo Go.
          </Text>
        </View>
      </View>
    );
  }

  const WebView = require('react-native-webview').WebView;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topInset + 8, borderBottomColor: colors.border, backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.primary }]}>World Map</Text>

        <View style={styles.mapTabs}>
          {MAP_OPTIONS.map(opt => {
            const active = selected.key === opt.key;
            return (
              <Pressable
                key={opt.key}
                onPress={() => { setSelected(opt); setLoading(true); }}
                style={[
                  styles.mapTab,
                  { backgroundColor: active ? colors.primary : colors.card, borderColor: active ? colors.primary : colors.border },
                ]}
              >
                <Text style={[styles.mapTabText, { color: active ? colors.primaryForeground : colors.mutedForeground }]}>
                  {opt.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Text style={[styles.mapDesc, { color: colors.mutedForeground }]}>{selected.desc}</Text>
      </View>

      {/* Map WebView */}
      <View style={[styles.mapContainer, { paddingBottom: bottomInset + 84 }]}>
        <WebView
          key={selected.key}
          source={{ uri: selected.url }}
          style={styles.webview}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          scalesPageToFit
          bounces={false}
        />
        {loading && (
          <View style={[styles.loadingOverlay, { backgroundColor: colors.background }]}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[styles.loadingText, { color: colors.mutedForeground }]}>Loading map...</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
  },
  mapTabs: { flexDirection: 'row', gap: 8 },
  mapTab: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  mapTabText: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  mapDesc: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  mapContainer: { flex: 1 },
  webview: { flex: 1 },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: { fontSize: 14, fontFamily: 'Inter_400Regular' },
  webContent: { padding: 16, gap: 12 },
  webLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
  },
  webLinkText: { flex: 1, gap: 2 },
  webLinkTitle: { fontSize: 15, fontFamily: 'Inter_600SemiBold' },
  webLinkDesc: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  webNote: { fontSize: 13, fontFamily: 'Inter_400Regular', textAlign: 'center', marginTop: 8 },
});
