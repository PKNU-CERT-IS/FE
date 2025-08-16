"use client";

import { useState } from "react";
import DefaultButton from "@/components/ui/defaultButton";
import ConfirmModal from "@/components/ui/defaultConfirmModal";
import type { AttachedFile } from "@/types/attachedFile";
import { usePathname } from "next/navigation";

export default function EndRequestButton({ id }: { id: number | string }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const pathname = usePathname();
  const pageType = pathname.startsWith("/study") ? "스터디" : "프로젝트";

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
      //   const fd = new FormData();

      //   // AttachedFile -> 원본 File 객체를 넣어두셨다면 그걸 사용
      //   // (convertFileToAttachedFile에서 file 필드에 보관했다고 가정)
      //   for (const af of attachments) {
      //     const anyAf = af as any;
      //     const fileObj: File | undefined = anyAf.file;
      //     if (fileObj) {
      //       fd.append("attachments", fileObj, af.name);
      //     } else {
      //       // 만약 원본 File 보관을 안했다면, 백엔드 규격에 맞는 대체 로직 추가 필요
      //       // 예: fd.append("attachmentNames", af.name)
      //     }
      //   }
      //   fd.append("link", link);

      //   const res = await fetch(`/api/studies/${studyId}/end-request`, {
      //     method: "POST",
      //     body: fd,
      //   });

      //   if (!res.ok) {
      //     const msg = await res.text().catch(() => "");
      //     throw new Error(msg || `요청 실패 (${res.status})`);
      //   }

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
        className="px-6 py-2 w-full bg-white text-cert-red hover:text-white hover:bg-cert-red dark:bg-gray-800 rounded-lg shadow-lg border border-cert-red/50 dark:border-gray-700"
      >
        {pageType} 종료하기
      </DefaultButton>

      <ConfirmModal
        isOpen={isOpenModal}
        type="endConfirm"
        title={`${pageType} 종료하기`}
        message={`${pageType}의 결과물과 구글폼 링크를 제출해주세요.`}
        confirmText={submitting ? "제출 중..." : "제출"}
        cancelText="취소"
        onConfirm={handleEndRequest}
        onCancel={closeModal}
      />
    </>
  );
}
