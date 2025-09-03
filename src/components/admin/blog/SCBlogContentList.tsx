"server-only";

import DefaultBadge from "@/components/ui/defaultBadge";
import { ExternalLink, Eye, FileText, BookOpen, Code } from "lucide-react";
import Link from "next/link";
import CCBlogDeleteButton from "@/components/admin/blog/CCBlogDeleteButton";
import CCPublishedCheckbox from "@/components/admin/blog/CCPublishedCheckbox";
import { BlogPost } from "@/types/blog";
import { getCategoryColor } from "@/utils/badgeUtils";

interface SCBlogContentListProps {
  paginatedContents: BlogPost[];
}

export default function SCBlogContentList({
  paginatedContents,
}: SCBlogContentListProps) {
  return (
    <>
      {paginatedContents.map((post) => (
        <div key={post.id} className="mb-6 card-list">
          <div className="pb-4 flex flex-col space-y-1.5 p-6">
            <div className="flex justify-between items-start">
              <Link
                href={`/admin/blog/${post.id}`}
                className="space-y-2 flex-1 block"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <FileText className="w-5 h-5 text-[#9E0101]" />
                  <span className="text-xl font-medium leading-none tracking-tight">
                    {post.title}
                  </span>

                  {/* 카테고리 뱃지 */}
                  <DefaultBadge
                    variant="outline"
                    className={getCategoryColor(post.category)}
                  >
                    {post.category}
                  </DefaultBadge>

                  {post.reference && (
                    <DefaultBadge
                      variant="outline"
                      className={`flex items-center gap-1 ${
                        post.reference.type === "study"
                          ? "text-green-700 bg-green-50 border-green-200"
                          : "text-blue-700 bg-blue-50 border-blue-200"
                      }`}
                    >
                      {post.reference.type === "study" ? (
                        <BookOpen className="w-3 h-3" />
                      ) : (
                        <Code className="w-3 h-3" />
                      )}
                      {post.reference.type === "study" ? "스터디" : "프로젝트"}{" "}
                      · {post.reference.title}
                    </DefaultBadge>
                  )}

                  {/* 외부 공개 뱃지 */}
                  {post.published && (
                    <DefaultBadge
                      variant="outline"
                      className="bg-gray-200 text-gray-700 border-gray-300"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      외부 공개
                    </DefaultBadge>
                  )}
                </div>

                {/* 작성자 + 날짜 + 조회수 */}
                <div className="text-base text-gray-700 flex flex-row">
                  <span className="font-semibold mr-1">{post.author}</span> •{" "}
                  {post.createdAt}
                  <span className="flex flex-row items-center mx-2">
                    <Eye className="w-4 h-4 mr-1 text-gray-600" />
                    {post.views}
                  </span>
                </div>
              </Link>

              <div className="flex gap-2 ml-4">
                <CCBlogDeleteButton postId={post.id} />
              </div>
            </div>
          </div>

          <div className="p-6 pt-0">
            <div className="space-y-4">
              <Link href={`/admin/blog/${post.id}`} className="block">
                <p className="text-gray-600 line-clamp-2 text-base">
                  {post.excerpt ||
                    (post.content &&
                      post.content
                        .replace(/<\/?[^>]+(>|$)/g, "")
                        .slice(0, 120)) ||
                    ""}
                  {(post.excerpt || post.content) && "..."}
                </p>
              </Link>

              <div className="flex justify-between">
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="block flex-1 min-w-0 text-sm text-gray-500"
                >
                  마지막 수정: {post.createdAt}
                </Link>

                <div className="shrink-0">
                  <CCPublishedCheckbox
                    postId={post.id}
                    published={post.published}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
