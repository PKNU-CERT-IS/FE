"server-only";

import { Suspense } from "react";
import { Metadata } from "next";
import CCScrollScheduleList from "@/components/schedule/CCScrollScheduleList";
import ScheduleContents from "@/components/schedule/SCScheduleContents";
import SCScheduleSkeleton from "@/components/schedule/SCScheduleSkeleton";

interface SearchPageProps {
  searchParams: Promise<{ date: string }>;
}

function toLocalDate(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().split("T")[0];
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

export default async function SchedulePage({ searchParams }: SearchPageProps) {
  const params = await searchParams;

  const selectedDate = params?.date
    ? toLocalDate(params.date)
    : toLocalDate(new Date());

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="absolute right-4 top-40 sm:hidden z-10">
          <CCScrollScheduleList />
        </div>

        <Suspense fallback={<SCScheduleSkeleton />}>
          <ScheduleContents date={selectedDate} />
        </Suspense>
      </div>
    </div>
  );
}
