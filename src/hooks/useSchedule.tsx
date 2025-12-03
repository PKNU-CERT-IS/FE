"use client";

import { useMemo, useState } from "react";
import { ScheduleInfo } from "@/types/schedule";

export const useSchedule = () => {
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleInfo | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // 30분 간격으로 시간 배열 생성 (00:00 ~ 23:30) + 23:59 추가
  const timeOptions = useMemo(() => {
    const options: string[] = [];

    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        options.push(timeString);
      }
    }
    options.push("23:59");
    return options;
  }, []);

  return {
    selectedSchedule,
    setSelectedSchedule,
    selectedDate,
    setSelectedDate,
    timeOptions,
  };
};
