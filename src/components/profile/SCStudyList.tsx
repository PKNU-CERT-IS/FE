"server-only";

import DefaultButton from "@/components/ui/defaultButton";
import DefaultBadge from "@/components/ui/defaultBadge";
import { getStudyCategoryColor } from "@/utils/profileUtils";
import { ProfileStudyDataType, StudyCategoryType } from "@/types/profile";
import Link from "next/link";

interface SCStudyListProps {
  searchParams: Promise<{
    tab?: string;
  }>;
  studies: ProfileStudyDataType[];
}

export default async function SCStudyList({
  searchParams,
  studies,
}: SCStudyListProps) {
  const { tab } = await searchParams;
  const currentTab = tab || "study";

  if (currentTab !== "study") return null;

  return (
    <>
      {currentTab === "study" && (
        <div className="space-y-4 mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-300">
              참여중인 스터디/프로젝트 목록
            </h3>
            <Link href="/study">
              <DefaultButton
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white transition-all duration-300"
              >
                새 자료 작성
              </DefaultButton>
            </Link>
          </div>

          {studies.map((study) => (
            <div
              key={study.id}
              className="rounded-lg border text-card-foreground shadow-sm hover:shadow-lg transition-all duration-300 bg-white border-gray-200 hover:border-red-300 dark:hover:border-red-500 group"
            >
              <Link href="/study">
                <div className="flex flex-col space-y-1.5 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold leading-none tracking-tight text-lg text-gray-900 group-hover:text-red-600 transition-colors cursor-pointer">
                        {study.title}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 transition-colors duration-300">
                        <span>{study.date}</span>
                        <DefaultBadge
                          className={`border-gray-200 text-gray-600 hover:text-gray-900 hover:border-red-300 transition-colors 
                           ${getStudyCategoryColor(
                             study.category as StudyCategoryType
                           )}`}
                        >
                          {study.category}
                        </DefaultBadge>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <div className="flex flex-wrap gap-1">
                    {study.tags.map((tag) => (
                      <DefaultBadge
                        key={tag}
                        variant="outline"
                        className="text-xs border-gray-200 text-gray-600 hover:text-gray-900 hover:border-red-300 transition-colors"
                      >
                        {tag}
                      </DefaultBadge>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
