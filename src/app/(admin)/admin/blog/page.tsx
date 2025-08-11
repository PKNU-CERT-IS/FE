"server-only";

import BlogSearchBar from "@/components/blog/CCBlogSearchBar";
import CCBlogCategoryFilter from "@/components/blog/CCBlogCategoryFilter";
import CCBlogTabBar from "@/components/admin/blog/CCBlogTabBar";
import SCBlogContentList from "@/components/admin/blog/SCBlogContentList";
import CCBlogPagination from "@/components/blog/CCBlogPagination";
import { BlogCategory } from "@/types/blog";
import { blogTabCategoryType } from "@/types/admin/adminBlog";
import { mockBlogPosts } from "@/mocks/blogData";
import { isValidCategory } from "@/utils/blogUtils";
import { isValidTab } from "@/utils/adminBlogUtils";

interface AdminBlogProps {
  searchParams: Promise<{
    search?: string;
    page?: string;
    category?: string;
    tab?: string;
  }>;
}

export default async function AdminBlogPage({ searchParams }: AdminBlogProps) {
  const resolvedSearchParams = await searchParams;

  const searchParam = resolvedSearchParams.search || "";
  const page = resolvedSearchParams.page;
  const category = resolvedSearchParams.category;
  const tab = resolvedSearchParams.tab;

  const ITEMS_PER_PAGE = 6;

  const currentPage = Math.max(1, parseInt(page || "1", 10));
  const currentSearch = searchParam.trim() || "";
  const currentCategory: BlogCategory =
    category && isValidCategory(category) ? category : "전체";
  const currentTab: blogTabCategoryType =
    tab && isValidTab(tab) ? tab : "allPosts";

  const baseFiltered =
    currentCategory === "전체"
      ? mockBlogPosts
      : mockBlogPosts.filter((post) => post.category === currentCategory);

  const tabFiltered =
    currentTab === "publishedPosts"
      ? baseFiltered.filter((post) => post.published)
      : baseFiltered;

  const filteredContents = tabFiltered.filter(
    (post) =>
      post.title.includes(currentSearch) ||
      post.content?.includes(currentSearch) ||
      post.author.includes(currentSearch)
  );

  const totalItems = filteredContents.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const validCurrentPage = Math.min(currentPage, Math.max(1, totalPages));
  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedContents = filteredContents.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* 검색 및 카테고리 필터 */}
        <div className="bg-white rounded-lg mb-5">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <BlogSearchBar currentSearch={currentSearch} />
            </div>
            <CCBlogCategoryFilter
              currentCategory={currentCategory}
              currentSearch={currentSearch}
            />
          </div>
        </div>

        {/* 탭 */}
        <div className="space-y-6 mb-5">
          <CCBlogTabBar />
        </div>

        {/* 포스트 리스트 */}
        <SCBlogContentList paginatedContents={paginatedContents} />

        {/* 페이지네이션 */}
        {totalItems > 0 && (
          <div className="flex justify-center">
            <CCBlogPagination
              currentPage={validCurrentPage}
              totalItems={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              currentSearch={currentSearch}
              currentCategory={currentCategory}
            />
          </div>
        )}
      </div>
    </div>
  );
}
