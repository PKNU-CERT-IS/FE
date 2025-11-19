"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { AttachedFile } from "@/types/attachedFile";
import { endProject } from "@/app/api/project/CCProjectApi";
import { endStudy } from "@/app/api/study/CCStudyApi";
import DefaultButton from "@/components/ui/defaultButton";
import ConfirmModal from "@/components/ui/defaultConfirmModal";

export default function EndRequestButton({ id }: { id: number }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tab = (searchParams.get("tab") || "").toLowerCase();
  const pageType: "study" | "project" =
    tab === "study" || tab === "project"
      ? (tab as "study" | "project")
      : pathname.startsWith("/admin/study") || pathname.startsWith("/study")
        ? "study"
        : "project";

  const pageLabel = pageType === "study" ? "스터디" : "프로젝트";

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpenModal(true);
  };

  const closeModal = () => setIsOpenModal(false);

  const handleEndRequest = async (attachment: AttachedFile) => {
    if (submitting) return;
    setSubmitting(true);

    try {
      if (!attachment) {
        alert("파일을 업로드해야 합니다.");
        return;
      }

      if (pageType === "study") {
        await endStudy(id, {
          id: attachment.id,
          name: attachment.name,
          type: attachment.type,
          size: attachment.size,
          attachedUrl: attachment.attachedUrl,
        });
      } else {
        await endProject(id, {
          id: attachment.id,
          name: attachment.name,
          type: attachment.type,
          size: attachment.size,
          attachedUrl: attachment.attachedUrl,
        });
      }

      setIsOpenModal(false);
    } catch (err) {
      alert(`${pageLabel} 종료 요청에 실패했습니다.`);
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <DefaultButton
        onClick={openModal}
        disabled={submitting}
        className="px-6 py-2 w-full bg-white text-cert-red hover:text-white hover:bg-cert-red dark:bg-gray-800 rounded-lg shadow-lg border border-cert-red/50 dark:text-gray-200 cursor-pointer"
      >
        {pageLabel} 종료하기
      </DefaultButton>

      <ConfirmModal
        isOpen={isOpenModal}
        type="endConfirm"
        title={`${pageLabel} 종료하기`}
        message={`${pageLabel}의 결과물과 후기를 반드시 제출해주세요.`}
        confirmText={submitting ? "제출 중..." : "제출"}
        cancelText="취소"
        onEndConfirm={handleEndRequest}
        onCancel={closeModal}
        pageLabel={pageLabel}
      />
    </>
  );
}
