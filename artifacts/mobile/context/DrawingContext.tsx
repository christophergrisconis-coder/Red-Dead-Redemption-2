import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

export interface DrawnPath {
  d: string;
  color: string;
  size: number;
}

interface DrawingContextValue {
  drawMode: boolean;
  setDrawMode: (v: boolean) => void;
  penColor: string;
  setPenColor: (c: string) => void;
  penSize: number;
  setPenSize: (s: number) => void;
  paths: DrawnPath[];
  setPaths: React.Dispatch<React.SetStateAction<DrawnPath[]>>;
  undoLast: () => void;
  clearPage: () => void;
  pageKey: string;
  setPageKey: (k: string) => void;
  allPagePaths: Record<string, DrawnPath[]>;
  setAllPagePaths: React.Dispatch<React.SetStateAction<Record<string, DrawnPath[]>>>;
}

const DrawingContext = createContext<DrawingContextValue | null>(null);

const STORAGE_KEY = 'rdr2_drawing_notes_v1';

export function DrawingProvider({ children }: { children: React.ReactNode }) {
  const [drawMode, setDrawMode] = useState(false);
  const [penColor, setPenColor] = useState('#ef4444');
  const [penSize, setPenSize] = useState(4);
  const [pageKey, setPageKey] = useState('home');
  const [allPagePaths, setAllPagePaths] = useState<Record<string, DrawnPath[]>>({});
  const loaded = useRef(false);

  // Load saved drawings from storage on mount
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(raw => {
      if (raw) {
        try {
          setAllPagePaths(JSON.parse(raw));
        } catch {}
      }
      loaded.current = true;
    });
  }, []);

  // Persist to storage whenever paths change
  useEffect(() => {
    if (!loaded.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(allPagePaths));
  }, [allPagePaths]);

  const paths = allPagePaths[pageKey] ?? [];

  const setPaths: React.Dispatch<React.SetStateAction<DrawnPath[]>> = useCallback(
    (action) => {
      setAllPagePaths(prev => {
        const current = prev[pageKey] ?? [];
        const next = typeof action === 'function' ? action(current) : action;
        return { ...prev, [pageKey]: next };
      });
    },
    [pageKey]
  );

  const undoLast = useCallback(() => {
    setAllPagePaths(prev => {
      const current = prev[pageKey] ?? [];
      return { ...prev, [pageKey]: current.slice(0, -1) };
    });
  }, [pageKey]);

  const clearPage = useCallback(() => {
    setAllPagePaths(prev => ({ ...prev, [pageKey]: [] }));
  }, [pageKey]);

  return (
    <DrawingContext.Provider value={{
      drawMode, setDrawMode,
      penColor, setPenColor,
      penSize, setPenSize,
      paths, setPaths,
      undoLast, clearPage,
      pageKey, setPageKey,
      allPagePaths, setAllPagePaths,
    }}>
      {children}
    </DrawingContext.Provider>
  );
}

export function useDrawing() {
  const ctx = useContext(DrawingContext);
  if (!ctx) throw new Error('useDrawing must be used inside DrawingProvider');
  return ctx;
}
