"use client";

import useTyping from "@/hooks/useTyping";

export default function TypingAnimation() {
  const { firstText, secondText, cursorLine } = useTyping(
    "Computer Emergency Response Team",
    "Information Security",
  );

  return (
    <div className="h-12 text-lg sm:text-xl text-gray-600 whitespace-pre-line text-center font-mono dark:text-gray-200">
      <div className="animate-pulse">
        {firstText}
        {cursorLine === "firstCursorLine" && (
          <span className="animate-typing text-cert-red">|</span>
        )}
      </div>
      <div className="animate-pulse text-center">
        {secondText}
        {cursorLine === "secondCursorLine" && (
          <span className="animate-typing text-cert-red">|</span>
        )}
      </div>
    </div>
  );
}
