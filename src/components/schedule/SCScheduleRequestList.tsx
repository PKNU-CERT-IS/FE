"server-only";

import { MessageSquareText } from "lucide-react";
import ScheduleSVG from "/public/icons/schedule.svg";
import LocationSVG from "/public/icons/location.svg";
import TimeSVG from "/public/icons/time.svg";
import {
  getStatusColor,
  getStatusLabel,
  getTypeColor,
  getTypeLabel,
} from "@/utils/scheduleUtils";
import CCDeleteButton from "@/components/admin/schedule/CCDeleteButton";
import { ScheduleInfo } from "@/types/schedule";
import { formatDateRange, formatTime } from "@/utils/formatDateUtil";
import { getMySchedules } from "@/app/api/schedule/SCscheduleApi";

export default async function SCScheduleRequestList() {
  const requests: ScheduleInfo[] = await getMySchedules();
  const pendingRequests = requests.filter((r) => r.status === "PENDING");

  return (
    <div className="mt-6 p-6 rounded-lg border shadow-sm h-min dark-default">
      <p className="text-lg font-semibold mb-4">예약 신청 현황</p>

      <div className="space-y-4 max-h-[16rem] overflow-y-auto">
        {pendingRequests.length === 0 ? (
          <p className="text-gray-500 text-center p-3">
            현재 신청된 예약이 없습니다.
          </p>
        ) : (
          pendingRequests.map((request) => (
            <div key={request.scheduleId} className="text-sm text-gray-700">
              <div className="relative flex items-start border p-3 rounded-lg border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="flex-1 min-w-0">
                  <p className="text-md font-semibold text-gray-700 mb-3 dark:text-gray-200">
                    {request.title}
                  </p>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex flex-row items-center">
                      <ScheduleSVG className="w-4 mr-2 stroke-gray-700 dark:stroke-gray-300" />
                      {formatDateRange(
                        request.startedAt,
                        request.endedAt,
                        "dot"
                      )}
                    </div>
                    <div className="flex flex-row items-center">
                      <TimeSVG className="mr-2" />
                      {`${formatTime(request.startedAt)} - ${formatTime(
                        request.endedAt
                      )}`}
                    </div>
                    <div className="flex flex-row items-center">
                      <LocationSVG className="mr-2" />
                      {request.place}
                    </div>
                    <div className="flex items-start">
                      <MessageSquareText className="mr-2 w-4 h-4 mt-[2px]" />
                      <span className="min-w-0 break-words">
                        {request.description}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute right-3 top-3 flex flex-row items-center gap-2">
                  <div
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {getStatusLabel(request.status)}
                  </div>
                  <div
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors whitespace-nowrap ${getTypeColor(
                      request.type
                    )}`}
                  >
                    {getTypeLabel(request.type)}
                  </div>
                </div>
                <div className="absolute right-3 bottom-3">
                  <CCDeleteButton schedule={request} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <p className="text-xs text-gray-500 mt-3">
        * 관리자의 승인 전까지 신청 취소가 가능합니다.
      </p>
    </div>
  );
}
