import SCScheduleInfo from "@/components/schedule/SCScheduleInfo";
import SCScheduleList from "@/components/schedule/SCScheduleList";
import Calendar from "@/components/schedule/calendar";
import CCScrollScheduleList from "@/components/schedule/CCScrollScheduleList";
import { Metadata } from "next";
import { getSchedules } from "@/app/api/schedule/SCschedule";
import { ScheduleInfo } from "@/types/schedule";
import SCScheduleRequestList from "@/components/schedule/SCScheduleRequestList";
import CCAddScheduleCard from "@/components/schedule/CCAddScheduleCard";

interface SearchPageProps {
  searchParams: Promise<{ date: string }>;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}): Promise<Metadata> {
  const { date } = await searchParams;
  let title = "CERT-IS Schedule";
  let description = "CERT-IS 동아리 일정을 관리하는 공간입니다.";

  if (date) {
    const d = new Date(date);
    if (!isNaN(d.getTime())) {
      const formatted = `${d.getFullYear()}년 ${d.getMonth() + 1}월`;
      title = `CERT-IS Schedule - ${formatted}`;
      description = `CERT-IS 동아리의 ${formatted} 일정을 확인하세요.`;
    }
  }
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ["/logo.svg"],
    },
  };
}

function toLocalDate(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().split("T")[0];
}
export default async function SchedulePage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;

  const selectedDate = resolvedSearchParams?.date
    ? toLocalDate(resolvedSearchParams.date)
    : toLocalDate(new Date());

  const schedules: ScheduleInfo[] = await getSchedules(selectedDate);

  return (
    <div className="min-h-screen">
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

            <div className="relative">
              <SCScheduleInfo selectedDate={selectedDate} />
            </div>
            <SCScheduleRequestList />
          </div>
        </div>

        <SCScheduleList id="all-schedule-list" date={selectedDate ?? ""} />
      </div>
    </div>
  );
}
