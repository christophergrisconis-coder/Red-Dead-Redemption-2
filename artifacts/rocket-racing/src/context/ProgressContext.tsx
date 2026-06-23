import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface ProgressContextType {
  completedIds: Set<string>;
  toggleItem: (id: string) => void;
  resetAll: () => void;
  exportCode: () => string;
  importCode: (code: string) => boolean;
}

const STORAGE_KEY = 'rocket-racing-progress';
const Context = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setCompletedIds(new Set(parsed));
        }
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completedIds]));
  }, [completedIds, loaded]);

  const toggleItem = useCallback((id: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setCompletedIds(new Set());
  }, []);

  const exportCode = useCallback(() => {
    const ids = [...completedIds].join(',');
    return `RRSAVE:${ids}`;
  }, [completedIds]);

  const importCode = useCallback((code: string) => {
    if (!code.startsWith('RRSAVE:')) return false;
    const ids = code.slice(7).split(',').filter(Boolean);
    setCompletedIds(new Set(ids));
    return true;
  }, []);

  return (
    <Context.Provider value={{ completedIds, toggleItem, resetAll, exportCode, importCode }}>
      {children}
    </Context.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error('useProgress must be inside ProgressProvider');
  return ctx;
}
