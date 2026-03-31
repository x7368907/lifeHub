import { create } from "zustand";

import { api } from "../api/client";

export interface Expense {
  id: number;
  amount: string;
  category: string;
  created_at: string;
}

export interface ExpenseSummary {
  month: string;
  total: string;
  by_category: Record<string, string>;
}

interface ExpenseState {
  expenses: Expense[];
  summary: ExpenseSummary | null;
  loading: boolean;
  fetchExpenses: () => Promise<void>;
  addExpense: (amount: string, category: string) => Promise<void>;
  fetchSummary: () => Promise<void>;
}

export const useExpenseStore = create<ExpenseState>((set, get) => ({
  expenses: [],
  summary: null,
  loading: false,
  fetchExpenses: async () => {
    set({ loading: true });
    const response = await api.get("/expenses");
    set({ expenses: response.data, loading: false });
  },
  addExpense: async (amount, category) => {
    const response = await api.post("/expenses", { amount, category });
    set({ expenses: [response.data, ...get().expenses] });
  },
  fetchSummary: async () => {
    const response = await api.get("/expenses/summary");
    set({ summary: response.data });
  },
}));
