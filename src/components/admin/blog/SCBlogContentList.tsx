"server-only";

import DefaultBadge from "@/components/ui/defaultBadge";
import { ExternalLink, Eye, FileText } from "lucide-react";
import Link from "next/link";
import CCBlogDeleteButton from "@/components/admin/blog/CCBlogDeleteButton";
import CCPublishedCheckbox from "@/components/admin/blog/CCPublishedCheckbox";
import { BlogPost } from "@/types/blog";

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

                  <DefaultBadge
                    variant="outline"
                    className={`${
                      post.category === "개발"
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : post.category === "학습"
                        ? "bg-green-50 text-green-600 border border-green-200"
                        : "bg-purple-50 text-purple-600 border border-purple-200"
                    }`}
                  >
                    {post.category}
                  </DefaultBadge>

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

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  마지막 수정: {post.createdAt}
                </div>
                <div className="flex gap-6">
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
