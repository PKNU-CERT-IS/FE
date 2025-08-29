"server-only";

import DefaultButton from "@/components/ui/defaultButton";
import DefaultBadge from "@/components/ui/defaultBadge";
import EyeSVG from "/public/icons/eye.svg";
import { ProfileBlogDataType } from "@/types/profile";
import Link from "next/link";
import { Plus } from "lucide-react";
import { BlogCategory } from "@/types/blog";
import { getCategoryColor } from "@/utils/categoryColorUtils";

interface SCBlogListProps {
  searchParams: Promise<{
    tab?: string;
  }>;
  blogs: ProfileBlogDataType[];
}

export default async function SCBlogList({
  searchParams,
  blogs,
}: SCBlogListProps) {
  const { tab } = await searchParams;
  const currentTab = tab || "study";

  if (currentTab !== "blog") return null;

  return (
    <>
      {currentTab === "blog" && (
        <div className="space-y-4 mt-8 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-300">
              내가 작성한 블로그 포스트
            </h3>
            <Link href="/blog/write">
              <DefaultButton size="sm" className="transition-all duration-300">
                <Plus className="w-4 h-4" />새 포스트 작성
              </DefaultButton>
            </Link>
          </div>
          {blogs.map((blog) => (
            <Link href={`/blog/${blog.id}`} key={blog.id}>
              <div className="card-list text-card-foreground group mb-4">
                <div className="flex flex-col space-y-1.5 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      {/* 제목 */}
                      <div className="font-semibold leading-none tracking-tight text-lg text-gray-900 group-hover:text-red-600 transition-colors cursor-pointer">
                        {blog.title}
                      </div>

                      {/* 작성일 + 카테고리 + ✅ reference */}
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 transition-colors duration-300">
                        <span>{blog.createdAt}</span>
                        <DefaultBadge
                          className={`border-gray-200 text-gray-600 ml-2 ${getCategoryColor(
                            blog.category as BlogCategory
                          )}`}
                        >
                          {blog.category}
                        </DefaultBadge>

                        {blog.reference && (
                          <span
                            className={`ml-auto rounded-full inline-flex items-center px-2 py-0.5 text-xs font-medium ${
                              blog.reference.type === "study"
                                ? "text-green-700 bg-green-50 border border-green-200"
                                : "text-blue-700 bg-blue-50 border border-blue-200"
                            }`}
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

                <div className="p-6 pt-0">
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                    <div className="flex items-center gap-1">
                      <EyeSVG className="w-4 h-4" />
                      {blog.views}
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
