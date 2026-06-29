import { Feather } from '@expo/vector-icons';
import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, {
  Circle,
  G,
  Image as SvgImage,
  Path,
} from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

/* Real RDR2 atlas map bundled with the app (offline-first) */
const MAP_IMAGE = require('../../assets/images/rdr2-map.jpg');

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

/* Natural pixel size of the bundled map image */
const IMG_W = 1000;
const IMG_H = 753;

const HEADER_H = 110;
const TABBAR_H = 90;
const AVAIL_W = SCREEN_W;
const AVAIL_H = Math.max(240, SCREEN_H - HEADER_H - TABBAR_H);

/* Scale that fits the whole landscape map inside the viewport */
const FIT = Math.min(AVAIL_W / IMG_W, AVAIL_H / IMG_H);
const RENDER_W = IMG_W * FIT;
const RENDER_H = IMG_H * FIT;
/* viewBox units per rendered screen pixel at base zoom */
const VB_PER_PX = IMG_W / RENDER_W;

/* ─── Map Layers ─── */
type LayerKey = 'towns';

const LAYERS: { key: LayerKey; label: string; color: string }[] = [
  { key: 'towns', label: 'Towns', color: '#9B2226' },
];

/* ─── Town markers, positioned on the real map (0..IMG_W / 0..IMG_H) ─── */
interface MapPoint {
  x: number;
  y: number;
  label: string;
  type: LayerKey;
  note?: string;
}

const MARKERS: MapPoint[] = [
  { x: 598, y: 108, label: 'Colter', type: 'towns', note: "Ch.1 snowy start — Dutch's gang camp" },
  { x: 566, y: 248, label: 'Valentine', type: 'towns', note: 'Ch.2 hub — saloon, doctor, stable, gunsmith' },
  { x: 452, y: 300, label: 'Wallace Station', type: 'towns', note: 'West Elizabeth rail station' },
  { x: 470, y: 350, label: 'Strawberry', type: 'towns', note: 'Mountain town — hotel & general store' },
  { x: 545, y: 420, label: 'Blackwater', type: 'towns', note: 'Off-limits until the Epilogue — bounty if entered early' },
  { x: 350, y: 527, label: 'Armadillo', type: 'towns', note: 'New Austin (Epilogue) — cholera-struck town' },
  { x: 160, y: 568, label: 'Tumbleweed', type: 'towns', note: 'Far-west frontier town (Epilogue)' },
  { x: 690, y: 282, label: 'Emerald Ranch', type: 'towns', note: 'Central ranch — fence & horse trading' },
  { x: 800, y: 425, label: 'Rhodes', type: 'towns', note: 'Lemoyne — Gray vs Braithwaite feud' },
  { x: 882, y: 405, label: 'Saint Denis', type: 'towns', note: 'Largest city — tailor, bank, theatre, trapper' },
  { x: 912, y: 258, label: 'Van Horn', type: 'towns', note: 'Grimy eastern trading post' },
  { x: 888, y: 188, label: 'Annesburg', type: 'towns', note: 'Northeast coal-mining town' },
];

/* ─── Drawn path helpers ─── */
interface DrawnPath {
  d: string;
  color: string;
  size: number;
}

const PEN_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#ffffff', '#000000'];
const PEN_SIZES = [2, 4, 8, 14];

function buildPathD(points: { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  if (points.length === 1) {
    const p = points[0];
    return `M${p.x},${p.y} L${p.x + 0.1},${p.y + 0.1}`;
  }
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) d += ` L${points[i].x},${points[i].y}`;
  return d;
}

/* ─── Main Screen ─── */
export default function MapScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const [activeLayers, setActiveLayers] = useState<Set<LayerKey>>(new Set(['towns']));
  const [drawMode, setDrawMode] = useState(false);
  const [penColor, setPenColor] = useState('#ef4444');
  const [penSize, setPenSize] = useState(4);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showLayerPanel, setShowLayerPanel] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [paths, setPaths] = useState<DrawnPath[]>([]);
  const currentPoints = useRef<{ x: number; y: number }[]>([]);

  /* Pan / Zoom — the image is pre-fit, so base scale = 1 */
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const lastScale = useRef(1);
  const lastTranslate = useRef({ x: 0, y: 0 });

  const topInset = Platform.OS === 'web' ? 67 : insets.top;

  const toggleLayer = useCallback((key: LayerKey) => {
    setActiveLayers(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const undoLast = () => setPaths(prev => prev.slice(0, -1));
  const clearAll = () => setPaths([]);

  const panStart = useRef({ x: 0, y: 0 });

  /* Touch -> viewBox coordinates. locationX/Y are in the map view's own
     (pre-transform) coordinate space, so a single scale factor maps them. */
  const toViewBox = (locX: number, locY: number) => ({
    x: locX * VB_PER_PX,
    y: locY * VB_PER_PX,
  });

  const onTouchStart = (e: any) => {
    const ne = e.nativeEvent;
    if (drawMode) {
      const p = toViewBox(ne.locationX, ne.locationY);
      currentPoints.current = [p];
      setPaths(prev => [...prev, { d: buildPathD(currentPoints.current), color: penColor, size: penSize }]);
      return;
    }
    const t = ne.changedTouches?.[0] ?? ne;
    panStart.current = { x: t.pageX, y: t.pageY };
    lastTranslate.current = {
      x: (translateX as any).__getValue(),
      y: (translateY as any).__getValue(),
    };
  };

  const onTouchMove = (e: any) => {
    const ne = e.nativeEvent;
    if (drawMode) {
      const p = toViewBox(ne.locationX, ne.locationY);
      currentPoints.current.push(p);
      const d = buildPathD(currentPoints.current);
      setPaths(prev => {
        const next = [...prev];
        next[next.length - 1] = { ...next[next.length - 1], d };
        return next;
      });
      return;
    }
    const t = ne.changedTouches?.[0] ?? ne;
    const dx = t.pageX - panStart.current.x;
    const dy = t.pageY - panStart.current.y;
    translateX.setValue(lastTranslate.current.x + dx);
    translateY.setValue(lastTranslate.current.y + dy);
  };

  const onTouchEnd = () => {
    if (drawMode) {
      currentPoints.current = [];
      return;
    }
    lastTranslate.current = {
      x: (translateX as any).__getValue(),
      y: (translateY as any).__getValue(),
    };
  };

  /* ── Zoom helpers ── */
  const zoomIn = () => {
    const next = Math.min(lastScale.current * 1.3, 5);
    lastScale.current = next;
    Animated.spring(scale, { toValue: next, useNativeDriver: true, friction: 8 }).start();
  };
  const zoomOut = () => {
    const next = Math.max(lastScale.current / 1.3, 1);
    lastScale.current = next;
    Animated.spring(scale, { toValue: next, useNativeDriver: true, friction: 8 }).start();
  };
  const resetView = () => {
    lastScale.current = 1;
    lastTranslate.current = { x: 0, y: 0 };
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, friction: 8 }),
      Animated.spring(translateX, { toValue: 0, useNativeDriver: true, friction: 8 }),
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true, friction: 8 }),
    ]).start();
  };

  const visibleMarkers = MARKERS.filter(m => activeLayers.has(m.type));

  /* ── Render ── */
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topInset + 8, borderBottomColor: colors.border, backgroundColor: colors.background }]}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, { color: colors.primary }]}>World Map</Text>
          <View style={styles.headerActions}>
            {drawMode && paths.length > 0 && (
              <Pressable onPress={undoLast} style={[styles.iconBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Feather name="corner-left-up" size={16} color={colors.foreground} />
              </Pressable>
            )}
            {drawMode && paths.length > 0 && (
              <Pressable onPress={clearAll} style={[styles.iconBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Feather name="trash-2" size={16} color="#ef4444" />
              </Pressable>
            )}
            <Pressable
              onPress={() => { setDrawMode(d => !d); setShowColorPicker(false); setShowLayerPanel(false); }}
              style={[styles.drawToggle, {
                backgroundColor: drawMode ? penColor : colors.card,
                borderColor: drawMode ? penColor : colors.border,
              }]}
            >
              <Feather name="edit-2" size={15} color={drawMode ? '#fff' : colors.mutedForeground} />
              <Text style={[styles.drawToggleText, { color: drawMode ? '#fff' : colors.mutedForeground }]}>
                Draw
              </Text>
            </Pressable>
            <Pressable
              onPress={() => { setShowLayerPanel(v => !v); setShowColorPicker(false); }}
              style={[styles.iconBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <Feather name="layers" size={16} color={colors.foreground} />
            </Pressable>
          </View>
        </View>
      </View>

      {/* Map Viewport */}
      <View style={styles.mapViewport}>
        <Animated.View
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{
            width: RENDER_W,
            height: RENDER_H,
            transform: [
              { translateX },
              { translateY },
              { scale },
            ],
          }}
        >
          <Svg width={RENDER_W} height={RENDER_H} viewBox={`0 0 ${IMG_W} ${IMG_H}`}>
            <SvgImage
              x={0}
              y={0}
              width={IMG_W}
              height={IMG_H}
              href={MAP_IMAGE}
              preserveAspectRatio="xMidYMid meet"
            />

            {/* Town markers */}
            {visibleMarkers.map((m, i) => {
              const layerColor = LAYERS.find(l => l.key === m.type)?.color || '#9B2226';
              return (
                <G key={`${m.label}-${i}`}>
                  {!drawMode && (
                    <Circle
                      cx={m.x}
                      cy={m.y}
                      r={18}
                      fill="transparent"
                      onPress={() => setSelectedPoint(m)}
                    />
                  )}
                  <Circle cx={m.x} cy={m.y} r={9} fill="#FBF3DD" opacity={0.95} />
                  <Circle cx={m.x} cy={m.y} r={6.5} fill={layerColor} />
                  <Circle cx={m.x} cy={m.y} r={2.5} fill="#FBF3DD" />
                </G>
              );
            })}

            {/* Drawn paths */}
            {paths.map((p, i) => (
              <Path
                key={i}
                d={p.d}
                stroke={p.color}
                strokeWidth={(p.size * VB_PER_PX) / (lastScale.current || 1)}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            ))}
          </Svg>
        </Animated.View>
      </View>

      {/* Zoom Controls */}
      <View style={[styles.zoomBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Pressable onPress={zoomIn} style={styles.zoomBtn}>
          <Feather name="plus" size={18} color={colors.foreground} />
        </Pressable>
        <View style={[styles.zoomDivider, { backgroundColor: colors.border }]} />
        <Pressable onPress={zoomOut} style={styles.zoomBtn}>
          <Feather name="minus" size={18} color={colors.foreground} />
        </Pressable>
        <View style={[styles.zoomDivider, { backgroundColor: colors.border }]} />
        <Pressable onPress={resetView} style={styles.zoomBtn}>
          <Feather name="maximize" size={16} color={colors.foreground} />
        </Pressable>
      </View>

      {/* Layer Panel */}
      {showLayerPanel && (
        <View style={[styles.layerPanel, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.panelTitle, { color: colors.foreground }]}>Map Layers</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.layerList}>
            {LAYERS.map(layer => {
              const active = activeLayers.has(layer.key);
              return (
                <Pressable
                  key={layer.key}
                  onPress={() => toggleLayer(layer.key)}
                  style={[styles.layerChip, {
                    backgroundColor: active ? layer.color + '25' : colors.background,
                    borderColor: active ? layer.color : colors.border,
                  }]}
                >
                  <View style={[styles.layerDot, { backgroundColor: layer.color }]} />
                  <Text style={[styles.layerLabel, { color: active ? layer.color : colors.mutedForeground }]}>
                    {layer.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      )}

      {/* Draw Toolbar */}
      {drawMode && (
        <View style={[styles.penToolbar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Pressable
            onPress={() => setShowColorPicker(v => !v)}
            style={[styles.colorSwatch, { backgroundColor: penColor, borderColor: colors.border }]}
          />
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

      {/* Color Picker Popover */}
      {drawMode && showColorPicker && (
        <View style={[styles.colorPicker, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.colorGrid}>
            {PEN_COLORS.map(c => (
              <Pressable
                key={c}
                onPress={() => { setPenColor(c); setShowColorPicker(false); }}
                style={[styles.colorOption, { backgroundColor: c, borderColor: penColor === c ? '#fff' : 'transparent', borderWidth: 2.5 }]}
              />
            ))}
          </View>
        </View>
      )}

      {/* Selected Point Detail */}
      {selectedPoint && (
        <Pressable onPress={() => setSelectedPoint(null)} style={styles.detailOverlay}>
          <View style={[styles.detailCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[styles.detailTitle, { color: colors.foreground }]}>{selectedPoint.label}</Text>
            {selectedPoint.note && (
              <Text style={[styles.detailNote, { color: colors.mutedForeground }]}>{selectedPoint.note}</Text>
            )}
            <Text style={[styles.detailType, { color: LAYERS.find(l => l.key === selectedPoint.type)?.color }]}>
              {LAYERS.find(l => l.key === selectedPoint.type)?.label}
            </Text>
          </View>
        </Pressable>
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
    zIndex: 10,
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
  mapViewport: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A1F15',
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
  zoomBar: {
    position: 'absolute',
    right: 16,
    top: 120,
    width: 40,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  zoomBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomDivider: {
    height: 1,
    width: 24,
    alignSelf: 'center',
  },
  layerPanel: {
    position: 'absolute',
    top: 80,
    left: 16,
    right: 16,
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  panelTitle: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
  layerList: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 8,
  },
  layerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  layerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  layerLabel: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
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
    bottom: 162,
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
  detailOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 50,
  },
  detailCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    minWidth: 260,
    maxWidth: SCREEN_W - 48,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  detailTitle: {
    fontSize: 17,
    fontFamily: 'Inter_700Bold',
  },
  detailNote: {
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 18,
  },
  detailType: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 4,
  },
});
