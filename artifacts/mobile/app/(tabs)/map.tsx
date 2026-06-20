import { Feather } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
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

const PEN_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#ffffff', '#000000'];
const PEN_SIZES = [2, 4, 8, 14];

interface DrawnPath {
  d: string;
  color: string;
  size: number;
}

function buildPathD(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) {
    const p = points[0];
    return `M${p.x},${p.y} L${p.x + 0.1},${p.y + 0.1}`;
  }
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L${points[i].x},${points[i].y}`;
  }
  return d;
}

export default function MapScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState(MAP_OPTIONS[0]);
  const [loading, setLoading] = useState(true);

  const [drawMode, setDrawMode] = useState(false);
  const [penColor, setPenColor] = useState('#ef4444');
  const [penSize, setPenSize] = useState(4);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [paths, setPaths] = useState<DrawnPath[]>([]);
  const currentPoints = useRef<{ x: number; y: number }[]>([]);

  const topInset = Platform.OS === 'web' ? 67 : insets.top;
  const bottomInset = Platform.OS === 'web' ? 34 : 0;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        currentPoints.current = [{ x: locationX, y: locationY }];
        setPaths(prev => [...prev, { d: buildPathD(currentPoints.current), color: penColor, size: penSize }]);
      },
      onPanResponderMove: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        currentPoints.current.push({ x: locationX, y: locationY });
        const d = buildPathD(currentPoints.current);
        setPaths(prev => {
          const next = [...prev];
          next[next.length - 1] = { ...next[next.length - 1], d };
          return next;
        });
      },
      onPanResponderRelease: () => {
        currentPoints.current = [];
      },
    })
  ).current;

  const undoLast = () => setPaths(prev => prev.slice(0, -1));
  const clearAll = () => setPaths([]);

  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, { backgroundColor: colors.background, paddingTop: topInset, paddingBottom: bottomInset }]}>
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.primary }]}>World Map</Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Open on mobile for full interactive map + drawing</Text>
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
            Apple Pencil drawing is available on iPad via Expo Go.
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
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: colors.primary }]}>World Map</Text>
          {/* Draw mode toggle */}
          <View style={styles.headerActions}>
            {drawMode && paths.length > 0 && (
              <Pressable
                onPress={undoLast}
                style={[styles.iconBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <Feather name="corner-left-up" size={16} color={colors.foreground} />
              </Pressable>
            )}
            {drawMode && paths.length > 0 && (
              <Pressable
                onPress={clearAll}
                style={[styles.iconBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <Feather name="trash-2" size={16} color="#ef4444" />
              </Pressable>
            )}
            <Pressable
              onPress={() => { setDrawMode(d => !d); setShowColorPicker(false); }}
              style={[
                styles.drawToggle,
                {
                  backgroundColor: drawMode ? penColor : colors.card,
                  borderColor: drawMode ? penColor : colors.border,
                },
              ]}
            >
              <Feather name="edit-2" size={15} color={drawMode ? '#fff' : colors.mutedForeground} />
              <Text style={[styles.drawToggleText, { color: drawMode ? '#fff' : colors.mutedForeground }]}>
                {drawMode ? 'Drawing' : 'Draw'}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Map tabs */}
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

      {/* Map + Drawing Layer */}
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
          scrollEnabled={!drawMode}
        />

        {/* SVG Drawing Overlay — only captures touches when drawMode is on */}
        {drawMode && (
          <View style={StyleSheet.absoluteFill} {...panResponder.panHandlers}>
            <Svg style={StyleSheet.absoluteFill}>
              {paths.map((p, i) => (
                <Path
                  key={i}
                  d={p.d}
                  stroke={p.color}
                  strokeWidth={p.size}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              ))}
            </Svg>
          </View>
        )}

        {/* Saved paths visible even when not drawing */}
        {!drawMode && paths.length > 0 && (
          <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <Svg style={StyleSheet.absoluteFill}>
              {paths.map((p, i) => (
                <Path
                  key={i}
                  d={p.d}
                  stroke={p.color}
                  strokeWidth={p.size}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              ))}
            </Svg>
          </View>
        )}

        {loading && (
          <View style={[styles.loadingOverlay, { backgroundColor: colors.background }]}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={[styles.loadingText, { color: colors.mutedForeground }]}>Loading map...</Text>
          </View>
        )}
      </View>

      {/* Floating pen toolbar — visible only in draw mode */}
      {drawMode && (
        <View style={[styles.penToolbar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {/* Color swatch */}
          <Pressable
            onPress={() => setShowColorPicker(v => !v)}
            style={[styles.colorSwatch, { backgroundColor: penColor, borderColor: colors.border }]}
          />

          {/* Pen sizes */}
          {PEN_SIZES.map(sz => (
            <Pressable
              key={sz}
              onPress={() => setPenSize(sz)}
              style={[
                styles.sizeDot,
                {
                  width: sz * 2 + 8,
                  height: sz * 2 + 8,
                  borderRadius: (sz * 2 + 8) / 2,
                  backgroundColor: penSize === sz ? penColor : colors.secondary,
                  borderColor: penSize === sz ? penColor : colors.border,
                  borderWidth: 1.5,
                },
              ]}
            />
          ))}
        </View>
      )}

      {/* Color picker popover */}
      {drawMode && showColorPicker && (
        <View style={[styles.colorPicker, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.colorGrid}>
            {PEN_COLORS.map(c => (
              <Pressable
                key={c}
                onPress={() => { setPenColor(c); setShowColorPicker(false); }}
                style={[
                  styles.colorOption,
                  { backgroundColor: c, borderColor: penColor === c ? '#fff' : 'transparent', borderWidth: 2.5 },
                ]}
              />
            ))}
          </View>
        </View>
      )}
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
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
  drawToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  drawToggleText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  penToolbar: {
    position: 'absolute',
    bottom: 108,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  colorSwatch: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
  },
  sizeDot: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorPicker: {
    position: 'absolute',
    bottom: 158,
    alignSelf: 'center',
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  colorGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  colorOption: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});
