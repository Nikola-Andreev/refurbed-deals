import { render } from '@testing-library/react-native';
import React from 'react';

import { DealCard } from '@/src/components/DealCard';
import { Deal } from '@/src/domain/Deal';

const mockDeal = {
  id: '1',
  title: 'iPhone 13',
  price: 599,
  discountPercentage: 10,
  refurbedScore: 92,
} as Deal;

describe('DealCard Component', () => {
  it('renders deal information correctly', () => {
    const { getByText } = render(<DealCard deal={mockDeal} onPress={() => {}} />);

    // Check if the title and price are visible on the screen
    expect(getByText('iPhone 13')).toBeTruthy();
    expect(getByText(/599.*€/)).toBeTruthy();
  });
});