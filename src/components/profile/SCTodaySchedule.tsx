"server-only";

import ScheduleSVG from "/public/icons/schedule.svg";
import { Clock, MapPin } from "lucide-react";
import DefaultBadge from "@/components/ui/defaultBadge";
import { mockScheduleData } from "@/mocks/mockScheduleData";
import { getTypeColor, getTypeLabel } from "@/utils/scheduleUtils";

// 오늘 날짜 YYYY-MM-DD 포맷 생성
const todayStr = new Date().toISOString().split("T")[0];

// 오늘 일정만 필터링
const todaySchedule = mockScheduleData().filter(
  (schedule) => schedule.date === todayStr
);

export default function SCTodaySchedule() {
  return (
    <div className="mt-7">
      <div className="card-list text-card-foreground p-6 cursor-auto">
        <h3 className="text-xl font-semibold mb-6 text-gray-900 flex items-center gap-2">
          <ScheduleSVG className="w-5 h-5 stroke-cert-red" />
          오늘 일정
        </h3>
        <div>
          {todaySchedule.length > 0 ? (
            <div className="space-y-3">
              {todaySchedule.map((schedule) => (
                <div
                  key={schedule.id}
                  className="card-list bg-gray-50 flex items-center justify-between p-3 group cursor-auto"
                >
                  <div>
                    <div className="font-medium text-sm text-gray-900 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {schedule.title}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 transition-colors duration-300">
                      <Clock className="w-3 h-3" />
                      {schedule.startTime} - {schedule.endTime}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 transition-colors duration-300">
                      <MapPin className="w-3 h-3" />
                      {schedule.location}
                    </div>
                  </div>
                  <DefaultBadge className={getTypeColor(schedule.type)}>
                    {getTypeLabel(schedule.type)}
                  </DefaultBadge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center py-4 transition-colors duration-300">
              오늘 일정이 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
