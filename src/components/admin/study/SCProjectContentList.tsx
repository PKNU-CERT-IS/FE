"server-only";

import DefaultBadge from "@/components/ui/defaultBadge";
import { AlertCircle, Calendar, Target, User, Users } from "lucide-react";
import { MainTab, SubTab } from "@/types/admin/adminStudyTab";
import Link from "next/link";
import PdfSVG from "/public/icons/pdf.svg";
import { downloadFile } from "@/actions/study/StudyDownloadFileServerAction";
import CCAdminStudyPagination from "@/components/admin/study/CCAdminStudyPagination";
import SCSearchResultNotFound from "@/components/ui/SCSearchResultNotFound";
import { formatFileSize } from "@/utils/attachedFileUtils";
import { ProjectCurrentFilters, ProjectList } from "@/types/project";
import { getProjects, searchProjects } from "@/app/api/project/SCProjectApi";
import { SUBCATEGORY_FROM_EN, SUBCATEGORY_TO_EN } from "@/types/category";
import { calculateProgress } from "@/utils/adminProgressUtil";
import { MEMBER_GRADE_LABELS } from "@/types/study";
import { formatDate } from "@/utils/formatDateUtil";
import {
  getProjectAllEndRequest,
  ProjectEndRequest,
} from "@/app/api/admin/project/SCAdminProjectEndGetApi";
import { getStatusColor } from "@/utils/badgeUtils";
import { STATUS_LABELS } from "@/types/progressStatus";
import DownloadButton from "@/components/detail/SCDownloadButton";
import CCAdminStudyProjectActionButtons from "@/components/ui/CCAdminActionButtons";

interface SCProjectContentListProps {
  currentTab: MainTab;
  currentView: SubTab;
  currentSearch?: string;
  currentPage?: number;
  projectCurrentFilters: ProjectCurrentFilters;
}

export default async function SCProjectContentList({
  currentTab,
  currentView,
  currentSearch = "",
  currentPage = 1,
  projectCurrentFilters,
}: SCProjectContentListProps) {
  const statusByView =
    !currentView || currentView === "pending"
      ? "PENDING"
      : currentView === "list"
      ? "ALL"
      : "";

  const isDefaultFilters =
    (!currentSearch || currentSearch === "ALL") &&
    (projectCurrentFilters.category === "ALL" ||
      !projectCurrentFilters.category) &&
    (projectCurrentFilters.subCategory === "ALL" ||
      !projectCurrentFilters.subCategory) &&
    (projectCurrentFilters.semester === "ALL" ||
      !projectCurrentFilters.semester) &&
    (projectCurrentFilters.projectStatus === "ALL" ||
      !projectCurrentFilters.projectStatus) &&
    (statusByView === "ALL" || !statusByView);

  let projectMaterials: ProjectList[] = [];
  let projectEndRequests: ProjectEndRequest[] = [];
  let totalItems = 0;
  let totalPages = 1;
  let currentValidPage = 1;

  if (currentView === "end") {
    projectEndRequests = await getProjectAllEndRequest();
    totalItems = projectEndRequests.length;
    totalPages = 1;
    currentValidPage = 1;
  } else if (isDefaultFilters && currentView === "list") {
    const listData = await getProjects((currentPage ?? 1) - 1);
    projectMaterials = listData.content ?? [];
    totalItems = projectMaterials.length;
    totalPages = listData.totalPages ?? 1;
    currentValidPage = (listData.number ?? 0) + 1;
  } else {
    const searchData = await searchProjects({
      keyword: projectCurrentFilters.search,
      category: projectCurrentFilters.category,
      subcategory: SUBCATEGORY_TO_EN[projectCurrentFilters.subCategory],
      projectStatus: projectCurrentFilters.projectStatus || "READY",
      semester: projectCurrentFilters.semester,
    });
    projectMaterials = searchData.content ?? [];
    totalItems = projectMaterials.length;
    totalPages = searchData.totalPages ?? 1;
    currentValidPage = (searchData.number ?? 0) + 1;
  }
  if (currentView !== "end" && projectMaterials.length === 0) {
    return (
      <div className="flex items-center justify-center max-h-screen w-full">
        <SCSearchResultNotFound mode="adminStudy" />
      </div>
    );
  }

  if (
    (currentView === "end" && projectEndRequests.length === 0) ||
    (currentView === "pending" && projectMaterials.length === 0)
  ) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-[40vh] text-center p-6 ">
        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-gray-700">
          <AlertCircle className="w-7 h-7 text-gray-500 dark:text-gray-400" />
        </div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          현재 대기 중인 요청이 없습니다
        </h2>
      </div>
    );
  }

  return (
    <>
      {currentTab === "project" && currentView === "pending" && (
        <>
          <div className="mt-4 text-lg text-gray-600">
            ✔️ 프로젝트 개설 승인 대기 목록
          </div>
          {projectMaterials.map((project) => {
            const displayStatus =
              project.status === "APPROVED" ? "READY" : project.status;

            return (
              <Link
                key={project.id}
                href={`/admin/study/${project.id}?tab=project`}
              >
                <div className="mt-4 card-list">
                  <div className="pb-4 flex flex-col space-y-1.5 p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-3">
                        <div className="flex gap-3 sm:flex-row sm:items-center flex-col items-start">
                          <div className="text-xl font-medium">
                            {project.title}
                          </div>
                          <div className="flex items-center gap-2">
                            <DefaultBadge
                              variant="custom"
                              className={getStatusColor(displayStatus)}
                            >
                              {
                                STATUS_LABELS[
                                  displayStatus as keyof typeof STATUS_LABELS
                                ]
                              }
                            </DefaultBadge>
                            <DefaultBadge className="bg-gray-100 h-6 border border-gray-200 text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200">
                              {project.category}
                            </DefaultBadge>
                            <DefaultBadge className="bg-gray-100 h-6 border border-gray-200 text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200">
                              {SUBCATEGORY_FROM_EN[project.subcategory] ??
                                project.subcategory}
                            </DefaultBadge>
                          </div>
                        </div>
                        <div className="text-base text-gray-600">
                          {project.description}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 본문 */}
                  <div className="p-6 pt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">
                              프로젝트장: {project.projectCreatorName} (
                              {MEMBER_GRADE_LABELS[project.projectCreatorGrade]}
                              )
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">
                              현재 인원: {project.currentParticipantNumber}/
                              {project.maxParticipantNumber}명
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">
                              {formatDate(project.startDate, "dot")} ~{" "}
                              {formatDate(project.endDate, "dot")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">
                              진행률:{" "}
                              {calculateProgress(
                                project.startDate,
                                project.endDate
                              )}
                              %
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-0 mt-4 flex justify-between flex-col md:flex-row gap-5">
                      <div className="w-full overflow-x-auto">
                        <div className="flex gap-5 min-w-max">
                          {project.attachments?.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-50 rounded-lg p-3 w-78 sm:w-[25rem] flex-shrink-0"
                            >
                              <div className="flex items-center gap-3">
                                <PdfSVG className="w-5 h-5 text-red-500" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {file.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {formatFileSize(file.size)}
                                  </p>
                                </div>
                              </div>
                              <form action={downloadFile}>
                                <input
                                  type="hidden"
                                  name="fileName"
                                  value={file.name}
                                />
                                <input
                                  type="hidden"
                                  name="studyId"
                                  value={project.id}
                                />
                                <DownloadButton file={file} />
                              </form>
                            </div>
                          ))}
                        </div>
                      </div>
                      {project.status === "READY" && (
                        <div className="flex flex-row gap-2 w-full sm:w-[20rem] h-full justify-end items-end self-end z-30">
                          <CCAdminStudyProjectActionButtons id={project.id} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </>
      )}

      {currentTab === "project" && currentView === "end" && (
        <>
          <div className="mt-4 text-lg text-gray-600">
            ✔️ 프로젝트 종료 승인 대기 목록
          </div>

          {projectEndRequests.map((project) => (
            <Link
              key={project.projectId}
              href={`/admin/study/${project.projectId}?tab=project`}
            >
              <div className="mt-4 card-list">
                <div className="pb-4 flex flex-col space-y-1.5 p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <div className="flex gap-3 sm:flex-row sm:items-center flex-col items-start">
                        <div className="text-xl font-medium">
                          {project.title}
                        </div>
                        <div className="flex items-center gap-2">
                          <DefaultBadge
                            variant="custom"
                            className={getStatusColor(project.status)}
                          >
                            {
                              STATUS_LABELS[
                                project.status as keyof typeof STATUS_LABELS
                              ]
                            }
                          </DefaultBadge>
                          <DefaultBadge className="bg-gray-100 h-6 border border-gray-200 text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200">
                            {project.category}
                          </DefaultBadge>
                          <DefaultBadge className="bg-gray-100 h-6 border border-gray-200 text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200">
                            {SUBCATEGORY_FROM_EN[project.subCategory] ??
                              project.subCategory}
                          </DefaultBadge>
                        </div>
                      </div>
                      <div className="text-base text-gray-600">
                        {project.description}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 본문 */}
                <div className="p-6 pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            프로젝트장: {project.projectCreatorName} (
                            {MEMBER_GRADE_LABELS[project.projectCreatorGrade]})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            현재 인원: {project.currentParticipantNumber}/
                            {project.maxParticipantNumber}명
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            {formatDate(project.startedAt, "dot")} ~{" "}
                            {formatDate(project.endedAt, "dot")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            진행률:{" "}
                            {calculateProgress(
                              project.startedAt,
                              project.endedAt
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-0 mt-4 flex flex-col md:flex-row gap-5">
                    <div className="w-full overflow-x-auto">
                      <div className="flex gap-5 min-w-max">
                        {project.attachment && (
                          <div
                            key={project.attachment.id}
                            className="flex items-center justify-between bg-gray-50 rounded-lg p-3 w-78 sm:w-[25rem] flex-shrink-0"
                          >
                            <div className="flex items-center gap-3">
                              <PdfSVG className="w-5 h-5 text-red-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {project.attachment.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {formatFileSize(
                                    Number(project.attachment.size)
                                  )}
                                </p>
                              </div>
                            </div>

                            <form action={downloadFile}>
                              <input
                                type="hidden"
                                name="fileName"
                                value={project.attachment.name}
                              />
                              <input
                                type="hidden"
                                name="projectId"
                                value={project.projectId}
                              />
                              <DownloadButton file={project.attachment} />
                            </form>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 w-full sm:w-[20rem] h-full justify-end items-end self-end">
                      <CCAdminStudyProjectActionButtons
                        id={project.projectId}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </>
      )}

      {currentTab === "project" && currentView === "list" && (
        <>
          <div className="mt-4 text-lg text-gray-600">📁 프로젝트 목록</div>
          {projectMaterials.map((project) => (
            <Link
              key={project.id}
              href={`/admin/study/${project.id}?tab=project`}
            >
              <div className="mt-4 card-list">
                {/* 헤더 */}
                <div className="pb-4 flex flex-col space-y-1.5 p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <div className="flex gap-3 sm:flex-row sm:items-center flex-col items-start">
                        <div className="text-xl font-medium">
                          {project.title}
                        </div>
                        <div className="flex items-center gap-2">
                          <DefaultBadge
                            variant="custom"
                            className={getStatusColor(project.status)}
                          >
                            {
                              STATUS_LABELS[
                                project.status as keyof typeof STATUS_LABELS
                              ]
                            }
                          </DefaultBadge>
                          <DefaultBadge className="bg-gray-100 h-6 border border-gray-200 text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200">
                            {project.category}
                          </DefaultBadge>
                          <DefaultBadge className="bg-gray-100 h-6 border border-gray-200 text-gray-700 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200">
                            {SUBCATEGORY_FROM_EN[project.subcategory] ??
                              project.subcategory}
                          </DefaultBadge>
                        </div>
                      </div>
                      <div className="text-base text-gray-600">
                        {project.description}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 본문 */}
                <div className="p-6 pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            프로젝트장 (학년): {project.projectCreatorName} (
                            {MEMBER_GRADE_LABELS[project.projectCreatorGrade]})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            현재 인원: {project.currentParticipantNumber}/
                            {project.maxParticipantNumber}명
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            {formatDate(project.startDate, "dot")} ~{" "}
                            {formatDate(project.endDate, "dot")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            진행률:{" "}
                            {calculateProgress(
                              project.startDate,
                              project.endDate
                            )}
                            %
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-0 mt-4 flex flex-col md:flex-row gap-5">
                    <div className="w-full overflow-x-auto">
                      <div className="flex gap-5 min-w-max">
                        {project.attachments?.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 rounded-lg p-3 w-78 sm:w-[25rem] flex-shrink-0"
                          >
                            <div className="flex items-center gap-3">
                              <PdfSVG className="w-5 h-5 text-red-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {file.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {formatFileSize(file.size)}
                                </p>
                              </div>
                            </div>
                            <form action={downloadFile}>
                              <input
                                type="hidden"
                                name="fileName"
                                value={file.name}
                              />
                              <input
                                type="hidden"
                                name="studyId"
                                value={project.id}
                              />
                              <DownloadButton file={file} />
                            </form>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </>
      )}
      {totalItems > 0 && (
        <CCAdminStudyPagination
          currentPage={currentValidPage}
          totalPages={totalPages}
          currentSearch={currentSearch}
          currentTab={currentTab}
          currentView={currentView}
        />
      )}
    </>
  );
}
