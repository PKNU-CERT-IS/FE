"server-only";

import DefaultButton from "@/components/ui/defaultButton";
import DefaultBadge from "@/components/ui/defaultBadge";
import EyeSVG from "/public/icons/eye.svg";
import Link from "next/link";
import { Plus } from "lucide-react";
import { BlogCategory, BlogInPrfoileDataType } from "@/types/blog";
import { getCategoryColor } from "@/utils/badgeUtils";
import { cn } from "@/lib/utils";
import { getProfileBlog } from "@/app/api/profile/SCprofileApi";
import { fromOffsetDateTime } from "@/utils/transfromResponseValue";
import CCProfilePagination from "./CCProfilePagination";

interface SCBlogListProps {
  searchParams: Promise<{
    tab?: string;
    page?: string;
  }>;
}

export default async function SCBlogList({ searchParams }: SCBlogListProps) {
  const { tab, page } = await searchParams;
  const currentTab = tab || "study";
  const currentPage = parseInt(page || "1", 10);

  // 탭이 blog가 아니면 렌더링 X
  if (currentTab !== "blog") return null;

  // 데이터 fetch
  const blogs = await getProfileBlog();

  const ITEMS_PER_PAGE = 5;
  const totalItems = blogs.length;

  // 페이지 처리
  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (!blogs || blogs.length === 0) {
    return (
      <div className="mt-8">
        <div className="flex flex-row items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-200">
            내가 작성한 블로그 포스트
          </h3>
          <Link href="/blog/write">
            <DefaultButton size="sm" className="transition-all duration-300">
              <Plus className="w-4 h-4" />새 포스트 작성
            </DefaultButton>
          </Link>
        </div>

        <div className="text-center py-16 text-gray-500 dark:text-gray-400  ">
          작성한 블로그가 없습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-8">
      {/* 헤더 */}
      <div className="flex flex-row items-center justify-between gap-2">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-200">
          내가 작성한 블로그 포스트
        </h3>
        <Link href="/blog/write">
          <DefaultButton size="sm" className="transition-all duration-300">
            <Plus className="w-4 h-4" />새 포스트 작성
          </DefaultButton>
        </Link>
      </div>

      {/* 리스트 */}
      {paginatedBlogs.map((blog: BlogInPrfoileDataType) => (
        <Link href={`/blog/${blog.blogId}`} key={blog.blogId}>
          <div className="card-list text-card-foreground group mb-4 dark-default">
            <div className="flex flex-col space-y-1.5 p-4 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="w-full">
                  <div className="font-semibold leading-snug tracking-tight text-base sm:text-lg text-gray-900 group-hover:text-cert-red transition-colors cursor-pointer dark:text-gray-200">
                    {blog.title}
                  </div>

                  <div className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex flex-row items-center gap-2">
                    <span>{fromOffsetDateTime(blog.blogStartDate)}</span>

                    {blog.referenceType && (
                      <span
                        className={cn(
                          "rounded-full inline-flex items-center px-2 py-0.5 text-[11px] sm:text-xs font-medium border",
                          blog.referenceType === "STUDY"
                            ? "badge-green border-green-300 dark:border-green-600"
                            : "badge-blue border-blue-300 dark:border-blue-600"
                        )}
                      >
                        {blog.referenceType === "STUDY" ? "스터디" : "프로젝트"}{" "}
                        · {blog.referenceTitle}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-row items-center gap-2 mt-2">
                    <DefaultBadge
                      variant="custom"
                      className={getCategoryColor(
                        blog.category as BlogCategory
                      )}
                    >
                      {blog.category}
                    </DefaultBadge>
                  </div>
                </div>
              </div>
            </div>

            {/* 조회수 */}
            <div className="p-4 sm:p-6 sm:pt-0">
              <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <EyeSVG className="w-4 h-4" />
                  {blog.viewCount?.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}

      <CCProfilePagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
}
