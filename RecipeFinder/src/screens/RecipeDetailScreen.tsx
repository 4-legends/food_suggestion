import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
  Animated,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";

type RecipeDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "RecipeDetail"
>;
type RecipeDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RecipeDetail"
>;

interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

// Add more recipe details for the new recipes
const recipesData = {
  "1": {
    id: "1",
    name: "Spaghetti Carbonara",
    cuisine: "Italian",
    prepTime: "20 mins",
    cookTime: "25 mins",
    difficulty: "Medium",
    servings: 4,
    calories: 650,
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    nutrition: {
      calories: 650,
      protein: 28,
      carbs: 65,
      fat: 32,
      fiber: 3,
    },
    description:
      "A classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper. This creamy dish comes together quickly and is always a crowd pleaser.",
    ingredients: [
      "200g spaghetti",
      "100g pancetta",
      "2 large eggs",
      "50g Pecorino Romano, grated",
      "50g Parmesan, grated",
      "Freshly ground black pepper",
      "Sea salt",
    ],
    instructions: [
      "Cook the spaghetti in a large pot of boiling salted water until al dente.",
      "Meanwhile, fry the pancetta in a large pan until crispy.",
      "In a bowl, whisk together the eggs, grated cheeses, and black pepper.",
      "Drain the pasta, reserving a little of the cooking water.",
      "Working quickly, add the hot pasta to the pancetta, then remove from heat.",
      "Add the egg and cheese mixture, tossing quickly to ensure the eggs don't scramble.",
      "Add a splash of cooking water to create a silky sauce.",
      "Season with salt and more pepper if needed, and serve immediately.",
    ],
    tips: "The heat from the pasta cooks the egg mixture gently, creating a creamy sauce without scrambling the eggs. Work quickly once you add the egg mixture to achieve the best texture.",
  },
  "2": {
    id: "2",
    name: "Vegetable Tacos",
    cuisine: "Mexican",
    prepTime: "15 mins",
    cookTime: "20 mins",
    difficulty: "Easy",
    servings: 4,
    calories: 320,
    image:
      "https://images.unsplash.com/photo-1565299585323-3366772f4999?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    nutrition: {
      calories: 320,
      protein: 9,
      carbs: 42,
      fat: 14,
      fiber: 8,
    },
    description:
      "Colorful and flavorful vegetarian tacos loaded with sautéed vegetables, fresh toppings, and zesty lime. Perfect for a quick weeknight dinner.",
    ingredients: [
      "8 corn tortillas",
      "2 bell peppers, sliced",
      "1 onion, sliced",
      "1 zucchini, sliced",
      "2 tbsp olive oil",
      "1 tsp cumin",
      "1 tsp chili powder",
      "Salt and pepper to taste",
      "Lime wedges for serving",
      "Fresh cilantro",
      "Avocado slices",
    ],
    instructions: [
      "Heat olive oil in a large skillet over medium-high heat.",
      "Add sliced peppers and onions, sauté for 5 minutes until softened.",
      "Add zucchini, cumin, chili powder, salt, and pepper. Cook for another 5-7 minutes until vegetables are tender.",
      "Warm tortillas according to package instructions.",
      "Assemble tacos with vegetable mixture, fresh cilantro, and avocado slices.",
      "Serve with lime wedges.",
    ],
    tips: [
      "Warm tortillas in a dry skillet for 30 seconds per side for the best texture.",
      "Add a dollop of Greek yogurt as a healthier alternative to sour cream.",
      "Make a double batch of veggies and use leftovers in quesadillas or grain bowls.",
    ],
  },
  "3": {
    id: "3",
    name: "Chicken Stir Fry",
    cuisine: "Asian",
    prepTime: "15 mins",
    cookTime: "20 mins",
    difficulty: "Medium",
    servings: 4,
    calories: 380,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1625&q=80",
    nutrition: {
      calories: 380,
      protein: 35,
      carbs: 28,
      fat: 15,
      fiber: 5,
    },
    description:
      "Quick and healthy chicken stir fry with colorful veggies in a savory-sweet sauce. Ready in under 30 minutes for a perfect weeknight dinner.",
    ingredients: [
      "500g chicken breast, sliced",
      "2 bell peppers, sliced",
      "1 onion, sliced",
      "2 carrots, julienned",
      "2 tbsp vegetable oil",
      "3 tbsp soy sauce",
      "1 tbsp honey",
      "2 cloves garlic, minced",
      "1 tbsp ginger, grated",
      "2 green onions, sliced",
      "Sesame seeds for garnish",
    ],
    instructions: [
      "Heat oil in a large wok or skillet over high heat.",
      "Add chicken and stir-fry until no longer pink, about 5-6 minutes.",
      "Add garlic and ginger, cook for 30 seconds until fragrant.",
      "Add vegetables and stir-fry for 3-4 minutes until crisp-tender.",
      "In a small bowl, mix soy sauce and honey, then pour over the stir-fry.",
      "Cook for another 2 minutes until sauce thickens slightly.",
      "Garnish with green onions and sesame seeds before serving.",
    ],
    tips: [
      "Slice chicken against the grain for the most tender texture.",
      "Have all ingredients prepped before you start cooking - stir fries cook quickly!",
      "For extra flavor, marinate the chicken in a tablespoon of soy sauce for 15 minutes before cooking.",
    ],
  },
  "4": {
    id: "4",
    name: "Mediterranean Salad",
    cuisine: "Mediterranean",
    prepTime: "10 mins",
    cookTime: "0 mins",
    difficulty: "Easy",
    servings: 2,
    calories: 320,
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1484&q=80",
    nutrition: {
      calories: 320,
      protein: 12,
      carbs: 18,
      fat: 22,
      fiber: 6,
    },
    description:
      "A refreshing and colorful Mediterranean salad featuring crisp vegetables, tangy feta cheese, and kalamata olives dressed in a simple olive oil and red wine vinegar dressing.",
    ingredients: [
      "1 cucumber, diced",
      "2 tomatoes, diced",
      "1 red onion, thinly sliced",
      "100g feta cheese, crumbled",
      "50g kalamata olives",
      "2 tbsp olive oil",
      "1 tbsp red wine vinegar",
      "1 tsp dried oregano",
      "Salt and pepper to taste",
      "Fresh parsley, chopped",
    ],
    instructions: [
      "In a large bowl, combine cucumber, tomatoes, red onion, feta cheese, and olives.",
      "In a small bowl, whisk together olive oil, red wine vinegar, oregano, salt, and pepper.",
      "Pour the dressing over the salad and toss gently to combine.",
      "Sprinkle with fresh parsley before serving.",
    ],
    tips: [
      "For best flavor, let the salad rest for 10-15 minutes before serving to allow flavors to meld.",
      "Use the freshest vegetables you can find for the best taste and texture.",
      "Try adding a squeeze of lemon juice for extra brightness.",
    ],
  },
  "7": {
    id: "7",
    name: "Pad Thai",
    cuisine: "Thai",
    prepTime: "30 mins",
    cookTime: "20 mins",
    difficulty: "Medium",
    servings: 4,
    calories: 500,
    image:
      "https://images.unsplash.com/photo-1598505754570-4f094c5a555e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    nutrition: {
      calories: 500,
      protein: 15,
      carbs: 50,
      fat: 20,
      fiber: 3,
    },
    description:
      "A flavorful Thai noodle dish made with rice noodles, tofu, and a flavorful sauce. Perfect for a quick weeknight dinner.",
    ingredients: [
      "250g rice noodles",
      "2 tbsp vegetable oil",
      "2 cloves garlic, minced",
      "150g tofu or chicken, diced",
      "2 eggs, beaten",
      "100g bean sprouts",
      "4 green onions, chopped",
      "50g roasted peanuts, crushed",
      "Lime wedges",
      "For the sauce:",
      "3 tbsp fish sauce (or soy sauce for vegetarian)",
      "3 tbsp brown sugar",
      "2 tbsp tamarind paste",
      "1 tbsp lime juice",
      "1 tsp chili flakes (optional)",
    ],
    instructions: [
      "Soak rice noodles in hot water for 10 minutes until soft but firm, then drain.",
      "Mix all sauce ingredients in a small bowl until sugar dissolves.",
      "Heat oil in a wok or large frying pan over medium-high heat.",
      "Add garlic and stir-fry for 30 seconds, then add tofu/chicken and cook until done.",
      "Push ingredients to one side, add beaten eggs to the empty space and scramble.",
      "Add drained noodles and sauce, tossing to coat everything evenly.",
      "Cook for 2-3 minutes until noodles absorb the sauce.",
      "Add bean sprouts and half the green onions, toss briefly.",
      "Serve topped with remaining green onions, crushed peanuts, and lime wedges.",
    ],
    tips: "For authentic Pad Thai, tamarind paste is essential. If you can't find it, mix lime juice with a little brown sugar as a substitute.",
  },
  "8": {
    id: "8",
    name: "Butter Chicken",
    cuisine: "Indian",
    prepTime: "2 hours",
    cookTime: "1 hour",
    difficulty: "Medium",
    servings: 4,
    calories: 800,
    image:
      "https://images.unsplash.com/photo-1574917010566-a1d02e26b8e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    nutrition: {
      calories: 800,
      protein: 40,
      carbs: 50,
      fat: 40,
      fiber: 5,
    },
    description:
      "A flavorful Indian chicken dish made with marinated chicken cooked in a creamy tomato sauce. Perfect for a special weeknight dinner.",
    ingredients: [
      "800g boneless chicken thighs, cut into chunks",
      "For the marinade:",
      "1 cup yogurt",
      "1 tbsp lemon juice",
      "2 tsp turmeric powder",
      "2 tsp garam masala",
      "2 tsp ground cumin",
      "2 tsp red chili powder",
      "For the sauce:",
      "2 tbsp vegetable oil",
      "2 tbsp butter",
      "1 large onion, finely chopped",
      "3 cloves garlic, minced",
      "1 tbsp ginger, grated",
      "1 can (400g) tomato puree",
      "1 cup heavy cream",
      "1 tbsp sugar",
      "Salt to taste",
      "Fresh coriander for garnish",
    ],
    instructions: [
      "Mix all marinade ingredients in a bowl. Add chicken and marinate for at least 2 hours, preferably overnight.",
      "Preheat oven to 425°F (220°C). Place marinated chicken on a baking tray and cook for 15 minutes.",
      "Meanwhile, heat oil and butter in a large pan over medium heat.",
      "Add onions and sauté until golden brown, about 5 minutes.",
      "Add garlic and ginger, cook for 1-2 minutes until fragrant.",
      "Add tomato puree, sugar, and salt. Simmer for 10-15 minutes until sauce thickens.",
      "Add cooked chicken pieces to the sauce and simmer for 5 minutes.",
      "Stir in cream and simmer for another 5 minutes on low heat.",
      "Garnish with fresh coriander and serve with naan bread or rice.",
    ],
    tips: "The longer you marinate the chicken, the more flavorful it will be. For a richer sauce, add an extra tablespoon of butter just before serving.",
  },
  "9": {
    id: "9",
    name: "Falafel Wrap",
    cuisine: "Middle Eastern",
    prepTime: "30 mins",
    cookTime: "20 mins",
    difficulty: "Medium",
    servings: 4,
    calories: 300,
    image:
      "https://images.unsplash.com/photo-1543566096-a0e3f5f4b7f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    nutrition: {
      calories: 300,
      protein: 10,
      carbs: 30,
      fat: 15,
      fiber: 5,
    },
    description:
      "A flavorful Middle Eastern wrap made with falafels, hummus, and a variety of fresh vegetables. Perfect for a quick weeknight dinner.",
    ingredients: [
      "For the falafel:",
      "2 cans (400g each) chickpeas, drained and rinsed",
      "1 small onion, roughly chopped",
      "3 cloves garlic",
      "1/4 cup fresh parsley",
      "1/4 cup fresh cilantro",
      "1 tbsp cumin",
      "1 tsp coriander",
      "1/2 tsp cayenne pepper",
      "2 tbsp flour",
      "1 tsp baking powder",
      "Salt and pepper to taste",
      "Oil for frying",
      "For the wrap:",
      "4 large flatbreads or tortillas",
      "Hummus",
      "Lettuce or mixed greens",
      "Tomatoes, sliced",
      "Cucumber, sliced",
      "Red onion, thinly sliced",
      "Tzatziki sauce",
    ],
    instructions: [
      "In a food processor, combine chickpeas, onion, garlic, herbs, and spices. Pulse until mixture is coarse but not pureed.",
      "Transfer to a bowl, add flour and baking powder, season with salt and pepper, and mix well.",
      "Form mixture into small balls (about 2 tablespoons each) and slightly flatten.",
      "Heat oil in a deep pan to 350°F (175°C).",
      "Fry falafels in batches for 3-4 minutes until golden brown and crispy. Drain on paper towels.",
      "Warm flatbreads according to package instructions.",
      "Spread hummus on each flatbread, add lettuce, tomatoes, cucumber, and red onion.",
      "Place 3-4 falafels on each wrap, drizzle with tzatziki sauce.",
      "Fold the sides and bottom of the flatbread, then roll tightly to form a wrap.",
    ],
    tips: "For the best texture, use dried chickpeas soaked overnight instead of canned. If you're short on time, canned chickpeas work well too. Make sure to dry them thoroughly to prevent the falafels from falling apart during frying.",
  },
  "12": {
    id: "12",
    name: "Vietnamese Pho",
    cuisine: "Vietnamese",
    prepTime: "4 hours",
    cookTime: "1 hour",
    difficulty: "Medium",
    servings: 4,
    calories: 1000,
    image:
      "https://images.unsplash.com/photo-1584725012380-75a6978e24b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    nutrition: {
      calories: 1000,
      protein: 40,
      carbs: 100,
      fat: 30,
      fiber: 5,
    },
    description:
      "A flavorful Vietnamese noodle soup made with a flavorful broth, thinly sliced beef, and a variety of fresh vegetables. Perfect for a special weeknight dinner.",
    ingredients: [
      "For the broth:",
      "2 kg beef bones (marrow and knuckle bones)",
      "1 whole onion, unpeeled and halved",
      "10 cm piece of ginger, unpeeled and halved",
      "5 star anise pods",
      "6 cloves",
      "1 cinnamon stick",
      "1 tbsp coriander seeds",
      "2 tbsp fish sauce",
      "1 tbsp sugar",
      "Salt to taste",
      "For serving:",
      "400g flat rice noodles",
      "300g beef sirloin, thinly sliced",
      "1 onion, thinly sliced",
      "4 green onions, chopped",
      "200g bean sprouts",
      "1 bunch Thai basil",
      "1 bunch cilantro",
      "1 lime, cut into wedges",
      "2 red chili peppers, sliced",
      "Hoisin sauce and sriracha for serving",
    ],
    instructions: [
      "Preheat oven to 425°F (220°C). Place beef bones on a baking sheet and roast for 45 minutes.",
      "Meanwhile, char the halved onion and ginger over an open flame or under the broiler until blackened.",
      "Transfer roasted bones to a large stockpot and cover with 5 liters of cold water.",
      "Add charred onion, ginger, star anise, cloves, cinnamon stick, and coriander seeds.",
      "Bring to a boil, then reduce heat to low and simmer for 3 hours, skimming off foam periodically.",
      "Add fish sauce, sugar, and salt to taste.",
      "Strain broth through a fine-mesh sieve and return to pot. Keep hot.",
      "Cook rice noodles according to package directions, then drain and rinse.",
      "Divide noodles among bowls, top with raw beef slices (the hot broth will cook them).",
      "Pour hot broth over the beef and noodles.",
      "Serve with onions, green onions, bean sprouts, herbs, lime wedges, and chili peppers on the side.",
    ],
    tips: "For the clearest, most flavorful broth, blanch the bones first by covering with cold water, bringing to a boil for 5 minutes, then draining and rinsing before roasting. This removes impurities that can cloud the broth.",
  },
};

// Update the getCuisineColor function to handle new cuisines
const getCuisineColor = (cuisine: string) => {
  switch (cuisine) {
    case "Italian":
      return "#F2D7D9";
    case "Mexican":
      return "#D3CEDF";
    case "Asian":
      return "#9CB4CC";
    case "Mediterranean":
      return "#748DA6";
    case "Indian":
      return "#E7B10A";
    case "Middle Eastern":
      return "#898121";
    case "Japanese":
      return "#F9F5EB";
    case "Thai":
      return "#7AA874";
    case "Vietnamese":
      return "#96B6C5";
    case "French":
      return "#A0D8B3";
    case "Spanish":
      return "#D71313";
    case "American":
      return "#1F6E8C";
    case "Brazilian":
      return "#FFBB5C";
    case "Moroccan":
      return "#A84448";
    default:
      return "#f5f5f5";
  }
};

const RecipeDetailScreen = () => {
  const navigation = useNavigation<RecipeDetailScreenNavigationProp>();
  const route = useRoute<RecipeDetailScreenRouteProp>();
  const id = route.params?.id;
  const [activeTab, setActiveTab] = useState<"instructions" | "nutrition">(
    "instructions"
  );
  const fadeAnim = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: Platform.OS !== "web",
    }).start();
  }, [activeTab]);

  if (!id) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Recipe ID is missing</Text>
        <TouchableOpacity
          style={styles.backToHomeButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.backToHomeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const recipe = recipesData[id as keyof typeof recipesData];

  if (!recipe) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Recipe not found</Text>
        <TouchableOpacity
          style={styles.backToHomeButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.backToHomeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const renderContent = () => {
    if (activeTab === "instructions") {
      return (
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {recipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <View style={styles.bullet} />
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            {recipe.instructions.map((step, index) => (
              <View key={index} style={styles.instructionItem}>
                <Text style={styles.instructionNumber}>{index + 1}</Text>
                <Text style={styles.instructionText}>{step}</Text>
              </View>
            ))}
          </View>

          {recipe.tips &&
            Array.isArray(recipe.tips) &&
            recipe.tips.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Chef's Tips</Text>
                {recipe.tips.map((tip, index) => (
                  <View key={index} style={styles.tipItem}>
                    <Text style={styles.tipIcon}>💡</Text>
                    <Text style={styles.tipText}>{tip}</Text>
                  </View>
                ))}
              </View>
            )}
        </Animated.View>
      );
    } else {
      return (
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nutrition Facts</Text>
            <View style={styles.nutritionContainer}>
              <View style={styles.nutritionCard}>
                <Text style={styles.nutritionValue}>
                  {recipe.nutrition.calories}
                </Text>
                <Text style={styles.nutritionLabel}>Calories</Text>
              </View>
              <View style={styles.nutritionCard}>
                <Text style={styles.nutritionValue}>
                  {recipe.nutrition.protein}g
                </Text>
                <Text style={styles.nutritionLabel}>Protein</Text>
              </View>
              <View style={styles.nutritionCard}>
                <Text style={styles.nutritionValue}>
                  {recipe.nutrition.carbs}g
                </Text>
                <Text style={styles.nutritionLabel}>Carbs</Text>
              </View>
              <View style={styles.nutritionCard}>
                <Text style={styles.nutritionValue}>
                  {recipe.nutrition.fat}g
                </Text>
                <Text style={styles.nutritionLabel}>Fat</Text>
              </View>
              <View style={styles.nutritionCard}>
                <Text style={styles.nutritionValue}>
                  {recipe.nutrition.fiber}g
                </Text>
                <Text style={styles.nutritionLabel}>Fiber</Text>
              </View>
            </View>
            <Text style={styles.nutritionDisclaimer}>
              *Values are per serving. Consult a nutritionist for more specific
              dietary information.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Health Benefits</Text>
            <Text style={styles.nutritionText}>
              This dish provides a balanced mix of macronutrients and several
              essential vitamins and minerals.
              {recipe.cuisine === "Mediterranean"
                ? " Mediterranean cuisine is known for heart-healthy fats and antioxidant-rich ingredients."
                : recipe.cuisine === "Asian"
                ? " This Asian-inspired dish features ginger and garlic, which have anti-inflammatory properties."
                : recipe.cuisine === "Mexican"
                ? " Mexican cuisine often features fiber-rich beans and vegetables, supporting digestive health."
                : " Enjoy as part of a balanced diet."}
            </Text>
          </View>
        </Animated.View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {Platform.OS === "web" ? (
        <div
          style={{
            height: "100vh",
            overflow: "auto",
            backgroundColor: "white",
          }}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.backButtonText}>← Back</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.heroContainer}>
              <Image
                source={{ uri: recipe.image }}
                style={styles.recipeImage}
                resizeMode="cover"
              />
              <View style={styles.overlay}>
                <View style={styles.cuisineBadge}>
                  <Text style={styles.cuisineText}>{recipe.cuisine}</Text>
                </View>
              </View>
            </View>

            <View style={styles.recipeInfo}>
              <Text style={styles.recipeName}>{recipe.name}</Text>
              {recipe.description && (
                <Text style={styles.recipeDescription}>
                  {recipe.description}
                </Text>
              )}

              <View style={styles.metaInfo}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Prep</Text>
                  <Text style={styles.metaValue}>{recipe.prepTime}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Cook</Text>
                  <Text style={styles.metaValue}>{recipe.cookTime}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Serves</Text>
                  <Text style={styles.metaValue}>{recipe.servings}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Difficulty</Text>
                  <View
                    style={[
                      styles.difficultyBadge,
                      recipe.difficulty === "Easy"
                        ? styles.easyBadge
                        : recipe.difficulty === "Medium"
                        ? styles.mediumBadge
                        : styles.hardBadge,
                    ]}
                  >
                    <Text style={styles.difficultyText}>
                      {recipe.difficulty}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.tabContainer}>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    activeTab === "instructions" && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab("instructions")}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === "instructions" && styles.activeTabText,
                    ]}
                  >
                    Instructions
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    activeTab === "nutrition" && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab("nutrition")}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === "nutrition" && styles.activeTabText,
                    ]}
                  >
                    Nutrition
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {renderContent()}
          </View>
        </div>
      ) : (
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.backButtonText}>← Back</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.heroContainer}>
              <Image
                source={{ uri: recipe.image }}
                style={styles.recipeImage}
                resizeMode="cover"
              />
              <View style={styles.overlay}>
                <View style={styles.cuisineBadge}>
                  <Text style={styles.cuisineText}>{recipe.cuisine}</Text>
                </View>
              </View>
            </View>

            <View style={styles.recipeInfo}>
              <Text style={styles.recipeName}>{recipe.name}</Text>
              {recipe.description && (
                <Text style={styles.recipeDescription}>
                  {recipe.description}
                </Text>
              )}

              <View style={styles.metaInfo}>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Prep</Text>
                  <Text style={styles.metaValue}>{recipe.prepTime}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Cook</Text>
                  <Text style={styles.metaValue}>{recipe.cookTime}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Serves</Text>
                  <Text style={styles.metaValue}>{recipe.servings}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Text style={styles.metaLabel}>Difficulty</Text>
                  <View
                    style={[
                      styles.difficultyBadge,
                      recipe.difficulty === "Easy"
                        ? styles.easyBadge
                        : recipe.difficulty === "Medium"
                        ? styles.mediumBadge
                        : styles.hardBadge,
                    ]}
                  >
                    <Text style={styles.difficultyText}>
                      {recipe.difficulty}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.tabContainer}>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    activeTab === "instructions" && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab("instructions")}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === "instructions" && styles.activeTabText,
                    ]}
                  >
                    Instructions
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tab,
                    activeTab === "nutrition" && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab("nutrition")}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === "nutrition" && styles.activeTabText,
                    ]}
                  >
                    Nutrition
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {renderContent()}

            <View style={styles.bottomPadding} />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 10,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  heroContainer: {
    height: 250,
    position: "relative",
  },
  recipeImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-end",
    padding: 16,
  },
  cuisineBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.8)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  cuisineText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  recipeInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  recipeName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  recipeDescription: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 16,
  },
  metaInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  metaItem: {
    marginRight: 20,
    marginBottom: 12,
  },
  metaLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginTop: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#2E7D32",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  activeTabText: {
    color: "#2E7D32",
    fontWeight: "600",
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  ingredientItem: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#2E7D32",
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: "#444",
    flex: 1,
  },
  instructionItem: {
    flexDirection: "row",
    marginBottom: 16,
  },
  instructionNumber: {
    backgroundColor: "#2E7D32",
    color: "white",
    width: 28,
    height: 28,
    borderRadius: 14,
    textAlign: "center",
    lineHeight: 28,
    marginRight: 12,
    fontSize: 14,
    fontWeight: "bold",
  },
  instructionText: {
    fontSize: 16,
    color: "#444",
    flex: 1,
    lineHeight: 24,
  },
  tipItem: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 8,
    alignItems: "flex-start",
  },
  tipIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  tipText: {
    fontSize: 14,
    color: "#444",
    flex: 1,
    lineHeight: 22,
  },
  nutritionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  nutritionCard: {
    width: "48%",
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  nutritionValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: 14,
    color: "#666",
  },
  nutritionText: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
  },
  nutritionDisclaimer: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
    marginTop: 8,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  easyBadge: {
    backgroundColor: "#e6f4ea",
  },
  mediumBadge: {
    backgroundColor: "#fff8e1",
  },
  hardBadge: {
    backgroundColor: "#ffebee",
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 16,
    color: "#d32f2f",
    textAlign: "center",
  },
  backToHomeButton: {
    backgroundColor: "#2E7D32",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  backToHomeButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  bottomPadding: {
    height: 40,
  },
});

export default RecipeDetailScreen;
