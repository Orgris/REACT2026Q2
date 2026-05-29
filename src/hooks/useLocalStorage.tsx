import { useEffect, useState } from 'react';

export function useLocalStorage(key: string) {
  const [value, setValue] = useState(() => localStorage.getItem(key) ?? '');

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue] as const;
}
