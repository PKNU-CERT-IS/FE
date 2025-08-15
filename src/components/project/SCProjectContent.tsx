"server-only";

import Image from "next/image";
import Link from "next/link";
import { STATUS_LABELS, AUTHOR_STATUS_LABELS } from "@/types/project";
import CCStudyDateInfo from "@/components/study/CCStudyDateInfo";
import { getStatusColor } from "@/utils/projectUtils";
import GithubSVG from "/public/icons/github.svg";
import ChainSVG from "/public/icons/chain.svg";
import type { ProjectMaterial } from "@/types/project";
import DefaultBadge from "@/components/ui/defaultBadge";

interface SCProjectContentProps {
  materials: ProjectMaterial[];
}

export default function SCProjectContent({ materials }: SCProjectContentProps) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {materials.map((project) => (
          <div
            key={project.id}
            className="card-list bg-white overflow-hidden group relative flex flex-col transition-shadow hover:shadow-md"
          >
            <Link
              href={`/project/${project.id}`}
              className="flex flex-col flex-1"
            >
              {/* 이미지 영역 */}
              <div className="relative h-76 bg-gradient-to-br from-purple-400 to-indigo-600 overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
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
                    variant="outline"
                    className={getStatusColor(project.status)}
                  >
                    {STATUS_LABELS[project.status]}
                  </DefaultBadge>
                </div>
              </div>

              {/* 본문 */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <CCStudyDateInfo
                    status={project.status}
                    startDate={project.startDate}
                    endDate={project.endDate}
                    semester={project.semester}
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.customTags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded text-xs font-medium ${tag.color}`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </Link>

            {/* 참가 인원 Progress 바 */}
            <div className="mb-4"></div>

            {/* 하단 바 (외부 링크 & 버튼들) */}
            <div className="relative flex items-center justify-between px-6 pb-6 pt-4 border-t border-gray-100">
              {/* 전체를 덮는 투명한 Link */}
              <Link
                href={`/project/${project.id}`}
                className="absolute inset-0 z-0"
              />

              <div className="flex items-center gap-2 relative z-10">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    project.authorStatus === "student"
                      ? "bg-blue-100 text-blue-800"
                      : project.authorStatus === "graduate"
                      ? "bg-purple-100 text-black"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {AUTHOR_STATUS_LABELS[project.authorStatus]}
                </span>
                <span className="text-sm text-gray-500">{project.author}</span>
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
                    <GithubSVG className="w-5 h-5" />
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
                    <ChainSVG className="w-5 h-5" />
                  </a>
                )}

                <button
                  type="button"
                  className="px-4 py-2 action-button text-sm"
                >
                  참가하기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
