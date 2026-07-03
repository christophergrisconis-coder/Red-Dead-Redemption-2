import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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
import { MARKERS, LAYER_META, type MapCategory, type MapPoint } from '@/data/mapData';

const MAP_IMAGE = require('../../assets/images/rdr2-map.jpg');

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

const IMG_W = 1000;
const IMG_H = 753;

const HEADER_H = 110;
const TABBAR_H = 90;
const AVAIL_W = SCREEN_W;
const AVAIL_H = Math.max(240, SCREEN_H - HEADER_H - TABBAR_H);

const FIT = Math.min(AVAIL_W / IMG_W, AVAIL_H / IMG_H);
const RENDER_W = IMG_W * FIT;
const RENDER_H = IMG_H * FIT;
const VB_PER_PX = IMG_W / RENDER_W;

const SHEET_HEIGHT = Math.min(Math.round(SCREEN_H * 0.58), 460);

/* Build LAYERS array from LAYER_META so we have a stable ordered list */
const ALL_LAYER_KEYS: MapCategory[] = ['towns', 'legendary', 'hideouts'];
const LAYERS = ALL_LAYER_KEYS.map(key => ({ key, ...LAYER_META[key] }));

/* Drawn path types */
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

/* Category meta helpers */
function categoryIcon(cat: MapCategory): string {
  return LAYER_META[cat].icon;
}
function categoryColor(cat: MapCategory): string {
  return LAYER_META[cat].color;
}
function categoryLabel(cat: MapCategory): string {
  return LAYER_META[cat].label;
}

/* ── Main Screen ── */
export default function MapScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [activeLayers, setActiveLayers] = useState<Set<MapCategory>>(new Set(['towns', 'legendary', 'hideouts']));
  const [drawMode, setDrawMode] = useState(false);
  const [penColor, setPenColor] = useState('#ef4444');
  const [penSize, setPenSize] = useState(4);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showLayerPanel, setShowLayerPanel] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [paths, setPaths] = useState<DrawnPath[]>([]);
  const currentPoints = useRef<{ x: number; y: number }[]>([]);

  /* Bottom sheet animation */
  const sheetY = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const sheetTouchStart = useRef(0);

  const openSheet = useCallback((point: MapPoint) => {
    setSelectedPoint(point);
    Animated.spring(sheetY, {
      toValue: 0,
      useNativeDriver: true,
      friction: 9,
      tension: 80,
    }).start();
  }, [sheetY]);

  const closeSheet = useCallback(() => {
    Animated.timing(sheetY, {
      toValue: SHEET_HEIGHT,
      duration: 220,
      useNativeDriver: true,
    }).start(() => setSelectedPoint(null));
  }, [sheetY]);

  const onSheetTouchStart = (e: any) => {
    sheetTouchStart.current = e.nativeEvent.pageY;
  };
  const onSheetTouchEnd = (e: any) => {
    const dy = e.nativeEvent.pageY - sheetTouchStart.current;
    if (dy > 60) closeSheet();
  };

  /* Pan / Zoom */
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const lastScale = useRef(1);
  const lastTranslate = useRef({ x: 0, y: 0 });

  const topInset = Platform.OS === 'web' ? 67 : insets.top;

  const toggleLayer = useCallback((key: MapCategory) => {
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

  const handleMarkerPress = useCallback((point: MapPoint) => {
    if (selectedPoint?.label === point.label) {
      closeSheet();
    } else {
      openSheet(point);
    }
  }, [selectedPoint, openSheet, closeSheet]);

  const handleGuideNav = (point: MapPoint) => {
    closeSheet();
    const ref = point.guideRef;
    if (!ref) return;
    setTimeout(() => {
      router.push(ref.tab as any);
    }, 240);
  };

  const visibleMarkers = MARKERS.filter(m => activeLayers.has(m.category));

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
              <Text style={[styles.drawToggleText, { color: drawMode ? '#fff' : colors.mutedForeground }]}>Draw</Text>
            </Pressable>
            <Pressable
              onPress={() => { setShowLayerPanel(v => !v); setShowColorPicker(false); }}
              style={[styles.iconBtn, {
                backgroundColor: showLayerPanel ? colors.primary + '22' : colors.card,
                borderColor: showLayerPanel ? colors.primary : colors.border,
              }]}
            >
              <Feather name="layers" size={16} color={showLayerPanel ? colors.primary : colors.foreground} />
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
            transform: [{ translateX }, { translateY }, { scale }],
          }}
        >
          <Svg width={RENDER_W} height={RENDER_H} viewBox={`0 0 ${IMG_W} ${IMG_H}`}>
            <SvgImage
              x={0} y={0}
              width={IMG_W} height={IMG_H}
              href={MAP_IMAGE}
              preserveAspectRatio="xMidYMid meet"
            />

            {/* Markers */}
            {visibleMarkers.map((m, i) => {
              const markerColor = categoryColor(m.category);
              const isSelected = selectedPoint?.label === m.label;
              return (
                <G key={`${m.label}-${i}`}>
                  {/* Selected outer glow ring */}
                  {isSelected && (
                    <>
                      <Circle cx={m.x} cy={m.y} r={20} fill={markerColor} opacity={0.2} />
                      <Circle cx={m.x} cy={m.y} r={15} fill="none" stroke={markerColor} strokeWidth={2.5} opacity={0.9} />
                    </>
                  )}
                  {/* Invisible hit area */}
                  {!drawMode && (
                    <Circle
                      cx={m.x} cy={m.y} r={18}
                      fill="transparent"
                      onPress={() => handleMarkerPress(m)}
                    />
                  )}
                  {/* Marker body */}
                  <Circle cx={m.x} cy={m.y} r={9} fill="#FBF3DD" opacity={isSelected ? 1 : 0.95} />
                  <Circle cx={m.x} cy={m.y} r={6.5} fill={isSelected ? lighten(markerColor) : markerColor} />
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
          <View style={styles.layerList}>
            {LAYERS.map(layer => {
              const active = activeLayers.has(layer.key);
              return (
                <Pressable
                  key={layer.key}
                  onPress={() => toggleLayer(layer.key)}
                  style={[styles.layerChip, {
                    backgroundColor: active ? layer.color + '22' : colors.background,
                    borderColor: active ? layer.color : colors.border,
                  }]}
                >
                  <Feather
                    name={layer.icon as any}
                    size={12}
                    color={active ? layer.color : colors.mutedForeground}
                  />
                  <Text style={[styles.layerLabel, { color: active ? layer.color : colors.mutedForeground }]}>
                    {layer.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
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

      {/* Bottom Sheet Backdrop */}
      {selectedPoint && (
        <Pressable
          style={styles.sheetBackdrop}
          onPress={closeSheet}
        />
      )}

      {/* Bottom Sheet */}
      <Animated.View
        style={[
          styles.sheet,
          { backgroundColor: colors.card, borderColor: colors.border },
          { transform: [{ translateY: sheetY }] },
        ]}
        onTouchStart={onSheetTouchStart}
        onTouchEnd={onSheetTouchEnd}
      >
        {selectedPoint && (
          <SheetContent
            point={selectedPoint}
            colors={colors}
            onClose={closeSheet}
            onGuideNav={handleGuideNav}
          />
        )}
      </Animated.View>
    </View>
  );
}

/* Lighten a hex color slightly for the selected state fill */
function lighten(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lr = Math.min(255, r + 55);
  const lg = Math.min(255, g + 55);
  const lb = Math.min(255, b + 55);
  return `#${lr.toString(16).padStart(2, '0')}${lg.toString(16).padStart(2, '0')}${lb.toString(16).padStart(2, '0')}`;
}

/* ── Bottom Sheet Content Component ── */
interface SheetContentProps {
  point: MapPoint;
  colors: ReturnType<typeof import('@/hooks/useColors').useColors>;
  onClose: () => void;
  onGuideNav: (point: MapPoint) => void;
}

function SheetContent({ point, colors, onClose, onGuideNav }: SheetContentProps) {
  const markerColor = categoryColor(point.category);
  const markerLabel = categoryLabel(point.category);
  const markerIcon = categoryIcon(point.category);

  return (
    <>
      {/* Drag handle */}
      <View style={styles.dragHandle}>
        <View style={[styles.dragBar, { backgroundColor: colors.border }]} />
        <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={12}>
          <Feather name="x" size={18} color={colors.mutedForeground} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.sheetScroll}
        contentContainerStyle={styles.sheetScrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header row */}
        <View style={styles.sheetHeader}>
          <View style={styles.sheetTitleRow}>
            <Text style={[styles.sheetTitle, { color: colors.foreground }]} numberOfLines={2}>
              {point.label}
            </Text>
            {/* Category pill */}
            <View style={[styles.categoryPill, { backgroundColor: markerColor + '22', borderColor: markerColor + '66' }]}>
              <Feather name={markerIcon as any} size={11} color={markerColor} />
              <Text style={[styles.categoryPillText, { color: markerColor }]}>{markerLabel}</Text>
            </View>
          </View>
          {/* Region badge */}
          <View style={[styles.regionBadge, { backgroundColor: colors.secondary }]}>
            <Feather name="map-pin" size={11} color={colors.mutedForeground} />
            <Text style={[styles.regionText, { color: colors.mutedForeground }]}>{point.region}</Text>
          </View>
        </View>

        {/* Chapter note */}
        {point.chapter && (
          <View style={[styles.chapterRow, { borderLeftColor: markerColor, backgroundColor: markerColor + '12' }]}>
            <Feather name="book-open" size={13} color={markerColor} />
            <Text style={[styles.chapterText, { color: colors.foreground }]}>{point.chapter}</Text>
          </View>
        )}

        {/* Description */}
        <Text style={[styles.sheetDescription, { color: colors.foreground }]}>
          {point.description}
        </Text>

        {/* Services list (towns only) */}
        {point.services && point.services.length > 0 && (
          <View style={styles.servicesSection}>
            <Text style={[styles.servicesTitle, { color: colors.mutedForeground }]}>Services & Facilities</Text>
            <View style={styles.servicesPills}>
              {point.services.map(svc => (
                <View key={svc} style={[styles.servicePill, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
                  <Text style={[styles.servicePillText, { color: colors.foreground }]}>{svc}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Tip */}
        {point.tip && (
          <View style={[styles.tipRow, { backgroundColor: colors.primary + '12', borderColor: colors.primary + '44' }]}>
            <Feather name="star" size={13} color={colors.primary} style={{ marginTop: 2 }} />
            <Text style={[styles.tipText, { color: colors.foreground }]}>{point.tip}</Text>
          </View>
        )}

        {/* View in Guide button */}
        {point.guideRef && (
          <Pressable
            onPress={() => onGuideNav(point)}
            style={({ pressed }) => [
              styles.guideBtn,
              { backgroundColor: pressed ? markerColor + 'CC' : markerColor },
            ]}
          >
            <Feather name="book" size={15} color="#FBF3DD" />
            <Text style={styles.guideBtnText}>{point.guideRef.label}</Text>
            <Feather name="chevron-right" size={15} color="#FBF3DD" />
          </Pressable>
        )}
      </ScrollView>
    </>
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
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 20,
  },
  panelTitle: {
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  layerList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
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

  /* Bottom Sheet */
  sheetBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    zIndex: 30,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: TABBAR_H,
    height: SHEET_HEIGHT,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderBottomWidth: 0,
    zIndex: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 16,
  },
  dragHandle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 6,
    paddingHorizontal: 16,
    position: 'relative',
  },
  dragBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  closeBtn: {
    position: 'absolute',
    right: 16,
    top: 8,
    padding: 4,
  },

  sheetScroll: {
    flex: 1,
  },
  sheetScrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 20,
    gap: 12,
  },

  sheetHeader: {
    gap: 8,
    marginTop: 4,
  },
  sheetTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  sheetTitle: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    lineHeight: 26,
  },

  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 2,
  },
  categoryPillText: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  regionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  regionText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },

  chapterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderLeftWidth: 3,
    paddingLeft: 10,
    paddingVertical: 7,
    paddingRight: 10,
    borderRadius: 4,
  },
  chapterText: {
    fontSize: 13,
    fontFamily: 'Inter_600SemiBold',
    flex: 1,
  },

  sheetDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    lineHeight: 21,
  },

  servicesSection: {
    gap: 8,
  },
  servicesTitle: {
    fontSize: 11,
    fontFamily: 'Inter_700Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  servicesPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  servicePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  servicePillText: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
  },

  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Inter_400Regular',
    lineHeight: 19,
    fontStyle: 'italic',
  },

  guideBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    borderRadius: 12,
    marginTop: 4,
  },
  guideBtnText: {
    color: '#FBF3DD',
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    flex: 1,
    textAlign: 'center',
  },
});
