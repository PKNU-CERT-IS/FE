"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function CCTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100); // 300px 이상 스크롤하면 버튼 표시
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white border border-cert-red/40 text-cert-red/70 shadow-lg hover:bg-cert-red/20 transition-colors"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
