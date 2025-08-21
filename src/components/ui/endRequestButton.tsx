"use client";

import { useState } from "react";
import DefaultButton from "@/components/ui/defaultButton";
import ConfirmModal from "@/components/ui/defaultConfirmModal";
import type { AttachedFile } from "@/types/attachedFile";
import { usePathname, useSearchParams } from "next/navigation";

export default function EndRequestButton({ id }: { id: number | string }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tab = (searchParams.get("tab") || "").toLowerCase();
  const pageType: "study" | "project" =
    tab === "study" || tab === "project"
      ? (tab as "study" | "project")
      : pathname.startsWith("/admin/study")
      ? "study"
      : "project";

  const pageLabel = pageType === "study" ? "스터디" : "프로젝트";

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpenModal(true);
  };
  const closeModal = () => setIsOpenModal(false);

  // ConfirmModal이 onConfirm(attachments, link)로 호출해줌
  const handleEndRequest = async (
    attachments: AttachedFile[],
    link: string
  ) => {
    if (submitting) return;
    setSubmitting(true);
    console.log(id, attachments, link);
    try {
      // api 요청
      // 성공 처리
      setIsOpenModal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <DefaultButton
        onClick={openModal}
        disabled={submitting}
        className="px-6 py-2 w-full bg-white text-cert-red hover:text-white hover:bg-cert-red dark:bg-gray-800 rounded-lg shadow-lg border border-cert-red/50 dark:border-gray-700 cursor-pointer"
      >
        {pageLabel} 종료하기
      </DefaultButton>

      <ConfirmModal
        isOpen={isOpenModal}
        type="endConfirm"
        title={`${pageLabel} 종료하기`}
        message={`${pageLabel}의 결과물과 구글폼 링크를 제출해주세요.`}
        confirmText={submitting ? "제출 중..." : "제출"}
        cancelText="취소"
        onConfirm={handleEndRequest}
        onCancel={closeModal}
      />
    </>
  );
}
