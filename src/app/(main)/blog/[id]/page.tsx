import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, User, Eye } from "lucide-react";
import { mockBlogPosts } from "@/mocks/blogData";
import BackToListButton from "@/components/detail/SCBackToListButton";
import KebabMenuButton from "@/components/detail/CCKebabMenu";
import ShareButton from "@/components/detail/CCShareButton";
import { formatDate } from "@/utils/formatDateUtil";
import { getCategoryColor } from "@/utils/badgeUtils";
import DefaultBadge from "@/components/ui/defaultBadge";
import CCPublishedCheckbox from "@/components/admin/blog/CCPublishedCheckbox";
import Link from "next/link";
import MarkdownRenderer from "@/components/ui/defaultMarkdownRenderer";

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
  const post = mockBlogPosts.find((p) => p.id === blogId);

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
  const blogId = parseInt(resolvedParams.id, 10);
  const post = mockBlogPosts.find((p) => p.id === blogId);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* 뒤로가기 버튼 */}
      <BackToListButton currentUrl={"blog"} />

      {/* 메인 콘텐츠 */}
      <article className="rounded-lg border border-gray-200 overflow-hidden shadow-lg p-4  mt-6 dark:bg-gray-800 dark:border-gray-700">
        {/* 헤더 */}
        <header className="p-8 border-b border-gray-200 dark:border-gray-700">
          {/* 카테고리와 케밥 메뉴 */}
          <div className="flex items-start justify-between mb-4 ">
            <div>
              <DefaultBadge
                variant="custom"
                className={`${getCategoryColor(post.category)} cursor-default`}
              >
                {post.category}
              </DefaultBadge>
            </div>
            <KebabMenuButton currentUrl={"blog"} currentId={blogId} />
          </div>
          {/* 제목 */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight dark:text-gray-200">
            {post.title}
          </h1>
          {/* 요약 */}
          {post.excerpt && (
            <p className="text-lg text-gray-600 mb-3 leading-relaxed dark:text-gray-300">
              {post.excerpt}
            </p>
          )}
          {post.reference && (
            <div className="mb-3">
              <Link
                href={`/${post.reference.type}/${post.reference.referenceId}`}
                className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-md transition-colors
        ${
          post.reference.type === "study"
            ? "badge-green hover:bg-green-100 hover:text-green-800"
            : "badge-blue hover:bg-blue-100 hover:text-blue-800"
        }`}
              >
                {post.reference.type === "study" ? "스터디" : "프로젝트"} ·{" "}
                {post.reference.title}
              </Link>
            </div>
          )}

          {/* 메타 정보 */}
          <div className="flex flex-wrap items-center text-sm text-gray-600 justify-between  dark:text-gray-300">
            <div className="flex flex-row gap-6">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.createdAt)}</span>
              </div>
              {post.views && (
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>{post.views.toLocaleString()}</span>
                </div>
              )}
            </div>
            <CCPublishedCheckbox postId={post.id} published={post.published} />
          </div>
          {/* 태그 */}
          <div className="flex justify-between items-end"></div>
        </header>

        {/* 본문 */}
        <div className="p-8">
          <div className="prose prose-lg max-w-none">
            {post.content ? (
              <>
                {/* 실제 마크다운 내용이 들어갈 곳 */}
                <div className="max-w-none mb-8 pt-6 border-gray-300 dark:border-gray-700">
                  <MarkdownRenderer content={post.content} />
                </div>
              </>
            ) : (
              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {post.excerpt || "게시글 내용이 없습니다."}
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
