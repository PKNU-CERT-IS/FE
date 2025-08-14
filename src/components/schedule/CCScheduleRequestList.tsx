"use client";
import { MessageSquareText } from "lucide-react";
import ScheduleSVG from "/public/icons/schedule.svg";
import LocationSVG from "/public/icons/location.svg";
import TimeSVG from "/public/icons/time.svg";
import { getTypeColor, getTypeLabel } from "@/utils/scheduleUtils";
import CCDeleteButton from "@/components/admin/schedule/CCDeleteButton";
import { useMemo } from "react";
import { ScheduleInfo } from "@/types/schedule";
import { formatDate, formatTime } from "@/utils/formatDateUtil";

export default function CCScheduleRequestList({
  requests,
  onRemove,
}: {
  requests: ScheduleInfo[];
  onRemove: (id: number) => void;
}) {
  const count = useMemo(() => requests.length, [requests]);
  if (count === 0) return null;

  return (
    <div className="mt-6 p-6 rounded-lg border bg-white border-gray-200 shadow-sm h-min">
      <p className="text-lg font-semibold mb-4">예약 신청 현황</p>

      <div className="space-y-4 max-h-[35rem] overflow-y-auto">
        {requests.map((request) => (
          <div key={request.id} className="text-sm text-gray-700">
            <div className="relative flex items-start border p-3 rounded-lg border-gray-200 bg-gray-50 gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-md font-semibold text-gray-700 mb-3">
                  {request.title}
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex flex-row items-center">
                    <ScheduleSVG className="w-4 mr-2 stroke-gray-700" />
                    {formatDate(request.started_at, "dot")}
                  </div>
                  <div className="flex flex-row items-center">
                    <TimeSVG className="mr-2" />
                    {`${formatTime(request.started_at)} - ${formatTime(
                      request.ended_at
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

              <div
                className={`absolute right-3 top-3 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors shrink-0 whitespace-nowrap ${getTypeColor(
                  request.type
                )}`}
              >
                {getTypeLabel(request.type)}
              </div>
              <div className="absolute right-3 bottom-3">
                <CCDeleteButton schedule={request} onRemove={onRemove} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-3">
        * 관리자의 승인 전까지 신청 취소가 가능합니다.
      </p>
    </div>
  );
}
