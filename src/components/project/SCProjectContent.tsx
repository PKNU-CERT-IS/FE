"server-only";

import Image from "next/image";
import Link from "next/link";
import { SUBCATEGORY_FROM_EN } from "@/types/category";
import { STATUS_LABELS } from "@/types/progressStatus";
import type { ProjectList } from "@/types/project";
import { MEMBER_GRADE_LABELS } from "@/types/study";
import { getCategoryColor, getStatusColor } from "@/utils/badgeUtils";
import { getProgressColor } from "@/utils/studyHelper";
import DefaultBadge from "@/components/ui/defaultBadge";
import { Calendar } from "lucide-react";
import ChainSVG from "/public/icons/chain.svg";
import GithubSVG from "/public/icons/github.svg";

interface SCProjectContentProps {
  materials: ProjectList[];
}

export default function SCProjectContent({ materials }: SCProjectContentProps) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {materials.map((project) => {
          const participationRate = Math.round(
            (project.currentParticipantNumber / project.maxParticipantNumber) *
              100,
          );
          const progressColor = getProgressColor(participationRate);

          return (
            <div
              key={project.id}
              className="card-list overflow-hidden group relative flex flex-col transition-shadow hover:shadow-md dark-default"
            >
              <Link
                href={`/project/${project.id}`}
                className="flex flex-col flex-1"
              >
                {/* 이미지 영역 */}
                <div className="relative h-76 bg-gradient-to-br from-purple-400 to-indigo-600 overflow-hidden">
                  {project.thumbnailUrl ? (
                    <Image
                      src={project.thumbnailUrl}
                      alt={project.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-red-400 to-primary flex items-center justify-center">
                      <div className="text-white text-6xl font-bold opacity-20">
                        {project.title.charAt(0)}
                      </div>
                    </div>
                  )}

                  {/* 상태 배지 */}
                  <div className="absolute top-4 left-4">
                    <DefaultBadge
                      variant="custom"
                      className={getStatusColor(project.status)}
                    >
                      {STATUS_LABELS[project.status]}
                    </DefaultBadge>
                  </div>
                </div>

                {/* 본문 */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{project.semester}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-gray-200">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2 dark:text-gray-300">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-2">
                    <DefaultBadge
                      variant="custom"
                      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border-none
                        ${getCategoryColor(project.category)}`}
                    >
                      {project.category}
                    </DefaultBadge>
                    <DefaultBadge
                      variant="custom"
                      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border-none
                        ${getCategoryColor(
                          SUBCATEGORY_FROM_EN[project.subcategory] ??
                            project.subcategory,
                        )}`}
                    >
                      {SUBCATEGORY_FROM_EN[project.subcategory] ??
                        project.subcategory}
                    </DefaultBadge>
                  </div>
                </div>

                {/* 참가 인원 Progress 바 */}
                <div className="mb-4 px-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      참가자
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                      {project.currentParticipantNumber}/
                      {project.maxParticipantNumber}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${participationRate}%`,
                        backgroundColor: progressColor,
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block dark:text-gray-400">
                    {participationRate}%
                  </span>
                </div>
              </Link>

              {/* 하단 바 (외부 링크 & 버튼들) */}
              <div className="relative flex items-center justify-between px-6 pb-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                <Link
                  href={`/project/${project.id}`}
                  className="absolute inset-0 z-0"
                />

                <div className="flex items-center gap-2 relative z-10">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      project.projectCreatorGrade === "NONE"
                        ? "bg-gray-100 text-gray-800"
                        : project.projectCreatorGrade === "GRADUATED"
                          ? "bg-purple-100 text-black"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {MEMBER_GRADE_LABELS[project.projectCreatorGrade]}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    {project.projectCreatorName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative z-10"
                      title="GitHub 저장소"
                    >
                      <GithubSVG className="w-5 h-5 dark:text-gray-500" />
                    </a>
                  )}

                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative z-10"
                      title="데모 사이트"
                    >
                      <ChainSVG className="w-5 h-5 dark:text-gray-500" />
                    </a>
                  )}
                  {project.participantable && (
                    <button className="px-4 py-2 action-button text-sm">
                      참가하기
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
