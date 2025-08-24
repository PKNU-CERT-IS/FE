"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, X } from "lucide-react";
import DefaultButton from "@/components/ui/defaultButton";
import FileUpload from "@/components/write/CCFileUpload";
import { AttachedFile } from "@/types/attachedFile";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: (attachments: AttachedFile[], link: string) => void;
  onCancel: () => void;
  confirmText: string;
  cancelText: string;
  type?: "confirm" | "endConfirm";
  pageLabel?: string;
}

export default function ConfirmModal({
  isOpen,
  title = "확인",
  message,
  onConfirm,
  onCancel,
  confirmText = "예",
  cancelText = "아니오",
  type = "confirm",
  pageLabel,
}: ConfirmModalProps) {
  const [attachments, setAttachments] = useState<AttachedFile[]>([]);
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // 모달 열릴 때 스크롤 방지
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const isEnd = type === "endConfirm";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 bg-opacity-50 transition-opacity"
        onClick={onCancel}
      />

      <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 아이콘 */}
        <div
          className={`flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full ${
            isEnd ? "bg-emerald-100" : "bg-cert-dark-red/20"
          }`}
        >
          {isEnd ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-cert-red" />
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 text-center mb-6">{message}</p>

        {/* 종료 시 제출 폼 */}
        {isEnd && (
          <div className="space-y-4 pb-6">
            <FileUpload
              attachedFiles={attachments}
              onAttachmentsChange={setAttachments}
              className="py-3"
            />
            <p className="text-sm text-gray-700 text-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSd7fLE7rxJng5uFPsz7NmxIj7xp-7gwgJsNAJZ2_484mvM3GQ/viewform?pli=1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cert-red font-semibold underline underline-offset-2 hover:text-cert-dark-red transition-colors"
              >
                {pageLabel} 후기 작성하기 →
              </a>
            </p>
          </div>
        )}

        {/* 버튼 */}
        <div className="flex items-center justify-center gap-3">
          <DefaultButton
            variant="outline"
            onClick={onCancel}
            className="px-4 py-2 min-w-[80px]"
          >
            {cancelText}
          </DefaultButton>
          <DefaultButton
            variant="default"
            onClick={() => onConfirm(attachments, link)}
            className="px-4 py-2 min-w-[80px]"
          >
            {confirmText}
          </DefaultButton>
        </div>
      </div>
    </div>
  );
}
