"use client";

import ScheduleFormModal from "@/components/schedule/scheduleFormModal";
import { ScheduleInfo } from "@/types/schedule";
import { useModal } from "@/hooks/useModal";
import { useSchedule } from "@/hooks/useSchedule";
import EditSVG from "/public/icons/edit.svg";

interface CCEditButtonProps {
  schedule: ScheduleInfo;
}

export default function CCEditButton({ schedule }: CCEditButtonProps) {
  const { selectedSchedule, setSelectedSchedule } = useSchedule();
  const { isOpenModal, setIsOpenModal, modalOutsideRef } = useModal();

  return (
    <div className="flex" ref={modalOutsideRef}>
      <button
        onClick={() => {
          setSelectedSchedule(schedule);
          setIsOpenModal(true);
        }}
        className="cursor-pointer"
      >
        <EditSVG className="stroke-gray-500 hover:stroke-gray-400 transition-all duration-200" />
      </button>

      {selectedSchedule?.id === schedule.id && isOpenModal && (
        <ScheduleFormModal
          schedule={selectedSchedule}
          closeModal={() => setIsOpenModal(false)}
          modalRef={modalOutsideRef}
        />
      )}
    </div>
  );
}
