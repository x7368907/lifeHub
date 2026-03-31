import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { Card } from "../components/Card";
import { PrimaryButton } from "../components/PrimaryButton";
import { TextField } from "../components/TextField";
import { useExpenseStore } from "../store/useExpenseStore";
import { theme } from "../theme/theme";

const ExpenseScreen = () => {
  const { expenses, summary, fetchExpenses, addExpense, fetchSummary } = useExpenseStore();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchExpenses().catch(() => undefined);
    fetchSummary().catch(() => undefined);
  }, [fetchExpenses, fetchSummary]);

  return (
    <View style={styles.container}>
      <Card>
        <Text style={styles.sectionTitle}>Monthly summary</Text>
        <Text style={styles.summary}>${summary?.total ?? "0"} spent in {summary?.month ?? "N/A"}</Text>
      </Card>

      <View style={styles.form}>
        <TextField value={amount} onChangeText={setAmount} placeholder="Amount" />
        <TextField value={category} onChangeText={setCategory} placeholder="Category" />
        <PrimaryButton
          label="Add Expense"
          onPress={() => {
            if (amount.trim() && category.trim()) {
              addExpense(amount.trim(), category.trim()).catch(() => undefined);
              setAmount("");
              setCategory("");
              fetchSummary().catch(() => undefined);
            }
          }}
        />
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card>
            <View style={styles.row}>
              <Text style={styles.label}>{item.category}</Text>
              <Text style={styles.value}>${item.amount}</Text>
            </View>
          </Card>
        )}
      />
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
  sectionTitle: {
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  summary: {
    color: theme.colors.muted,
  },
  form: {
    gap: theme.spacing.sm,
  },
  list: {
    gap: theme.spacing.sm,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    color: theme.colors.text,
    fontWeight: "500",
  },
  value: {
    color: theme.colors.text,
  },
});

export default ExpenseScreen;
