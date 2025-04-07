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

// Add recipe 3 to the mock data
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
      "350g spaghetti",
      "150g pancetta",
      "2 large eggs",
      "50g pecorino cheese",
      "50g parmesan",
      "Freshly ground black pepper",
      "1 garlic clove (optional)",
    ],
    instructions: [
      "Bring a large pot of salted water to boil and cook spaghetti according to package instructions.",
      "While pasta cooks, heat a large skillet over medium heat. Add pancetta and cook until crispy, about 8-10 minutes.",
      "In a bowl, whisk together eggs, grated cheeses, and plenty of black pepper.",
      "Drain pasta, reserving 1/2 cup of pasta water.",
      "Working quickly, add hot pasta to the skillet with pancetta. Toss to combine.",
      "Remove from heat and pour egg mixture over pasta, tossing constantly to create a creamy sauce. Add pasta water as needed for consistency.",
      "Serve immediately with additional cheese and black pepper.",
    ],
    tips: [
      "Don't let the eggs scramble! Remove the pan from heat before adding them.",
      "For authentic carbonara, use guanciale instead of pancetta if available.",
      "Freshly grated cheese makes a huge difference in flavor.",
    ],
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
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
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

          {recipe.tips && (
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
