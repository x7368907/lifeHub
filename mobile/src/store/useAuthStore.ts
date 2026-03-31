import { create } from "zustand";

import { api, setAuthToken } from "../api/client";

interface AuthState {
  token: string | null;
  email: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  email: null,
  loading: false,
  error: null,
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const form = new URLSearchParams();
      form.append("username", email);
      form.append("password", password);

      const response = await api.post("/auth/login", form, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      const token = response.data.access_token;
      setAuthToken(token);
      set({ token, email, loading: false });
    } catch (error: any) {
      set({ error: error?.response?.data?.detail ?? "Login failed", loading: false });
    }
  },
  register: async (email, password) => {
    set({ loading: true, error: null });
    try {
      await api.post("/auth/register", { email, password });
      set({ loading: false });
    } catch (error: any) {
      set({ error: error?.response?.data?.detail ?? "Registration failed", loading: false });
    }
  },
  logout: () => {
    setAuthToken(undefined);
    set({ token: null, email: null });
  },
}));
