"use client";

import AddSVG from "@/icons/add.svg";
import { useModal } from "@/hooks/useModal";
import ScheduleFormModal from "@/components/modal/scheduleFormModal";

export default function CCAddScheduleCard() {
  const { isOpenModal, setIsOpenModal } = useModal();

  return (
    <div className="rounded-lg border bg-white border-gray-200 shadow-sm h-min">
      <div className="flex flex-col space-y-1.5 p-6 text-center pb-6">
        <div className="mb-6 flex flex-row items-center">
          <AddSVG width={24} />
          <div className="ml-2 font-semibold tracking-tight text-gray-900 text-lg">
            새 일정
          </div>
        </div>
        <button
          onClick={() => setIsOpenModal(true)}
          className="w-full rounded-md py-2.5 bg-cert-red text-white hover:opacity-90 cursor-pointer"
        >
          일정 추가
        </button>
      </div>
      {isOpenModal && (
        <ScheduleFormModal closeModal={() => setIsOpenModal(false)} />
      )}
    </div>
  );
}
