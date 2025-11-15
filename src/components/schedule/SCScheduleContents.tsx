// components/schedule/ScheduleContents.tsx
import { getSchedules } from "@/app/api/schedule/SCscheduleApi";
import Calendar from "@/components/schedule/CCCalendar";
import SCScheduleInfo from "@/components/schedule/SCScheduleInfo";
import SCScheduleRequestList from "@/components/schedule/SCScheduleRequestList";
import SCScheduleList from "@/components/schedule/SCScheduleList";
import CCAddScheduleCard from "@/components/schedule/CCAddScheduleCard";
import { ScheduleInfo } from "@/types/schedule";

export default async function ScheduleContents({ date }: { date: string }) {
  const schedules: ScheduleInfo[] = await getSchedules(date);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Calendar schedules={schedules} selectedDate={date} />
        </div>

        <div>
          <CCAddScheduleCard />
          <div className="relative">
            <SCScheduleInfo selectedDate={date} />
          </div>
          <SCScheduleRequestList />
        </div>
      </div>

      <SCScheduleList id="all-schedule-list" date={date} />
    </>
  );
}
