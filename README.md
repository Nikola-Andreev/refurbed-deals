Refurbed Deals App 🚀

A high-performance mobile application built with React Native (Expo) to showcase deals with a focus on speed, scalability, and user experience.

🛠 How to Run the App

Clone the repository:

Bash

git clone https://github.com/Nikola-Andreev/refurbed-deals

cd refurbed-deals

Install dependencies:

Bash

npm install

Start the development server:

Bash

npx expo start

Open on device: Scan the QR code with the Expo Go app (Android) or Camera app (iOS).

🏗 Architectural Decisions

1\. Domain-Driven Directory Structure

Organized the code by features and domains (src/domain, src/services, src/components). This ensures that business logic is separated from the UI, making the codebase easier to scale and test.

2\. Performance Optimization (The "60 FPS" Goal)

Memoization Strategy: Implemented memo with custom comparison functions for list items (DealCard) and images (DealImage) to prevent unnecessary re-renders during scrolling.

Stable Props: Leveraged useCallback and useMemo in the parent screens to ensure that functions and objects passed to child components remain stable across renders.

FlatList Optimization: Used getItemLayout for predictable scroll offsets and removeClippedSubviews to keep memory usage low.

3\. Image Management

Integrated expo-image for high-performance disk caching and smooth transitions. Extracted image logic into a dedicated DealImage component to centralize fallback handling and caching policies.

4\. Theme Management

Implemented a centralized ThemeContext. To optimize performance, the theme state is consumed at the screen level and passed as a primitive prop to list items, avoiding context-heavy re-renders deep in the tree.

⏳ What I’d Do Next (Given More Time)

Unit & E2E Testing: Add Vitest for domain logic and Detox for end-to-end flow testing.

State Management: Transition from local state to TanStack Query (React Query) for server-state management (caching, optimistic updates, and automatic re-fetching).

Skeleton Screens: Replace the simple ActivityIndicator with sophisticated skeleton loaders for a more premium "Refurbed" feel.

Accessibility (a11y): Ensure all touchables have proper accessibilityLabel and support screen readers.

🚀 Safe Rollout: OTA vs. Store Releases

For a safe rollout, I would use EAS Update (OTA) for quick bug fixes, content updates, and styling tweaks that don't involve native module changes. This allows us to bypass the 24-48 hour store review process and fix critical issues instantly for all users.

For major features or native dependency changes, I would use Standard Store Releases combined with Phased Rollouts (7-day gradual release on iOS and percentage-based on Android). This, paired with Feature Flags, allows us to monitor telemetry and crash reports on a small segment of users before a 100% rollout, ensuring maximum stability.
