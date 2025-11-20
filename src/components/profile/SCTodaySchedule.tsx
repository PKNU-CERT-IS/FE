"server-only";

import { ScheduleInProfileData } from "@/types/schedule";
import { formatTime } from "@/utils/formatDateUtil";
import { getTypeColor, getTypeLabel } from "@/utils/scheduleUtils";
import { getProfile } from "@/app/api/profile/SCprofileApi";
import DefaultBadge from "@/components/ui/defaultBadge";
import { Clock, MapPin } from "lucide-react";
import ScheduleSVG from "/public/icons/schedule.svg";

export default async function SCTodaySchedule() {
  const profile = await getProfile();
  return (
    <div className="mt-7">
      <div className="card-list text-card-foreground p-6 cursor-default dark-default">
        <h3 className="text-xl font-semibold mb-6 text-gray-900 flex items-center gap-2 dark:text-gray-200">
          <ScheduleSVG className="w-5 h-5 stroke-cert-red" />
          오늘 일정
        </h3>
        <div>
          {profile.todaySchedules.length > 0 ? (
            <div className="space-y-3">
              {profile.todaySchedules.map((schedule: ScheduleInProfileData) => (
                <div
                  key={schedule.id}
                  className="card-list bg-gray-50 flex items-center justify-between p-3 group cursor-default"
                >
                  <div>
                    <div className="font-medium text-sm text-gray-900 dark:text-gray-100 group-hover:text-cert-red dark:group-hover:text-red-400 transition-colors">
                      {schedule.title}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 transition-colors duration-300">
                      <Clock className="w-3 h-3" />
                      {`${formatTime(schedule.startTime)} - ${formatTime(
                        schedule.endTime,
                      )}`}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 transition-colors duration-300">
                      <MapPin className="w-3 h-3" />
                      {schedule.place}
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
