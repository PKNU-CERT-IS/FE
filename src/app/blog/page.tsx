import { Metadata } from "next";
import { mockBlogPosts } from "@/mocks/blogData";
import CCBlogPagination from "@/components/blog/CCBlogPagination";
import CCBlogCategoryFilter from "@/components/blog/CCBlogCategoryFilter";
import { Plus } from "lucide-react";
import {
  BLOG_CATEGORIES,
  BlogCategory as BlogCategoryType,
  ITEMS_PER_PAGE,
} from "@/types/blog";
import { filterBlogPosts } from "@/utils/blog/blogUtils";
import Link from "next/link";
import BlogSearchBar from "@/components/blog/CCBlogSearchBar";

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
  }>;
  children: React.ReactNode;
}

interface GenerateMetadataProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
}

const isValidCategory = (category: string): category is BlogCategoryType => {
  return BLOG_CATEGORIES.includes(category as BlogCategoryType);
};

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

export default async function BlogPage({
  searchParams,
  children,
}: BlogPageProps) {
  const resolvedSearchParams = await searchParams;
  const { page, search, category } = resolvedSearchParams;

  const currentPage = Math.max(1, parseInt(page || "1", 10));
  const currentSearch = search?.trim() || "";
  const currentCategory: BlogCategoryType =
    category && isValidCategory(category) ? category : "전체";

  const filteredContents = filterBlogPosts(mockBlogPosts, currentCategory);

  const totalItems = filteredContents.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const validCurrentPage = Math.min(currentPage, Math.max(1, totalPages));

  const startIndex = (validCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedContents = filteredContents.slice(startIndex, endIndex);

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto">
          {/* 메인 헤더 */}

          {/* 검색 및 필터 바 */}
          <div className="bg-white rounded-lg mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* 검색바 */}
              <BlogSearchBar currentSearch={currentSearch} />

              {/* 카테고리 필터 - 클라이언트 컴포넌트로 분리 */}
              <CCBlogCategoryFilter
                currentCategory={currentCategory}
                currentSearch={currentSearch}
              />

              {/* 새 글 작성 버튼 */}
              <Link
                href="/blog/write"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-red-600 transition-colors font-slim whitespace-nowrap"
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
                  className="block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="p-5">
                    {/* 카테고리 및 날짜 */}
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                          post.category === "개발"
                            ? "bg-blue-50 text-blue-600 border border-blue-200"
                            : post.category === "학습"
                            ? "bg-green-50 text-green-600 border border-green-200"
                            : "bg-purple-50 text-purple-600 border border-purple-200"
                        }`}
                      >
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(post.createdAt)
                          .toLocaleDateString("ko-KR", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })
                          .replace(/\./g, "-")
                          .replace(/-$/, "")}
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
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                게시글이 없습니다
              </h3>
              <p className="text-gray-600 mb-4">
                {currentSearch || currentCategory !== "전체"
                  ? "검색 조건에 맞는 게시글을 찾을 수 없습니다."
                  : "아직 작성된 게시글이 없습니다."}
              </p>
              {(currentSearch || currentCategory !== "전체") && (
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  전체 게시글 보기
                </Link>
              )}
            </div>
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

      {children}
    </>
  );
}
