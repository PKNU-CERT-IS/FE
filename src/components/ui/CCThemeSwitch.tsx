"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function CCTopButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  // 클라이언트 사이드에서만 렌더링 (SSR hydration mismatch 방지)
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-gray-800 border border-cert-red/40 text-cert-red/70 dark:text-yellow-400 shadow-lg hover:bg-cert-red/20 dark:hover:bg-gray-700 transition-colors cursor-pointer"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}
