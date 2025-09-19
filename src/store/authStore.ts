import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isLogin: boolean;
  role: string | null;
  setAuth: (isLogin: boolean, role: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogin: false,
      role: null,
      setAuth: (isLogin, role) => set({ isLogin, role }),
      logout: () => set({ isLogin: false, role: null }),
    }),
    {
      name: "auth-storage", // 로컬스토리지 키 이름
    }
  )
);
