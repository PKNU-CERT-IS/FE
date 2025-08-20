"use client";

import { ArrowDown } from "lucide-react";

export default function CCScrollScheduleList() {
  const ALL_SCHEDULE_LIST_ID = "all-schedule-list";
  const scrollToAllSchedules = () => {
    document.getElementById(ALL_SCHEDULE_LIST_ID)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="flex">
      <button
        onClick={scrollToAllSchedules}
        className="flex flex-row items-center w-auto py-1.5 px-2 md:px-3 sm:px-1
                   hover:bg-gray-400/15 text-gray-400 border border-gray-300 
                   rounded-lg transition-colors duration-200 shadow-sm"
      >
        <span className="text-xs sm:text-sm cursor-pointer">
          전체 일정 확인
        </span>
        <ArrowDown className="w-3 h-3 sm:w-4 sm:h-4 ml-0 sm:ml-1" />
      </button>
    </div>
  );
}
