import { StyleSheet, Switch } from 'react-native';

import { Text, View } from '@/src/components/Themed';
import { useThemeMode } from '@/src/hooks/useThemeMode';

export function DashboardScreen() {
  const { mode, toggleMode } = useThemeMode();
  const isDark = mode === 'dark';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Dark mode</Text>
        <Switch value={isDark} onValueChange={toggleMode} />
      </View>
      <Text style={styles.helper}>
        This toggle controls the app theme (light / dark) via a ThemeContext.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
  },
  helper: {
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
});


