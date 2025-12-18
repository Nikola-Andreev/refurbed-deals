import { useEffect, useMemo, useState } from 'react';

import { SortOption } from '@/src//domain/SortOption';
import { fetchDeals } from '@/src/api/fetchDeals';
import { Deal } from '@/src/domain/Deal';

export function useDeals(initialSort: SortOption) {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [sortOption, setSortOption] = useState<SortOption>(initialSort);
  const [minScore, setMinScore] = useState<number>(0);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchDeals()
      .then((data) => {
        if (!mounted) return;
        setDeals(data);
      })
      .catch((err) => {
        if (mounted) setError(err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const visibleDeals = useMemo(() => {
    const filtered = deals.filter((d) => d.refurbedScore >= minScore);

    const sorted = [...filtered].sort((a, b) => {
      const { key, direction } = sortOption;
      const aVal = key === 'price' ? a.price : a.refurbedScore;
      const bVal = key === 'price' ? b.price : b.refurbedScore;
      return direction === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return sorted;
  }, [deals, sortOption, minScore]);

  return {
    deals: visibleDeals,
    loading,
    error,
    sortOption,
    setSortOption,
    minScore,
    setMinScore,
  };
}


