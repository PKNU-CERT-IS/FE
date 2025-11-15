"server-only";

import Link from "next/link";
import Image from "next/image";
import { searchBlogsByKeyword } from "@/app/api/blog/SCblogApi";
import SCSearchResultNotFound from "@/components/ui/SCSearchResultNotFound";
import BlogPagination from "@/components/blog/CCBlogPagination";

import { BlogCategory, BlogDataType } from "@/types/blog";
import { isValidCategory } from "@/utils/blogUtils";
import { getCategoryColor } from "@/utils/badgeUtils";
import { formatDate } from "@/utils/formatDateUtil";
import LogoSVG from "/public/icons/logo.svg";

interface BlogCardListProps {
  searchParams: {
    page?: string;
    keyword?: string;
    category?: string;
  };
}

const ITEMS_PER_PAGE = 9;

export default async function BlogCardList({
  searchParams,
}: BlogCardListProps) {
  const page = Math.max(1, parseInt(searchParams.page || "1", 10));
  const keyword = searchParams.keyword?.trim() || "";
  const category: BlogCategory =
    searchParams.category && isValidCategory(searchParams.category)
      ? searchParams.category
      : "전체";

  // 🔥 API 호출 (Suspense 내부니까 Streaming OK)
  const response = await searchBlogsByKeyword(
    {
      keyword,
      category: category === "전체" ? "" : category,
    },
    { page: page - 1, size: 9, sort: "createdAt,desc" }
  );

  const blogs: BlogDataType[] = response.content;
  const totalItems = response.totalElements;

  if (!blogs || blogs.length === 0) {
    return <SCSearchResultNotFound mode="blog" />;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.id}`}
            className="card-list block overflow-hidden dark-default group hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getCategoryColor(
                    blog.category
                  )}`}
                >
                  {blog.category}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(blog.createdAt)}
                </span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-3 text-base group-hover:text-cert-red transition-colors dark:text-gray-200">
                {blog.title}
              </h3>

              <p className="text-gray-600 text-sm mb-2 line-clamp-3 dark:text-gray-300">
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
                <div className="relative w-7 h-7 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  {blog.blogCreatorProfileImageUrl ? (
                    <Image
                      src={blog.blogCreatorProfileImageUrl}
                      alt={`${blog.blogCreatorName} 프로필`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <LogoSVG className="w-7 h-7 text-gray-400" />
                  )}
                </div>
                <span className="text-sm text-gray-700 font-medium dark:text-gray-300">
                  {blog.blogCreatorName}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mb-10">
        <BlogPagination
          currentPage={page}
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          currentKeyword={keyword}
          currentCategory={category}
        />
      </div>
    </>
  );
}
