# Recipe Finder

A React Native application built with Expo that helps users discover and explore recipes based on cuisine, dietary preferences, and difficulty level.

## Project Structure

```
RecipeFinder/
├── assets/           # Static assets
├── src/
│   ├── components/   # Reusable UI components
│   ├── navigation/   # Navigation configuration
│   │   ├── AppNavigator.tsx  # Main navigation setup
│   │   └── types.ts          # TypeScript types for navigation
│   └── screens/      # Application screens
│       ├── HomeScreen.tsx        # Parameter selection screen
│       ├── RecipesScreen.tsx     # Recipe listing and filtering
│       └── RecipeDetailScreen.tsx # Detailed recipe view
├── App.tsx           # Main application component
├── app.json          # Expo configuration
└── package.json      # Dependencies and scripts
```

## Getting Started

1. Install dependencies:

```
npm install
```

2. Start the development server:

```
npx expo start
```

3. Run on web:

```
npx expo start --web
```

4. Run on iOS/Android:

- Scan QR code with Expo Go app
- Press 'a' for Android or 'i' for iOS

## Features

- Parameter selection for cuisine, diet, and skill level
- Recipe filtering based on multiple criteria
- Detailed recipe information with instructions and nutritional data
- Responsive design for web and mobile
