import CCScheduleRequestWrapper from "@/components/schedule/CCScheduleRequestWrapper";
import SCScheduleInfo from "@/components/schedule/SCScheduleInfo";
import SCScheduleList from "@/components/schedule/SCScheduleList";
import Calendar from "@/components/schedule/calendar";
import CCScrollScheduleList from "@/components/schedule/CCScrollScheduleList";

interface SearchPageProps {
  searchParams: Promise<{ date?: string }>;
}

export default async function SchedulePage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const selectedDate = resolvedSearchParams?.date || null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="absolute right-4 top-40 sm:hidden z-10">
          <CCScrollScheduleList />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Calendar />
          </div>
          <div>
            <CCScheduleRequestWrapper>
              <div className="relative">
                <SCScheduleInfo selectedDate={selectedDate} />
              </div>
            </CCScheduleRequestWrapper>
          </div>
        </div>

        <SCScheduleList
          id="all-schedule-list"
          date={selectedDate ?? undefined}
        />
      </div>
    </div>
  );
}
