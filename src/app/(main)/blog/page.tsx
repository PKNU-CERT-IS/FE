"server-only";

import { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import BlogSearchBar from "@/components/blog/CCBlogSearchBar";
import CCBlogCategoryFilter from "@/components/blog/CCBlogCategoryFilter";
import BlogCardList from "@/components/blog/SCBlogCardList";
import SCBlogSkeleton from "@/components/blog/SCBlogSkeleton";
import BlogPagination from "@/components/blog/CCBlogPagination";

import { BlogCategory } from "@/types/blog";
import { isValidCategory } from "@/utils/blogUtils";
import { searchBlogsByKeyword } from "@/app/api/blog/SCblogApi";

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    keyword?: string;
    category?: string;
  }>;
}

const ITEMS_PER_PAGE = 9;

// Metadata
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string; category?: string }>;
}): Promise<Metadata> {
  const { keyword, category } = await searchParams;

  const validCategory =
    category && isValidCategory(category) ? category : "전체";

  return {
    title: `CERT-IS Blog${
      validCategory !== "전체" ? ` - ${validCategory}` : ""
    }${keyword ? ` | ${keyword}` : ""}`,
    description:
      keyword && validCategory !== "전체"
        ? `'${keyword}', '${validCategory}' 관련 블로그 글 목록입니다.`
        : keyword
        ? `'${keyword}' 관련 블로그 글 목록입니다.`
        : validCategory !== "전체"
        ? `'${validCategory}' 관련 블로그 글 목록입니다.`
        : "CERT-IS 동아리 블로그 글 목록입니다.",
    openGraph: {
      title: "CERT-IS Blog",
      description: "동아리 멤버들의 경험과 지식을 공유하는 공간입니다.",
      images: ["/logo.svg"],
    },
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolved = await searchParams;

  const currentPage = Math.max(1, parseInt(resolved.page || "1", 10));
  const currentKeyword = resolved.keyword?.trim() || "";
  const currentCategory: BlogCategory =
    resolved.category && isValidCategory(resolved.category)
      ? resolved.category
      : "전체";

  const response = await searchBlogsByKeyword(
    {
      keyword: currentKeyword,
      category: currentCategory === "전체" ? "" : currentCategory,
    },
    {
      page: currentPage - 1,
      size: ITEMS_PER_PAGE,
      sort: "createdAt,desc",
    }
  );

  const totalItems = response.totalElements;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* 검색/필터 */}
        <div className="rounded-lg mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <BlogSearchBar currentKeyword={currentKeyword} />
            </div>

            <CCBlogCategoryFilter
              currentCategory={currentCategory}
              currentKeyword={currentKeyword}
            />

            <Link
              href="/blog/write"
              className="action-button inline-flex gap-2 px-4 py-2 whitespace-nowrap sm:w-auto w-full justify-center"
            >
              <Plus className="w-4 h-4" />새 글 작성
            </Link>
          </div>
        </div>

        {/* 콘텐츠 */}
        <Suspense fallback={<SCBlogSkeleton />}>
          <BlogCardList searchParams={resolved} />
        </Suspense>

        {/* 페이지네이션 */}
        {totalItems > 0 && (
          <div className="flex justify-center">
            <BlogPagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentKeyword={currentKeyword}
              currentCategory={currentCategory}
            />
          </div>
        )}
      </div>
    </div>
  );
}
