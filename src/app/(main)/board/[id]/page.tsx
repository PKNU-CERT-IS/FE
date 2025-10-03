"server-only";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BackToListButton from "@/components/detail/SCBackToListButton";
import MarkdownRenderer from "@/components/ui/defaultMarkdownRenderer";
import DownloadButton from "@/components/detail/SCDownloadButton";
import { Calendar, Eye, Heart, Pin, Download } from "lucide-react";
import DefaultBadge from "@/components/ui/defaultBadge";
import KebabMenuButton from "@/components/detail/CCKebabMenu";
import LikeButton from "@/components/detail/CCLikeButton";
import ShareButton from "@/components/detail/CCShareButton";
import { formatFileSize } from "@/utils/attachedFileUtils";
import { getFileIcon } from "@/utils/attachedFileUtils";
import { getBoardCategoryColor } from "@/utils/boardUtils";
import { getDetailBoard } from "@/app/api/board/SCBoardApi";
import { toKoreanCategory } from "@/types/board";
import { formatDate } from "@/utils/formatDateUtil";
import { AttachedFile, getFileKey } from "@/types/attachedFile";
import { translateRoleToKorean } from "@/utils/transformRequestValue";
import LogoSVG from "/public/icons/logo.svg";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const boardId = parseInt(id, 10);

  try {
    const data = await getDetailBoard(boardId);
    if (!data) {
      return {
        title: "게시글을 찾을 수 없습니다",
        description: "요청하신 게시글을 찾을 수 없습니다.",
      };
    }

    return {
      title: `${data.title} - CERT-IS Board`,
      description: data.content.substring(0, 160) + "...",
      openGraph: {
        title: data.title,
        description: data.content.substring(0, 160) + "...",
        type: "article",
        authors: [data.author.name],
        images: ["/logo.svg"],
      },
    };
  } catch {
    return {
      title: "게시글을 불러올 수 없습니다",
      description: "API 호출 실패",
    };
  }
}
export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const boardId = parseInt(id, 10);

  let data;
  try {
    data = await getDetailBoard(boardId);
  } catch (error) {
    throw error;
  }

  if (!data) notFound();

  return (
    <div className="space-y-6">
      <BackToListButton currentUrl={"board"} />

      {/* 게시글 카드 */}
      <div className="border border-gray-200 rounded-lg shadow-lg mt-6 p-4 dark:bg-gray-800 dark:border-gray-700">
        {/* 게시글 헤더 */}
        <div className="p-6 pb-0">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {data.category === "NOTICE" && (
                <Pin className="w-4 h-4 text-cert-red" />
              )}
              <DefaultBadge
                variant="custom"
                className={getBoardCategoryColor(data.category)}
              >
                {toKoreanCategory(data.category)}
              </DefaultBadge>
            </div>
            <KebabMenuButton currentUrl={"board"} currentId={data.boardId} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight dark:text-gray-200">
            {data.title}
          </h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center text-gray-600 font-medium">
                {data.author.profileImageUrl ? (
                  <Image
                    src={data.author.profileImageUrl}
                    alt={`${data.author.name} 프로필`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <LogoSVG className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 dark:text-gray-200">
                    {data.author.name}
                  </span>
                  <DefaultBadge variant="outline" className="text-xs">
                    {translateRoleToKorean(data.author.role)}
                  </DefaultBadge>
                </div>
                <div className="flex mt-1 items-center gap-2 text-sm text-gray-500 dark:text-gray-300">
                  <Calendar className="w-3 h-3" />
                  {formatDate(data.createdAt, "short")}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-cert-red">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {data.viewCount}
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {data.likeCount}
              </div>
            </div>
          </div>
        </div>

        {/* 게시글 본문 */}
        <div className="p-6">
          <div className="max-w-none mb-8 pt-6 border-t border-gray-300 dark:border-gray-700">
            <MarkdownRenderer content={data.content} />
          </div>

          {/* 첨부파일 */}
          {data.attachments && data.attachments.length > 0 && (
            <div className="border-t border-gray-300 pt-6 mb-6 dark:border-gray-700">
              <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2 dark:text-gray-200">
                <Download className="w-4 h-4" />
                첨부파일 ({data.attachments.length})
              </h4>
              <div className="space-y-3">
                {data.attachments.map((file: AttachedFile) => (
                  <div
                    key={getFileKey(file)}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg dark:bg-gray-700"
                  >
                    <span className="text-2xl">{getFileIcon(file.type)}</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-200">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {formatFileSize(Number(file.size))}
                      </p>
                    </div>
                    <DownloadButton file={file} />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-6 border-t border-gray-300 dark:border-gray-700">
            <div className="flex gap-4">
              <LikeButton
                currentLikes={data.likeCount}
                boardId={boardId}
                liked={data.likedByCurrentUser}
              />
            </div>
            <ShareButton />
          </div>
        </div>
      </div>
    </div>
  );
}
