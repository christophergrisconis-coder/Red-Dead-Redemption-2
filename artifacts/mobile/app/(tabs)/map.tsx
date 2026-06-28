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
  Path,
  Rect,
  Text as SvgText,
} from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
const MAP_W = 800;
const MAP_H = 1000;

/* ─── Map Layers ─── */
type LayerKey = 'towns' | 'collectibles' | 'hunting' | 'treasure' | 'graves' | 'hideouts';

const LAYERS: { key: LayerKey; label: string; color: string }[] = [
  { key: 'towns', label: 'Towns', color: '#C8922A' },
  { key: 'collectibles', label: 'Collectibles', color: '#8A6A3A' },
  { key: 'hunting', label: 'Hunting', color: '#5F7D5F' },
  { key: 'treasure', label: 'Treasure', color: '#D4A017' },
  { key: 'graves', label: 'Graves', color: '#5A4A6A' },
  { key: 'hideouts', label: 'Hideouts', color: '#6A2A2A' },
];

/* ─── Town / Point markers ─── */
interface MapPoint {
  x: number;
  y: number;
  label: string;
  type: LayerKey;
  note?: string;
}

const MARKERS: MapPoint[] = [
  // ── Towns ──
  { x: 420, y: 180, label: 'Colter', type: 'towns' },
  { x: 460, y: 310, label: 'Valentine', type: 'towns' },
  { x: 510, y: 260, label: 'Emerald Ranch', type: 'towns' },
  { x: 380, y: 370, label: 'Strawberry', type: 'towns' },
  { x: 580, y: 430, label: 'Rhodes', type: 'towns' },
  { x: 650, y: 520, label: 'Saint Denis', type: 'towns' },
  { x: 720, y: 320, label: 'Van Horn', type: 'towns' },
  { x: 700, y: 220, label: 'Annesburg', type: 'towns' },
  { x: 180, y: 450, label: 'Blackwater', type: 'towns' },
  { x: 120, y: 620, label: 'Tumbleweed', type: 'towns' },
  { x: 220, y: 580, label: 'Armadillo', type: 'towns' },
  { x: 460, y: 470, label: 'Shady Belle', type: 'towns' },
  { x: 430, y: 240, label: 'Horseshoe Overlook', type: 'towns' },
  { x: 540, y: 380, label: 'Clemens Point', type: 'towns' },
  { x: 650, y: 330, label: 'Lagras', type: 'towns' },
  { x: 180, y: 380, label: 'Owanjila', type: 'towns' },
  // ── Collectibles ──
  { x: 400, y: 160, label: 'Viking Settlement', type: 'collectibles', note: 'Viking Helmet & Hatchet' },
  { x: 580, y: 300, label: 'Meteor House', type: 'collectibles', note: 'Meteorite Fragment' },
  { x: 460, y: 400, label: 'Strange Statues', type: 'collectibles', note: 'Cave puzzle — 3 gold bars' },
  { x: 300, y: 260, label: 'Window Rock', type: 'collectibles', note: 'Rock Carving & POI' },
  { x: 670, y: 450, label: 'Serial Killer Cabin', type: 'collectibles', note: 'Edmund Lowry Jr.' },
  { x: 500, y: 500, label: 'Elysian Pool', type: 'collectibles', note: 'Poisonous Trail cave' },
  // ── Hunting ──
  { x: 340, y: 140, label: 'Legendary Bharati Bear', type: 'hunting', note: 'Grizzlies East' },
  { x: 220, y: 350, label: 'Legendary Buck', type: 'hunting', note: 'Big Valley' },
  { x: 620, y: 540, label: 'Legendary Bullgator', type: 'hunting', note: 'Bayou Nwa' },
  { x: 160, y: 660, label: 'Legendary Cougar', type: 'hunting', note: 'Gaptooth Ridge' },
  { x: 480, y: 320, label: 'Legendary White Bison', type: 'hunting', note: 'Lake Isabella' },
  // ── Treasure ──
  { x: 480, y: 280, label: 'Jack Hall Gang', type: 'treasure', note: 'Caliban\'s Seat start' },
  { x: 360, y: 100, label: 'High Stakes', type: 'treasure', note: 'Cumberland Falls start' },
  { x: 500, y: 540, label: 'Poisonous Trail', type: 'treasure', note: 'Flat Iron Lake cave' },
  { x: 140, y: 550, label: 'Landmarks of Riches', type: 'treasure', note: 'Twin Stack Pass start' },
  // ── Graves ──
  { x: 420, y: 170, label: 'Jenny Kirk', type: 'graves', note: 'Spider Gorge' },
  { x: 710, y: 230, label: 'Davey Callander', type: 'graves', note: 'Colter churchyard' },
  { x: 460, y: 300, label: 'Sean MacGuire', type: 'graves', note: 'NW of Rhodes' },
  { x: 520, y: 460, label: 'Kieran Duffy', type: 'graves', note: 'Shady Belle meadows' },
  { x: 640, y: 540, label: 'Hosea & Lenny', type: 'graves', note: 'Bluewater Marsh' },
  { x: 550, y: 410, label: 'Susan Grimshaw', type: 'graves', note: 'SW of Elysian Pool' },
  { x: 400, y: 130, label: 'Eagle Flies', type: 'graves', note: 'Donner Falls cliff' },
  { x: 360, y: 100, label: 'Arthur Morgan', type: 'graves', note: 'Northeast of Bacchus Station' },
  // ── Hideouts ──
  { x: 340, y: 280, label: 'Hanging Dog Ranch', type: 'hideouts', note: "O'Driscoll Boys" },
  { x: 460, y: 470, label: 'Shady Belle', type: 'hideouts', note: 'Lemoyne Raiders' },
  { x: 540, y: 350, label: 'Beaver Hollow', type: 'hideouts', note: 'Murfree Brood' },
  { x: 700, y: 250, label: 'Butcher Creek', type: 'hideouts', note: 'Murfree Brood' },
  { x: 180, y: 410, label: 'Twin Rocks', type: 'hideouts', note: 'Skinner Brothers (Epilogue)' },
  { x: 140, y: 540, label: 'Fort Mercer', type: 'hideouts', note: 'Del Lobo Gang (Epilogue)' },
  { x: 650, y: 560, label: 'Lagras', type: 'hideouts', note: 'Night Folk -- night only' },
];

/* ─── SVG Terrain ─── */
function WorldMap() {
  return (
    <G>
      {/* Background / parchment */}
      <Rect x={0} y={0} width={MAP_W} height={MAP_H} fill="#C9B99A" />

      {/* ── Region fills ── */}
      {/* Ambarino (north) — cold, pale */}
      <Path d="M 0,0 L 800,0 L 800,220 L 650,240 L 500,200 L 350,180 L 200,210 L 0,180 Z" fill="#B0C4B1" opacity={0.35} />
      {/* New Hanover (east-center) — heartland green */}
      <Path d="M 200,210 L 350,180 L 500,200 L 650,240 L 720,320 L 680,420 L 580,430 L 500,400 L 400,380 L 300,340 L 220,320 Z" fill="#7A9B6A" opacity={0.25} />
      {/* Lemoyne (south-east) — warm, swampy */}
      <Path d="M 400,380 L 500,400 L 580,430 L 680,420 L 750,500 L 720,650 L 600,700 L 480,650 L 420,550 Z" fill="#8B7355" opacity={0.2} />
      {/* West Elizabeth (west) — forest */}
      <Path d="M 0,180 L 200,210 L 220,320 L 300,340 L 350,420 L 320,520 L 200,550 L 100,520 L 0,480 Z" fill="#5F7D5F" opacity={0.25} />
      {/* New Austin (south-west) — desert */}
      <Path d="M 0,480 L 100,520 L 200,550 L 320,520 L 350,650 L 280,750 L 150,780 L 0,760 Z" fill="#C9A86C" opacity={0.25} />

      {/* ── Rivers ── */}
      <Path d="M 350,0 C 340,80 360,140 330,200 C 300,260 340,320 310,380 C 280,440 320,500 290,560 C 260,620 300,680 280,750" stroke="#4A5D6E" strokeWidth={7} fill="none" opacity={0.7} />
      <Path d="M 700,0 C 680,80 720,160 690,240 C 660,320 700,380 670,460 C 640,540 680,620 650,700 C 620,780 660,860 640,1000" stroke="#4A5D6E" strokeWidth={8} fill="none" opacity={0.7} />
      <Path d="M 0,300 C 100,280 180,320 220,350 C 280,380 320,360 380,400 C 450,440 500,420 550,450 C 620,490 680,470 750,500 C 800,520 800,540 800,560" stroke="#4A5D6E" strokeWidth={6} fill="none" opacity={0.6} />
      <Path d="M 0,600 C 80,580 160,620 220,650 C 300,690 380,660 450,700 C 520,740 580,720 650,750 C 720,780 780,760 800,780" stroke="#4A5D6E" strokeWidth={5} fill="none" opacity={0.5} />

      {/* ── Lakes ── */}
      <Path d="M 250,350 C 300,330 340,360 320,400 C 290,440 230,420 220,380 Z" fill="#4A5D6E" opacity={0.6} />
      <Path d="M 430,250 C 480,230 520,260 500,300 C 470,340 410,320 400,280 Z" fill="#4A5D6E" opacity={0.55} />
      <Path d="M 550,480 C 600,460 650,490 630,540 C 590,580 530,560 520,520 Z" fill="#4A5D6E" opacity={0.55} />
      <Path d="M 150,400 C 190,380 230,410 210,450 C 170,480 120,460 110,420 Z" fill="#4A5D6E" opacity={0.5} />

      {/* ── Major Roads ── */}
      <Path d="M 460,310 L 510,260 L 580,260 L 650,320 L 720,320" stroke="#8B7355" strokeWidth={3} fill="none" opacity={0.5} />
      <Path d="M 460,310 L 430,370 L 380,370" stroke="#8B7355" strokeWidth={3} fill="none" opacity={0.5} />
      <Path d="M 460,310 L 430,240 L 420,180" stroke="#8B7355" strokeWidth={3} fill="none" opacity={0.5} />
      <Path d="M 580,430 L 650,520 L 700,520" stroke="#8B7355" strokeWidth={3} fill="none" opacity={0.5} />
      <Path d="M 180,450 L 180,380 L 220,320 L 220,260" stroke="#8B7355" strokeWidth={3} fill="none" opacity={0.5} />
      <Path d="M 180,450 L 120,550 L 120,620" stroke="#8B7355" strokeWidth={3} fill="none" opacity={0.5} />
      <Path d="M 650,520 L 750,500 L 800,500" stroke="#8B7355" strokeWidth={3} fill="none" opacity={0.5} />

      {/* ── Region Labels ── */}
      <SvgText x={520} y={100} fill="#3E3025" fontSize={18} fontFamily="Inter_700Bold" opacity={0.4} textAnchor="middle">AMBARINO</SvgText>
      <SvgText x={480} y={290} fill="#3E3025" fontSize={18} fontFamily="Inter_700Bold" opacity={0.4} textAnchor="middle">NEW HANOVER</SvgText>
      <SvgText x={580} y={580} fill="#3E3025" fontSize={18} fontFamily="Inter_700Bold" opacity={0.4} textAnchor="middle">LEMOYNE</SvgText>
      <SvgText x={180} y={440} fill="#3E3025" fontSize={18} fontFamily="Inter_700Bold" opacity={0.4} textAnchor="middle">WEST ELIZABETH</SvgText>
      <SvgText x={180} y={680} fill="#3E3025" fontSize={18} fontFamily="Inter_700Bold" opacity={0.4} textAnchor="middle">NEW AUSTIN</SvgText>

      {/* ── Grid lines (subtle) ── */}
      {[100, 200, 300, 400, 500, 600, 700].map(n => (
        <G key={`g${n}`}>
          <Path d={`M ${n},0 L ${n},1000`} stroke="#3E3025" strokeWidth={0.5} opacity={0.08} />
          <Path d={`M 0,${n} L 800,${n}`} stroke="#3E3025" strokeWidth={0.5} opacity={0.08} />
        </G>
      ))}
    </G>
  );
}

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

  /* Pan / Zoom state */
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const lastScale = useRef(1);
  const lastTranslate = useRef({ x: 0, y: 0 });
  const pinchStartDist = useRef(0);

  const topInset = Platform.OS === 'web' ? 67 : insets.top;
  const bottomInset = Platform.OS === 'web' ? 34 : 0;

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

  /* ── PanResponder for panning ── */
  const panStart = useRef({ x: 0, y: 0 });

  const onTouchStart = (e: any) => {
    if (drawMode) {
      const touch = e.nativeEvent.changedTouches[0];
      if (!touch) return;
      currentPoints.current = [{ x: touch.pageX, y: touch.pageY - topInset - 70 }];
      setPaths(prev => [...prev, { d: buildPathD(currentPoints.current), color: penColor, size: penSize }]);
      return;
    }
    const t = e.nativeEvent.changedTouches[0];
    if (!t) return;
    panStart.current = { x: t.pageX, y: t.pageY };
    lastTranslate.current = {
      x: (translateX as any).__getValue(),
      y: (translateY as any).__getValue(),
    };
  };

  const onTouchMove = (e: any) => {
    if (drawMode) {
      const touch = e.nativeEvent.changedTouches[0];
      if (!touch) return;
      currentPoints.current.push({ x: touch.pageX, y: touch.pageY - topInset - 70 });
      const d = buildPathD(currentPoints.current);
      setPaths(prev => {
        const next = [...prev];
        next[next.length - 1] = { ...next[next.length - 1], d };
        return next;
      });
      return;
    }
    const t = e.nativeEvent.changedTouches[0];
    if (!t) return;
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
    const next = Math.min(lastScale.current * 1.3, 4);
    lastScale.current = next;
    Animated.spring(scale, { toValue: next, useNativeDriver: true, friction: 8 }).start();
  };
  const zoomOut = () => {
    const next = Math.max(lastScale.current / 1.3, 0.6);
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

  /* ── Visible markers ── */
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
                {drawMode ? 'Draw' : 'Draw'}
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
      <View
        style={styles.mapViewport}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Animated.View
          style={{
            transform: [
              { translateX },
              { translateY },
              { scale },
            ],
            width: MAP_W,
            height: MAP_H,
          }}
        >
          <Svg width={MAP_W} height={MAP_H} viewBox={`0 0 ${MAP_W} ${MAP_H}`}>
            <WorldMap />

            {/* Markers */}
            {visibleMarkers.map((m, i) => {
              const layerColor = LAYERS.find(l => l.key === m.type)?.color || '#C8922A';
              return (
                <G key={`${m.label}-${i}`}>
                  <Circle
                    cx={m.x}
                    cy={m.y}
                    r={12}
                    fill="transparent"
                    onPress={() => setSelectedPoint(m)}
                  />
                  <Circle
                    cx={m.x}
                    cy={m.y}
                    r={8}
                    fill={layerColor}
                    opacity={0.9}
                  />
                  <Circle cx={m.x} cy={m.y} r={4} fill="#fff" opacity={0.8} />
                  <SvgText
                    x={m.x + 14}
                    y={m.y + 4}
                    fill="#2A1F15"
                    fontSize={11}
                    fontFamily="Inter_600SemiBold"
                    opacity={0.9}
                  >
                    {m.label}
                  </SvgText>
                </G>
              );
            })}

            {/* Drawn paths */}
            {paths.map((p, i) => (
              <Path
                key={i}
                d={p.d}
                stroke={p.color}
                strokeWidth={p.size / (lastScale.current || 1)}
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
