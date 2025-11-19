"use client";

import { ScheduleInfo } from "@/types/schedule";
import CCDeleteButton from "@/components/admin/schedule/CCDeleteButton";
import CCEditButton from "@/components/admin/schedule/CCEditButton";

interface CCEditDeleteButtonsWrapperProps {
  schedule: ScheduleInfo;
}

export default function CCEditDeleteButtonsWrapper({
  schedule,
}: CCEditDeleteButtonsWrapperProps) {
  return (
    <>
      <CCEditButton schedule={schedule} />
      <CCDeleteButton schedule={schedule} />
    </>
  );
}
