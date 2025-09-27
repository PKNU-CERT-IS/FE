"use client";

import ApproveModal from "@/components/admin/members/CCApprovalModal";
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteMember } from "@/app/api/member/CCadminMemberApi";
import ConfirmModal from "@/components/ui/defaultConfirmModal";
interface RequestActionButtonsProps {
  id: number;
  grade: string;
  fieldName?: string;
}

export default function RequestActionButtons({
  id,
  grade,
}: RequestActionButtonsProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const handleReject = async () => {
    try {
      await deleteMember(id);
      setIsRejectOpen(false);
      router.refresh();
    } catch (error) {
      console.error("거절 실패:", error);
    }
  };
  return (
    <>
      <button
        type="submit"
        onClick={() => setIsModalOpen(true)}
        className="w-full flex items-center justify-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded h-7 transition-colors cursor-pointer"
      >
        <CheckCircle className="w-3 h-3 mr-1" />
        승인
      </button>
      <button
        onClick={() => setIsRejectOpen(true)}
        className="w-full flex items-center justify-center px-3 py-1 border border-red-500 text-cert-red hover:text-red-700 hover:bg-red-50 text-xs rounded h-7 transition-colors cursor-pointer"
      >
        <XCircle className="w-3 h-3 mr-1" />
        거절
      </button>

      {/* 승인 모달 */}
      {isModalOpen && (
        <ApproveModal
          id={id}
          grade={grade}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* 거절 확인 모달 */}
      <ConfirmModal
        isOpen={isRejectOpen}
        title="회원가입"
        message="회원가입 요청을 거절하시겠습니까?"
        cancelText="아니오"
        confirmText="예"
        onConfirm={handleReject}
        onCancel={() => setIsRejectOpen(false)}
      />
    </>
  );
}
