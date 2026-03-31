import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Card } from "../components/Card";
import { PrimaryButton } from "../components/PrimaryButton";
import LoginScreen from "./LoginScreen";
import { useAuthStore } from "../store/useAuthStore";
import { theme } from "../theme/theme";

const ProfileScreen = () => {
  const { token, email, logout } = useAuthStore();

  if (!token) {
    return <LoginScreen />;
  }

  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.email}>{email}</Text>
        <PrimaryButton label="Logout" onPress={logout} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  email: {
    color: theme.colors.muted,
    marginBottom: theme.spacing.md,
  },
});

export default ProfileScreen;
