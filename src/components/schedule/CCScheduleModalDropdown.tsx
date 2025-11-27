"use client";

import { RefObject, useMemo } from "react";
import React from "react";
import { cn } from "@/lib/utils";
import DefaultButton from "@/components/ui/defaultButton";
import { ChevronDown } from "lucide-react";

interface CCScheduleModalDropdownProps {
  label: string;
  selectedValue: string;
  options: string[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
  dropdownRef?: RefObject<HTMLDivElement | null>;
}

function CCScheduleModalDropdown({
  label,
  selectedValue,
  options,
  isOpen,
  onToggle,
  onSelect,
  dropdownRef,
}: CCScheduleModalDropdownProps) {
  const optionList = useMemo(() => {
    return options.map((item) => (
      <button
        key={item}
        onClick={() => onSelect(item)}
        className="text-sm items-center flex h-10 w-full rounded-md px-3 py-2 
                   text-gray-900 dark:text-gray-200 
                   hover:bg-cert-red hover:text-white dark:hover:bg-cert-red 
                   duration-100 cursor-pointer"
      >
        {item}
      </button>
    ));
  }, [options, onSelect]);

  return (
    <div className="relative" ref={dropdownRef}>
      <p className="text-sm mb-1.5 dark:text-gray-200">{label}</p>
      <DefaultButton
        variant="outline"
        size="default"
        className={cn(
          "w-full justify-between text-left font-normal transition-all duration-200 cursor-pointer  z-30",
          "bg-white border-gray-300 hover:border-cert-red hover:bg-white hover:text-cert-black",
          "focus:border-cert-red focus:ring-2 focus:ring-cert-red/20",
          "dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-800",
        )}
        onClick={onToggle}
      >
        <span className="text-gray-700 dark:text-gray-200 truncate">
          {selectedValue}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 text-gray-400 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </DefaultButton>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-10 bg-white border border-gray-300 shadow-md max-h-48 overflow-y-auto rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200">
          {optionList}
        </div>
      )}
    </div>
  );
}
export default React.memo(CCScheduleModalDropdown);
