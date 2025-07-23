import { Metadata } from "next";
import { notFound } from "next/navigation";
import BackToListButton from "@/components/detail/SCBackToListButton";
import MarkdownRenderer from "@/components/ui/defaultMarkdownRenderer";
import { mockBoardData } from "@/mocks/mockBoardData";
import { mockBoardDetailData } from "@/mocks/mockBoardDetailData";
import { getCategoryColor } from "@/utils/boardUtils";
import DownloadButton from "@/components/detail/SCDownloadButton";
import { Calendar, Eye, Heart, Pin, Tag, Download } from "lucide-react";
import DefaultBadge from "@/components/ui/defaultBadge";

import KebabMenuButton from "@/components/detail/CCKebabMenu";
import LikeButton from "@/components/detail/CCLikeButton";
import BookmarkButton from "@/components/detail/CCBookmarkButton";
import ShareButton from "@/components/detail/CCShareButton";

function getDataById(id: string) {
  const dataId = parseInt(id, 10);
  // api 요청 ...
  const baseData = mockBoardData.find((item) => item.id === dataId);
  const detailData = mockBoardDetailData.find((item) => item.id === dataId);

  if (!baseData || !detailData) {
    return null;
  }

  return {
    ...baseData,
    ...detailData,
  };
}

// 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = getDataById(id);

  if (!data) {
    return {
      title: "게시글을 찾을 수 없습니다",
      description: "요청하신 게시글을 찾을 수 없습니다.",
    };
  }

  return {
    title: `${data.title} - Security Board`,
    description: data.content.substring(0, 160) + "...",
    openGraph: {
      title: data.title,
      description: data.content.substring(0, 160) + "...",
      type: "article",
      authors: [data.author],
      tags: data.tags,
    },
  };
}

// 파일 아이콘 함수(변경 가능)
function getFileIcon(type: string) {
  if (type.includes("pdf")) return "📄";
  if (type.includes("excel") || type.includes("spreadsheet")) return "📊";
  if (type.includes("word") || type.includes("document")) return "📝";
  if (type.includes("image")) return "🖼️";
  return "📎";
}

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = getDataById(id);

  if (!data) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <BackToListButton currentUrl={"board"} />

      {/* 게시글 카드 */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg mt-6">
        {/* 게시글 헤더 */}
        <div className="p-6 pb-0">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {data.isNotice && <Pin className="w-4 h-4 text-cert-red" />}
              <DefaultBadge
                variant="outline"
                className={getCategoryColor(data.category)}
              >
                {data.category}
              </DefaultBadge>
            </div>
            <KebabMenuButton currentUrl={"board"} currentId={data.id} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
            {data.title}
          </h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-medium">
                  {data.authorInfo.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {data.author}
                    </span>
                    <DefaultBadge variant="outline" className="text-xs">
                      {data.authorInfo.role}
                    </DefaultBadge>
                  </div>
                  <div className="flex mt-1 items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {data.date}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-cert-dark-red">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {data.views}
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {data.likes}
              </div>
            </div>
          </div>
        </div>

        {/* 게시글 본문 */}
        <div className="p-6">
          {/* 태그 */}
          <div className="flex gap-2 mb-8 pt-6 border-t border-gray-300">
            {data.tags.map((tag) => (
              <DefaultBadge
                key={tag}
                className="text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 cursor-pointer"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </DefaultBadge>
            ))}
          </div>

          {/* React-Markdown으로 렌더링 - Tailwind Typography 사용 */}
          <div className="max-w-none mb-8">
            <MarkdownRenderer content={data.detailContent} />
          </div>

          {/* 첨부파일 */}
          {data.attachments && data.attachments.length > 0 && (
            <div className="border-t border-gray-300 pt-6 mb-6">
              <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Download className="w-4 h-4" />
                첨부파일 ({data.attachments.length})
              </h4>
              <div className="space-y-3">
                {data.attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-2xl">{getFileIcon(file.type)}</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">{file.size}</p>
                    </div>
                    <DownloadButton fileName={file.name} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-6 border-t border-gray-300">
            <div className="flex gap-4">
              <LikeButton currentLikes={data.likes} />
              <BookmarkButton />
            </div>
            <ShareButton />
          </div>
        </div>
      </div>
    </div>
  );
}
