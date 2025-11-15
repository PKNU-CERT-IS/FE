"server-only";

import SCScheduleList from "@/components/schedule/SCScheduleList";
import Calendar from "@/components/schedule/CCCalendar";
import SCAdminScheduleInfo from "@/components/admin/schedule/SCAdminScheduleInfo";
import SCAdminScheduleRequestList from "@/components/admin/schedule/SCAdminScheduleRequestList";
import CCScrollScheduleList from "@/components/schedule/CCScrollScheduleList";
import { ScheduleInfo } from "@/types/schedule";
import { getSchedules } from "@/app/api/schedule/SCscheduleApi";
import CCAddScheduleCard from "@/components/schedule/CCAddScheduleCard";

interface SearchPageProps {
  searchParams: Promise<{ date: string }>;
}
function toLocalDate(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().split("T")[0];
}

export default async function AdminSchedulePage({
  searchParams,
}: SearchPageProps) {
  const resolvedSearchParams = await searchParams;

  const selectedDate = resolvedSearchParams?.date
    ? toLocalDate(resolvedSearchParams.date)
    : toLocalDate(new Date());

  const schedules: ScheduleInfo[] = await getSchedules(selectedDate);
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="absolute right-4 top-40 sm:hidden z-10">
          <CCScrollScheduleList />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Calendar schedules={schedules} selectedDate={selectedDate} />
          </div>
          <div>
            <CCAddScheduleCard />
            <SCAdminScheduleInfo selectedDate={selectedDate} />
            <SCAdminScheduleRequestList />
          </div>
        </div>
        <SCScheduleList date={selectedDate} />
      </div>
    </div>
  );
}
