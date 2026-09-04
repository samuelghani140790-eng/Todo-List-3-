'use client';

import { useState, useEffect, useCallback, type SetStateAction } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: SetStateAction<T>) => void] {
  // Use the same value during SSR and the first client render.
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Simpan ke localStorage saat value berubah
  const setValue = useCallback(
    (value: SetStateAction<T>) => {
      try {
        setStoredValue((previousValue) => {
          const nextValue =
            typeof value === 'function'
              ? (value as (previousValue: T) => T)(previousValue)
              : value;

          if (typeof window !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(nextValue));
            window.dispatchEvent(new Event('storage'));
          }

          return nextValue;
        });
      } catch (error) {
        console.error('Gagal simpan ke localStorage:', error);
      }
    },
    [key]
  );

  // Dengarkan perubahan dari tab lain (cross-tab sync)
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        const item = localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item) as T);
        }
      } catch {
        // Keep the initial value if the cached data is invalid.
      }
    }, 0);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue) as T);
        } catch {
          // abaikan jika parse error
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}
