export type SortKey = 'price' | 'refurbedScore';

export type SortDirection = 'asc' | 'desc';

export interface SortOption {
  key: SortKey;
  direction: SortDirection;
}


