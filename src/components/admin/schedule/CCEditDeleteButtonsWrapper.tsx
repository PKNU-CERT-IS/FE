"use client";

import { ScheduleInfo } from "@/types/schedule";
import CCEditButton from "@/components/admin/schedule/CCEditButton";
import CCDeleteButton from "@/components/admin/schedule/CCDeleteButton";
import { useRouter } from "next/navigation";
import { deleteSchedule } from "@/api/schedule/CCSchedule";

interface CCEditDeleteButtonsWrapperProps {
  schedule: ScheduleInfo;
}

export default function CCEditDeleteButtonsWrapper({
  schedule,
}: CCEditDeleteButtonsWrapperProps) {
  const router = useRouter();

  const removeRequest = async (scheduleId: number) => {
    try {
      await deleteSchedule(scheduleId);
      router.refresh();
    } catch (err) {
      console.warn("스케줄 삭제 실패:", err);
    }
  };

  return (
    <>
      <CCEditButton schedule={schedule} />
      <CCDeleteButton schedule={schedule} />
    </>
  );
}
