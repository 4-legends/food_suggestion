import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Animated,
  Dimensions,
  ScrollView,
  Modal,
  FlatList,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

// Array of available cuisines
const CUISINES = [
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
];

// Array of dietary options
const DIETS = ["Vegetarian", "Vegan", "Gluten-Free"];

// Array of skill levels
const SKILL_LEVELS = ["Beginner", "Skilled", "Expert"];

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [selectedCuisine, setSelectedCuisine] = useState("Mediterranean");
  const [selectedDiet, setSelectedDiet] = useState("Vegan");
  const [selectedSkillLevel, setSelectedSkillLevel] = useState("Beginner");
  const [cuisineDropdownVisible, setCuisineDropdownVisible] = useState(false);
  const [dietDropdownVisible, setDietDropdownVisible] = useState(false);
  const [skillDropdownVisible, setSkillDropdownVisible] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: Platform.OS !== "web",
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: Platform.OS !== "web",
      }),
    ]).start();
  }, []);

  const handleFindRecipes = () => {
    navigation.navigate("Recipes", {
      cuisine: selectedCuisine,
      diet: selectedDiet,
      skillLevel: selectedSkillLevel,
    });
  };

  const handleOptionSelect = (
    value: string,
    type: "cuisine" | "diet" | "skill"
  ) => {
    switch (type) {
      case "cuisine":
        setSelectedCuisine(value);
        setCuisineDropdownVisible(false);
        break;
      case "diet":
        setSelectedDiet(value);
        setDietDropdownVisible(false);
        break;
      case "skill":
        setSelectedSkillLevel(value);
        setSkillDropdownVisible(false);
        break;
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1505935428862-770b6f24f629?ixlib=rb-1.2.1&auto=format&fit=crop&w=1347&q=80",
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.card,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.title}>Culinary Explorer</Text>
            <Text style={styles.subtitle}>
              Discover your perfect dish in just a few taps
            </Text>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Select Your Cuisine</Text>
              <TouchableOpacity
                style={styles.dropdownSelector}
                onPress={() => setCuisineDropdownVisible(true)}
              >
                <Text style={styles.dropdownSelectorText}>
                  {selectedCuisine}
                </Text>
                <Text style={styles.dropdownIcon}>▼</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Dietary Preference</Text>
              <TouchableOpacity
                style={styles.dropdownSelector}
                onPress={() => setDietDropdownVisible(true)}
              >
                <Text style={styles.dropdownSelectorText}>{selectedDiet}</Text>
                <Text style={styles.dropdownIcon}>▼</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Your Cooking Experience</Text>
              <TouchableOpacity
                style={styles.dropdownSelector}
                onPress={() => setSkillDropdownVisible(true)}
              >
                <Text style={styles.dropdownSelectorText}>
                  {selectedSkillLevel}
                </Text>
                <Text style={styles.dropdownIcon}>▼</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.findButton}
              onPress={handleFindRecipes}
            >
              <Text style={styles.findButtonText}>Discover Recipes</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>

        {/* Modals */}
        <Modal
          visible={cuisineDropdownVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setCuisineDropdownVisible(false)}
        >
          <View style={[styles.modalOverlay, { pointerEvents: "auto" }]}>
            <View style={styles.dropdownListContainer}>
              <View style={styles.dropdownHeader}>
                <Text style={styles.dropdownTitle}>Select Cuisine</Text>
                <TouchableOpacity
                  onPress={() => setCuisineDropdownVisible(false)}
                >
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={CUISINES}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.dropdownItem,
                      selectedCuisine === item && styles.dropdownItemSelected,
                    ]}
                    onPress={() => handleOptionSelect(item, "cuisine")}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        selectedCuisine === item &&
                          styles.dropdownItemTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                    {selectedCuisine === item && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        <Modal
          visible={dietDropdownVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setDietDropdownVisible(false)}
        >
          <View style={[styles.modalOverlay, { pointerEvents: "auto" }]}>
            <View style={styles.dropdownListContainer}>
              <View style={styles.dropdownHeader}>
                <Text style={styles.dropdownTitle}>Select Diet</Text>
                <TouchableOpacity onPress={() => setDietDropdownVisible(false)}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={DIETS}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.dropdownItem,
                      selectedDiet === item && styles.dropdownItemSelected,
                    ]}
                    onPress={() => handleOptionSelect(item, "diet")}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        selectedDiet === item &&
                          styles.dropdownItemTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                    {selectedDiet === item && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        <Modal
          visible={skillDropdownVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setSkillDropdownVisible(false)}
        >
          <View style={[styles.modalOverlay, { pointerEvents: "auto" }]}>
            <View style={styles.dropdownListContainer}>
              <View style={styles.dropdownHeader}>
                <Text style={styles.dropdownTitle}>Select Skill Level</Text>
                <TouchableOpacity
                  onPress={() => setSkillDropdownVisible(false)}
                >
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={SKILL_LEVELS}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.dropdownItem,
                      selectedSkillLevel === item &&
                        styles.dropdownItemSelected,
                    ]}
                    onPress={() => handleOptionSelect(item, "skill")}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        selectedSkillLevel === item &&
                          styles.dropdownItemTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                    {selectedSkillLevel === item && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    width: Dimensions.get("window").width,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
    ...(Platform.OS === "web"
      ? {
          boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
        }
      : {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 5,
        }),
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#2E7D32",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  optionsContainer: {
    marginBottom: 8,
  },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -6,
  },
  optionButton: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: "#2E7D32",
    borderColor: "#2E7D32",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  selectedOptionText: {
    color: "white",
    fontWeight: "500",
  },
  findButton: {
    backgroundColor: "#2E7D32",
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 12,
  },
  findButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  optionsContentContainer: {
    paddingVertical: 4,
    paddingRight: 16,
  },
  pressedOption: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  dropdownSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
  },
  dropdownSelectorText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownIcon: {
    fontSize: 14,
    color: "#666",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownListContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    width: "90%",
    maxWidth: 340,
    maxHeight: "70%",
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    padding: 16,
  },
  dropdownTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    fontSize: 18,
    color: "#666",
    padding: 4,
  },
  dropdownItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dropdownItemSelected: {
    backgroundColor: "#f0f9f0",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
  dropdownItemTextSelected: {
    color: "#2E7D32",
    fontWeight: "600",
  },
  checkmark: {
    color: "#2E7D32",
    fontSize: 18,
  },
});

export default HomeScreen;
