import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, User, Tag, Eye } from "lucide-react";
import { mockBlogPosts } from "@/mocks/blogData";
import BackToListButton from "@/components/detail/SCBackToListButton";
import KebabMenuButton from "@/components/detail/CCKebabMenu";
import ShareButton from "@/components/detail/CCShareButton";

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
      title: "게시글을 찾을 수 없습니다",
      description: "요청하신 게시글을 찾을 수 없습니다.",
    };
  }

  return {
    title: `${post.title} - Security Blog`,
    description: post.excerpt || post.content?.slice(0, 150) || "",
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content?.slice(0, 150) || "",
      type: "article",
      publishedTime: post.createdAt,
      authors: [post.author],
      tags: post.tags,
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

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return dateString;
    }
  };

  // 관련 게시글 추천 (같은 카테고리의 다른 글들)
  const relatedPosts = mockBlogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* 뒤로가기 버튼 */}
      <BackToListButton currentUrl={"blog"} />

      {/* 메인 콘텐츠 */}
      <article className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-lg p-4  mt-6">
        {/* 헤더 */}
        <header className="p-8 border-b border-gray-200">
          {/* 카테고리와 케밥 메뉴 */}
          <div className="flex items-start justify-between mb-4 ">
            <div>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  post.category === "개발"
                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                    : post.category === "학습"
                    ? "bg-green-50 text-green-600 border border-green-200"
                    : "bg-purple-50 text-purple-600 border border-purple-200"
                }`}
              >
                {post.category}
              </span>
            </div>
            <KebabMenuButton currentUrl={"blog"} currentId={blogId} />
          </div>

          {/* 제목 */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          {/* 요약 */}
          {post.excerpt && (
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* 메타 정보 */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
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
                <span>{post.views.toLocaleString()}회</span>
              </div>
            )}
          </div>

          {/* 태그 */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">태그</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
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
                {post.excerpt || "게시글 내용이 없습니다."}

                {/* 예시 내용 (실제로는 post.content에서 가져와야 함) */}
                <div className="mt-8">
                  <h2 className="text-2xl font-bold mb-4">게시글 내용</h2>
                  <p className="mb-4">
                    이 게시글은 {post.category} 카테고리의 내용을 다루고
                    있습니다. 실제 블로그 시스템에서는 이 부분에 마크다운이나
                    리치 텍스트로 작성된 전체 내용이 표시됩니다.
                  </p>

                  <h3 className="text-xl font-semibold mb-3">주요 내용</h3>
                  <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>상세한 기술적 설명</li>
                    <li>실제 구현 예제</li>
                    <li>베스트 프랙티스</li>
                    <li>주의사항 및 팁</li>
                  </ul>

                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <p className="text-sm text-gray-600">
                      💡 <strong>참고:</strong> 실제 운영 환경에서는
                      post.content 필드에 마크다운이나 HTML 형태의 전체 게시글
                      내용이 저장되어 여기에 표시됩니다.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-gray-200 flex justify-end">
            {" "}
            <ShareButton></ShareButton>
          </div>
        </div>
      </article>

      {/* 관련 게시글 */}
      {relatedPosts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">관련 게시글</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.id}`}
                className="block bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="mb-3">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                      relatedPost.category === "개발"
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : relatedPost.category === "학습"
                        ? "bg-green-50 text-green-600 border border-green-200"
                        : "bg-purple-50 text-purple-600 border border-purple-200"
                    }`}
                  >
                    {relatedPost.category}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {relatedPost.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                  {relatedPost.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{relatedPost.author}</span>
                  <span>•</span>
                  <span>{formatDate(relatedPost.createdAt)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
