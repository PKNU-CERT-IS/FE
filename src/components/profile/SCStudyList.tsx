"server-only";

import DefaultButton from "@/components/ui/defaultButton";
import DefaultBadge from "@/components/ui/defaultBadge";
import { getStudyCategoryColor } from "@/utils/profileUtils";
import { ProfileStudyDataType, StudyCategoryType } from "@/types/profile";
import Link from "next/link";
import { Plus, Tag } from "lucide-react";

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
        <div className="space-y-4 mt-8 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-300">
              참여중인 스터디/프로젝트 목록
            </h3>
            <Link href="/study">
              <DefaultButton className="transition-all duration-300" size="sm">
                <Plus className="w-4 h-4" />새 자료 작성
              </DefaultButton>
            </Link>
          </div>

          {studies.map((study) => (
            <div
              key={study.id}
              className="card-list text-card-foreground group"
            >
              <Link href={`/${study.category.toLocaleLowerCase()}/${study.id}`}>
                <div className="flex flex-col space-y-1.5 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold leading-none tracking-tight text-lg text-gray-900 group-hover:text-red-600 transition-colors cursor-pointer">
                        {study.title}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 transition-colors duration-300">
                        <span>{study.date}</span>
                        <DefaultBadge
                          className={`border-gray-200 text-gray-600 hover:text-gray-900 cursor-auto
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
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <DefaultBadge
                        key={tag}
                        className="text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 "
                      >
                        <Tag className="w-3 h-3 mr-1" />
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
