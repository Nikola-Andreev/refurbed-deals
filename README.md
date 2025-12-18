# Refurbed Deals Spotlight 🚀

A high-performance React Native application built with **Expo Router** and **TypeScript**, showcasing a curated list of refurbished tech deals.

## 🏗 Architectural Decisions

### 1. Performance-First List Rendering
Instead of a simple `ScrollView`, I implemented a virtualized **`FlatList`** with the following optimizations:
- **Lazy Loading (Infinite Scroll):** Items are rendered in batches of 10 to minimize initial TTI (Time to Interactive).
- **Memory Management:** Used `removeClippedSubviews` and optimized `windowSize` to ensure the app maintains a low memory footprint even with large datasets.
- **Layout Stability:** Moved paddings to `contentContainerStyle` to prevent scrollbar misalignment and jitter during transitions.

### 2. Navigation & Deep Linking
- **File-based Routing:** Utilized Expo Router's dynamic routes (`app/deal/[id].tsx`) for a clean, scalable navigation structure.
- **Deep Linking:** Configured the app to support `refurbed-app://deal/[id]` URIs, ensuring the app is ready for marketing campaigns and push notifications.
- **Native Experience:** Integrated `Stack.Screen` to manage native header states and ensure smooth transitions in Dark Mode.

### 3. State Management & Logic
- **Custom Hooks:** Business logic for filtering (Refurbed Score) and sorting (Price/Score) is encapsulated in a custom `useDeals` hook, separating concerns from the UI layer.
- **Dark Mode Optimization:** Implemented a system-wide Dark Mode strategy, fixing common issues like "white flashes" during navigation pops by styling the underlying `contentStyle` and `ThemeProvider`.

## 🛠 Tech Stack
- **Framework:** Expo (React Native)
- **Navigation:** Expo Router (Stack)
- **Icons:** Lucide-react-native / Expo Icons
- **Tracking:** Mocked Analytics Service for tracking impressions and clicks.

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install