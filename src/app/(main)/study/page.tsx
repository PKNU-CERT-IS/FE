import { Suspense } from "react";
import CCStudyFilter from "@/components/study/CCStudyFilter";
import SCStudyContent from "@/components/study/SCStudyContent";
import SCStudySkeleton from "@/components/study/SCStudySkeleton";
import type { StudyPageProps, CurrentFilters } from "@/types/study";
import Link from "next/link";
import { Plus } from "lucide-react";
import { parseSearchParams } from "@/utils/studyHelper";

export default async function StudyPage({ searchParams }: StudyPageProps) {
  // 🚀 Next.js 15: searchParams를 await 해서 사용
  const resolvedSearchParams = await searchParams;

  // URL에서 필터 파라미터 추출 (안전한 파싱 사용)
  const filters: CurrentFilters = parseSearchParams(resolvedSearchParams);

  return (
    <div className="space-y-6 sm:space-y-0">
      {/* 검색 및 필터 - Client Component */}
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-4">
        <div className="flex-1">
          <CCStudyFilter currentFilters={filters} />
        </div>
        <Link
          href={"/study/write"}
          className="inline-flex items-center justify-center gap-2 px-6 h-10 action-button whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>새 스터디 생성</span>
        </Link>
      </div>

      {/* 콘텐츠 - Suspense로 감싼 카드 그리드 */}
      <Suspense fallback={<SCStudySkeleton />}>
        {/* SCStudyContent에 Promise searchParams 전달 */}
        <SCStudyContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
