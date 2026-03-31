import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { Card } from "../components/Card";
import { PrimaryButton } from "../components/PrimaryButton";
import { TextField } from "../components/TextField";
import { useAuthStore } from "../store/useAuthStore";
import { theme } from "../theme/theme";

const LoginScreen = () => {
  const { login, register, loading, error } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to sync your tasks and expenses.</Text>

        <View style={styles.stack}>
          <TextField value={email} onChangeText={setEmail} placeholder="Email" />
          <TextField value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}
        {loading ? <ActivityIndicator color={theme.colors.primary} /> : null}

        <View style={styles.actions}>
          <PrimaryButton label="Login" onPress={() => login(email, password)} />
          <PrimaryButton label="Create account" onPress={() => register(email, password)} />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: theme.colors.text,
  },
  subtitle: {
    color: theme.colors.muted,
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
  stack: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  actions: {
    gap: theme.spacing.sm,
  },
  error: {
    color: "#DC2626",
    marginBottom: theme.spacing.sm,
  },
});

export default LoginScreen;
