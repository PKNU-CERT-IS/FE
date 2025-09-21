"server-only";

import BlogSearchBar from "@/components/blog/CCBlogSearchBar";
import CCBlogCategoryFilter from "@/components/blog/CCBlogCategoryFilter";
import CCBlogTabBar from "@/components/admin/blog/CCBlogTabBar";
import SCBlogContentList from "@/components/admin/blog/SCBlogContentList";
import CCBlogPagination from "@/components/blog/CCBlogPagination";
import { BlogCategory } from "@/types/blog";
import { blogTabCategoryType } from "@/types/admin/adminBlog";
import { isValidCategory } from "@/utils/blogUtils";
import { isValidTab } from "@/utils/adminBlogUtils";
import SCSearchResultNotFound from "@/components/ui/SCSearchResultNotFound";
import { searchBlogsByKeyword } from "@/app/api/blog/SCblogApi";

interface AdminBlogProps {
  searchParams: Promise<{
    keyword?: string;
    page?: string;
    category?: string;
    tab?: string;
  }>;
}

export default async function AdminBlogPage({ searchParams }: AdminBlogProps) {
  const resolvedSearchParams = await searchParams;

  const searchParam = resolvedSearchParams.keyword || "";
  const page = Math.max(1, parseInt(resolvedSearchParams.page || "1", 10));
  const currentCategory: BlogCategory =
    resolvedSearchParams.category &&
    isValidCategory(resolvedSearchParams.category)
      ? resolvedSearchParams.category
      : "전체";
  const tab: blogTabCategoryType =
    resolvedSearchParams.tab && isValidTab(resolvedSearchParams.tab)
      ? resolvedSearchParams.tab
      : "allPosts";

  const ITEMS_PER_PAGE = 6;

  // ✅ 백엔드에서 실제 데이터 조회
  const data = await searchBlogsByKeyword(
    {
      keyword: searchParam,
      category: currentCategory === "전체" ? "" : currentCategory,
    },
    { page: page - 1, size: ITEMS_PER_PAGE, sort: "createdAt,desc" }
  );

  const blogs = data.content;
  console.log(blogs);
  // ⚠️ 백엔드 응답 구조에 따라 조정 필요
  const { totalItems } = data; // 예시: { contents: Blog[], totalItems: number }

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const validCurrentPage = Math.min(page, Math.max(1, totalPages));

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* 검색 + 카테고리 필터 */}
        <div className="bg-white rounded-lg mb-5">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <BlogSearchBar currentKeyword={searchParam} />
            </div>
            <CCBlogCategoryFilter
              currentCategory={currentCategory}
              currentKeyword={searchParam}
            />
          </div>
        </div>

        {/* 탭 */}
        <div className="space-y-6 mb-5">
          <CCBlogTabBar />
        </div>

        {/* 컨텐츠 */}
        {blogs.length === 0 ? (
          <div className="flex items-center justify-center max-h-screen w-full">
            <SCSearchResultNotFound mode="adminBlog" />
          </div>
        ) : (
          <SCBlogContentList paginatedContents={blogs} />
        )}

        {/* 페이지네이션 */}
        {totalItems > 0 && (
          <div className="flex justify-center">
            <CCBlogPagination
              currentPage={validCurrentPage}
              totalItems={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentKeyword={searchParam}
              currentCategory={currentCategory}
            />
          </div>
        )}
      </div>
    </div>
  );
}
