"use client";

import DefaultButton from "@/components/ui/defaultButton";
import ConfirmModal from "@/components/ui/defaultConfirmModal";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteBlog } from "@/app/api/blog/CCblogApi";
import { useRouter } from "next/navigation";
interface CCBlogDeleteButtonProps {
  postId: number;
}

export default function CCBlogDeleteButton({
  postId,
}: CCBlogDeleteButtonProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const router = useRouter();

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // ★ 링크 네비 차단
    setIsOpenModal(true);
  };

  const closeModal = () => setIsOpenModal(false);

  const handleConfirmDelete = async () => {
    // 삭제 API 호출
    await deleteBlog({ blogId: postId });
    router.refresh();
    setIsOpenModal(false);
    console.log(postId, "삭제");
  };

  return (
    <>
      <DefaultButton
        size="sm"
        className="z-10 bg-white border border-cert-red/50 text-cert-red hover:bg-cert-red/20 duration-300 dark:bg-gray-700"
        type="button"
        onClick={openModal}
      >
        <Trash2 className="w-4 h-4 mr-1" />
        삭제
      </DefaultButton>
      <ConfirmModal
        isOpen={isOpenModal}
        title="게시글 삭제"
        message="정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        confirmText="삭제"
        cancelText="취소"
        onConfirm={handleConfirmDelete}
        onCancel={closeModal}
      />
    </>
  );
}
