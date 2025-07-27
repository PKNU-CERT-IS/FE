"server-only";

import DefaultButton from "@/components/ui/defaultButton";
import DefaultBadge from "@/components/ui/defaultBadge";
import EditSVG from "/public/icons/edit.svg";
import EyeSVG from "/public/icons/eye.svg";
import ThumbsUpSVG from "/public/icons/thumbs-up.svg";
import CommentSVG from "/public/icons/comment.svg";
import { BlogCategoryType, ProfileBlogDataType } from "@/types/profile";
import { getBlogCategoryColor } from "@/utils/profileUtils";
import Link from "next/link";
import { Plus } from "lucide-react";

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
            <Link href="/blog">
              <DefaultButton size="sm" className="transition-all duration-300">
                <Plus className="w-4 h-4" />새 포스트 작성
              </DefaultButton>
            </Link>
          </div>

          {blogs.map((blog) => (
            <div key={blog.id} className="card-list text-card-foreground group">
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold leading-none tracking-tight text-lg text-gray-900 group-hover:text-red-600 transition-colors cursor-pointer">
                      {blog.title}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 transition-colors duration-300">
                      <span>{blog.date}</span>
                      <DefaultBadge
                        className={`border-gray-200 text-gray-600 ${getBlogCategoryColor(
                          blog.category as BlogCategoryType
                        )}`}
                      >
                        {blog.category}
                      </DefaultBadge>
                    </div>
                  </div>
                  <DefaultButton
                    size="sm"
                    variant="outline"
                    className="border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-600"
                  >
                    <EditSVG className="w-4 h-4 mr-1 stroke-gray-600" />
                    수정
                  </DefaultButton>
                </div>
              </div>
              <div className="p-6 pt-0">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  <div className="flex items-center gap-1">
                    <EyeSVG className="w-4 h-4" />
                    {blog.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUpSVG />
                    {blog.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <CommentSVG className="stroke-gray-600" />
                    {blog.comments}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
