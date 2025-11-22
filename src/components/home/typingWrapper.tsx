"use client";

import dynamic from "next/dynamic";

const TypingAnimation = dynamic(
  () => import("@/components/home/typingAnimation"),
  {
    ssr: false,
  },
);

export default function TypingWrapper() {
  return <TypingAnimation />;
}
