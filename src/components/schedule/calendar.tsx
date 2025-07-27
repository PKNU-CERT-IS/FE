"use client";

import { useCallback, useMemo, useState } from "react";
import AngleSVG from "/public/icons/angle.svg";
import { mockScheduleData } from "@/mocks/mockScheduleData";
import {
  DAY_NAMES,
  formatDateString,
  formatKoreanDate,
  generateCalendarDays,
  getScheduleByDate,
  getTypeColor,
} from "@/utils/scheduleUtils";
import { useSearchParams, useRouter } from "next/navigation";

export default function Calendar() {
  const router = useRouter();
  const currentParams = useSearchParams();

  const handleMonthChange = useCallback(
    (newDate: Date) => {
      const params = new URLSearchParams(currentParams);

      params.set("date", formatDateString(newDate));
      router.replace(`?${params.toString()}`);
      setCurrentDate(newDate);
    },
    [currentParams, router]
  );

  const handleDateClick = useCallback(
    (date: Date) => {
      const selected = formatDateString(date);
      const params = new URLSearchParams(currentParams);

      if (params.get("date") !== selected) {
        params.set("date", selected);
      }
      router.replace(`?${params.toString()}`);
    },
    [currentParams, router]
  );

  const [currentDate, setCurrentDate] = useState(new Date());
  const today = useMemo(() => new Date(), []);
  const schedules = useMemo(() => mockScheduleData(), []);
  const days = useMemo(() => generateCalendarDays(currentDate), [currentDate]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const date = currentDate.getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, date));
    const newDate = new Date(year, month - 1, date);
    handleMonthChange(newDate);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, date));
    const newDate = new Date(year, month + 1, date);
    handleMonthChange(newDate);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4 p-2">
        <h3 className="text-xl font-semibold text-gray-900">
          {formatKoreanDate(currentDate, true)}
        </h3>
        <div>
          <button
            onClick={prevMonth}
            className="text-gray-600 p-3 rounded-md hover:text-gray-900 hover:bg-gray-100 mr-3 duration-200"
          >
            <AngleSVG className="rotate-90" width={13} />
          </button>
          <button
            onClick={nextMonth}
            className="text-gray-600 p-3 rounded-md hover:text-gray-900 hover:bg-gray-100 duration-200"
          >
            <AngleSVG className="rotate-270" width={13} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAY_NAMES.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-600 p-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isToday = day.toDateString() === today.toDateString();
          const isCurrentMonth = day.getMonth() === month;
          const schedule = getScheduleByDate(day, schedules);

          return (
            <div
              key={index}
              onClick={() => handleDateClick(day)}
              className={`relative min-h-[8rem] p-2 border border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-100
                ${
                  isCurrentMonth
                    ? "text-gray-900 bg-white"
                    : "text-gray-400 text-xs"
                }
                ${
                  schedule.length > 0
                    ? "border bg-gray-300/10 border-cert-dark-red-20"
                    : "hover:bg-gray-100"
                }
                  ${isToday ? "text-white" : ""}
              `}
              title={schedule[0]?.title}
            >
              <div className="flex justify-center items-center">
                {isToday && (
                  <span className="absolute w-7 h-7 bg-cert-red/85 rounded-full z-10 pointer-events-none"></span>
                )}
                <span className={isToday ? "relative z-20" : ""}>
                  {day.getDate()}
                </span>
              </div>
              {schedule.length > 0 && (
                <div className="mt-1 space-y-1">
                  {schedule.slice(0, 3).map((s, idx) => (
                    <div
                      key={idx}
                      className={`text-xs text-center rounded-sm p-1 ${getTypeColor(
                        s.type
                      )}`}
                    >
                      {s.title}
                    </div>
                  ))}
                  {schedule.length > 3 && (
                    <div className="text-xs text-center text-gray-500 p-0.5">
                      + {schedule.length - 3}개 더보기
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
