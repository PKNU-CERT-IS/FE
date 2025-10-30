"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LogoSVG from "/public/icons/logo.svg";
import {
  getStudyApprovedParticipants,
  getStudyPendingParticipants,
} from "@/app/api/study/CCStudyParticipantApi";
import {
  getProjectApprovedParticipants,
  getProjectPendingParticipants,
} from "@/app/api/project/CCProjectParticipantApi";
import { ParticipantType, MEMBER_GRADE_LABELS } from "@/types/study";
import CCParticipantActionButtons from "@/components/ui/CCParticipantActionButtons";

interface CCParticipantsListProps {
  type: "study" | "project";
  dataId: number;
  size?: number;
  canApproveOrReject?: boolean;
}

export default function CCParticipantsList({
  type,
  dataId,
  size = 10,
  canApproveOrReject = false,
}: CCParticipantsListProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  const [approvedPage, setApprovedPage] = useState(0);
  const [approvedMembers, setApprovedMembers] = useState<ParticipantType[]>([]);
  const [approvedTotalElements, setApprovedTotalElements] = useState(0);
  const [approvedTotalPages, setApprovedTotalPages] = useState(1);

  const [pendingPage, setPendingPage] = useState(0);
  const [pendingMembers, setPendingMembers] = useState<ParticipantType[]>([]);
  const [pendingTotalElements, setPendingTotalElements] = useState(0);
  const [pendingTotalPages, setPendingTotalPages] = useState(1);

  const getApprovedAPI =
    type === "study"
      ? getStudyApprovedParticipants
      : getProjectApprovedParticipants;
  const getPendingAPI =
    type === "study"
      ? getStudyPendingParticipants
      : getProjectPendingParticipants;

  // 승인된 멤버 조회
  const fetchApproved = async () => {
    const data = await getApprovedAPI(dataId, approvedPage, size);
    setApprovedMembers(data.content ?? []);
    setApprovedTotalElements(data.totalElements ?? 0);
    setApprovedTotalPages(data.totalPages ?? 1);
  };

  // 대기중 멤버 조회
  const fetchPending = async () => {
    const data = await getPendingAPI(dataId, pendingPage, size);
    setPendingMembers(data.content ?? []);
    setPendingTotalElements(data.totalElements ?? 0);
    setPendingTotalPages(data.totalPages ?? 1);
  };

  // 최초 및 페이지 이동 시
  useEffect(() => {
    fetchApproved();
  }, [dataId, approvedPage]);

  useEffect(() => {
    if (isAdmin || canApproveOrReject) {
      fetchPending();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataId, pendingPage]);

  // 승인 처리
  const handleApprove = (member: ParticipantType) => {
    setPendingMembers((prev) =>
      prev.filter((m) => m.memberId !== member.memberId)
    );
    setPendingTotalElements((prev) => Math.max(prev - 1, 0));
    // 마지막 페이지의 마지막 멤버일 경우 첫 페이지로 이동
    if (pendingMembers.length === 1 && pendingPage > 0) {
      setPendingPage(0);
    }
    setApprovedMembers((prev) => [member, ...prev].slice(0, size));
    setApprovedTotalElements((prev) => prev + 1);

    setApprovedTotalPages(Math.ceil((approvedTotalElements + 1) / size));
  };

  // 거절 처리
  const handleReject = (memberId: number) => {
    setPendingMembers((prev) => prev.filter((m) => m.memberId !== memberId));
    setPendingTotalElements((prev) => Math.max(prev - 1, 0));

    if (pendingMembers.length === 1 && pendingPage > 0) {
      setPendingPage(0);
    }
    // 페이지 수 재계산
    setPendingTotalPages(
      Math.max(1, Math.ceil((pendingTotalElements - 1) / size))
    );
  };

  const handleApprovedPageChange = (nextPage: number) => {
    if (nextPage >= 0 && nextPage < approvedTotalPages)
      setApprovedPage(nextPage);
  };

  const handlePendingPageChange = (nextPage: number) => {
    if (nextPage >= 0 && nextPage < pendingTotalPages) setPendingPage(nextPage);
  };

  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-bold text-black dark:text-white mb-4">
        {type === "study" ? "스터디원" : "프로젝트원"} ({approvedTotalElements})
      </h3>

      {approvedMembers.length > 0 ? (
        <div className="space-y-3 mb-3">
          {approvedMembers.map((p) => (
            <div key={p.memberId} className="flex items-center gap-3">
              <Avatar profileImageUrl={p.profileImageUrl} />
              <div>
                <p className="text-sm font-medium text-black dark:text-white">
                  {p.memberName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {MEMBER_GRADE_LABELS[p.memberGrade]}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 text-center">
          참여 중인 멤버가 없습니다.
        </p>
      )}

      {approvedTotalPages > 1 && (
        <Pagination
          page={approvedPage}
          totalPages={approvedTotalPages}
          onChange={handleApprovedPageChange}
        />
      )}

      {(isAdmin || canApproveOrReject) && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            대기중 멤버 ({pendingTotalElements})
          </h4>

          {pendingMembers.length > 0 ? (
            <div className="space-y-3">
              {pendingMembers.map((p) => (
                <div
                  key={p.memberId}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar profileImageUrl={p.profileImageUrl} />
                    <div>
                      <p className="text-sm font-medium text-black dark:text-white">
                        {p.memberName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {MEMBER_GRADE_LABELS[p.memberGrade]}
                      </p>
                    </div>
                  </div>

                  {(isAdmin || canApproveOrReject) && (
                    <CCParticipantActionButtons
                      memberId={p.memberId}
                      dataId={dataId}
                      onApprove={() => handleApprove(p)}
                      onReject={() => handleReject(p.memberId)}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center">
              대기중인 멤버가 없습니다.
            </p>
          )}

          {pendingTotalPages > 1 && (
            <Pagination
              page={pendingPage}
              totalPages={pendingTotalPages}
              onChange={handlePendingPageChange}
            />
          )}
        </div>
      )}
    </div>
  );
}

// 아바타 컴포넌트
function Avatar({ profileImageUrl }: { profileImageUrl?: string }) {
  return (
    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200">
      {profileImageUrl ? (
        <Image
          src={profileImageUrl}
          alt="프로필"
          fill
          className="object-cover"
        />
      ) : (
        <LogoSVG className="w-8 h-8 text-gray-400" />
      )}
    </div>
  );
}

// 페이지네이션 버튼 컴포넌트
function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  return (
    <div className="flex justify-center items-center gap-1 mt-1 mb-4">
      {/* 이전 버튼 */}
      <button
        onClick={() => onChange(page - 1)}
        disabled={page === 0}
        className={`p-1 rounded-md ${
          page === 0
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <ChevronLeft className="w-3 h-3" />
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`w-6 h-6 text-xs font-medium rounded-md border transition-colors ${
            i === page
              ? "bg-cert-red text-white border-cert-red"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {i + 1}
        </button>
      ))}

      {/* 다음 버튼 */}
      <button
        onClick={() => onChange(page + 1)}
        disabled={page + 1 === totalPages}
        className={`p-1 rounded-md ${
          page + 1 === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <ChevronRight className="w-3 h-3" />
      </button>
    </div>
  );
}
