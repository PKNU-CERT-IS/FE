"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  approveStudyParticipant,
  rejectStudyParticipant,
} from "@/app/api/study/CCStudyParticipantApi";
import {
  approveProjectParticipant,
  rejectProjectParticipant,
} from "@/app/api/project/CCProjectParticipantApi";
import {
  approveAdminStudyParticipant,
  rejectAdminStudyParticipant,
} from "@/app/api/admin/study/CCAdminStudyParticipantApi";
import {
  approveAdminProjectParticipant,
  rejectAdminProjectParticipant,
} from "@/app/api/admin/project/CCAdminProjectParticipantApi";

export default function CCParticipantActionButtons({
  participantId,
}: {
  participantId: number;
}) {
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
          await approveAdminStudyParticipant(participantId);
        } else {
          await approveAdminProjectParticipant(participantId);
        }
      } else {
        if (pageType === "study") {
          await approveStudyParticipant(participantId);
        } else {
          await approveProjectParticipant(participantId);
        }
      }
      router.refresh();
    } catch (err) {
      throw err;
    }
  };

  const handleReject = async () => {
    try {
      if (isAdmin) {
        const tab = searchParams.get("tab");
        if (tab === "study") {
          await rejectAdminStudyParticipant(participantId);
        } else {
          await rejectAdminProjectParticipant(participantId);
        }
      } else {
        if (pageType === "study") {
          await rejectStudyParticipant(participantId);
        } else {
          await rejectProjectParticipant(participantId);
        }
      }
      router.refresh();
    } catch (err) {
      throw err;
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
