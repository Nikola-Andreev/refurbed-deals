import { Deal } from '@/src/domain/Deal';

const MOCK_DEALS: Deal[] = [
  { id: '1', title: 'iPhone 13 – Like New', price: 599, discountPercentage: 30, refurbedScore: 92, imageUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=400&auto=format&fit=crop', },
  { id: '2', title: 'MacBook Air M1', price: 899, discountPercentage: 25, refurbedScore: 88, imageUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=400&auto=format&fit=crop'},
  { id: '3', title: 'Samsung Galaxy S21', price: 499, discountPercentage: 35, refurbedScore: 85, imageUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=400&auto=format&fit=crop'},
  { id: '4', title: 'iPad Pro 11"', price: 749, discountPercentage: 20, refurbedScore: 93, imageUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=400&auto=format&fit=crop' },
  { id: '5', title: 'Google Pixel 6', price: 429, discountPercentage: 40, refurbedScore: 78 },
  { id: '6', title: 'Apple Watch Series 7', price: 279, discountPercentage: 22, refurbedScore: 81 },
  { id: '7', title: 'Dell XPS 13', price: 999, discountPercentage: 18, refurbedScore: 74 },
  { id: '8', title: 'AirPods Pro (2nd Gen)', price: 199, discountPercentage: 28, refurbedScore: 87 },
  { id: '9', title: 'Sony WH-1000XM4', price: 249, discountPercentage: 33, refurbedScore: 82 },
  { id: '10', title: 'Lenovo ThinkPad X1 Carbon', price: 1099, discountPercentage: 27, refurbedScore: 76 },
  { id: '11', title: 'Samsung Galaxy Tab S7', price: 529, discountPercentage: 24, refurbedScore: 84 },
  { id: '12', title: 'OnePlus 9', price: 379, discountPercentage: 38, refurbedScore: 69 },
  { id: '13', title: 'Nintendo Switch OLED', price: 299, discountPercentage: 15, refurbedScore: 90 },
  { id: '14', title: 'iPad Air 5th Gen', price: 549, discountPercentage: 10, refurbedScore: 92 },
  { id: '15', title: 'Sony WH-1000XM5', price: 280, discountPercentage: 20, refurbedScore: 95 },
  { id: '16', title: 'Apple Watch Series 8', price: 310, discountPercentage: 12, refurbedScore: 88 },
  { id: '17', title: 'Samsung Galaxy S22', price: 420, discountPercentage: 25, refurbedScore: 85 },
  { id: '18', title: 'Kindle Paperwhite', price: 110, discountPercentage: 15, refurbedScore: 98 },
  { id: '19', title: 'MacBook Air M2', price: 999, discountPercentage: 8, refurbedScore: 94 },
  { id: '20', title: 'GoPro Hero 11', price: 350, discountPercentage: 18, refurbedScore: 91 },
  { id: '21', title: 'Dell XPS 13', price: 850, discountPercentage: 14, refurbedScore: 89 },
  { id: '22', title: 'Canon EOS R10', price: 720, discountPercentage: 10, refurbedScore: 87 },
  { id: '23', title: 'Bose QuietComfort 45', price: 240, discountPercentage: 22, refurbedScore: 93 },
  { id: '24', title: 'Google Pixel 7 Pro', price: 599, discountPercentage: 20, refurbedScore: 86 },
  { id: '25', title: 'Microsoft Surface Pro 9', price: 890, discountPercentage: 12, refurbedScore: 82 },
  { id: '26', title: 'Logitech MX Master 3S', price: 85, discountPercentage: 15, refurbedScore: 97 },
  { id: '27', title: 'DJI Mini 3 Pro', price: 640, discountPercentage: 10, refurbedScore: 91 },
  { id: '28', title: 'ASUS ROG Zephyrus G14', price: 1250, discountPercentage: 18, refurbedScore: 88 },
  { id: '29', title: 'Steam Deck 512GB', price: 399, discountPercentage: 25, refurbedScore: 94 },
  { id: '30', title: 'Sennheiser Momentum 4', price: 260, discountPercentage: 21, refurbedScore: 95 },
  { id: '31', title: 'Garmin Fenix 7', price: 480, discountPercentage: 15, refurbedScore: 90 },
  { id: '32', title: 'Fujifilm X-T4', price: 1100, discountPercentage: 12, refurbedScore: 89 },
  { id: '33', title: 'Razer BlackWidow V4', price: 140, discountPercentage: 10, refurbedScore: 96 }
];

function delay<T>(value: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export async function fetchDeals(): Promise<Deal[]> {
  // Simulate a network call with a small delay
  return delay(MOCK_DEALS);
}


