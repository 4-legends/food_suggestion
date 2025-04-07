import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  ImageBackground,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [selectedCuisine, setSelectedCuisine] =
    useState<string>("Mediterranean");
  const [selectedDiet, setSelectedDiet] = useState<string>("Vegan");
  const [selectedSkillLevel, setSelectedSkillLevel] =
    useState<string>("Beginner");

  // Animation values
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    // Run animation when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: Platform.OS !== "web", // Don't use native driver on web
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: Platform.OS !== "web", // Don't use native driver on web
      }),
    ]).start();
  }, []);

  const SelectionButton = ({
    title,
    isSelected,
    onPress,
  }: {
    title: string;
    isSelected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      style={[styles.selectionButton, isSelected && styles.selectedButton]}
      onPress={(e) => {
        // Prevent event propagation on web
        if (Platform.OS === "web" && e.preventDefault) {
          e.preventDefault();
        }
        onPress();
      }}
    >
      <Text
        style={[styles.buttonText, isSelected && styles.selectedButtonText]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  const handleCuisineSelection = (cuisine: string) => {
    setSelectedCuisine(cuisine);
  };

  const handleDietSelection = (diet: string) => {
    setSelectedDiet(diet);
  };

  const handleSkillSelection = (skill: string) => {
    setSelectedSkillLevel(skill);
  };

  const handleFindRecipes = () => {
    navigation.navigate("Recipes", {
      cuisine: selectedCuisine,
      diet: selectedDiet,
      skillLevel: selectedSkillLevel,
    });
  };

  const { width } = Dimensions.get("window");

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        }}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <ScrollView contentContainerStyle={styles.container}>
            {Platform.OS === "web" ? (
              <View style={[styles.card]}>
                <View style={styles.header}>
                  <Text style={styles.title}>Culinary Explorer</Text>
                  <Text style={styles.subtitle}>
                    Discover your perfect dish in just a few taps
                  </Text>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Select Your Cuisine</Text>
                  <View
                    style={[styles.buttonContainer, { maxWidth: width * 0.8 }]}
                  >
                    {["Italian", "Mexican", "Asian", "Mediterranean"].map(
                      (cuisine) => (
                        <SelectionButton
                          key={cuisine}
                          title={cuisine}
                          isSelected={selectedCuisine === cuisine}
                          onPress={() => handleCuisineSelection(cuisine)}
                        />
                      )
                    )}
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Dietary Preference</Text>
                  <View
                    style={[styles.buttonContainer, { maxWidth: width * 0.8 }]}
                  >
                    {["Vegetarian", "Vegan", "Gluten-Free"].map((diet) => (
                      <SelectionButton
                        key={diet}
                        title={diet}
                        isSelected={selectedDiet === diet}
                        onPress={() => handleDietSelection(diet)}
                      />
                    ))}
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>
                    Your Cooking Experience
                  </Text>
                  <View
                    style={[styles.buttonContainer, { maxWidth: width * 0.8 }]}
                  >
                    {["Beginner", "Skilled", "Expert"].map((level) => (
                      <SelectionButton
                        key={level}
                        title={level}
                        isSelected={selectedSkillLevel === level}
                        onPress={() => handleSkillSelection(level)}
                      />
                    ))}
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.findButton}
                  onPress={handleFindRecipes}
                >
                  <Text style={styles.findButtonText}>Discover Recipes</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Animated.View
                style={[
                  styles.card,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }],
                  },
                ]}
              >
                <View style={styles.header}>
                  <Text style={styles.title}>Culinary Explorer</Text>
                  <Text style={styles.subtitle}>
                    Discover your perfect dish in just a few taps
                  </Text>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Select Your Cuisine</Text>
                  <View
                    style={[styles.buttonContainer, { maxWidth: width * 0.8 }]}
                  >
                    {["Italian", "Mexican", "Asian", "Mediterranean"].map(
                      (cuisine) => (
                        <SelectionButton
                          key={cuisine}
                          title={cuisine}
                          isSelected={selectedCuisine === cuisine}
                          onPress={() => handleCuisineSelection(cuisine)}
                        />
                      )
                    )}
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Dietary Preference</Text>
                  <View
                    style={[styles.buttonContainer, { maxWidth: width * 0.8 }]}
                  >
                    {["Vegetarian", "Vegan", "Gluten-Free"].map((diet) => (
                      <SelectionButton
                        key={diet}
                        title={diet}
                        isSelected={selectedDiet === diet}
                        onPress={() => handleDietSelection(diet)}
                      />
                    ))}
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>
                    Your Cooking Experience
                  </Text>
                  <View
                    style={[styles.buttonContainer, { maxWidth: width * 0.8 }]}
                  >
                    {["Beginner", "Skilled", "Expert"].map((level) => (
                      <SelectionButton
                        key={level}
                        title={level}
                        isSelected={selectedSkillLevel === level}
                        onPress={() => handleSkillSelection(level)}
                      />
                    ))}
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.findButton}
                  onPress={handleFindRecipes}
                >
                  <Text style={styles.findButtonText}>Discover Recipes</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 24,
    width: "100%",
    maxWidth: 500,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#444",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginHorizontal: -4,
  },
  selectionButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
    minWidth: 90,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#2E7D32",
    borderColor: "#2E7D32",
  },
  buttonText: {
    fontSize: 14,
    color: "#555",
  },
  selectedButtonText: {
    color: "white",
    fontWeight: "500",
  },
  findButton: {
    backgroundColor: "#2E7D32",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 8,
  },
  findButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});

export default HomeScreen;
