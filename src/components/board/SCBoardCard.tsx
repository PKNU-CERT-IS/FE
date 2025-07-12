import Link from "next/link";
import ThunderSVG from "/public/icons/thunder.svg";
import EyeSVG from "/public/icons/eye.svg";
import InfoSVG from "/public/icons/info.svg";
import AlertTriangleSVG from "/public/icons/alert-triangle.svg";
import ThumbsUpSVG from "/public/icons/thumbs-up.svg";
import DefaultBadge from "@/components/ui/defaultBadge";
import { BoardPriorityType } from "@/types/board";
import { BoardDataType } from "@/types/board";
import { getCategoryColor } from "@/utils/boardUtils";

// svg 요소가 있어 util로 빼기 애매함
const getPriorityIcon = (priority: BoardPriorityType) => {
  switch (priority) {
    case "high":
      return <AlertTriangleSVG />;
    case "medium":
      return <InfoSVG />;
    default:
      return <ThunderSVG className="text-cert-accent" />;
  }
};

export default function BoardCard({
  id,
  title,
  content,
  author,
  category,
  priority,
  date,
  views,
  likes,
  isNotice,
}: BoardDataType) {
  return (
    <Link href={`/board/${id}`}>
      <div
        className={`rounded-lg border shadow-sm hover:shadow-lg cursor-pointer transition-all duration-300 group hover:border-cert-red/50 ${
          isNotice ? "border-red-200 bg-red-50" : "border-gray-200"
        }`}
      >
        <div className="flex flex-col space-y-1.5 p-6 pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex items-center gap-2">
                {getPriorityIcon(priority)}
                <DefaultBadge className={getCategoryColor(category)}>
                  {category}
                </DefaultBadge>
                {isNotice && (
                  <DefaultBadge className="bg-cert-red text-white">
                    공지
                  </DefaultBadge>
                )}
              </div>
            </div>
            <span className="text-sm text-gray-500">{date}</span>
          </div>

          <div className="text-lg font-semibold text-gray-900 group-hover:text-cert-red transition-colors mt-2">
            {title}
          </div>
        </div>

        <div className="p-6 pt-0">
          <div className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {content}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="font-medium text-gray-700">{author}</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 hover:text-cert-red transition-colors">
                  <EyeSVG className="w-4 text-cert-dark-red" />
                  <span>{views}</span>
                </div>
                <div className="flex items-center gap-1 hover:text-cert-red transition-colors">
                  <ThumbsUpSVG className="w-4 text-cert-dark-red" />
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
