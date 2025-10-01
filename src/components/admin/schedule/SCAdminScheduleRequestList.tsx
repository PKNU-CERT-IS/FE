"server-only";

import {
  approveReservation,
  rejectReservation,
} from "@/actions/admin/schedule/AdminScheduleRequestServerAction";
import { getPendingSchedules } from "@/app/api/schedule/SCAdminScheduleApi";
import RequestActionButtons from "@/components/ui/requestActionButtons";
import { formatDateRange, formatTime } from "@/utils/formatDateUtil";
import {
  CheckCircle,
  Clock,
  User,
  Calendar,
  MessageSquareText,
} from "lucide-react";

export default async function CCAdminScheduleRequestList() {
  const pending = await getPendingSchedules();

  return (
    <div className="p-6 rounded-lg border border-gray-200 shadow-sm mt-6">
      <div className="flex flex-col space-y-1.5 mb-4">
        <div className="text-lg font-semibold leading-none tracking-tight">
          승인/거절
        </div>
        <div className="text-sm text-muted-foreground">
          대기 중인 예약 요청 ({pending.length}건)
        </div>
      </div>
      <div className="pt-0 max-h-[18rem] overflow-y-auto">
        {pending.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <p className="text-sm text-gray-500">
              승인 대기 중인
              <br />
              예약이 없습니다
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pending.map((reservation) => (
              <div
                key={reservation.scheduleId}
                className="border border-gray-200 rounded-lg p-3"
              >
                <div className="mb-3">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">
                    {reservation.title}
                  </h4>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{reservation.memberInfo.memberName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {formatDateRange(
                          reservation.startedAt,
                          reservation.endedAt,
                          "dot"
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>
                        {formatTime(reservation.startedAt)} -{" "}
                        {formatTime(reservation.endedAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquareText className="w-3 h-3" />
                      <span>{reservation.description}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <RequestActionButtons
                    id={reservation.scheduleId}
                    approveAction={approveReservation}
                    rejectAction={rejectReservation}
                    fieldName="id"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
