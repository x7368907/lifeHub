import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import { theme } from "../theme/theme";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
}

export const PrimaryButton = ({ label, onPress }: PrimaryButtonProps) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    alignItems: "center",
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
