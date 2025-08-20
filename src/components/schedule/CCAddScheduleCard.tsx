"use client";

import AddSVG from "/public/icons/add.svg";
import { useModal } from "@/hooks/useModal";
import CCScheduleFormModal from "@/components/schedule/CCScheduleFormModal";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ScheduleCreateRequest } from "@/types/schedule";

interface CCAddScheduleCardProps {
  onAdd?: (reservation: ScheduleCreateRequest) => void;
}

export default function CCAddScheduleCard({ onAdd }: CCAddScheduleCardProps) {
  const { isOpenModal, setIsOpenModal, modalOutsideRef } = useModal();
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const title = isAdmin ? "새 일정 추가" : "동아리방 예약";
  const buttonText = isAdmin ? "일정 추가" : "예약 신청";

  // 모달 오픈 시 스크롤 잠금
  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpenModal]);

  return (
    <div
      className="rounded-lg border bg-white border-gray-200 shadow-sm h-min"
      ref={modalOutsideRef}
    >
      <div className="flex flex-col space-y-1.5 p-6 text-center pb-6">
        <div className="mb-6 flex flex-row items-center">
          <AddSVG className="w-6" />
          <div className="ml-2 font-semibold tracking-tight text-gray-900 text-lg">
            {title}
          </div>
        </div>
        <button
          onClick={() => {
            setIsOpenModal(true);
          }}
          className="action-button w-full py-2.5"
        >
          {buttonText}
        </button>
      </div>

      {isOpenModal && (
        <CCScheduleFormModal
          closeModal={() => setIsOpenModal(false)}
          modalRef={modalOutsideRef}
          onAdd={onAdd}
          isAdmin={isAdmin}
        />
      )}
    </div>
  );
}
