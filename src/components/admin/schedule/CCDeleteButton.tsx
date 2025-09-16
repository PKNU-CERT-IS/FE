"use client";

import { useModal } from "@/hooks/useModal";
import { useSchedule } from "@/hooks/useSchedule";
import { ScheduleInfo } from "@/types/schedule";
import ConfirmModal from "@/components/ui/defaultConfirmModal";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteSchedule } from "@/api/schedule/CCSchedule";

interface CCDeleteButtonProps {
  schedule: ScheduleInfo;
}

export default function CCDeleteButton({ schedule }: CCDeleteButtonProps) {
  const { selectedSchedule, setSelectedSchedule } = useSchedule();
  const { isOpenModal, setIsOpenModal } = useModal();

  const openModal = () => {
    setSelectedSchedule(schedule);
    setIsOpenModal(true);
  };

  const closeModal = () => setIsOpenModal(false);

  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteSchedule(schedule.scheduleId);
      router.refresh();
    } catch (err) {
      console.error("스케줄 삭제 실패:", err);
    }
  };

  return (
    <div className="flex">
      <button onClick={openModal} className="cursor-pointer">
        <Trash2 className="w-4 h-4 stroke-gray-500 hover:stroke-gray-400 transition-all duration-200" />
      </button>

      <ConfirmModal
        isOpen={
          selectedSchedule?.scheduleId === schedule.scheduleId && isOpenModal
        }
        title="일정 삭제"
        message="정말 이 일정을 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        onConfirm={() => {
          handleDelete();
          setIsOpenModal(false);
        }}
        onCancel={closeModal}
      />
    </div>
  );
}
