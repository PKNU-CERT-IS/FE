"server-only";

import ScheduleSVG from "/public/icons/schedule.svg";
import LocationSVG from "/public/icons/location.svg";
import TimeSVG from "/public/icons/time.svg";
import { getTypeColor, getTypeLabel } from "@/utils/scheduleUtils";
import { ScheduleInfo } from "@/types/schedule";
import { formatDate, formatTime } from "@/utils/formatDateUtil";
import { MessageSquareText } from "lucide-react";
import { mockScheduleData } from "@/mocks/mockScheduleData";
// import * as Sentry from "@sentry/nextjs";

interface SCScheduleListProps {
  date?: string;
  id?: string;
}

export default async function SCScheduleList({
  date,
  id = "all-schedule-list",
}: SCScheduleListProps) {
  // API 호출 코드 -> 나중에 주석 해제
  // let schedules: ScheduleInfo[] = [];

  // try {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}/api/schedule`,
  //     {
  //       next: { revalidate: 60 },
  //     }
  //   );
  //   if (!res.ok) {
  //     // API 실패를 로그로 기록
  //     Sentry.logger.fatal("API call failed from frontend", {
  //       status: res.status,
  //     });
  //   }
  //   schedules = await res.json();
  // } catch (error) {
  //   Sentry.logger.error("SCScheduleList error 발생!", { error });
  //   throw error;
  // }

  const schedules: ScheduleInfo[] = await mockScheduleData;
  const baseDate = date ? new Date(date) : new Date();
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth() + 1;

  const filteredSchedules = schedules.filter((s) => {
    const d = new Date(s.started_at);
    return d.getFullYear() === year && d.getMonth() + 1 === month;
  });

  return (
    <div id={id} className="my-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 dark:text-gray-200">{`${month}월 전체 일정`}</h2>

      {filteredSchedules.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-5">
          {`${month}월 일정이 없습니다.`}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchedules.map((schedule) => (
            <div
              key={schedule.id}
              className="card-list rounded-xl border shadow-sm cursor-default dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-md font-semibold text-gray-700 mb-3 dark:text-gray-200">
                      {schedule.title}
                    </p>
                    <div className="space-y-2 text-sm text-gray-600  dark:text-gray-300">
                      <div className="flex items-center">
                        <ScheduleSVG className="w-4 mr-2 stroke-gray-600  dark:stroke-gray-300" />
                        {formatDate(schedule.started_at, "dot")}
                      </div>
                      <div className="flex items-center">
                        <TimeSVG className="mr-2" />
                        {`${formatTime(
                          schedule.started_at,
                          "hm"
                        )} - ${formatTime(schedule.ended_at, "hm")}`}
                      </div>
                      <div className="flex items-center">
                        <LocationSVG className="mr-2" />
                        {schedule.place ?? ""}
                      </div>
                      <div className="flex items-center">
                        <MessageSquareText className="w-4 mr-2" />
                        {schedule.description && <p>{schedule.description}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-rows-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getTypeColor(
                          schedule.type
                        )}`}
                      >
                        {getTypeLabel(schedule.type)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
