"server-only";
import { Suspense } from "react";
import { Metadata } from "next";
import {
  CATEGORY_OPTIONS,
  CategoryType,
  SUBCATEGORY_OPTIONS,
  SubCategoryType,
} from "@/types/category";
import type { StudyPageProps } from "@/types/study";
import { parseSearchParams } from "@/utils/studyHelper";
import CCStudyFilterController from "@/components/study/CCStudyFilterController";
import SCStudyContent from "@/components/study/SCStudyContent";
import SCStudySkeleton from "@/components/study/SCStudySkeleton";
import SCNewPostButton from "@/components/ui/SCNewPostButton";

const isValidCategory = (category: string): category is CategoryType => {
  return CATEGORY_OPTIONS.includes(category as CategoryType);
};
const isValidSubCategory = (
  subCategory: string,
): subCategory is SubCategoryType => {
  return SUBCATEGORY_OPTIONS.includes(subCategory as SubCategoryType);
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    category?: string;
    subCategory?: string;
    studyStatus?: string;
    semester?: string;
  }>;
}): Promise<Metadata> {
  const { search, category, subCategory } = await searchParams;

  const validCategory =
    category && isValidCategory(category) ? category : "전체";

  const validSubCategory =
    subCategory && isValidSubCategory(subCategory) ? subCategory : "전체";

  return {
    title: `CERT-IS Study${
      validCategory !== "전체" ? ` - ${validCategory}` : ""
    }${search ? ` | ${search}` : ""}`,
    description:
      search && validCategory !== "전체"
        ? `'${search}', '${validCategory} - ${validSubCategory}' 관련 스터디 목록입니다.`
        : search
          ? `'${search}' 관련 스터디 목록입니다.`
          : validCategory !== "전체"
            ? `'${validCategory} - ${validSubCategory}' 관련 스터디 목록입니다.`
            : "CERT-IS 동아리 스터디 목록입니다.",
    openGraph: {
      title: "CERT-IS Study",
      description: "보안 연구 자료와 학습 리소스를 공유하는 공간입니다.",
      images: ["/logo.svg"],
    },
  };
}

export default async function StudyPage({ searchParams }: StudyPageProps) {
  const resolvedSearchParams = await searchParams;
  const { search, category, page, studyStatus, semester } =
    resolvedSearchParams;

  // URL에서 필터 파라미터 추출 (안전한 파싱 사용)
  const filters = parseSearchParams(resolvedSearchParams);

  return (
    <div className="space-y-6 sm:space-y-0">
      {/* 검색 및 필터 - Client Component */}
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-4">
        <div className="flex-1">
          <CCStudyFilterController studyCurrentFilters={filters} />
        </div>
        <SCNewPostButton
          href="/study/write"
          buttonText="새 스터디 생성"
          className="px-6 h-10 sm:w-auto w-full items-center"
        />
      </div>

      {/* 콘텐츠 - Suspense로 감싼 카드 그리드 */}
      <Suspense
        key={JSON.stringify({ search, category, page, studyStatus, semester })}
        fallback={<SCStudySkeleton />}
      >
        <SCStudyContent searchParams={resolvedSearchParams} />
      </Suspense>
    </div>
  );
}
