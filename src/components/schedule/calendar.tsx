"use client";

import { useCallback, useMemo, useState } from "react";
import AngleSVG from "/public/icons/angle.svg";
import { mockScheduleData } from "@/mocks/mockScheduleData";
import {
  DAY_NAMES,
  generateCalendarDays,
  getTypeColor,
} from "@/utils/scheduleUtils";
import { useSearchParams, useRouter } from "next/navigation";
import { formatDate } from "@/utils/formatDateUtil";
import CCScrollScheduleList from "@/components/schedule/CCScrollScheduleList";
import { ScheduleInfo } from "@/types/schedule";

interface CalendarProps {
  schedules: ScheduleInfo[];
  selectedDate: string;
}

export default function Calendar({ schedules, selectedDate }: CalendarProps) {
  const router = useRouter();
  const currentParams = useSearchParams();

  const [currentDate, setCurrentDate] = useState(new Date(selectedDate));

  const today = useMemo(() => new Date(), []);

  const days = useMemo(() => generateCalendarDays(currentDate), [currentDate]);

  const handleMonthChange = useCallback(
    (newDate: Date) => {
      const params = new URLSearchParams(currentParams);
      params.set("date", formatDate(newDate));
      router.replace(`?${params.toString()}`);
      setCurrentDate(newDate);
    },
    [currentParams, router]
  );

  const handleDateClick = useCallback(
    (date: Date) => {
      const selected = formatDate(date);
      const params = new URLSearchParams(currentParams);
      if (params.get("date") !== selected) {
        params.set("date", selected);
      }
      router.replace(`?${params.toString()}`);
    },
    [currentParams, router]
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const date = currentDate.getDate();

  const prevMonth = () => {
    const newDate = new Date(year, month - 1, date);
    handleMonthChange(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(year, month + 1, date);
    handleMonthChange(newDate);
  };

  const getSchedulesForDay = useCallback(
    (day: Date) => {
      const dayKey = formatDate(day, "short");
      return schedules.filter(
        (s) => formatDate(s.startedAt, "short") === dayKey
      );
    },
    [schedules]
  );

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4 p-2">
        <div className="flex flex-row">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
            {formatDate(currentDate, "long")}
          </h3>
        </div>
        <div className="flex items-center">
          <div className="mr-2 sm:mr-4 hidden sm:block">
            <CCScrollScheduleList />
          </div>
          <button
            onClick={prevMonth}
            className="text-gray-600 p-1 sm:p-3 rounded-md hover:text-gray-900 hover:bg-gray-100 mr-3 duration-200 cursor-pointer dark:hover:bg-gray-700"
          >
            <AngleSVG className="rotate-90 w-2.5 sm:w-3.5 dark:stroke-gray-300" />
          </button>
          <button
            onClick={nextMonth}
            className="text-gray-600 p-1 sm:p-3 rounded-md hover:text-gray-900 hover:bg-gray-100 duration-200 cursor-pointer dark:hover:bg-gray-700"
          >
            <AngleSVG className="rotate-270 w-2.5 sm:w-3.5 dark:stroke-gray-300" />
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

          const daySchedules = getSchedulesForDay(day);

          return (
            <div
              key={index}
              onClick={() => handleDateClick(day)}
              className={`relative min-h-[8rem]  p-2 border border-gray-100 cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700
                ${
                  isCurrentMonth
                    ? "text-gray-900 bg-white dark:bg-gray-800 dark:text-gray-200"
                    : "text-gray-400 text-xs"
                }
                ${
                  daySchedules.length > 0
                    ? "border bg-gray-300/10 border-cert-dark-red-20 dark:text-gray-200"
                    : "hover:bg-gray-100"
                }
                ${isToday ? "text-white" : ""}
              `}
              title={daySchedules[0]?.title}
            >
              <div className="flex justify-center items-center">
                {isToday && (
                  <span className="absolute w-7 h-7 bg-cert-red/85 rounded-full z-10 pointer-events-none"></span>
                )}
                <span className={isToday ? "relative z-20" : ""}>
                  {day.getDate()}
                </span>
              </div>

              {daySchedules.length > 0 && (
                <div className="mt-1 space-y-1">
                  {daySchedules.slice(0, 3).map((s, idx) => (
                    <div
                      key={idx}
                      className={`text-xs text-center rounded-sm p-1 ${getTypeColor(
                        s.type
                      )}`}
                    >
                      {s.title}
                    </div>
                  ))}
                  {daySchedules.length > 3 && (
                    <div className="text-xs text-center text-gray-500 p-0.5">
                      + {daySchedules.length - 3}개 더보기
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
