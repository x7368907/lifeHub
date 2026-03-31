import { create } from "zustand";

import { api } from "../api/client";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  fetchTasks: () => Promise<void>;
  addTask: (title: string) => Promise<void>;
  toggleTask: (id: number, completed: boolean) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: false,
  fetchTasks: async () => {
    set({ loading: true });
    const response = await api.get("/tasks");
    set({ tasks: response.data, loading: false });
  },
  addTask: async (title) => {
    const response = await api.post("/tasks", { title });
    set({ tasks: [response.data, ...get().tasks] });
  },
  toggleTask: async (id, completed) => {
    const response = await api.patch(`/tasks/${id}`, { completed });
    set({ tasks: get().tasks.map((task) => (task.id === id ? response.data : task)) });
  },
  deleteTask: async (id) => {
    await api.delete(`/tasks/${id}`);
    set({ tasks: get().tasks.filter((task) => task.id !== id) });
  },
}));
