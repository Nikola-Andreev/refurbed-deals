import { Deal } from '@/src/domain/Deal';

type AnalyticsEvent = 'deal_impression' | 'deal_click';

type AnalyticsProps = Record<string, string | number | boolean | undefined>;

// Mock analytics implementation – can be wired to a real SDK later.
function trackEvent(event: AnalyticsEvent, props?: AnalyticsProps): void {
  console.log('[analytics]', event, props);
}

export function trackDealImpression(deal: Deal): void {
  trackEvent('deal_impression', {
    dealId: deal.id,
    title: deal.title,
    refurbedScore: deal.refurbedScore,
  });
}

export function trackDealPress(deal: Deal): void {
  trackEvent('deal_click', {
    dealId: deal.id,
    title: deal.title,
  });
}


