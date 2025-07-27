"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { CurrentFilters } from "@/types/project";
import { STATUS_LABELS, AUTHOR_STATUS_LABELS } from "@/types/project";
import CCProjectPagination from "@/components/project/CCProjectPagination";
import CCStudyDateInfo from "@/components/study/CCStudyDateInfo";
import SCStudySearchResultNotFound from "@/components/study/SCStudySearchResultNotFound";
import { getStatusColor, parseSearchParams } from "@/utils/projectUtils";
import { getProjectMaterials } from "@/mocks/mockProjectData";

import GithubSVG from "/public/icons/github.svg";
import ChainSVG from "/public/icons/chain.svg";

interface SCProjectContentProps {
  searchParams: Promise<{
    search?: string;
    semester?: string;
    technique?: string;
    status?: string;
    page?: string;
  }>;
}

export default function SCProjectContent({
  searchParams,
}: SCProjectContentProps) {
  const ITEMS_PER_PAGE = 6;

  return (
    <div className="mb-8">
      <ProjectContentRenderer
        searchParams={searchParams}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
}

function ProjectContentRenderer({
  searchParams,
  itemsPerPage,
}: {
  searchParams: Promise<{
    search?: string;
    semester?: string;
    technique?: string;
    status?: string;
    page?: string;
  }>;
  itemsPerPage: number;
}) {
  const [content, setContent] = React.useState<React.ReactElement | null>(null);

  React.useEffect(() => {
    async function loadContent() {
      try {
        const resolvedSearchParams = await searchParams;
        const currentFilters: CurrentFilters =
          parseSearchParams(resolvedSearchParams);

        const projectMaterials = getProjectMaterials();

        // 필터링 로직
        const filteredMaterials = projectMaterials.filter((material) => {
          const matchesSearch =
            !currentFilters.search ||
            material.title
              .toLowerCase()
              .includes(currentFilters.search.toLowerCase()) ||
            material.description
              .toLowerCase()
              .includes(currentFilters.search.toLowerCase()) ||
            material.author
              .toLowerCase()
              .includes(currentFilters.search.toLowerCase());

          const matchesSemester =
            currentFilters.semester === "all" ||
            material.semester === currentFilters.semester;

          const matchesTechnique =
            currentFilters.technique === "all" ||
            material.hackingTechnique === currentFilters.technique;

          const matchesStatus =
            currentFilters.status === "all" ||
            material.status === currentFilters.status;

          return (
            matchesSearch &&
            matchesSemester &&
            matchesTechnique &&
            matchesStatus
          );
        });

        // 페이지네이션 계산
        const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);
        const currentPage = Math.max(
          1,
          Math.min(currentFilters.page, totalPages || 1)
        );
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentMaterials = filteredMaterials.slice(startIndex, endIndex);

        setContent(
          <>
            {/* 프로젝트 카드 그리드 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {currentMaterials.map((project) => (
                <Link
                  href={`/project/${project.id}`}
                  key={project.id}
                  className="card-list bg-white overflow-hidd group relative flex flex-col"
                >
                  {/* 프로젝트 이미지 */}
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
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {STATUS_LABELS[project.status]}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    {/* 날짜 정보 */}
                    <div className="flex items-center gap-2 mb-3">
                      <CCStudyDateInfo
                        status={project.status}
                        startDate={project.startDate}
                        endDate={project.endDate}
                        semester={project.semester}
                      />
                    </div>

                    {/* 제목 및 설명 */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* 커스텀 태그 */}
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

                    {/* 참가 인원 Progress 바 */}
                    <div className="mb-4"></div>

                    {/* 작성자 및 액션 버튼들 */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
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
                        <span className="text-sm text-gray-500">
                          {project.author}
                        </span>
                      </div>

                      {/* 액션 버튼들 */}
                      <div className="flex items-center gap-2">
                        {/* GitHub 링크 */}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            title="GitHub 저장소"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <GithubSVG className="w-5 h-5" />
                          </a>
                        )}

                        {/* 데모 링크 */}
                        {project.demoUrl && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                            title="데모 사이트"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ChainSVG className="w-5 h-5" />
                          </a>
                        )}

                        {/* 참가하기 버튼 */}
                        <button
                          type="button"
                          className="px-4 py-2 action-button text-sm"
                          onClick={(e) => e.preventDefault()}
                        >
                          참가하기
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* 결과가 없을 때 */}
            {currentMaterials.length === 0 && (
              <SCStudySearchResultNotFound
                title="프로젝트가 없습니다"
                description="검색 조건을 변경하거나 새로운 프로젝트를 생성해보세요."
              />
            )}

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <CCProjectPagination
                currentPage={currentPage}
                totalPages={totalPages}
                currentSearch={currentFilters.search}
                currentSemester={currentFilters.semester}
                currentTechnique={currentFilters.technique}
                currentStatus={currentFilters.status}
              />
            )}
          </>
        );
      } catch (error) {
        console.error("Error in SCProjectContent:", error);

        setContent(
          <>
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                데이터를 불러오는 중 오류가 발생했습니다.
              </p>
            </div>
            <SCStudySearchResultNotFound
              title="데이터를 불러올 수 없습니다"
              description="페이지를 새로고침하거나 잠시 후 다시 시도해주세요."
            />
          </>
        );
      }
    }

    loadContent();
  }, [searchParams, itemsPerPage]);

  return content;
}
