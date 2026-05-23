// Backend APIs are developed separately using FastAPI.
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";
import { tokenStorage } from "@/api/client";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hydrated: boolean;
  setSession: (user: User, access: string, refresh: string) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
  markHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      hydrated: false,
      setSession: (user, access, refresh) => {
        tokenStorage.set(access, refresh);
        set({ user, isAuthenticated: true });
      },
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      logout: () => {
        tokenStorage.clear();
        set({ user: null, isAuthenticated: false });
      },
      markHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "afc.auth",
      partialize: (s) => ({ user: s.user, isAuthenticated: s.isAuthenticated }),
      onRehydrateStorage: () => (state) => state?.markHydrated(),
    },
  ),
);
