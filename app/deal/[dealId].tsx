import { Stack, useLocalSearchParams } from 'expo-router';

import { DealDetailsScreen } from '@/src/screens/DealDetailsScreen';

export default function DealDetailsRouteScreen() {
  const { dealId } = useLocalSearchParams<{ dealId: string }>();

  return (
    <>
      <Stack.Screen 
        options={{ 
          headerShown: true,
          title: `Deal ${dealId}`,
          headerBackTitle: 'Back',
        }} 
      />
      <DealDetailsScreen />
    </>
  );}
