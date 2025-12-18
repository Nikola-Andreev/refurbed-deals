export type RefurbedScore = number; // 0–100

export interface Deal {
  id: string;
  title: string;
  price: number;
  discountPercentage: number;
  refurbedScore: RefurbedScore;
  imageUrl?: string;
  // Add more fields as needed, e.g. description, category, rating, etc.
}


