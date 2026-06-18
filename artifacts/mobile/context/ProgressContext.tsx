import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'rdr2_completed_items_v1';

interface ProgressContextValue {
  completedIds: Set<string>;
  toggleItem: (id: string) => void;
  isCompleted: (id: string) => boolean;
  resetAll: () => void;
  isLoaded: boolean;
}

const ProgressContext = createContext<ProgressContextValue>({
  completedIds: new Set(),
  toggleItem: () => {},
  isCompleted: () => false,
  resetAll: () => {},
  isLoaded: false,
});

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

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
      } else {
        next.add(id);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
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
  }, []);

  return (
    <ProgressContext.Provider value={{ completedIds, toggleItem, isCompleted, resetAll, isLoaded }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
