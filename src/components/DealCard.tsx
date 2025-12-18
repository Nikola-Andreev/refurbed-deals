import { memo, default as React } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '@/src/components/Themed';
import { Deal } from '@/src/domain/Deal';
import { useThemeMode } from '@/src/hooks/useThemeMode';

type Props = {
  deal: Deal;
  onPress?: () => void;
};

const DealCardComponent = ({ deal, onPress }: Props) => {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container, 
        isDark ? styles.containerDark : styles.containerLight
      ]}
    >
      <View>
        <Text style={[styles.title]}>{deal.title}</Text>
        <Text style={[styles.price]}>{deal.price} €</Text>
        <Text style={styles.meta}>{deal.discountPercentage}% off</Text>
        <Text style={styles.meta}>Refurbed score: {deal.refurbedScore}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const DealCard = memo(DealCardComponent);

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  containerLight: {
    backgroundColor: '#fff',
  },
  containerDark: {
    backgroundColor: '#1f1f1f',
  },
  title: {
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontWeight: '500',
    marginBottom: 2,
  },
  meta: {
    fontSize: 12,
    color: '#666',
  },
});


