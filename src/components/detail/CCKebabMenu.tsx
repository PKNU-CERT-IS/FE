"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { deleteBlog } from "@/app/api/blog/CCblogApi";
import { deleteBoard } from "@/app/api/board/CCboardApi";
import { deleteProject } from "@/app/api/project/CCProjectApi";
import { deleteStudy } from "@/app/api/study/CCStudyApi";
import AlertModal from "@/components/ui/defaultAlertModal";
import DefaultButton from "@/components/ui/defaultButton";
import ConfirmModal from "@/components/ui/defaultConfirmModal";
import { Edit, MoreVertical, Trash2 } from "lucide-react";

interface KebabMenuProps {
  currentId: number;
  currentUrl: string;
  isAdmin?: boolean; // 수정후 어드민 페이지리다이렉팅을 위한 boolean값
}

export default function KebabMenu({
  currentId,
  currentUrl,
  isAdmin,
}: KebabMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
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
      switch (true) {
        case currentUrl.startsWith("board"):
          await deleteBoard(currentId);
          break;
        case currentUrl.startsWith("blog"):
          await deleteBlog({ blogId: currentId });
          break;
        case currentUrl.startsWith("study"):
          await deleteStudy(currentId);
          break;
        case currentUrl.startsWith("project"):
          await deleteProject(currentId);
          break;
        default:
          throw new Error("알 수 없는 도메인입니다.");
      }

      // admin 여부에 따라 분기
      if (isAdmin) {
        if (currentUrl.startsWith("study")) {
          router.push("/admin/study?tab=study");
        } else if (currentUrl.startsWith("project")) {
          router.push("/admin/study?tab=project&view=list");
        } else if (currentUrl.startsWith("blog")) {
          router.push("/admin/blog");
        } else {
          router.push("/admin");
        }
      } else {
        router.push(`/${currentUrl}`);
      }
    } catch (error) {
      setAlertOpen(true); //  실패 시 알림
      throw error;
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEdit = () => {
    const isAdmin = pathname.startsWith("/admin");

    if (isAdmin) {
      if (currentUrl === "study") {
        router.push(`/admin/study/${currentId}/edit?tab=study`);
      } else if (currentUrl === "project") {
        router.push(`/admin/study/${currentId}/edit?tab=project`);
      } else {
        router.push(`/${currentUrl}/${currentId}/edit?from=admin`);
      }
    } else {
      router.push(`/${currentUrl}/${currentId}/edit`);
    }
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
