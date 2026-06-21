import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { playCompletionSound, playUncompleteSound } from '@/hooks/useCompletionSound';

const STORAGE_KEY = 'rdr2_completed_items_v1';
const BACKUP_PREFIX = 'RDR2SAVE:';

interface ProgressContextValue {
  completedIds: Set<string>;
  toggleItem: (id: string) => void;
  isCompleted: (id: string) => boolean;
  resetAll: () => void;
  isLoaded: boolean;
  lastCompleted: string | null;
  exportCode: () => string;
  importCode: (code: string) => boolean;
}

const ProgressContext = createContext<ProgressContextValue>({
  completedIds: new Set(),
  toggleItem: () => {},
  isCompleted: () => false,
  resetAll: () => {},
  isLoaded: false,
  lastCompleted: null,
  exportCode: () => '',
  importCode: () => false,
});

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastCompleted, setLastCompleted] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(data => {
        if (data) {
          const arr: string[] = JSON.parse(data);
          setCompletedIds(new Set(arr));
        }
      })
      .catch(() => {})
      .finally(() => setIsLoaded(true));
  }, []);

  const persist = useCallback((next: Set<string>) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next))).catch(() => {});
  }, []);

  const toggleItem = useCallback((id: string) => {
    setCompletedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        playUncompleteSound();
        setLastCompleted(null);
      } else {
        next.add(id);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        playCompletionSound();
        setLastCompleted(id);
      }
      persist(next);
      return next;
    });
  }, [persist]);

  const isCompleted = useCallback((id: string) => completedIds.has(id), [completedIds]);

  const resetAll = useCallback(() => {
    setCompletedIds(new Set());
    AsyncStorage.removeItem(STORAGE_KEY).catch(() => {});
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    setLastCompleted(null);
  }, []);

  const exportCode = useCallback(() => {
    const ids = Array.from(completedIds);
    return BACKUP_PREFIX + ids.join(',');
  }, [completedIds]);

  const importCode = useCallback((code: string): boolean => {
    try {
      const trimmed = code.trim();
      const payload = trimmed.startsWith(BACKUP_PREFIX)
        ? trimmed.slice(BACKUP_PREFIX.length)
        : trimmed;
      const ids = payload.split(',').map(s => s.trim()).filter(Boolean);
      const next = new Set(ids);
      setCompletedIds(next);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next))).catch(() => {});
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      return true;
    } catch {
      return false;
    }
  }, []);

  return (
    <ProgressContext.Provider value={{ completedIds, toggleItem, isCompleted, resetAll, isLoaded, lastCompleted, exportCode, importCode }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
