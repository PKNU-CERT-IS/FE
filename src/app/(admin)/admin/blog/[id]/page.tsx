import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, User, Eye, ExternalLink } from "lucide-react";
import BackToListButton from "@/components/detail/SCBackToListButton";
import KebabMenuButton from "@/components/detail/CCKebabMenu";
import ShareButton from "@/components/detail/CCShareButton";
import DefaultBadge from "@/components/ui/defaultBadge";
import { formatDate } from "@/utils/formatDateUtil";
import { getCategoryColor } from "@/utils/badgeUtils";
import { searchBlogDetail } from "@/app/api/blog/SCblogApi";
import { BlogDetailDataType } from "@/types/blog";

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
  console.log(post);
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
  const post: BlogDetailDataType = await searchBlogDetail(blogId);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* 뒤로가기 버튼 */}
      <BackToListButton currentUrl={"admin/blog"} />

      {/* 메인 콘텐츠 */}
      <article className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-lg p-4 mt-6">
        {/* 헤더 */}
        <header className="p-8 border-b border-gray-200">
          {/* 카테고리와 케밥 메뉴 */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <DefaultBadge
                variant="custom"
                className={getCategoryColor(post.category)}
              >
                {post.category}
              </DefaultBadge>

              {post.isPublic && (
                <DefaultBadge
                  variant="outline"
                  className="bg-cert-red/20 text-red-700 border-red-300"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  외부 공개
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          {/* 요약 */}
          {post.description && (
            <p className="text-lg text-gray-600 mb-3 leading-relaxed">
              {post.description}
            </p>
          )}

          {/* 참조 (스터디/프로젝트) */}
          {post.referenceType && post.referenceTitle && (
            <div className="mb-3">
              <div
                className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-md transition-colors
        ${
          post.referenceType === "STUDY"
            ? "text-green-700 bg-green-50 border border-green-200 hover:bg-green-100 hover:text-green-800"
            : "text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 hover:text-blue-800"
        }`}
              >
                {post.referenceType === "STUDY" ? "스터디" : "프로젝트"} ·{" "}
                {post.referenceTitle}
              </div>
            </div>
          )}

          {/* 메타 정보 */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.creatorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            {post.viewCount !== null && (
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{post.viewCount.toLocaleString()}</span>
              </div>
            )}
          </div>
        </header>

        {/* 본문 */}
        <div className="p-8">
          <div className="prose prose-lg max-w-none">
            {post.content ? (
              <div
                className="text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {post.description || "게시글 내용이 없습니다."}
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-gray-200 flex justify-end">
            <ShareButton />
          </div>
        </div>
      </article>
    </div>
  );
}
