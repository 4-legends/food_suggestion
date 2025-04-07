import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
  StatusBar,
  SafeAreaView,
  Pressable,
  ScrollView,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";

type RecipesScreenRouteProp = RouteProp<RootStackParamList, "Recipes">;
type RecipesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Recipes"
>;

interface Recipe {
  id: string;
  name: string;
  cuisine: string;
  prepTime: string;
  cookTime: string;
  difficulty: string;
  dietaryInfo?: string[];
}

const RecipesScreen = () => {
  const navigation = useNavigation<RecipesScreenNavigationProp>();
  const route = useRoute<RecipesScreenRouteProp>();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedTags, setSelectedTags] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();

  // Add safe handling for route params
  const cuisine = route.params?.cuisine || null;
  const diet = route.params?.diet || null;
  const skillLevel = route.params?.skillLevel || null;

  // Mock recipe data with more details
  const recipes: Recipe[] = [
    {
      id: "1",
      name: "Spaghetti Carbonara",
      cuisine: "Italian",
      prepTime: "20 mins",
      cookTime: "25 mins",
      difficulty: "Medium",
      dietaryInfo: [],
    },
    {
      id: "2",
      name: "Vegetable Tacos",
      cuisine: "Mexican",
      prepTime: "15 mins",
      cookTime: "20 mins",
      difficulty: "Easy",
      dietaryInfo: ["Vegetarian", "Vegan", "Gluten-Free"],
    },
    {
      id: "3",
      name: "Chicken Stir Fry",
      cuisine: "Asian",
      prepTime: "15 mins",
      cookTime: "20 mins",
      difficulty: "Medium",
      dietaryInfo: ["Gluten-Free"],
    },
    {
      id: "4",
      name: "Mediterranean Salad",
      cuisine: "Mediterranean",
      prepTime: "10 mins",
      cookTime: "0 mins",
      difficulty: "Easy",
      dietaryInfo: ["Vegetarian", "Vegan", "Gluten-Free"],
    },
    {
      id: "5",
      name: "Tomato Soup",
      cuisine: "Italian",
      prepTime: "15 mins",
      cookTime: "30 mins",
      difficulty: "Easy",
      dietaryInfo: ["Vegetarian", "Vegan"],
    },
    {
      id: "6",
      name: "Vegetable Lo Mein",
      cuisine: "Asian",
      prepTime: "20 mins",
      cookTime: "15 mins",
      difficulty: "Medium",
      dietaryInfo: ["Vegetarian", "Vegan"],
    },
    {
      id: "7",
      name: "Pad Thai",
      cuisine: "Thai",
      prepTime: "20 mins",
      cookTime: "15 mins",
      difficulty: "Medium",
      dietaryInfo: ["Gluten-Free"],
    },
    {
      id: "8",
      name: "Butter Chicken",
      cuisine: "Indian",
      prepTime: "25 mins",
      cookTime: "35 mins",
      difficulty: "Medium",
      dietaryInfo: [],
    },
    {
      id: "9",
      name: "Falafel Wrap",
      cuisine: "Middle Eastern",
      prepTime: "30 mins",
      cookTime: "15 mins",
      difficulty: "Medium",
      dietaryInfo: ["Vegetarian", "Vegan"],
    },
    {
      id: "10",
      name: "Sushi Rolls",
      cuisine: "Japanese",
      prepTime: "40 mins",
      cookTime: "10 mins",
      difficulty: "Hard",
      dietaryInfo: ["Gluten-Free"],
    },
    {
      id: "11",
      name: "Greek Moussaka",
      cuisine: "Mediterranean",
      prepTime: "30 mins",
      cookTime: "45 mins",
      difficulty: "Hard",
      dietaryInfo: [],
    },
    {
      id: "12",
      name: "Vietnamese Pho",
      cuisine: "Vietnamese",
      prepTime: "30 mins",
      cookTime: "3 hours",
      difficulty: "Hard",
      dietaryInfo: ["Gluten-Free"],
    },
    {
      id: "13",
      name: "French Ratatouille",
      cuisine: "French",
      prepTime: "25 mins",
      cookTime: "40 mins",
      difficulty: "Medium",
      dietaryInfo: ["Vegetarian", "Vegan", "Gluten-Free"],
    },
    {
      id: "14",
      name: "Spanish Paella",
      cuisine: "Spanish",
      prepTime: "30 mins",
      cookTime: "40 mins",
      difficulty: "Hard",
      dietaryInfo: [],
    },
    {
      id: "15",
      name: "Turkish Kebabs",
      cuisine: "Middle Eastern",
      prepTime: "25 mins",
      cookTime: "15 mins",
      difficulty: "Medium",
      dietaryInfo: ["Gluten-Free"],
    },
    {
      id: "16",
      name: "Quinoa Bowl",
      cuisine: "American",
      prepTime: "15 mins",
      cookTime: "20 mins",
      difficulty: "Easy",
      dietaryInfo: ["Vegetarian", "Vegan", "Gluten-Free"],
    },
    {
      id: "17",
      name: "Brazilian Feijoada",
      cuisine: "Brazilian",
      prepTime: "30 mins",
      cookTime: "2 hours",
      difficulty: "Hard",
      dietaryInfo: [],
    },
    {
      id: "18",
      name: "Moroccan Tagine",
      cuisine: "Moroccan",
      prepTime: "25 mins",
      cookTime: "1 hour",
      difficulty: "Medium",
      dietaryInfo: ["Gluten-Free"],
    },
  ];

  // Filter recipes based on the selected parameters and search query
  const getFilteredRecipes = () => {
    return recipes.filter((recipe) => {
      // Check selected tags first (cuisine, diet, difficulty)
      if (Object.keys(selectedTags).length > 0) {
        const hasCuisine = !selectedTags[recipe.cuisine];
        const hasDiet =
          recipe.dietaryInfo &&
          recipe.dietaryInfo.some((diet) => selectedTags[diet]);
        const hasDifficulty = selectedTags[recipe.difficulty];

        // If we have selected tags but recipe doesn't match any, filter it out
        if (
          Object.keys(selectedTags).some((tag) =>
            ["Italian", "Mexican", "Asian", "Mediterranean"].includes(tag)
          ) &&
          hasCuisine
        ) {
          return false;
        }

        if (
          Object.keys(selectedTags).some((tag) =>
            ["Vegetarian", "Vegan", "Gluten-Free"].includes(tag)
          ) &&
          !hasDiet &&
          recipe.dietaryInfo &&
          recipe.dietaryInfo.length > 0
        ) {
          return false;
        }

        if (
          Object.keys(selectedTags).some((tag) =>
            ["Easy", "Medium", "Hard"].includes(tag)
          ) &&
          !hasDifficulty
        ) {
          return false;
        }
      }

      // Apply search filter
      if (
        searchQuery &&
        !recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  };

  useEffect(() => {
    // Initialize selected tags from route params
    const initialTags: { [key: string]: boolean } = {};
    if (cuisine) initialTags[cuisine] = true;
    if (diet) initialTags[diet] = true;
    if (skillLevel === "Beginner") initialTags["Easy"] = true;
    if (skillLevel === "Skilled") initialTags["Medium"] = true;
    if (skillLevel === "Expert") initialTags["Hard"] = true;
    setSelectedTags(initialTags);
  }, [cuisine, diet, skillLevel]);

  const allRecipeNames = recipes.map((recipe) => recipe.name);
  const searchSuggestions = useMemo(() => {
    return getFilteredRecipes()
      .map((recipe) => recipe.name)
      .filter((name) => name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery, selectedTags]);

  const displayedRecipes = getFilteredRecipes();

  const totalTime = (recipe: Recipe) => {
    const prepMinutes = parseInt(recipe.prepTime.split(" ")[0]);
    const cookMinutes = parseInt(recipe.cookTime.split(" ")[0]);
    return prepMinutes + cookMinutes;
  };

  const handleRecipePress = (id: string) => {
    navigation.navigate("RecipeDetail", { id });
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => ({
      ...prev,
      [tag]: !prev[tag],
    }));
  };

  const handleSearchSuggestionSelect = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleClearFilters = () => {
    setSelectedTags({});
    setSearchQuery("");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Recipes</Text>
          </View>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search recipes..."
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                setShowSuggestions(text.length > 0);
              }}
              onFocus={() => setShowSuggestions(searchQuery.length > 0)}
              placeholderTextColor="#999"
            />
            {showSuggestions && searchSuggestions.length > 0 && (
              <View style={styles.suggestionsContainer}>
                {searchSuggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionItem}
                    onPress={() => handleSearchSuggestionSelect(suggestion)}
                  >
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {Platform.OS === "web" ? (
          <div
            style={{
              overflowY: "auto",
              height: `calc(${windowHeight}px - 170px)`,
              maxHeight: `calc(100vh - 170px)`,
              paddingBottom: "100px",
              flex: 1,
              WebkitOverflowScrolling: "touch",
              msOverflowStyle: "scrollbar",
              scrollbarWidth: "thin",
              paddingRight: "10px",
              position: "relative",
            }}
          >
            {/* Filter Sections */}
            <View style={styles.filtersWrapper}>
              <View style={styles.filterHeaderContainer}>
                <Text style={styles.filterHeader}>Filters</Text>
                {(Object.keys(selectedTags).length > 0 || searchQuery) && (
                  <TouchableOpacity
                    style={styles.clearFiltersButton}
                    onPress={handleClearFilters}
                  >
                    <Text style={styles.clearFiltersText}>Clear</Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Cuisine:</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.tagScrollContainer}
                >
                  {[
                    "Italian",
                    "Mexican",
                    "Asian",
                    "Mediterranean",
                    "Indian",
                    "Middle Eastern",
                    "Japanese",
                    "Thai",
                    "Vietnamese",
                    "French",
                    "Spanish",
                    "American",
                    "Brazilian",
                    "Moroccan",
                  ].map((tag) => (
                    <Pressable
                      key={tag}
                      style={[
                        styles.tagItem,
                        selectedTags[tag] && styles.selectedTagItem,
                      ]}
                      onPress={() => toggleTag(tag)}
                    >
                      <Text
                        style={[
                          styles.tagText,
                          selectedTags[tag] && styles.selectedTagText,
                        ]}
                      >
                        {tag}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Diet:</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.tagScrollContainer}
                >
                  {["Vegetarian", "Vegan", "Gluten-Free"].map((tag) => (
                    <Pressable
                      key={tag}
                      style={[
                        styles.tagItem,
                        selectedTags[tag] && styles.selectedTagItem,
                      ]}
                      onPress={() => toggleTag(tag)}
                    >
                      <Text
                        style={[
                          styles.tagText,
                          selectedTags[tag] && styles.selectedTagText,
                        ]}
                      >
                        {tag}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Difficulty:</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.tagScrollContainer}
                >
                  {["Easy", "Medium", "Hard"].map((tag) => (
                    <Pressable
                      key={tag}
                      style={[
                        styles.tagItem,
                        selectedTags[tag] && styles.selectedTagItem,
                      ]}
                      onPress={() => toggleTag(tag)}
                    >
                      <Text
                        style={[
                          styles.tagText,
                          selectedTags[tag] && styles.selectedTagText,
                        ]}
                      >
                        {tag}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            </View>

            {displayedRecipes.length > 0 ? (
              <View style={styles.recipeListContainer}>
                {displayedRecipes.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.recipeCard}
                    onPress={() => handleRecipePress(item.id)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.recipePlaceholder,
                        { backgroundColor: getCuisineColor(item.cuisine) },
                      ]}
                    >
                      <Text style={styles.placeholderText}>{item.cuisine}</Text>
                    </View>
                    <View style={styles.recipeContent}>
                      <Text style={styles.recipeName}>{item.name}</Text>
                      <Text style={styles.recipeDetails}>
                        <Text style={styles.totalTime}>
                          {totalTime(item)} min total
                        </Text>{" "}
                        • Prep: {item.prepTime} • Cook: {item.cookTime}
                      </Text>
                      <View style={styles.tagsContainer}>
                        <View
                          style={[
                            styles.difficultyBadge,
                            getDifficultyStyle(item.difficulty),
                          ]}
                        >
                          <Text style={styles.difficultyText}>
                            {item.difficulty}
                          </Text>
                        </View>
                        {item.dietaryInfo &&
                          item.dietaryInfo.map((info) => (
                            <View key={info} style={styles.dietBadge}>
                              <Text style={styles.dietText}>{info}</Text>
                            </View>
                          ))}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
                <View style={styles.bottomPadding} />
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  No recipes found matching your criteria
                </Text>
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={handleClearFilters}
                >
                  <Text style={styles.resetButtonText}>Reset All Filters</Text>
                </TouchableOpacity>
              </View>
            )}
          </div>
        ) : (
          <ScrollView
            style={styles.mainScrollView}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Same content as above, for mobile */}
            <View style={styles.filtersWrapper}>
              <View style={styles.filterHeaderContainer}>
                <Text style={styles.filterHeader}>Filters</Text>
                {(Object.keys(selectedTags).length > 0 || searchQuery) && (
                  <TouchableOpacity
                    style={styles.clearFiltersButton}
                    onPress={handleClearFilters}
                  >
                    <Text style={styles.clearFiltersText}>Clear</Text>
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Cuisine:</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.tagScrollContainer}
                >
                  {[
                    "Italian",
                    "Mexican",
                    "Asian",
                    "Mediterranean",
                    "Indian",
                    "Middle Eastern",
                    "Japanese",
                    "Thai",
                    "Vietnamese",
                    "French",
                    "Spanish",
                    "American",
                    "Brazilian",
                    "Moroccan",
                  ].map((tag) => (
                    <Pressable
                      key={tag}
                      style={[
                        styles.tagItem,
                        selectedTags[tag] && styles.selectedTagItem,
                      ]}
                      onPress={() => toggleTag(tag)}
                    >
                      <Text
                        style={[
                          styles.tagText,
                          selectedTags[tag] && styles.selectedTagText,
                        ]}
                      >
                        {tag}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Diet:</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.tagScrollContainer}
                >
                  {["Vegetarian", "Vegan", "Gluten-Free"].map((tag) => (
                    <Pressable
                      key={tag}
                      style={[
                        styles.tagItem,
                        selectedTags[tag] && styles.selectedTagItem,
                      ]}
                      onPress={() => toggleTag(tag)}
                    >
                      <Text
                        style={[
                          styles.tagText,
                          selectedTags[tag] && styles.selectedTagText,
                        ]}
                      >
                        {tag}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>

              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Difficulty:</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.tagScrollContainer}
                >
                  {["Easy", "Medium", "Hard"].map((tag) => (
                    <Pressable
                      key={tag}
                      style={[
                        styles.tagItem,
                        selectedTags[tag] && styles.selectedTagItem,
                      ]}
                      onPress={() => toggleTag(tag)}
                    >
                      <Text
                        style={[
                          styles.tagText,
                          selectedTags[tag] && styles.selectedTagText,
                        ]}
                      >
                        {tag}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            </View>

            {displayedRecipes.length > 0 ? (
              <View style={styles.recipeListContainer}>
                {displayedRecipes.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.recipeCard}
                    onPress={() => handleRecipePress(item.id)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.recipePlaceholder,
                        { backgroundColor: getCuisineColor(item.cuisine) },
                      ]}
                    >
                      <Text style={styles.placeholderText}>{item.cuisine}</Text>
                    </View>
                    <View style={styles.recipeContent}>
                      <Text style={styles.recipeName}>{item.name}</Text>
                      <Text style={styles.recipeDetails}>
                        <Text style={styles.totalTime}>
                          {totalTime(item)} min total
                        </Text>{" "}
                        • Prep: {item.prepTime} • Cook: {item.cookTime}
                      </Text>
                      <View style={styles.tagsContainer}>
                        <View
                          style={[
                            styles.difficultyBadge,
                            getDifficultyStyle(item.difficulty),
                          ]}
                        >
                          <Text style={styles.difficultyText}>
                            {item.difficulty}
                          </Text>
                        </View>
                        {item.dietaryInfo &&
                          item.dietaryInfo.map((info) => (
                            <View key={info} style={styles.dietBadge}>
                              <Text style={styles.dietText}>{info}</Text>
                            </View>
                          ))}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
                <View style={styles.bottomPadding} />
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  No recipes found matching your criteria
                </Text>
                <TouchableOpacity
                  style={styles.resetButton}
                  onPress={handleClearFilters}
                >
                  <Text style={styles.resetButtonText}>Reset All Filters</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

// Helper functions
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
    default:
      return "#f5f5f5";
  }
};

const getDifficultyStyle = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return styles.easyBadge;
    case "Medium":
      return styles.mediumBadge;
    case "Hard":
      return styles.hardBadge;
    default:
      return {};
  }
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    height: "100%",
    overflow: Platform.OS === "web" ? "hidden" : "visible",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    zIndex: 10,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  mainScrollView: {
    flex: 1,
    height: Platform.OS === "web" ? "100%" : undefined,
    maxHeight: Platform.OS === "web" ? "100%" : undefined,
    overflow: Platform.OS === "web" ? "scroll" : undefined,
  },
  scrollContent: {
    paddingBottom: Platform.OS === "web" ? 150 : 80,
  },
  filtersWrapper: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  filterHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  filterHeader: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },
  tagScrollContainer: {
    paddingRight: 16,
  },
  filterSection: {
    marginBottom: 12,
  },
  filterSectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
  },
  clearFiltersButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  clearFiltersText: {
    color: "#666",
    fontWeight: "500",
    fontSize: 12,
  },
  tagItem: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  selectedTagItem: {
    backgroundColor: "#2E7D32",
  },
  tagText: {
    fontSize: 14,
    color: "#555",
  },
  selectedTagText: {
    color: "white",
    fontWeight: "500",
  },
  searchContainer: {
    marginBottom: 12,
    position: "relative",
    zIndex: 100,
  },
  searchInput: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  suggestionsContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 200,
    ...(Platform.OS === "web"
      ? { boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }),
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    zIndex: 101,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  suggestionText: {
    fontSize: 14,
    color: "#333",
  },
  recipeListContainer: {
    padding: 16,
  },
  recipeCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    ...(Platform.OS === "web"
      ? { boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)" }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        }),
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  recipePlaceholder: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#555",
    fontWeight: "600",
  },
  recipeContent: {
    flex: 1,
    padding: 12,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  recipeDetails: {
    fontSize: 12,
    color: "#777",
    marginBottom: 8,
  },
  totalTime: {
    fontWeight: "600",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 2,
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
    fontSize: 10,
    fontWeight: "bold",
    color: "#333",
  },
  dietBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#f0f0f0",
    marginRight: 6,
    marginBottom: 2,
  },
  dietText: {
    fontSize: 10,
    color: "#666",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 80,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  resetButton: {
    backgroundColor: "#2E7D32",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  bottomPadding: {
    height: 80,
  },
});

export default RecipesScreen;
