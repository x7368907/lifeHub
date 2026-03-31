import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { Card } from "../components/Card";
import { PrimaryButton } from "../components/PrimaryButton";
import { TextField } from "../components/TextField";
import { useTaskStore } from "../store/useTaskStore";
import { theme } from "../theme/theme";

const TaskScreen = () => {
  const { tasks, fetchTasks, addTask, toggleTask, deleteTask } = useTaskStore();
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks().catch(() => undefined);
  }, [fetchTasks]);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextField value={title} onChangeText={setTitle} placeholder="New task" />
        <PrimaryButton
          label="Add Task"
          onPress={() => {
            if (title.trim()) {
              addTask(title.trim()).catch(() => undefined);
              setTitle("");
            }
          }}
        />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card>
            <View style={styles.taskRow}>
              <Pressable onPress={() => toggleTask(item.id, !item.completed).catch(() => undefined)}>
                <Text style={[styles.taskTitle, item.completed && styles.taskDone]}>{item.title}</Text>
              </Pressable>
              <Pressable onPress={() => deleteTask(item.id).catch(() => undefined)}>
                <Text style={styles.delete}>Delete</Text>
              </Pressable>
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
  },
  form: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  list: {
    gap: theme.spacing.sm,
  },
  taskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  taskTitle: {
    color: theme.colors.text,
    fontSize: 16,
  },
  taskDone: {
    textDecorationLine: "line-through",
    color: theme.colors.muted,
  },
  delete: {
    color: "#DC2626",
    fontWeight: "600",
  },
});

export default TaskScreen;
