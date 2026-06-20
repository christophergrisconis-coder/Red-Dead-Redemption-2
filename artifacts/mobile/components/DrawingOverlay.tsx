import { Feather } from '@expo/vector-icons';
import { usePathname } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  PanResponder,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDrawing } from '@/context/DrawingContext';
import { useColors } from '@/hooks/useColors';

const PEN_COLORS = [
  '#ef4444', '#f97316', '#eab308',
  '#22c55e', '#3b82f6', '#a855f7',
  '#ffffff', '#000000',
];
const PEN_SIZES = [2, 4, 8, 14];

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

export function DrawingOverlay() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const {
    drawMode, setDrawMode,
    penColor, setPenColor,
    penSize, setPenSize,
    paths, setPaths,
    undoLast, clearPage,
    pageKey, setPageKey,
  } = useDrawing();

  // Auto-key drawings to the current route
  useEffect(() => {
    const key = pathname.replace(/\//g, '_').replace(/^_/, '') || 'home';
    setPageKey(key);
  }, [pathname, setPageKey]);

  const currentPoints = useRef<{ x: number; y: number }[]>([]);
  const [showColorPicker, setShowColorPicker] = React.useState(false);

  const bottomInset = Platform.OS === 'web' ? 34 : insets.bottom;
  // FAB sits just above the tab bar (~84px tall) + bottom inset
  const fabBottom = bottomInset + 90;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        const { locationX, locationY } = e.nativeEvent;
        currentPoints.current = [{ x: locationX, y: locationY }];
        setPaths(prev => [
          ...prev,
          { d: buildPathD(currentPoints.current), color: penColor, size: penSize },
        ]);
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

  const hasNotes = paths.length > 0;
  const notesOnPage = useDrawing().allPagePaths;
  const totalNotes = Object.values(notesOnPage).reduce((acc, p) => acc + p.length, 0);

  return (
    <>
      {/* Saved strokes — always visible, no touch capture */}
      {!drawMode && hasNotes && (
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

      {/* Active drawing layer — captures touches when draw mode is on */}
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

      {/* Floating pencil FAB */}
      <View
        style={[
          styles.fab,
          {
            bottom: fabBottom,
            backgroundColor: drawMode ? penColor : colors.card,
            borderColor: drawMode ? penColor : colors.border,
            shadowColor: drawMode ? penColor : '#000',
          },
        ]}
        pointerEvents="box-none"
      >
        <Pressable
          onPress={() => {
            setDrawMode(!drawMode);
            setShowColorPicker(false);
          }}
          style={styles.fabInner}
        >
          <Feather
            name="edit-2"
            size={20}
            color={drawMode ? '#fff' : colors.mutedForeground}
          />
          {!drawMode && totalNotes > 0 && (
            <View style={[styles.badge, { backgroundColor: penColor }]}>
              <Text style={styles.badgeText}>{Math.min(totalNotes, 99)}</Text>
            </View>
          )}
        </Pressable>
      </View>

      {/* Pen toolbar — visible only while drawing */}
      {drawMode && (
        <View
          style={[
            styles.toolbar,
            {
              bottom: fabBottom + 58,
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
          pointerEvents="box-none"
        >
          {/* Undo */}
          {hasNotes && (
            <Pressable onPress={undoLast} style={[styles.toolBtn, { borderColor: colors.border }]}>
              <Feather name="corner-left-up" size={15} color={colors.foreground} />
            </Pressable>
          )}

          {/* Clear page */}
          {hasNotes && (
            <Pressable onPress={clearPage} style={[styles.toolBtn, { borderColor: colors.border }]}>
              <Feather name="trash-2" size={15} color="#ef4444" />
            </Pressable>
          )}

          {/* Divider */}
          {hasNotes && (
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
          )}

          {/* Color swatch */}
          <Pressable
            onPress={() => setShowColorPicker(v => !v)}
            style={[styles.colorSwatch, { backgroundColor: penColor, borderColor: colors.border }]}
          />

          {/* Size dots */}
          {PEN_SIZES.map(sz => (
            <Pressable
              key={sz}
              onPress={() => setPenSize(sz)}
              style={[
                styles.sizeDot,
                {
                  width: sz * 2.5 + 4,
                  height: sz * 2.5 + 4,
                  borderRadius: (sz * 2.5 + 4) / 2,
                  backgroundColor: penSize === sz ? penColor : colors.secondary,
                  borderColor: penSize === sz ? penColor : colors.border,
                },
              ]}
            />
          ))}
        </View>
      )}

      {/* Color picker popover */}
      {drawMode && showColorPicker && (
        <View
          style={[
            styles.colorPicker,
            {
              bottom: fabBottom + 120,
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
          pointerEvents="box-none"
        >
          <View style={styles.colorGrid}>
            {PEN_COLORS.map(c => (
              <Pressable
                key={c}
                onPress={() => { setPenColor(c); setShowColorPicker(false); }}
                style={[
                  styles.colorOption,
                  {
                    backgroundColor: c,
                    borderColor: penColor === c ? '#fff' : 'transparent',
                    borderWidth: 2.5,
                  },
                ]}
              />
            ))}
          </View>
        </View>
      )}

      {/* Page label while drawing */}
      {drawMode && (
        <View
          style={[styles.pageLabel, { bottom: fabBottom + 8, backgroundColor: colors.card + 'cc', borderColor: colors.border }]}
          pointerEvents="none"
        >
          <Feather name="edit-3" size={10} color={penColor} />
          <Text style={[styles.pageLabelText, { color: colors.mutedForeground }]}>
            {pageKey} · {paths.length} stroke{paths.length !== 1 ? 's' : ''}
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 16,
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 999,
  },
  fabInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },
  toolbar: {
    position: 'absolute',
    right: 12,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 998,
  },
  toolBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 20,
    height: 1,
    borderRadius: 1,
  },
  colorSwatch: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
  },
  sizeDot: {
    borderWidth: 1.5,
  },
  colorPicker: {
    position: 'absolute',
    right: 68,
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 997,
  },
  colorGrid: {
    flexDirection: 'column',
    gap: 8,
  },
  colorOption: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  pageLabel: {
    position: 'absolute',
    right: 70,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    zIndex: 996,
  },
  pageLabelText: {
    fontSize: 10,
    fontFamily: 'Inter_400Regular',
  },
});
