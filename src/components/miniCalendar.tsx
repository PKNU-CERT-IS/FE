"use client";

import AngleSVG from "/public/icons/angle.svg";
import { memo, useMemo, useState } from "react";
import { DAY_NAMES, MONTH_NAMES } from "@/utils/scheduleUtils";

const MiniCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = useMemo(() => new Date(), []);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const daysArray = [];
    const current = new Date(startDate);

    while (current <= lastDay || daysArray.length % 7 !== 0) {
      daysArray.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return daysArray;
  }, [year, month]);

  // 동적 이벤트 생성 - 현재 달 기준
  const events = {
    [new Date(year, month, 5).toDateString()]: "보안 세미나",
    [new Date(year, month, 12).toDateString()]: "CTF 대회",
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="text-gray-600 p-2 rounded-md hover:text-gray-900 hover:bg-gray-100 duration-200"
        >
          <AngleSVG className="rotate-90" width={13} />
        </button>
        <h3 className="text-lg font-semibold text-gray-900">
          {year}년 {MONTH_NAMES[month]}
        </h3>
        <button
          onClick={nextMonth}
          className="text-gray-600 p-2 rounded-md hover:text-gray-900 hover:bg-gray-100 duration-200"
        >
          <AngleSVG className="rotate-270" width={13} />
        </button>
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
          const hasEvent = events[day.toDateString()];

          return (
            <div
              key={index}
              className={`
                relative p-2 text-center text-sm rounded cursor-pointer duration-200
                ${isCurrentMonth ? "text-gray-900" : "text-gray-400"}
                ${isToday ? "text-white font-bold bg-cert-dark-red" : ""}
                ${!isToday && !hasEvent ? "hover:bg-gray-100" : ""}
                ${
                  hasEvent
                    ? "border bg-cert-dark-red/5 border-cert-dark-red/20"
                    : ""
                }
                `}
              title={hasEvent}
            >
              {day.getDate()}
              {hasEvent && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-cert-dark-red"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default memo(MiniCalendar, () => false);
