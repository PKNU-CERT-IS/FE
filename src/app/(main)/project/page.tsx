"server-only";

import { Suspense } from "react";
import { Metadata } from "next";
import {
  CATEGORY_OPTIONS,
  CategoryType,
  SUBCATEGORY_OPTIONS,
  SubCategoryType,
} from "@/types/category";
import { ProjectCurrentFilters } from "@/types/project";
import { parseSearchParams } from "@/utils/projectUtils";
import CCProjectFilter from "@/components/project/CCProjectFilter";
import SCProjectList from "@/components/project/SCProjectList";
import SCProjectSkeleton from "@/components/project/SCProjectSkeleton";
import SCNewPostButton from "@/components/ui/SCNewPostButton";

interface ProjectPageProps {
  searchParams: Promise<{
    search?: string;
    semester?: string;
    category?: string;
    subCategory?: string;
    projectStatus?: string;
    page?: string;
  }>;
}

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
    projectStatus?: string;
  }>;
}): Promise<Metadata> {
  const { search, category, subCategory } = await searchParams;

  const validCategory =
    category && isValidCategory(category) ? category : "전체";
  const validSubCategory =
    subCategory && isValidSubCategory(subCategory) ? subCategory : "전체";

  return {
    title: `CERT-IS Project${
      validCategory !== "전체" ? ` - ${validCategory}` : ""
    }${search ? ` | ${search}` : ""}`,
    description:
      search && validCategory !== "전체"
        ? `'${search}', '${validCategory} - ${validSubCategory}' 관련 프로젝트 목록입니다.`
        : search
          ? `'${search}' 관련 프로젝트 목록입니다.`
          : validCategory !== "전체"
            ? `'${validCategory} - ${validSubCategory}' 관련 프로젝트 목록입니다.`
            : "CERT-IS 동아리 프로젝트 목록입니다.",
    openGraph: {
      title: "CERT-IS Project",
      description: "다양한 보안 프로젝트와 연구 결과를 공유하는 공간입니다.",
      images: ["/logo.svg"],
    },
  };
}

export default async function ProjectPage({ searchParams }: ProjectPageProps) {
  const resolvedSearchParams = await searchParams;
  const { search, category, page, projectStatus, semester } =
    resolvedSearchParams;
  const filters: ProjectCurrentFilters =
    parseSearchParams(resolvedSearchParams);

  return (
    <div className="space-y-6 sm:space-y-0">
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 ">
        <div className="flex-1">
          <CCProjectFilter projectCurrentFilters={filters} />
        </div>
        <SCNewPostButton
          href="/project/write"
          buttonText="새 프로젝트 생성"
          className="px-6 h-10 sm:w-auto w-full items-center"
        />
      </div>
      <Suspense
        key={JSON.stringify({
          search,
          category,
          page,
          projectStatus,
          semester,
        })}
        fallback={<SCProjectSkeleton />}
      >
        <SCProjectList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
