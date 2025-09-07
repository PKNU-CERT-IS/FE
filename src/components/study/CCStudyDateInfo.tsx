"use client";

import { useState, useEffect } from "react";
import { getStatusDateInfo } from "@/utils/studyHelper";
import CalendarGraySVG from "/public/icons/calendar-gray.svg";
import { StatusType } from "@/types/progressStatus";

interface CCStudyDateInfoProps {
  status: StatusType;
  startDate?: string;
  endDate?: string;
  semester?: string;
}

export default function CCStudyDateInfo({
  status,
  startDate,
  endDate,
  semester,
}: CCStudyDateInfoProps) {
  const [dateInfo, setDateInfo] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 클라이언트에서만 날짜 계산 수행
    setIsClient(true);
    const info = getStatusDateInfo(status, startDate, endDate, semester);
    setDateInfo(info);
  }, [status, startDate, endDate, semester]);

  // 클라이언트 마운트 전까지는 렌더링하지 않음 (hydration 문제 방지)
  if (!isClient || !dateInfo) {
    return null;
  }

  return (
    <div className="flex items-center gap-1 text-xs text-gray-500">
      <CalendarGraySVG className="w-4 h-4" />
      <span>{dateInfo}</span>
    </div>
  );
}
