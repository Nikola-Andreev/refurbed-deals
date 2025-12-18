import { memo, default as React } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { DealImage } from '@/src/components/DealImage';
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
      <View style={styles.contentRow}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>{deal.title}</Text>
          <Text style={styles.price}>{deal.price} €</Text>
          <View style={styles.metaRow}>
            <Text style={styles.discount}>{deal.discountPercentage}% off</Text>
            <Text style={styles.separator}> • </Text>
            <Text style={styles.score}>Score: {deal.refurbedScore}</Text>
          </View>
        </View>

        <DealImage uri={deal.imageUrl} size={80} />
      </View>
    </TouchableOpacity>
  );
};

export const DealCard = memo(DealCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.deal.id === nextProps.deal.id &&
    prevProps.deal.price === nextProps.deal.price &&
    prevProps.deal.imageUrl === nextProps.deal.imageUrl
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden', // За да не излиза картинката извън заоблените ъгли
  },
  containerLight: {
    backgroundColor: '#fff',
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  containerDark: {
    backgroundColor: '#1c1c1e',
    borderColor: '#333',
  },
  contentRow: {
    flexDirection: 'row', // Подрежда елементите хоризонтално
    padding: 12,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  textContainer: {
    flex: 1, // Заема цялото налично пространство вляво
    marginRight: 12,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2a9d8f', // Приятен зелен цвят за цената
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  discount: {
    fontSize: 12,
    color: '#e76f51', // Цвят за акцент върху отстъпката
    fontWeight: '600',
  },
  separator: {
    color: '#999',
  },
  score: {
    fontSize: 12,
    color: '#666',
  },
});


