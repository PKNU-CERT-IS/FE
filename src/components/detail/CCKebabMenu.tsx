"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import DefaultButton from "@/components/ui/defaultButton";
import { MoreVertical, Edit, Flag, Trash2 } from "lucide-react";
import ConfirmModal from "@/components/ui/defaultConfirmModal";

interface KebabMenuProps {
  currentId: number;
  currentUrl: string;
}

export default function KebabMenu({ currentId, currentUrl }: KebabMenuProps) {
  const router = useRouter();
  const [isKebabOpen, setIsKebabOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const kebabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (kebabRef.current && !kebabRef.current.contains(e.target as Node)) {
        setIsKebabOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteClick = () => {
    setIsKebabOpen(false); // 케밥 메뉴 닫기
    setIsDeleteModalOpen(true); // 삭제 확인 모달 열기
  };

  const handleDeleteConfirm = () => {
    // API 호출: await fetch(`/api/posts/${currentId}`, { method: 'DELETE' })
    setIsDeleteModalOpen(false);
    router.push(`/${currentUrl}`);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleReport = () => {
    alert("신고");
    setIsKebabOpen(false);
  };

  const handleEdit = () => {
    router.push(`/${currentUrl}/${currentId}/edit`);
  };

  return (
    <>
      <div className="relative" ref={kebabRef}>
        <DefaultButton
          variant="outline"
          size="sm"
          className="cursor-pointer border-0 hover:bg-white hover:text-cert-dark-red"
          onClick={() => setIsKebabOpen(!isKebabOpen)}
        >
          <MoreVertical className="w-4 h-4" />
        </DefaultButton>

        {isKebabOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <div className="p-1">
              <button
                onClick={handleEdit}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2 no-underline text-gray-700"
              >
                <Edit className="w-4 h-4" />
                수정
              </button>
              <button
                onClick={handleReport}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2"
              >
                <Flag className="w-4 h-4" />
                신고
              </button>
              <hr className="my-1" />
              <button
                onClick={handleDeleteClick}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2 text-red-600"
              >
                <Trash2 className="w-4 h-4" />
                삭제
              </button>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="주의"
        message="정말 삭제하시겠습니까?"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmText="예"
        cancelText="아니오"
      />
    </>
  );
}
