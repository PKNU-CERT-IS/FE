"use client";

import { ReactNode } from "react";

export default function ClipboardButton({
  text,
  tooltip,
  className,
  children,
}: {
  text: string;
  tooltip?: string;
  className?: string;
  children: ReactNode;
}) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("클립보드 복사 실패:", err);
    }
  };

  return (
    <div className="relative flex items-center justify-center group/clip">
      <button
        onClick={copy}
        className={`h-8 w-8 flex items-center justify-center transition-colors duration-300 cursor-pointer ${className}`}
      >
        {children}
      </button>

      {/* Tooltip */}
      {tooltip && (
        <span
          className="
            absolute bottom-full left-1/2 -translate-x-1/2 mb-2
            px-2 py-1 text-xs whitespace-nowrap
            rounded bg-gray-800 text-white shadow
            opacity-0 group-hover/clip:opacity-100
            transition-all duration-200 pointer-events-none z-10
          "
        >
          {tooltip}
        </span>
      )}
    </div>
  );
}
