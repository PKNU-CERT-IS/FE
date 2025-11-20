"use client";

import { useRouter } from "next/navigation";
import { updateMemberGradeRole } from "@/app/api/member/CCadminMemberApi";
import { ShieldCheck, User, X } from "lucide-react";

interface ApproveModalProps {
  id: number;
  grade: string;
  onClose: () => void;
}

export default function ApproveModal({
  id,
  grade,
  onClose,
}: ApproveModalProps) {
  const router = useRouter();

  const handleApprove = async (role: "UPSOLVER" | "PLAYER") => {
    try {
      await updateMemberGradeRole({
        targetMemberId: id,
        newRole: role,
        newGrade: grade,
      });
      router.refresh();
      onClose();
    } catch (error) {
      console.error("승인 실패:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md sm:max-w-lg p-6 sm:p-8 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cert-dark-red" />
            권한 선택
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 메시지 */}
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          승인 시 부여할 권한을 선택해주세요.
        </p>

        {/* 버튼 영역 (붉은 계열) */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => handleApprove("UPSOLVER")}
            className="flex-1 flex items-center justify-center gap-2 py-3 sm:py-4 rounded-lg bg-cert-dark-red text-white text-sm sm:text-base font-medium hover:bg-red-700 shadow-md transition-all"
          >
            <ShieldCheck className="w-5 h-5" />
            UPSOLVER 권한
          </button>
          <button
            onClick={() => handleApprove("PLAYER")}
            className="flex-1 flex items-center justify-center gap-2 py-3 sm:py-4 rounded-lg bg-red-500 text-white text-sm sm:text-base font-medium hover:bg-red-600 shadow-md transition-all"
          >
            <User className="w-5 h-5" />
            PLAYER 권한
          </button>
        </div>
      </div>
    </div>
  );
}
