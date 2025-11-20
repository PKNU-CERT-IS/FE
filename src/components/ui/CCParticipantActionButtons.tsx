"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  approveAdminProjectParticipant,
  rejectAdminProjectParticipant,
} from "@/app/api/admin/project/CCAdminProjectParticipantApi";
import {
  approveAdminStudyParticipant,
  rejectAdminStudyParticipant,
} from "@/app/api/admin/study/CCAdminStudyParticipantApi";
import {
  approveProjectParticipant,
  rejectProjectParticipant,
} from "@/app/api/project/CCProjectParticipantApi";
import {
  approveStudyParticipant,
  rejectStudyParticipant,
} from "@/app/api/study/CCStudyParticipantApi";

interface CCParticipantActionButtonsProps {
  memberId: number;
  dataId: number;
  onApprove?: () => void;
  onReject?: () => void;
}

export default function CCParticipantActionButtons({
  memberId,
  dataId,
  onApprove,
  onReject,
}: CCParticipantActionButtonsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAdmin = pathname.startsWith("/admin");
  const pageType: "study" | "project" = pathname.includes("study")
    ? "study"
    : "project";

  const handleApprove = async () => {
    try {
      if (isAdmin) {
        const tab = searchParams.get("tab");
        if (tab === "study") {
          await approveAdminStudyParticipant(memberId, dataId);
        } else {
          await approveAdminProjectParticipant(memberId, dataId);
        }
      } else {
        if (pageType === "study") {
          await approveStudyParticipant(memberId, dataId);
        } else {
          await approveProjectParticipant(memberId, dataId);
        }
      }
      if (onApprove) onApprove();
      router.refresh();
    } catch (error) {
      throw error;
    }
  };

  const handleReject = async () => {
    try {
      if (isAdmin) {
        const tab = searchParams.get("tab");
        if (tab === "study") {
          await rejectAdminStudyParticipant(memberId, dataId);
        } else {
          await rejectAdminProjectParticipant(memberId, dataId);
        }
      } else {
        if (pageType === "study") {
          await rejectStudyParticipant(memberId, dataId);
        } else {
          await rejectProjectParticipant(memberId, dataId);
        }
      }
      if (onReject) onReject();
      router.refresh();
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleApprove}
        className="px-3 py-1 rounded bg-green-600 text-white text-sm hover:bg-green-700"
      >
        승인
      </button>
      <button
        onClick={handleReject}
        className="px-3 py-1 rounded bg-red-600 text-white text-sm hover:bg-red-700"
      >
        거절
      </button>
    </div>
  );
}
