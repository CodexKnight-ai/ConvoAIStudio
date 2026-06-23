import { create } from "zustand";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000/api";

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signup: (formData: any) => Promise<any>;
  login: (formData: any) => Promise<any>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  isAuthenticated: false,

  signup: async (formData) => {
    set({ loading: true });
    try {
      const res = await axios.post(
        `${API_URL}/v1/auth/register`,
        formData,
        { withCredentials: true }
      );
      if (res.data.user) {
        set({
          user: res.data.user,
          isAuthenticated: true,
          loading: false,
        });
      } else {
        set({ loading: false });
      }
      return res.data;
    } catch (error: any) {
      set({ loading: false });
      throw error;
    }
  },

  login: async (formData) => {
    set({ loading: true });
    try {
      const res = await axios.post(
        `${API_URL}/v1/auth/login`,
        formData,
        { withCredentials: true }
      );
      if (res.data.user) {
        set({
          user: res.data.user,
          isAuthenticated: true,
          loading: false,
        });
      } else {
        set({ loading: false });
      }
      return res.data;
    } catch (error: any) {
      set({ loading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axios.post(
        `${API_URL}/v1/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(
        `${API_URL}/v1/auth/me`,
        { withCredentials: true }
      );
      if (res.data) {
        set({
          user: res.data,
          isAuthenticated: true,
          loading: false,
        });
      } else {
        set({
          user: null,
          isAuthenticated: false,
          loading: false,
        });
      }
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },
}));
