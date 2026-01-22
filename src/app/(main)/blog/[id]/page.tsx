import { cookies } from "next/headers";
import { Metadata } from "next";
import { BlogDetailDataType } from "@/types/blog";
import { getCategoryColor } from "@/utils/badgeUtils";
import { formatDate } from "@/utils/formatDateUtil";
import { searchBlogDetail } from "@/app/api/blog/SCblogApi";
import { verifyJwt } from "@/lib/auth/jwt";
import Unauthorized from "@/components/blog/SCUnauthorized";
import KebabMenuButton from "@/components/detail/CCKebabMenu";
import ShareButton from "@/components/detail/CCShareButton";
import BackToListButton from "@/components/detail/SCBackToListButton";
import DefaultBadge from "@/components/ui/defaultBadge";
import MarkdownRenderer from "@/components/ui/defaultMarkdownRenderer";
import { Calendar, Eye, User } from "lucide-react";

interface BlogDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

interface GenerateMetadataProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const resolvedParams = await params;
  const blogId = parseInt(resolvedParams.id, 10);
  const post = await searchBlogDetail(blogId);
  if (!post) {
    return {
      title: "블로그 게시글을 찾을 수 없습니다",
      description: "요청하신 블로그 게시글을 찾을 수 없습니다.",
    };
  }

  return {
    title: `${post.title} - CERT-IS Blog`,
    description: post.excerpt || post.content?.slice(0, 150) || "",
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content?.slice(0, 150) || "",
      type: "article",
      publishedTime: post.createdAt,
      authors: [post.author],
      images: ["/logo.svg"],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const resolvedParams = await params;
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;
  const blogId = parseInt(resolvedParams.id, 10);
  const blogData: BlogDetailDataType = await searchBlogDetail(blogId);

  let unauthorized = false;
  if (blogData.isPublic === false) {
    if (!accessToken) {
      unauthorized = true;
    } else {
      try {
        await verifyJwt(accessToken);
      } catch {
        unauthorized = true;
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* 뒤로가기 버튼 */}
      <BackToListButton currentUrl={"blog"} />

      {/* 메인 콘텐츠 */}
      {unauthorized ? (
        <Unauthorized />
      ) : (
        <article className="rounded-lg border border-gray-200 overflow-hidden shadow-lg p-4  mt-6 dark:bg-gray-800 dark:border-gray-700">
          {/* 헤더 */}
          <header className="p-4 sm:p-6 lg:p-8 border-b border-gray-200 dark:border-gray-700">
            {/* 카테고리와 케밥 메뉴 */}
            <div className="flex items-start justify-between mb-4 ">
              <div>
                <DefaultBadge
                  variant="custom"
                  className={`${getCategoryColor(
                    blogData.category,
                  )} cursor-default`}
                >
                  {blogData.category}
                </DefaultBadge>
              </div>
              <KebabMenuButton currentUrl={"blog"} currentId={blogId} />
            </div>
            {/* 제목 */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 leading-tight dark:text-gray-200">
              {blogData.title}
            </h1>
            {/* 요약 */}
            {blogData.description && (
              <p className="text-base sm:text-lg text-gray-600 mb-3 leading-relaxed dark:text-gray-300">
                {blogData.description}
              </p>
            )}
            {blogData.referenceType && (
              <div className="mb-3">
                <div
                  className={`inline-flex items-center px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-md transition-colors
        ${
          blogData.referenceType === "STUDY"
            ? "badge-green hover:bg-green-100 hover:text-green-800"
            : "badge-blue hover:bg-blue-100 hover:text-blue-800"
        }`}
                >
                  {blogData.referenceType === "STUDY" ? "스터디" : "프로젝트"} ·{" "}
                  {blogData.referenceTitle}
                </div>
              </div>
            )}

            {/* 메타 정보 */}
            <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-600 justify-between dark:text-gray-300">
              <div className="flex flex-row gap-4 sm:gap-6">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <User className="w-4 h-4" />

                  <span>{blogData.creatorName}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(blogData.createdAt)}</span>
                </div>
                {blogData.viewCount != null && (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{blogData.viewCount.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* 본문 */}
          <div className="p-8">
            <div className="max-w-none">
              {blogData.content ? (
                <>
                  {/* 실제 마크다운 내용이 들어갈 곳 */}
                  <div className="max-w-none mb-8 pt-6 border-gray-300 dark:border-gray-700">
                    <MarkdownRenderer content={blogData.content} />
                  </div>
                </>
              ) : (
                <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {blogData.description || "게시글 내용이 없습니다."}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-gray-200 flex justify-end dark:border-gray-700">
              <ShareButton></ShareButton>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
