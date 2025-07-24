import { Suspense } from "react";
import CCStudyFilter from "@/components/study/CCStudyFilter";
import SCStudyContent from "@/components/study/SCStudyContent";
import SCStudySkeleton from "@/components/study/SCStudySkeleton";
import type { StudyPageProps, CurrentFilters } from "@/types/study";
import { parseSearchParams } from "@/utils/study/studyHelper";

export default async function StudyPage({ searchParams }: StudyPageProps) {
  // 🚀 Next.js 15: searchParams를 await 해서 사용
  const resolvedSearchParams = await searchParams;

  // URL에서 필터 파라미터 추출 (안전한 파싱 사용)
  const filters: CurrentFilters = parseSearchParams(resolvedSearchParams);

  return (
    <div className="space-y-6">
      {/* 검색 및 필터 - Client Component */}
      <CCStudyFilter currentFilters={filters} />
      {/* 콘텐츠 - Suspense로 감싼 카드 그리드 */}
      <Suspense fallback={<SCStudySkeleton />}>
        {/* SCStudyContent에 Promise searchParams 전달 */}
        <SCStudyContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
