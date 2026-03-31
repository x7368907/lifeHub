import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Card } from "../components/Card";
import { PrimaryButton } from "../components/PrimaryButton";
import { api } from "../api/client";
import { theme } from "../theme/theme";

const AIScreen = () => {
  const [plan, setPlan] = useState<string | null>(null);

  const fetchPlan = async () => {
    const response = await api.post("/ai/plan");
    setPlan(response.data.plan);
  };

  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.title}>AI Daily Planner</Text>
        <Text style={styles.subtitle}>Generate a focused plan based on your day.</Text>
        <PrimaryButton label="Generate Plan" onPress={() => fetchPlan().catch(() => undefined)} />
      </Card>

      {plan ? (
        <Card>
          <Text style={styles.plan}>{plan}</Text>
        </Card>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    color: theme.colors.muted,
    marginBottom: theme.spacing.md,
  },
  plan: {
    color: theme.colors.text,
    lineHeight: 22,
  },
});

export default AIScreen;
