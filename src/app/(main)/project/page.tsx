import { Metadata } from "next";
import { CurrentFilters } from "@/types/project";
import SCProjectList from "@/components/project/SCProjectList";
import { parseSearchParams } from "@/utils/projectUtils";
import CCProjectFilter from "@/components/project/CCProjectFilter";
import Link from "next/link";
import { Plus } from "lucide-react";
import {
  CategoryType,
  CATEGORY_OPTIONS,
  SubCategoryType,
  SUBCATEGORY_OPTIONS,
} from "@/types/category";

interface ProjectPageProps {
  searchParams: Promise<{
    search?: string;
    semester?: string;
    category?: string;
    subCategory?: string;
    status?: string;
    page?: string;
  }>;
}

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

  const filters: CurrentFilters = parseSearchParams(resolvedSearchParams);

  return (
    <div className="space-y-6 sm:space-y-0">
      <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 ">
        <div className="flex-1">
          <CCProjectFilter currentFilters={filters} />
        </div>
        <Link
          scroll={false}
          href="/project/write"
          className="inline-flex items-center justify-center gap-2 px-6 h-10 action-button whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />새 프로젝트 생성
        </Link>
      </div>
      <SCProjectList searchParams={searchParams} />
    </div>
  );
}
