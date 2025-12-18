import { useContext } from 'react';

import { ThemeContext } from '@/src/context/ThemeContext';

export function useThemeMode() {
    const ctx = useContext(ThemeContext);
    
    if (!ctx) {
      return { 
        mode: 'dark' as const, 
        setMode: () => {}, 
        toggleMode: () => {} 
      };
    }
    
    return ctx;
  }