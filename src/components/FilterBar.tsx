import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text } from '@/src/components/Themed';
import { SortDirection, SortKey, SortOption } from '@/src/domain/SortOption';
import { useThemeMode } from '@/src/hooks/useThemeMode';

type Props = {
  sortOption: SortOption;
  onChangeSort: (next: SortOption) => void;
  minScore: number;
  onChangeMinScore: (score: number) => void;
};

export function FilterBar({ sortOption, onChangeSort, minScore, onChangeMinScore }: Props) {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  const toggleDirection = () => {
    const nextDir: SortDirection = sortOption.direction === 'asc' ? 'desc' : 'asc';
    onChangeSort({ ...sortOption, direction: nextDir });
  };

  const setKey = (key: SortKey) => {
    onChangeSort({ ...sortOption, key });
  };

  return (
    <View style={styles.container}>
      <View style={styles.sortRow}>
        <TouchableOpacity onPress={() => setKey('price')}>
          <Text
            style={[
              styles.chip,
              sortOption.key === 'price' &&
                (isDark ? styles.chipActiveDark : styles.chipActiveLight),
            ]}
          >
            Price
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setKey('refurbedScore')}>
          <Text
            style={[
              styles.chip,
              sortOption.key === 'refurbedScore' &&
                (isDark ? styles.chipActiveDark : styles.chipActiveLight),
            ]}
          >
            Score
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleDirection}>
          <Text style={styles.chip}>{sortOption.direction === 'asc' ? '↑' : '↓'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => onChangeMinScore(minScore >= 80 ? 0 : 80)}
        style={isDark ? styles.filterChipDark : styles.filterChipLight}
      >
        <Text style={isDark ? styles.filterChipTextDark : styles.filterChipTextLight}>
          {minScore >= 80 ? 'Score ≥ 80 (on)' : 'Score ≥ 80 (off)'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 12,
  },
  chipActiveDark: {
    backgroundColor: '#000',
    color: '#fff',
    borderColor: '#000',
  },
  chipActiveLight: {
    backgroundColor: '#fff',
    color: '#000',
    borderColor: '#000',
  },
  filterChipDark: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#333',
  },
  filterChipLight: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#eee',
  },
  filterChipTextDark: {
    fontSize: 12,
    color: '#fff',
  },
  filterChipTextLight: {
    fontSize: 12,
    color: '#000',
  },
});


