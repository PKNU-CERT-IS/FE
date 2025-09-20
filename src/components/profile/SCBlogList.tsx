"server-only";

import DefaultButton from "@/components/ui/defaultButton";
import DefaultBadge from "@/components/ui/defaultBadge";
import EyeSVG from "/public/icons/eye.svg";
// import { ProfileBlogDataType } from "@/types/profile";
import Link from "next/link";
import { Plus } from "lucide-react";
import { BlogCategory } from "@/types/blog";
import { getCategoryColor } from "@/utils/badgeUtils";
import { cn } from "@/lib/utils";
import { getProfileBlog } from "@/app/api/profile/SCprofileApi";
import { fromOffsetDateTime } from "@/utils/transfromResponseValue";

interface SCBlogListProps {
  searchParams: Promise<{
    tab?: string;
  }>;
}

export default async function SCBlogList({ searchParams }: SCBlogListProps) {
  const { tab } = await searchParams;
  const currentTab = tab || "study";
  const blogs = await getProfileBlog();
  if (currentTab !== "blog") return null;

  return (
    <>
      {currentTab === "blog" && (
        <div className="space-y-4 mt-8 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <div className="flex flex-row items-center justify-between gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 transition-colors duration-300 dark:text-gray-200">
              내가 작성한 블로그 포스트
            </h3>
            <Link href="/blog/write">
              <DefaultButton
                size="sm"
                className="transition-all duration-300 w-auto"
              >
                <Plus className="w-4 h-4" />새 포스트 작성
              </DefaultButton>
            </Link>
          </div>

          {(
            blogs as Array<{
              blogId: number;
              title: string;
              blogStartDate: string;
              category: string;
              reference?: {
                type: string;
                title: string;
              };
              viewCount?: number;
            }>
          ).map((blog) => (
            <Link href={`/blog/${blog.blogId}`} key={blog.blogId}>
              <div className="card-list text-card-foreground group mb-4 dark-default">
                <div className="flex flex-col space-y-1.5 p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className="w-full">
                      <div className="font-semibold leading-snug tracking-tight text-base sm:text-lg text-gray-900 group-hover:text-cert-red transition-colors cursor-pointer dark:text-gray-200">
                        {blog.title}
                      </div>

                      <div className="mt-2 text-xs sm:text-sm text-gray-600 transition-colors duration-300 dark:text-gray-400">
                        <div className="sm:inline-block">
                          {fromOffsetDateTime(blog.blogStartDate)}
                        </div>

                        <div className="flex flex-row items-center gap-2 mt-1 sm:mt-0 sm:ml-2">
                          <DefaultBadge
                            variant="custom"
                            className={getCategoryColor(
                              blog.category as BlogCategory
                            )}
                          >
                            {blog.category}
                          </DefaultBadge>

                          {blog.reference && (
                            <span
                              className={cn(
                                "rounded-full inline-flex items-center px-2 py-0.5 text-[11px] sm:text-xs font-medium",
                                blog.reference.type === "study"
                                  ? "badge-green"
                                  : "badge-blue"
                              )}
                            >
                              {blog.reference.type === "study"
                                ? "스터디"
                                : "프로젝트"}{" "}
                              · {blog.reference.title}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 조회수 */}
                <div className="p-4 pt-0 sm:p-6 sm:pt-0">
                  <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                    <div className="flex items-center gap-1">
                      <EyeSVG className="w-4 h-4" />
                      {blog.viewCount?.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
