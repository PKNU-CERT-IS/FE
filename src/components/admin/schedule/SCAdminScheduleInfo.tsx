"server-only";

import ScheduleSVG from "/public/icons/schedule.svg";
import LocationSVG from "/public/icons/location.svg";
import TimeSVG from "/public/icons/time.svg";
import { mockScheduleData } from "@/mocks/mockScheduleData";
import { ScheduleInfo } from "@/types/schedule";
import { getTypeColor, getTypeLabel } from "@/utils/scheduleUtils";
import CCEditButton from "@/components/admin/schedule/CCEditButton";
import CCDeleteButton from "@/components/admin/schedule/CCDeleteButton";
import { formatDate } from "@/utils/formatDateUtil";

interface SCAdminScheduleInfoProps {
  selectedDate: string | null;
}

export default function SCAdminScheduleInfo({
  selectedDate,
}: SCAdminScheduleInfoProps) {
  const allSchedules: ScheduleInfo[] = mockScheduleData();
  const selectedDateSchedules = selectedDate
    ? allSchedules.filter((sc) => sc.date === selectedDate)
    : [];

  const formattedSelectedDate = selectedDate ? formatDate(selectedDate) : null;

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
            <div key={schedule.id} className="text-sm text-gray-700">
              <div className="relative flex items-start justify-between border p-3 rounded-lg border-gray-200 bg-gray-50">
                <div className="flex-1">
                  <p className="text-md font-semibold text-gray-700 mb-3">
                    {schedule.title}
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex flex-row items-center">
                      <ScheduleSVG className="w-4 mr-2" stroke="#4B5563" />

                      {formatDate(schedule.date, "dot")}
                    </div>
                    <div className="flex flex-row items-center">
                      <TimeSVG className="mr-2" />
                      {schedule.startTime} - {schedule.endTime}
                    </div>
                    <div className="flex flex-row items-center">
                      <LocationSVG className="mr-2" />
                      {schedule.location}
                    </div>
                  </div>
                </div>

                <div
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${getTypeColor(
                    schedule.type
                  )}`}
                >
                  {getTypeLabel(schedule.type)}
                </div>

                <div className="absolute inset-y-0 right-2 bottom-0 flex items-end gap-2 pb-3">
                  <CCEditButton schedule={schedule} />
                  <CCDeleteButton schedule={schedule} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
