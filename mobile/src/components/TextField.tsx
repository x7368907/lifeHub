import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import { theme } from "../theme/theme";

interface TextFieldProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
}

export const TextField = ({ value, onChangeText, placeholder, secureTextEntry }: TextFieldProps) => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.muted}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  input: {
    padding: theme.spacing.sm,
    color: theme.colors.text,
  },
});
