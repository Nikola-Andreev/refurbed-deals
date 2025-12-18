import { useThemeMode } from '@/src/hooks/useThemeMode';

export function useColorScheme() {
  const { mode } = useThemeMode();
  return mode;
}