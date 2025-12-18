import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '@/src/components/Themed';
import { useDealDetails } from '@/src/hooks/useDealDetails';
import { useThemeMode } from '@/src/hooks/useThemeMode';

export function DealDetailsScreen() {
  const { dealId } = useLocalSearchParams<{ dealId?: string }>();
  const { deal, loading, error } = useDealDetails(dealId);
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error || !deal) {
    return (
      <View style={styles.centered}>
        <Text>Deal not found.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.root, isDark ? styles.rootDark : styles.rootLight]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{deal.title}</Text>
        <Text style={styles.price}>{deal.price} €</Text>
        <Text style={styles.meta}>{deal.discountPercentage}% off</Text>
        <Text style={styles.meta}>Refurbed score: {deal.refurbedScore}</Text>

        {/* Extra details placeholder; in a real app these would be proper fields */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text>Refurbed device with great condition and warranty.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>
          <Text>Electronics</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  rootDark: {
    backgroundColor: '#000',
  },
  rootLight: {
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  container: {
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
  },
  meta: {
    fontSize: 14,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
});


