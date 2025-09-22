"server-only";

import DefaultBadge from "@/components/ui/defaultBadge";
import { ExternalLink, Eye, FileText, BookOpen, Code } from "lucide-react";
import Link from "next/link";
import CCBlogDeleteButton from "@/components/admin/blog/CCBlogDeleteButton";
// import CCPublishedCheckbox from "@/components/admin/blog/CCPublishedCheckbox";
import { getCategoryColor } from "@/utils/badgeUtils";
import { BlogDetailDataType } from "@/types/blog";

interface SCBlogContentListProps {
  paginatedContents: BlogDetailDataType[];
}

export default function SCBlogContentList({
  paginatedContents,
}: SCBlogContentListProps) {
  console.log(paginatedContents);
  return (
    <>
      {paginatedContents.map((blog) => (
        <div key={blog.id} className="mb-6 card-list">
          <div className="pb-4 flex flex-col space-y-1.5 p-6">
            <div className="flex justify-between items-start">
              <Link
                href={`/admin/blog/${blog.id}`}
                className="space-y-2 flex-1 block"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <FileText className="w-5 h-5 text-cert-red" />
                  <span className="text-xl font-medium leading-none tracking-tight">
                    {blog.title}
                  </span>

                  {/* 카테고리 뱃지 */}
                  <DefaultBadge
                    variant="custom"
                    className={getCategoryColor(blog.category)}
                  >
                    {blog.category}
                  </DefaultBadge>

                  {blog.referenceType && (
                    <DefaultBadge
                      variant="outline"
                      className={`flex items-center gap-1 ${
                        blog.referenceType === "STUDY"
                          ? "text-green-700 bg-green-50 border-green-200"
                          : "text-blue-700 bg-blue-50 border-blue-200"
                      }`}
                    >
                      {blog.referenceType === "STUDY" ? (
                        <BookOpen className="w-3 h-3" />
                      ) : (
                        <Code className="w-3 h-3" />
                      )}
                      {blog.referenceType === "STUDY" ? "스터디" : "프로젝트"} ·{" "}
                      {blog.referenceTitle}
                    </DefaultBadge>
                  )}

                  {/* 외부 공개 뱃지 */}
                  {blog.isPublic && (
                    <DefaultBadge
                      variant="outline"
                      className="bg-cert-red text-red-700 border-red-300"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      외부 공개
                    </DefaultBadge>
                  )}
                </div>

                {/* 작성자 + 날짜 + 조회수 */}
                <div className="text-base text-gray-700 flex flex-row">
                  <span className="font-semibold mr-1">{blog.creatorName}</span>{" "}
                  • {blog.createdAt}
                  <span className="flex flex-row items-center mx-2">
                    <Eye className="w-4 h-4 mr-1 text-gray-600" />
                    {blog.views}
                  </span>
                </div>
              </Link>

              <div className="flex gap-2 ml-4">
                <CCBlogDeleteButton postId={blog.id} />
              </div>
            </div>
          </div>

          <div className="p-6 pt-0">
            <div className="space-y-4">
              <Link href={`/admin/blog/${blog.id}`} className="block">
                <p className="text-gray-600 line-clamp-2 text-base">
                  {blog.description ||
                    (blog.content &&
                      blog.content
                        .replace(/<\/?[^>]+(>|$)/g, "")
                        .slice(0, 120)) ||
                    ""}
                  {(blog.description || blog.content) && "..."}
                </p>
              </Link>

              <div className="flex justify-between">
                <Link
                  href={`/admin/blog/${blog.id}`}
                  className="block flex-1 min-w-0 text-sm text-gray-500"
                >
                  마지막 수정: {blog.createdAt}
                </Link>

                {/* <div className="shrink-0"> 개선의 여지가 있어 남겨둠
                  <CCPublishedCheckbox
                    postId={blog.id}
                    published={blog.isPublic}
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
