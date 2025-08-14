"use client";

import { useState } from "react";
import CCAddScheduleCard from "@/components/schedule/CCAddScheduleCard";
import CCScheduleRequestList from "@/components/schedule/CCScheduleRequestList";
import { ScheduleInfo } from "@/types/schedule";
import { usePathname } from "next/navigation";

export default function CCScheduleRequestWrapper() {
  const [reservations, setReservation] = useState<ScheduleInfo[]>([]);
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const addRequest = (data: ScheduleInfo) => {
    setReservation((prev) => [data, ...prev]);
  };

  const removeRequest = (id: number) => {
    setReservation((prev) =>
      prev.filter((reservation) => reservation.id !== id)
    );
  };
  return (
    <>
      <CCAddScheduleCard onAdd={addRequest} />
      {/* 서비스페이지에서만 렌더링 */}
      {!isAdmin && (
        <CCScheduleRequestList
          requests={reservations}
          onRemove={removeRequest}
        />
      )}
    </>
  );
}
