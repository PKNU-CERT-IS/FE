"server-only";
import { mockScheduleData } from "@/mocks/mockScheduleData";
import { getTypeColor, getTypeLabel } from "@/utils/scheduleUtils";
import ScheduleSVG from "/public/icons/schedule.svg";
import LocationSVG from "/public/icons/location.svg";
import TimeSVG from "/public/icons/time.svg";

interface SCScheduleListProps {
  date?: string;
}

export default async function CCScheduleList({ date }: SCScheduleListProps) {
  const schedules = await mockScheduleData();

  const baseDate = date ? new Date(date) : new Date();
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth() + 1;

  const filteredSchedules = schedules.filter((s) => {
    const d = new Date(s.date);
    return d.getFullYear() === year && d.getMonth() + 1 === month;
  });

  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {`${month}월 전체 일정`}
      </h2>

      {filteredSchedules.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-5 ">
          {`${month}월 일정이 없습니다.`}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchedules.map((schedule) => (
            <div
              key={schedule.id}
              className="rounded-lg border text-card-foreground shadow-sm bg-white border-gray-200 hover:border-cert-red/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-md font-semibold text-gray-700 mb-3">
                      {schedule.title}
                    </p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <ScheduleSVG className="w-4 mr-2" stroke="#4B5563" />
                        {new Date(schedule.date).toLocaleDateString("ko-KR")}
                      </div>
                      <div className="flex items-center">
                        <TimeSVG className="mr-2" />
                        {schedule.startTime} - {schedule.endTime}
                      </div>
                      <div className="flex items-center">
                        <LocationSVG className="mr-2" />
                        {schedule.location}
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
