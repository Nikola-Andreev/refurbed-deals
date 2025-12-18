import { useContext } from 'react';

import { ThemeContext } from '@/src/context/ThemeContext';

const DEFAULT = { 
  mode: 'dark' as const, 
  setMode: () => {}, 
  toggleMode: () => {} 
}

export function useThemeMode() {
    const ctx = useContext(ThemeContext);
    
    if (!ctx) {
      return DEFAULT;
    }
    
    return ctx;
  }