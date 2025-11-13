"server-only";
import Image from "next/image";
import Link from "next/link";
import { BlogDataType } from "@/types/blog";
import { formatDate } from "@/utils/formatDateUtil";
import { getCategoryColor } from "@/utils/badgeUtils";
import LogoSVG from "/public/icons/logo.svg";

interface SCBlogCardListProps {
  blogs: BlogDataType[];
}

export default function BlogCardList({ blogs }: SCBlogCardListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {blogs.map((blog: BlogDataType) => (
        <Link
          key={blog.id}
          href={`/blog/${blog.id}`}
          className="card-list block overflow-hidden dark-default group hover:shadow-md transition-shadow"
        >
          <div className="p-5">
            {/* 카테고리 및 날짜 */}
            <div className="flex items-center justify-between mb-3">
              <span
                className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium 
                  ${getCategoryColor(blog.category)}`}
              >
                {blog.category}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(blog.createdAt)}
              </span>
            </div>

            {/* 제목 */}
            <h3 className="font-semibold text-gray-900 mb-3 text-base leading-tight line-clamp-2 group-hover:text-cert-red transition-colors dark:text-gray-200">
              {blog.title}
            </h3>

            {/* 설명 */}
            <p className="text-gray-600 text-sm mb-2 line-clamp-3 leading-relaxed dark:text-gray-300">
              {blog.description}
            </p>

            {/* 참조 배지 (스터디/프로젝트) */}
            {blog.referenceType && (
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mb-3 ${
                  blog.referenceType === "STUDY" ? "badge-green" : "badge-blue"
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
  );
}
