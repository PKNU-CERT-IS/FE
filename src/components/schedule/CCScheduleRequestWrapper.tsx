"use client";

import { useState } from "react";
import CCAddScheduleCard from "@/components/schedule/CCAddScheduleCard";
import CCScheduleRequestList from "@/components/schedule/CCScheduleRequestList";
import { ScheduleCreateRequest, ScheduleInfo } from "@/types/schedule";
import { usePathname } from "next/navigation";

interface Props {
  children?: React.ReactNode;
}

export default function CCScheduleRequestWrapper({ children }: Props) {
  const [reservations, setReservation] = useState<ScheduleInfo[]>([]);
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  const addRequest = (data: ScheduleCreateRequest) => {
    const now = new Date().toISOString();

    const newReservation: ScheduleInfo = {
      id: Date.now(), // 임시 id (API 연동 전)
      status: "PENDING",
      created_at: now,
      ...data, // title, description, type, started_at, ended_at, place
    };

    setReservation((prev) => [newReservation, ...prev]);
  };

  const removeRequest = (id: number) => {
    setReservation((prev) =>
      prev.filter((reservation) => reservation.id !== id)
    );
  };

  return (
    <>
      <CCAddScheduleCard onAdd={addRequest} />
      {children}
      {!isAdmin && (
        <CCScheduleRequestList
          requests={reservations}
          onRemove={removeRequest}
        />
      )}
    </>
  );
}
