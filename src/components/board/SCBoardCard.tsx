import Link from "next/link";
import EyeSVG from "/public/icons/eye.svg";
import DefaultBadge from "@/components/ui/defaultBadge";
import { BoardDataType } from "@/types/board";
import { getBoardCategoryColor } from "@/utils/boardUtils";
import {
  AlertCircle,
  BookOpen,
  Heart,
  HelpCircle,
  Info,
  ShieldAlert,
} from "lucide-react";

// 카테고리 종류에 따라 svg 변경 uitl
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "공지사항":
      return <AlertCircle className="text-red-700 w-4 h-4" />;
    case "보안이슈":
      return <ShieldAlert className="text-orange-700 w-4 h-4" />;
    case "기술자료":
      return <BookOpen className="text-blue-700 w-4 h-4" />;
    case "활동내용":
      return <Info className="text-green-700 w-4 h-4" />;
    case "질문":
      return <HelpCircle className="text-gray-700 w-4 h-4" />;
  }
};
export default function BoardCard({
  id,
  title,
  content,
  author,
  category,
  date,
  views,
  likes,
}: BoardDataType) {
  return (
    <Link href={`/board/${id}`}>
      <div
        className={`card-list group hover:border-cert-red/50  ${
          category === "공지사항"
            ? "border-red-200 bg-red-50 dark:bg-cert-red/30 dark:border-cert-red/30"
            : "border-gray-200 dark:bg-gray-800 dark:border-gray-700 "
        }`}
      >
        <div className="flex flex-col space-y-1.5 p-6 pb-3">
          <div className="flex items-center gap-3 flex-1 justify-between">
            <div className="flex items-center gap-2">
              {getCategoryIcon(category)}
              <DefaultBadge
                variant="custom"
                className={getBoardCategoryColor(category)}
              >
                {category}
              </DefaultBadge>
              {category === "공지사항" && (
                <DefaultBadge className="bg-cert-red text-white">
                  공지
                </DefaultBadge>
              )}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 ">
              {date}
            </span>
          </div>

          <div className="text-lg font-semibold text-gray-900 group-hover:text-cert-red transition-colors mt-2 dark:text-gray-200">
            {title}
          </div>
        </div>

        <div className="p-6 pt-0">
          <div className="text-gray-600 mb-4 line-clamp-2 leading-relaxed dark:text-gray-400">
            {content}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="font-medium text-gray-700 dark:text-gray-200">
                {author}
              </span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 hover:text-cert-red transition-colors dark:text-gray-400">
                  <EyeSVG className="w-4 text-cert-red" />
                  <span>{views}</span>
                </div>
                <div className="flex items-center gap-1 hover:text-cert-red transition-colors dark:text-gray-400">
                  <Heart className="w-4 text-cert-red" />
                  <span>{likes}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
