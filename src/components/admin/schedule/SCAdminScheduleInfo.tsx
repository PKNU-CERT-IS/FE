"server-only";

import ScheduleSVG from "/public/icons/schedule.svg";
import LocationSVG from "/public/icons/location.svg";
import TimeSVG from "/public/icons/time.svg";
import { ScheduleInfo } from "@/types/schedule";
import { getTypeColor, getTypeLabel } from "@/utils/scheduleUtils";
import { formatDate, formatTime } from "@/utils/formatDateUtil";
import { MessageSquareText } from "lucide-react";
import CCEditDeleteButtonsWrapper from "@/components/admin/schedule/CCEditDeleteButtonsWrapper";
import { getSchedules } from "@/app/api/schedule/SCscheduleApi";

interface SCAdminScheduleInfoProps {
  selectedDate: string | null;
}

export default async function SCAdminScheduleInfo({
  selectedDate,
}: SCAdminScheduleInfoProps) {
  const allSchedules: ScheduleInfo[] = selectedDate
    ? await getSchedules(selectedDate)
    : [];
  const selectedDateSchedules = selectedDate
    ? allSchedules.filter(
        (schedule) => formatDate(schedule.startedAt, "short") === selectedDate
      )
    : [];

  const formattedSelectedDate = selectedDate
    ? formatDate(selectedDate, "medium")
    : null;

  return (
    <div className="mt-6 p-6 rounded-lg border bg-white border-gray-200 shadow-sm h-min">
      <p className="text-lg font-semibold mb-4">
        {formattedSelectedDate ? `${formattedSelectedDate} 일정` : "일정"}
      </p>
      <div className="space-y-4 overflow-y-auto max-h-[18rem]">
        {selectedDateSchedules.length === 0 ? (
          <p className="text-gray-500 text-center p-3">
            선택한 날짜에 일정이 없습니다.
          </p>
        ) : (
          selectedDateSchedules.map((schedule) => (
            <div key={schedule.scheduleId} className="text-sm text-gray-700">
              <div className="relative flex items-start border p-3 rounded-lg border-gray-200 bg-gray-50 gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-md font-semibold text-gray-700 mb-3">
                    {schedule.title}
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex flex-row items-center">
                      <ScheduleSVG className="w-4 mr-2 stroke-gray-700" />
                      {formatDate(schedule.startedAt, "dot")}
                    </div>
                    <div className="flex flex-row items-center">
                      <TimeSVG className="mr-2" />
                      {`${formatTime(schedule.startedAt)} - ${formatTime(
                        schedule.endedAt
                      )}`}
                    </div>
                    <div className="flex flex-row items-center">
                      <LocationSVG className="mr-2" />
                      {schedule.place}
                    </div>
                    <div className="flex items-start">
                      <MessageSquareText className="mr-2 w-4 h-4 mt-[2px]" />
                      <span className="min-w-0 break-words">
                        {schedule.description}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors shrink-0 whitespace-nowrap ${getTypeColor(
                    schedule.type
                  )}`}
                >
                  {getTypeLabel(schedule.type)}
                </div>

                <div className="absolute inset-y-0 right-2 bottom-0 flex items-end gap-2 pb-3">
                  <CCEditDeleteButtonsWrapper schedule={schedule} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
