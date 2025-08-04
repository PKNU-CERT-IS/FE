"server-only";

import CCAddScheduleCard from "@/components/schedule/CCAddScheduleCard";
import SCScheduleList from "@/components/schedule/SCScheduleList";
import Calendar from "@/components/schedule/calendar";
import SCAdminScheduleInfo from "@/components/admin/schedule/SCAdminScheduleInfo";
import SCAdminScheduleRequestList from "@/components/admin/schedule/SCAdminScheduleRequestList";

interface SearchPageProps {
  searchParams: Promise<{ date?: string }>;
}

export default async function AdminSchedulePage({
  searchParams,
}: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const selectedDate = resolvedSearchParams?.date || null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Calendar />
          </div>
          <div>
            <CCAddScheduleCard />
            <SCAdminScheduleInfo selectedDate={selectedDate} />
            <SCAdminScheduleRequestList />
          </div>
        </div>
        <SCScheduleList date={(await searchParams).date} />
      </div>
    </div>
  );
}
