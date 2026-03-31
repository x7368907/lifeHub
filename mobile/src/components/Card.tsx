import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

import { theme } from "../theme/theme";

interface CardProps {
  children: ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    ...theme.shadow,
  },
});
