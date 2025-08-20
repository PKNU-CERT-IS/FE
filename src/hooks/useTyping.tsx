"use client";

import { useEffect, useState, useRef } from "react";

export default function useTyping(firstLine: string, secondLine: string) {
  const [firstText, setFirstText] = useState("");
  const [secondText, setSecondText] = useState("");
  const [step, setStep] = useState<"firstStep" | "secondStep" | "isDeleting">(
    "firstStep"
  );
  const [count, setCount] = useState(0);
  const [cursorLine, setCursorLine] = useState<
    "firstCursorLine" | "secondCursorLine"
  >("firstCursorLine");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDuration = 3000;

    if (step === "firstStep") {
      setCursorLine("firstCursorLine");
      if (count < firstLine.length) {
        timeoutRef.current = setTimeout(() => {
          setFirstText((prev) => prev + firstLine[count]);
          setCount((prev) => prev + 1);
        }, typingSpeed);
      } else {
        setStep("secondStep");
        setCount(0);
      }
    }

    if (step === "secondStep") {
      setCursorLine("secondCursorLine");
      if (count < secondLine.length) {
        timeoutRef.current = setTimeout(() => {
          setSecondText((prev) => prev + secondLine[count]);
          setCount((prev) => prev + 1);
        }, typingSpeed);
      } else {
        timeoutRef.current = setTimeout(() => {
          setStep("isDeleting");
          setCount(0);
        }, pauseDuration);
      }
    }

    if (step === "isDeleting") {
      // 삭제 (아래 → 위 순서)
      setCursorLine("secondCursorLine"); // 삭제 중엔 아래 줄 커서
      if (secondText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setSecondText((prev) => prev.slice(0, -1));
        }, deletingSpeed);
      } else if (firstText.length > 0) {
        setCursorLine("firstCursorLine");
        timeoutRef.current = setTimeout(() => {
          setFirstText((prev) => prev.slice(0, -1));
        }, deletingSpeed);
      } else {
        setStep("firstStep");
        setCount(0);
      }
    }

    return () => clearTimeout(timeoutRef.current!);
  }, [count, step, firstText, secondText, firstLine, secondLine]);

  return { firstText, secondText, cursorLine };
}
