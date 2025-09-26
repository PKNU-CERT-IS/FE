"use client";

import { useTransition, useState } from "react";
import { usePathname } from "next/navigation";
import {
  joinStudyRegister,
  cancelStudyRegister,
} from "@/app/api/study/CCStudyParticipantApi";
import {
  joinProjectRegister,
  cancelProjectRegister,
} from "@/app/api/project/CCProjectParticipantApi";

type JoinState = "NONE" | "PENDING" | "APPROVED" | "REJECTED";

export function CCJoinButton({
  dataId,
  initiallyJoined = false,
  initialState = "NONE",
  className,
}: {
  dataId: number;
  initiallyJoined?: boolean;
  className?: string;
  initialState: JoinState;
}) {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  // 참가 상태
  const [joinState, setJoinState] = useState<JoinState>(initialState);
  const pageType: "study" | "project" = pathname.startsWith("/study")
    ? "study"
    : "project";

  // 참가 여부 상태
  const [isJoined, setIsJoined] = useState(initiallyJoined);
  const handleClick = () => {
    startTransition(async () => {
      try {
        if (joinState === "NONE") {
          // 참가 신청
          if (pageType === "study") {
            await joinStudyRegister(dataId);
            alert("스터디 참가 신청 완료!");
          } else {
            await joinProjectRegister(dataId);
            alert("프로젝트 참가 신청 완료!");
          }
          setJoinState("PENDING");
        } else if (joinState === "PENDING") {
          // 신청 취소
          if (pageType === "study") {
            await cancelStudyRegister(dataId);
            alert("스터디 참가 신청 취소 완료!");
          } else {
            await cancelProjectRegister(dataId);
            alert("프로젝트 참가 신청 취소 완료!");
          }
          setJoinState("NONE");
        }
      } catch (err) {
        alert("처리 실패, 다시 시도해주세요.");
      }
    });
  };

  if (joinState === "APPROVED") {
    return null; // 승인된 경우 버튼 안 보임
  }

  return (
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
  );
}
