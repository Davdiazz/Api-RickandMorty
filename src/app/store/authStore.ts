import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface User {
  username: string;
  password: string;
  email: string;
  role: string;
  loginDate: string;
}

interface AuthStore {
  user: User | null;
  logged: boolean;
  login: (userData: Omit<User, "loginDate" | "role">) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: {
        username: "DefaultUser",
        email: "default@example.com",
        password: "12345",
        loginDate: new Date().toISOString(),
        role: "user",
      },
      logged: false,

      login: (userData) =>
        set(() => ({
          user: {
            ...userData,
            loginDate: new Date().toISOString(),
            role: "user",
          },
          logged: true,
        })),

      logout: () =>
        set(() => ({
          user: null,
          logged: false,
        })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
