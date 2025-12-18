import { useEffect, useState } from 'react';

import { fetchDeals } from '@/src/api/fetchDeals';
import { Deal } from '@/src/domain/Deal';

export function useDealDetails(dealId: string | null | undefined) {
  const [deal, setDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!dealId) return;

    let mounted = true;
    setLoading(true);

    fetchDeals()
      .then((deals) => {
        if (!mounted) return;
        const found = deals.find((d) => d.id === dealId) ?? null;
        setDeal(found);
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
  }, [dealId]);

  return { deal, loading, error };
}


