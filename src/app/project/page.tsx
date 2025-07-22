import { Suspense } from "react";
import SCProjectDescription from "@/components/project/SCProjectDescription";
import CCStudyFilter from "@/components/study/CCStudyFilter";
import SCProjectContent from "@/components/project/SCProjectContent";
import SCStudySkeleton from "@/components/study/SCStudySkeleton";
import type { StudyPageProps, CurrentFilters } from "@/types/study";
import { parseSearchParams } from "@/utils/study/studyHelper";

export default async function ProjectPage({ searchParams }: StudyPageProps) {
  // 🚀 Next.js 15: searchParams를 await 해서 사용
  const resolvedSearchParams = await searchParams;

  // URL에서 필터 파라미터 추출 (안전한 파싱 사용)
  const filters: CurrentFilters = parseSearchParams(resolvedSearchParams);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 - Server Component */}
        <SCProjectDescription />

        {/* 검색 및 필터 - Client Component */}
        <CCStudyFilter currentFilters={filters} />

        {/* 콘텐츠 - Suspense로 감싼 카드 그리드 */}
        <Suspense fallback={<SCStudySkeleton />}>
          {/* SCProjectContent에 Promise searchParams 전달 */}
          <SCProjectContent searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
