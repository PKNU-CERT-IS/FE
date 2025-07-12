"use client";
import { useState } from "react";
import ChevronDownSVG from "/public/icons/angle.svg";
import { cn } from "@/lib/utils";
import DefaultButton from "@/components/ui/defaultButton";

interface DropdownOption {
  value: string;
  label: string;
}

interface MembersDropdownProps<T> {
  value: T;
  onValueChange: (value: T) => void;
  options: DropdownOption[];
  placeholder: string;
  className?: string;
  disabled?: boolean;
}

export default function MembersDropdow<T>({
  value,
  onValueChange,
  options,
  placeholder,
  className,
  disabled = false,
}: MembersDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);
  return (
    <div className={cn("relative", className)}>
      <DefaultButton
        variant="outline"
        size="default"
        className={cn(
          "w-full justify-between text-left font-normal transition-all duration-200 cursor-pointer",
          "border-gray-300 bg-gray-50/50 hover:border-cert-red hover:bg-gray-100   hover:text-cert-black",
          "focus:border-cert-red focus:ring-2 focus:ring-cert-red/20",
          disabled && "cursor-not-allowed opacity-50 bg-cert-dark-red-5"
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className={cn(!selectedOption && "text-gray-400")}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDownSVG
          className={cn(
            "h-4 w-4 opacity-50 transition-transform duration-300 fill-cert-black ",
            isOpen && "rotate-180"
          )}
        />
      </DefaultButton>
      {isOpen && !disabled && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={cn(
              "absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto",
              "rounded-lg border border-gray-200 bg-white shadow-xl"
            )}
          >
            {options.map((option) => (
              <button
                key={option.value as string}
                type="button"
                className={cn(
                  "w-full px-3 py-2 text-left text-sm text-gray-900",
                  "transition-all duration-100",
                  "hover:bg-cert-red hover:text-white",
                  "focus:bg-cert-red",
                  "first:rounded-t-md last:rounded-b-md",
                  "hover:first:rounded-md hover:rounded-md"
                )}
                onClick={() => {
                  onValueChange(option.value as T);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
