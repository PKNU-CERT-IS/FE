import { notFound } from "next/navigation";
import { Metadata } from "next";
import { BlogDetailDataType } from "@/types/blog";
import { getCategoryColor } from "@/utils/badgeUtils";
import { formatDate } from "@/utils/formatDateUtil";
import { searchBlogDetail } from "@/app/api/blog/SCblogApi";
import KebabMenuButton from "@/components/detail/CCKebabMenu";
import ShareButton from "@/components/detail/CCShareButton";
import BackToListButton from "@/components/detail/SCBackToListButton";
import DefaultBadge from "@/components/ui/defaultBadge";
import MarkdownRenderer from "@/components/ui/defaultMarkdownRenderer";
import { Calendar, ExternalLink, Eye, User } from "lucide-react";

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
  const post: BlogDetailDataType = await searchBlogDetail(blogId);
  if (!post) {
    return {
      title: "게시글을 찾을 수 없습니다",
      description: "요청하신 게시글을 찾을 수 없습니다.",
    };
  }

  return {
    title: `${post.title} - Security Blog`,
    description: post.description || post.content?.slice(0, 150) || "",
    openGraph: {
      title: post.title,
      description: post.description || post.content?.slice(0, 150) || "",
      type: "article",
      publishedTime: post.createdAt,
      authors: [post.creatorName],
    },
  };
}

export default async function AdminBlogDetailPage({
  params,
}: BlogDetailPageProps) {
  const resolvedParams = await params;
  const blogId = parseInt(resolvedParams.id, 10);
  const blogData: BlogDetailDataType = await searchBlogDetail(blogId);

  if (!blogData) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* 뒤로가기 버튼 */}
      <BackToListButton currentUrl={"admin/blog"} />

      {/* 메인 콘텐츠 */}
      <article className="rounded-lg border border-gray-200 overflow-hidden shadow-lg p-4 mt-6 dark:bg-gray-800 dark:border-gray-700">
        {/* 헤더: 원본 코드의 반응형 패딩 사용 */}
        <header className="p-4 sm:p-6 lg:p-8 border-b border-gray-200 dark:border-gray-700">
          {/* 카테고리와 케밥 메뉴: 원본 레이아웃 유지하며 관리자용 버튼/태그 추가 */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <DefaultBadge
                variant="custom"
                className={`${getCategoryColor(blogData.category)} cursor-default`}
              >
                {blogData.category}
              </DefaultBadge>

              {/* 관리자 전용 공개/비공개 태그 유지 */}
              {blogData.isPublic ? (
                <DefaultBadge
                  variant="outline"
                  className="bg-blue-200 text-blue-600 border-blue-300"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  외부 공개
                </DefaultBadge>
              ) : (
                <DefaultBadge
                  variant="outline"
                  className="bg-cert-red/20 text-red-700 border-red-300"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  외부 비공개
                </DefaultBadge>
              )}
            </div>
            <KebabMenuButton
              currentUrl={"blog"}
              currentId={blogId}
              isAdmin={true}
            />
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

          {/* 참조 */}
          {blogData.referenceType && blogData.referenceTitle && (
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
              {blogData.viewCount !== null && (
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
              <div className="max-w-none mb-8 pt-6 border-gray-300 dark:border-gray-700">
                <MarkdownRenderer content={blogData.content} />
              </div>
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
    </div>
  );
}
