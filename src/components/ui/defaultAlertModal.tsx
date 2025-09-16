"use client";

import { useEffect } from "react";
import { AlertTriangle, CheckCircle2, X } from "lucide-react";

interface AlertModalProps {
  isOpen: boolean;
  message: string;
  type?: "error" | "success" | "warning";
  duration?: number;
  onClose: () => void;
}

export default function AlertModal({
  isOpen,
  message,
  type = "error",
  duration = 3000,
  onClose,
}: AlertModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const icon =
    type === "success" ? (
      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
    ) : (
      <AlertTriangle className="w-5 h-5 text-cert-red" />
    );

  return (
    <div
      className={`fixed top-6 right-6 z-50 flex items-center gap-3 rounded-lg shadow-lg px-4 py-3 text-white animate-fade-in-out
      ${type === "success" ? "bg-green-100" : "bg-red-50"}`}
    >
      {icon}
      <p className="text-sm text-gray-800 dark:text-gray-200">{message}</p>
      <button
        onClick={onClose}
        className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
