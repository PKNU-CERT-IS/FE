import { Metadata } from "next";
import CCBlogPagination from "@/components/blog/CCBlogPagination";
import CCBlogCategoryFilter from "@/components/blog/CCBlogCategoryFilter";
import { Plus } from "lucide-react";
import { BlogCategory } from "@/types/blog";
import { isValidCategory } from "@/utils/blogUtils";
import Link from "next/link";
import BlogSearchBar from "@/components/blog/CCBlogSearchBar";
import { formatDate } from "@/utils/formatDateUtil";
import SCSearchResultNotFound from "@/components/ui/SCSearchResultNotFound";
import { getCategoryColor } from "@/utils/badgeUtils";
import { searchBlogsByKeyword } from "@/app/api/blog/SCblogApi";
import { BlogDataType } from "@/types/blog";

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    keyword?: string;
    category?: string;
  }>;
}
const ITEMS_PER_PAGE = 9;

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

// children 매개변수 제거
export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page, keyword, category } = await searchParams;

  const currentPage = Math.max(1, parseInt(page || "0", 10));
  const currentKeyword = keyword?.trim() || "";
  const currentCategory: BlogCategory =
    category && isValidCategory(category) ? category : "전체";

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
  const blogs = response.content;
  const totalItems = response.totalElements;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const validCurrentPage = Math.min(currentPage, Math.max(1, totalPages));
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* 메인 헤더 */}

        {/* 검색 및 필터 바 */}
        <div className=" rounded-lg mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* 검색바 */}
            <div className="flex-1 w-full">
              <BlogSearchBar currentKeyword={currentKeyword} />
            </div>
            {/* 카테고리 필터 - 클라이언트 컴포넌트로 분리 */}
            <CCBlogCategoryFilter
              currentCategory={currentCategory}
              currentKeyword={currentKeyword}
            />

            {/* 새 글 작성 버튼 */}
            <Link
              href="/blog/write"
              className="action-button inline-flex gap-2 px-4 py-2 whitespace-nowrap sm:w-auto w-full justify-center"
            >
              <Plus className="w-4 h-4" />새 글 작성
            </Link>
          </div>
        </div>

        {/* 블로그 카드 목록 */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {blogs.map((blog: BlogDataType) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.id}`}
                className="card-list block overflow-hidden dark-default"
              >
                <div className="p-5">
                  {/* 카테고리 및 날짜 */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium 
                        ${getCategoryColor(blog.category)}`}
                    >
                      {blog.category}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(blog.createdAt)}
                    </span>
                  </div>

                  {/* 제목 */}
                  <h3 className="font-semibold text-gray-900 mb-3 text-base leading-tight line-clamp-2  dark:text-gray-200">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-3 leading-relaxed  dark:text-gray-300">
                    {blog.description}
                  </p>

                  {blog.referenceType && (
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mb-3 ${
                        blog.referenceType === "STUDY"
                          ? "badge-green"
                          : "badge-blue"
                      }`}
                    >
                      {blog.referenceType === "STUDY" ? "스터디" : "프로젝트"} ·{" "}
                      {blog.referenceTitle}
                    </span>
                  )}
                  {/* 작성자 */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                    <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-gray-600">
                        {blog.blogCreatorName?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-gray-700 font-medium dark:text-gray-300">
                      {blog.blogCreatorName}
                    </span>
                    {/* ✅ reference 뱃지 */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <SCSearchResultNotFound mode="blog" />
        )}

        {/* 페이지네이션 */}
        {totalItems > 0 && (
          <div className="flex justify-center">
            <CCBlogPagination
              currentPage={validCurrentPage}
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
