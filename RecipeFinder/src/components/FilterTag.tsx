import React from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";

interface FilterTagProps extends PressableProps {
  label: string;
  isSelected?: boolean;
  style?: StyleProp<ViewStyle>;
}

const FilterTag: React.FC<FilterTagProps> = ({
  label,
  isSelected = false,
  onPress,
  style,
  ...props
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.tagItem,
        isSelected && styles.selectedTagItem,
        pressed && styles.pressed,
        style,
      ]}
      onPress={onPress}
      {...props}
    >
      <Text style={[styles.tagText, isSelected && styles.selectedTagText]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
  pressed: {
    opacity: 0.7,
  },
  tagText: {
    fontSize: 14,
    color: "#555",
  },
  selectedTagText: {
    color: "white",
    fontWeight: "500",
  },
});

export default FilterTag;
