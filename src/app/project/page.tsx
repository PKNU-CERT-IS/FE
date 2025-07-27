import { Metadata } from "next";
import CCProjectSearchBar from "@/components/project/CCProjectSearchBar"; // board에서 project로 변경
import CCProjectCategory from "@/components/project/CCProjectCategory";
import PlusSVG from "/public/icons/plus.svg";
import { PROJECT_CATEGORIES, ProjectCategoryType } from "@/types/project";
import Link from "next/link";
import SCProjectContent from "@/components/project/SCProjectContent";

interface ProjectPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string; // category 파라미터 추가
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
  const { search, category } = await searchParams;

  const currentSearch = search || "";
  const currentCategory: ProjectCategoryType =
    category && isValidCategory(category) ? category : "전체";

  return (
    <div className="space-y-6">
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <CCProjectSearchBar currentSearch={currentSearch} />
        <CCProjectCategory selectedCategory={currentCategory} />
        <Link
          scroll={false}
          href="/project/write"
          className="inline-flex items-center gap-2 px-4 py-2  text-white rounded-md action-button"
        >
          <PlusSVG className="w-4 h-4" />새 프로젝트 작성
        </Link>
      </div>

      <SCProjectContent searchParams={searchParams} />
    </div>
  );
}
