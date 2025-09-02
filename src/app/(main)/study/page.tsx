import { Suspense } from "react";
import CCStudyFilter from "@/components/study/CCStudyFilter";
import SCStudyContent from "@/components/study/SCStudyContent";
import SCStudySkeleton from "@/components/study/SCStudySkeleton";
import type { StudyPageProps, CurrentFilters } from "@/types/study";
import Link from "next/link";
import { Plus } from "lucide-react";
import { parseSearchParams } from "@/utils/studyHelper";
import { Metadata } from "next";
import {
  CATEGORY_OPTIONS,
  CategoryType,
  SUBCATEGORY_OPTIONS,
  SubCategoryType,
} from "@/types/category";

const isValidCategory = (category: string): category is CategoryType => {
  return CATEGORY_OPTIONS.includes(category as CategoryType);
};
const isValidSubCategory = (
  subCategory: string
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
