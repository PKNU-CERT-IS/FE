"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import DefaultButton from "@/components/ui/defaultButton";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import ConfirmModal from "@/components/ui/defaultConfirmModal";
import { deleteBoard } from "@/api/board/CCboard";
import AlertModal from "../ui/defaultAlertModal";

interface KebabMenuProps {
  currentId: number;
  currentUrl: string;
}

export default function KebabMenu({ currentId, currentUrl }: KebabMenuProps) {
  const router = useRouter();
  const [isKebabOpen, setIsKebabOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const kebabRef = useRef<HTMLDivElement>(null);
  const [alertOpen, setAlertOpen] = useState(false);

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

  const handleDeleteConfirm = async () => {
    try {
      await deleteBoard(currentId);
      router.replace(`/${currentUrl}`);
      router.refresh();
    } catch (error) {
      setAlertOpen(true);
      throw error;
    }
    setIsDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
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
          className="cursor-pointer border-0 hover:bg-white hover:text-cert-dark-red dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
          onClick={() => setIsKebabOpen(!isKebabOpen)}
        >
          <MoreVertical className="w-4 h-4" />
        </DefaultButton>

        {isKebabOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200">
            <div className="p-1">
              <button
                onClick={handleEdit}
                className="w-full text-left px-3 py-2 text-sm rounded flex items-center gap-2 no-underline text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-cert-red duration-200 cursor-pointer"
              >
                <Edit className="w-4 h-4" />
                수정
              </button>
              <hr className="my-1 border-gray-300 dark:border-gray-600" />
              <button
                onClick={handleDeleteClick}
                className="w-full text-left px-3 py-2 text-sm rounded flex items-center gap-2 text-cert-red hover:bg-gray-100 dark:hover:bg-cert-red duration-200 cursor-pointer dark:hover:text-gray-200"
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
      <AlertModal
        isOpen={alertOpen}
        message="게시글 삭제에 실패하셨습니다."
        type="warning"
        duration={2500}
        onClose={() => setAlertOpen(false)}
      />
    </>
  );
}
