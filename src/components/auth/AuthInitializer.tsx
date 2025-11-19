"use client";

import { useEffect } from "react";
import { apiClient } from "@/lib/clientIntercept";
import { useAuthStore } from "@/store/authStore";

export default function AuthInitializer() {
  const { setAuth, logout } = useAuthStore();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await apiClient.get("/profile/me");
        const { data } = res.data;
        setAuth(true, data.memberRole);
      } catch {
        logout();
      }
    }
    checkAuth();
  }, [setAuth, logout]);

  return null;
}
