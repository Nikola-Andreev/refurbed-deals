import React, { ReactNode, useMemo, useState } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';

import { ThemeContext, ThemeMode } from '@/src/context/ThemeContext';

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const system = useSystemColorScheme() ?? 'light';
  const [mode, setMode] = useState<ThemeMode>(system);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      toggleMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    [mode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}