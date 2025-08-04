"server-only";

import {
  approveReservation,
  rejectReservation,
} from "@/actions/admin/schedule/AdminScheduleRequestServerAction";
import RequestActionButtons from "@/components/ui/requestActionButtons";
import { PendingReservationType } from "@/types/admin/adminScheduleReservation";
import { SCHEDULE_TYPES } from "@/types/schedule";
import { CheckCircle, Clock, User, Calendar, MapPin } from "lucide-react";

const pendingReservations: PendingReservationType[] = [
  {
    id: 1,
    title: "웹 해킹 스터디",
    date: "2025-07-25",
    startTime: "14:00",
    endTime: "17:00",
    location: "동아리방",
    type: SCHEDULE_TYPES.STUDY,
    applicant: "김철수",
    status: "승인중",
  },
  {
    id: 2,
    title: "암호학 스터디",
    date: "2025-07-28",
    startTime: "18:00",
    endTime: "20:00",
    location: "동아리방",
    type: SCHEDULE_TYPES.STUDY,
    applicant: "이영희",
    status: "승인중",
  },
  {
    id: 3,
    title: "네트워크 보안 프로젝트 회의",
    date: "2025-07-30",
    startTime: "13:00",
    endTime: "16:00",
    location: "동아리방",
    type: SCHEDULE_TYPES.MEETING,
    applicant: "박민수",
    status: "승인중",
  },
  {
    id: 4,
    title: "정보보안 회의",
    date: "2025-07-31",
    startTime: "10:00",
    endTime: "12:00",
    location: "대강의실",
    type: SCHEDULE_TYPES.MEETING,
    applicant: "박민수",
    status: "승인중",
  },
];

export default function CCAdminScheduleRequestList() {
  const pending = pendingReservations;

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
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
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
                key={reservation.id}
                className="border border-gray-200 rounded-lg p-3"
              >
                <div className="mb-3">
                  <h4 className="font-medium text-gray-900 text-sm mb-1">
                    {reservation.title}
                  </h4>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{reservation.applicant}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{reservation.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>
                        {reservation.startTime} ~ {reservation.endTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{reservation.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <RequestActionButtons
                    id={reservation.id}
                    approveAction={approveReservation}
                    rejectAction={rejectReservation}
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
