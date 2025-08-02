import { Metadata } from "next";
import {
  PROJECT_CATEGORIES,
  ProjectCategoryType,
  CurrentFilters,
} from "@/types/project";
import SCProjectList from "@/components/project/SCProjectList";
import { parseSearchParams } from "@/utils/projectUtils";
import CCProjectFilter from "@/components/project/CCProjectFilter";
import Link from "next/link";
import { Plus } from "lucide-react";

interface ProjectPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    semester?: string;
    technique?: string;
    status?: string;
    page?: string;
  }>;
}

const isValidCategory = (category: string): category is ProjectCategoryType => {
  return PROJECT_CATEGORIES.includes(category as ProjectCategoryType);
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}): Promise<Metadata> {
  const { search, category } = await searchParams;

  const validCategory =
    category && isValidCategory(category) ? category : "전체";
  return {
    title: `${search ? `${search} - ` : ""}Security Project`,
    description: `보안 프로젝트${
      validCategory !== "전체" ? ` - ${validCategory}` : ""
    }`,
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
