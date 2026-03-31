import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { Card } from "../components/Card";
import { useExpenseStore } from "../store/useExpenseStore";
import { useTaskStore } from "../store/useTaskStore";
import { theme } from "../theme/theme";

const DashboardScreen = () => {
  const { tasks, fetchTasks } = useTaskStore();
  const { summary, fetchSummary } = useExpenseStore();

  useEffect(() => {
    fetchTasks().catch(() => undefined);
    fetchSummary().catch(() => undefined);
  }, [fetchTasks, fetchSummary]);

  const completed = tasks.filter((task) => task.completed).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Today at a glance</Text>
      <View style={styles.grid}>
        <Card>
          <Text style={styles.label}>Tasks completed</Text>
          <Text style={styles.value}>{completed}</Text>
        </Card>
        <Card>
          <Text style={styles.label}>Open tasks</Text>
          <Text style={styles.value}>{tasks.length - completed}</Text>
        </Card>
        <Card>
          <Text style={styles.label}>Monthly spend</Text>
          <Text style={styles.value}>${summary?.total ?? "0"}</Text>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  heading: {
    fontSize: 22,
    fontWeight: "600",
    color: theme.colors.text,
  },
  grid: {
    gap: theme.spacing.md,
  },
  label: {
    color: theme.colors.muted,
    marginBottom: theme.spacing.xs,
  },
  value: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.colors.text,
  },
});

export default DashboardScreen;
