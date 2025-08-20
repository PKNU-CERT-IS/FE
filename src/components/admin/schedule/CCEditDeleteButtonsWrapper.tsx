"use client";

import { ScheduleCreateRequest, ScheduleInfo } from "@/types/schedule";
import CCEditButton from "@/components/admin/schedule/CCEditButton";
import CCDeleteButton from "@/components/admin/schedule/CCDeleteButton";

interface CCEditDeleteButtonsWrapperProps {
  schedule: ScheduleInfo;
  onEdit?: (reservation: ScheduleCreateRequest) => void;
  onRemove?: (id: number) => void;
}

export default function CCEditDeleteButtonsWrapper({
  schedule,
  onEdit,
  onRemove,
}: CCEditDeleteButtonsWrapperProps) {
  return (
    <>
      <CCEditButton schedule={schedule} onEdit={onEdit ?? (() => {})} />
      <CCDeleteButton schedule={schedule} onRemove={onRemove} />
    </>
  );
}
