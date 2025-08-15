import { Metadata } from "next";
import { mockBlogPosts } from "@/mocks/blogData";
import CCBlogPagination from "@/components/blog/CCBlogPagination";
import CCBlogCategoryFilter from "@/components/blog/CCBlogCategoryFilter";
import { Plus } from "lucide-react";
import { BlogCategory as BlogCategoryType, ITEMS_PER_PAGE } from "@/types/blog";
import {
  filterBlogPosts,
  getCategoryColor,
  isValidCategory,
} from "@/utils/blogUtils";
import Link from "next/link";
import BlogSearchBar from "@/components/blog/CCBlogSearchBar";
import { formatDate } from "@/utils/formatDateUtil";
import SCSearchResultNotFound from "@/components/ui/SCSearchResultNotFound";

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
  }>;
}

interface GenerateMetadataProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: GenerateMetadataProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const { search, category } = resolvedSearchParams;

  const validCategory =
    category && isValidCategory(category) ? category : "전체";

  let title = "Security Blog";
  if (search) {
    title = `${search} - ${title}`;
  }
  if (validCategory !== "전체") {
    title = `${validCategory} - ${title}`;
  }

  return {
    title,
    description: `보안 블로그${
      validCategory !== "전체" ? ` - ${validCategory}` : ""
    }${search ? ` - "${search}" 검색 결과` : ""}`,
  };
}

// children 매개변수 제거
export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page, search, category } = await searchParams;

  const currentPage = Math.max(1, parseInt(page || "1", 10));
  const currentSearch = search?.trim() || "";
  const currentCategory: BlogCategoryType =
    category && isValidCategory(category) ? category : "전체";

  // const filteredContents = filterBlogPosts(mockBlogPosts, currentCategory);
  // ✅ BoardPage와 동일하게 검색어를 포함해 필터링
  const filteredContents = filterBlogPosts(
    mockBlogPosts,
    currentSearch,
    currentCategory
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
        {/* 메인 헤더 */}

        {/* 검색 및 필터 바 */}
        <div className="bg-white rounded-lg mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* 검색바 */}
            <div className="flex-1 w-full">
              <BlogSearchBar currentSearch={currentSearch} />
            </div>
            {/* 카테고리 필터 - 클라이언트 컴포넌트로 분리 */}
            <CCBlogCategoryFilter
              currentCategory={currentCategory}
              currentSearch={currentSearch}
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
        {paginatedContents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedContents.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="card-list block overflow-hidden"
              >
                <div className="p-5">
                  {/* 카테고리 및 날짜 */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium 
                        ${getCategoryColor(post.category)}`}
                    >
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(post.createdAt)}
                    </span>
                  </div>

                  {/* 제목 */}
                  <h3 className="font-semibold text-gray-900 mb-3 text-base leading-tight line-clamp-2">
                    {post.title}
                  </h3>

                  {/* 내용 미리보기 */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* 기술 스택 태그 */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 4).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 4 && (
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                          +{post.tags.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* 작성자 */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <div className="w-7 h-7 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-gray-600">
                        {post.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">
                      {post.author}
                    </span>
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
              currentSearch={currentSearch}
              currentCategory={currentCategory}
            />
          </div>
        )}
      </div>
    </div>
  );
}
