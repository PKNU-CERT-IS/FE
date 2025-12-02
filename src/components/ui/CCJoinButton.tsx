"use client";

import { memo, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types/errorResponse";
import {
  cancelProjectRegister,
  joinProjectRegister,
} from "@/app/api/project/CCProjectParticipantApi";
import {
  cancelStudyRegister,
  joinStudyRegister,
} from "@/app/api/study/CCStudyParticipantApi";
import AlertModal from "@/components/ui/defaultAlertModal";

type JoinState = "NONE" | "PENDING" | "APPROVED" | "REJECTED";

interface JoinButtonProps {
  dataId: number;
  initiallyJoined?: boolean;
  className?: string;
  initialState: JoinState;
}

function CCJoinButton({
  dataId,
  initialState = "NONE",
  className,
}: JoinButtonProps) {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  // 참가 상태
  const [joinState, setJoinState] = useState<JoinState>(initialState);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "warning">("success");

  const pageType: "study" | "project" = pathname.startsWith("/study")
    ? "study"
    : "project";

  const handleClick = () => {
    startTransition(async () => {
      try {
        if (joinState === "NONE") {
          if (pageType === "study") {
            const res = await joinStudyRegister(dataId);
            setAlertMessage(res.message ?? "스터디 참가 신청 완료");
          } else {
            const res = await joinProjectRegister(dataId);
            setAlertMessage(res.message ?? "프로젝트 참가 신청 완료");
          }
          setAlertType("success");
          setAlertOpen(true);
          setJoinState("PENDING");
        } else if (joinState === "PENDING") {
          if (pageType === "study") {
            const res = await cancelStudyRegister(dataId);
            setAlertMessage(res.message ?? "스터디 참가 신청 취소 완료");
          } else {
            const res = await cancelProjectRegister(dataId);
            setAlertMessage(res.message ?? "프로젝트 참가 신청 취소 완료");
          }
          setAlertType("success");
          setAlertOpen(true);
          setJoinState("NONE");
        }
      } catch (error) {
        const err = error as AxiosError<ErrorResponse>;
        const msg =
          err.response?.data?.message || "처리 실패, 다시 시도해주세요.";
        setAlertMessage(msg);
        setAlertType("warning");
        setAlertOpen(true);
      }
    });
  };

  if (joinState === "APPROVED") {
    return null;
  }

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isPending}
        className={`action-button ${className}`}
      >
        {isPending ? (
          "처리 중..."
        ) : joinState === "NONE" ? (
          <>
            <span className="sm:hidden">참가하기</span>
            <span className="hidden sm:inline">
              {pageType === "study" ? "스터디 참가하기" : "프로젝트 참가하기"}
            </span>
          </>
        ) : (
          <>
            <span className="sm:hidden">참가신청</span>
            <span className="hidden sm:inline">
              {pageType === "study" ? "스터디 참가 취소" : "프로젝트 참가 취소"}
            </span>
          </>
        )}
      </button>
      <AlertModal
        isOpen={alertOpen}
        message={alertMessage}
        type={alertType}
        duration={2500}
        onClose={() => setAlertOpen(false)}
      />
    </>
  );
}
export default memo(CCJoinButton);
