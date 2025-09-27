"use client";

import {
  approveAdminProjectCreate,
  rejectAdminProjectCreate,
} from "@/app/api/admin/project/CCAdminProjectCreateApi";
import {
  approveAdminProjectEnd,
  rejectAdminProjectEnd,
} from "@/app/api/admin/project/CCAdminProjectEndApi";
import {
  approveAdminStudyCreate,
  rejectAdminStudyCreate,
} from "@/app/api/admin/study/CCAdminStudyCreateApi";
import {
  approveAdminStudyEnd,
  rejectAdminStudyEnd,
} from "@/app/api/admin/study/CCAdminStudyEndApi";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function CCAdminStudyProjectActionButtons({
  id,
}: {
  id: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isAdmin = pathname.startsWith("/admin");
  const tab = searchParams.get("tab");
  const view = searchParams.get("view");

  const handleApprove = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (isAdmin) {
        if (tab === "study" && view === "pending") {
          await approveAdminStudyCreate(id);
        } else if (tab === "study" && view === "end") {
          await approveAdminStudyEnd(id);
        } else if (tab === "project" && view === "pending") {
          await approveAdminProjectCreate(id);
        } else if (tab === "project" && view === "end") {
          await approveAdminProjectEnd(id);
        }
      }
      router.refresh();
    } catch (err) {
      console.error("승인 실패:", err);
    }
  };

  const handleReject = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (isAdmin) {
        if (tab === "study" && view === "pending") {
          await rejectAdminStudyCreate(id);
        } else if (tab === "study" && view === "end") {
          await rejectAdminStudyEnd(id);
        } else if (tab === "project" && view === "pending") {
          await rejectAdminProjectCreate(id);
        } else if (tab === "project" && view === "end") {
          await rejectAdminProjectEnd(id);
        }
      }
      router.refresh();
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleApprove}
        className="flex items-center justify-center gap-1 px-10 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors cursor-pointer"
      >
        <CheckCircle className="w-3 h-3" />
        <span>승인</span>
      </button>
      <button
        onClick={handleReject}
        className="flex items-center justify-center gap-1 px-10 py-1 border border-red-500 text-cert-red hover:text-red-700 hover:bg-red-50 text-xs rounded transition-colors cursor-pointer"
      >
        <XCircle className="w-3 h-3" />
        <span>거절</span>
      </button>
    </div>
  );
}
