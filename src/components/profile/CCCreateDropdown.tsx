"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import DefaultButton from "@/components/ui/defaultButton";
import { cn } from "@/lib/utils";

export default function CCCreateDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (dropdownRef.current?.contains(target)) {
        return;
      }
      closeDropdown();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeDropdown]);

  return (
    <div className="relative min-w-24" ref={dropdownRef}>
      <DefaultButton
        variant="default"
        size="sm"
        className={cn(
          "w-full justify-between text-left font-normal transition-all duration-200 cursor-pointer",
          "bg-cert-red border-cert-red hover:bg-cert-red/90 text-white",
          "focus:ring-2 focus:ring-cert-red/20"
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <div>새 자료 생성</div>
        </div>
      </DefaultButton>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-20">
          <Link
            href="/study/write"
            className="w-full px-4 py-2 text-left text-gray-900 first:rounded-t-lg text-sm hover:bg-cert-red hover:text-white duration-100 hover:rounded-md items-center gap-2 flex"
            onClick={closeDropdown}
          >
            스터디 생성
          </Link>
          <Link
            href="/project/write"
            className="w-full px-4 py-2 text-left text-gray-900 last:rounded-b-lg text-sm hover:bg-cert-red hover:text-white duration-100 hover:rounded-md items-center gap-2 flex"
            onClick={closeDropdown}
          >
            프로젝트 생성
          </Link>
        </div>
      )}
    </div>
  );
}
