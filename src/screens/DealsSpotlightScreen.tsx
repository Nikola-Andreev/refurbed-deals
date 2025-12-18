import { useRouter } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

import { DealCard } from '@/src/components/DealCard';
import { FilterBar } from '@/src/components/FilterBar';
import { Text, View } from '@/src/components/Themed';
import { Deal } from '@/src/domain/Deal';
import { SortOption } from '@/src/domain/SortOption';
import { useDeals } from '@/src/hooks/useDeals';
import { trackDealImpression, trackDealPress } from '@/src/services/analyticsService';
import { isDealsSpotlightEnabled } from '@/src/services/featureFlagService';

const PAGE_SIZE = 10;
const INITIAL_SORT: SortOption = { key: 'price', direction: 'asc' };

export function DealsSpotlightScreen() {
  const router = useRouter();
  const { deals, loading, error, sortOption, setSortOption, minScore, setMinScore } =
    useDeals(INITIAL_SORT);

  const [displayLimit, setDisplayLimit] = useState(PAGE_SIZE);
  const [isLowerLoading, setIsLowerLoading] = useState(false);

  /**
    * Persist tracked IDs across renders without triggering new renders.
    * We use a Set for O(1) lookup performance.
  */
  const trackedDealIds = useRef(new Set<string>());

  const visibleDeals = useMemo(() => {
    return deals.slice(0, displayLimit);
  }, [deals, displayLimit]);

  const handleLoadMore = () => {
    // Prevent multiple simultaneous loads or loading beyond available data
    if (displayLimit < deals.length && !isLowerLoading) {
      setIsLowerLoading(true);
      
      /**
        * Simulation of network latency for local pagination.
        * In a production environment, this would be an API call 
        * fetching the next page from the backend.
      */
      setTimeout(() => {
        setDisplayLimit(prev => prev + PAGE_SIZE);
        setIsLowerLoading(false);
      }, 600);
    }
  };

  const renderItem = useCallback(({ item }: { item: Deal }) => {
    const handlePress = () => {
      trackDealPress(item);
      router.push(`/deal/${item.id}`);
    };
    
    return (
      <DealCard
        deal={item}
        onPress={handlePress}
      />
  )}, []);

  /**
    * Renders a loading indicator at the bottom of the list.
    * Only shown when actively fetching more data and there are remaining items to load.
  */
  const renderFooter = () => {
    // Hide footer if not loading or if we've reached the end of the dataset
    if (!isLowerLoading || displayLimit >= deals.length) return null;
    
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    );
  };

  /**
    * Handle tracking when items become visible in the list
  */
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    viewableItems.forEach(({ item, isViewable }: any) => {
      // Check if the item is visible AND hasn't been tracked yet
    if (isViewable && !trackedDealIds.current.has(item.id)) {
      trackDealImpression(item);
      
      // Mark as tracked so we don't log it again if the user scrolls back
      trackedDealIds.current.add(item.id);
    }
    });
  }).current;

  /**
     * Configuration for what counts as a "visible" item
     * itemVisiblePercentThreshold: 50 means the item is 50% visible
     * minimumViewTime: 500 means it must stay visible for 500ms to count as an impression
  */
   const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 500 
  }).current;

  if (!isDealsSpotlightEnabled()) {
    return (
      <View style={styles.container}>
        <Text>Deals Spotlight is not available right now.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Failed to load deals</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FilterBar
        sortOption={sortOption}
        onChangeSort={setSortOption}
        minScore={minScore}
        onChangeMinScore={setMinScore}
      />
      <FlatList
        data={visibleDeals}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
        indicatorStyle="white"
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        contentContainerStyle={styles.listContent}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,  
  },
  list: {
    paddingVertical: 16,
  },
  listContent: {
    paddingVertical: 16,
    paddingBottom: 40,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});


