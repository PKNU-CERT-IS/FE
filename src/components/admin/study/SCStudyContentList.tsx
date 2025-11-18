"server-only";

import DefaultBadge from "@/components/ui/defaultBadge";
import { Calendar, User, Users, Target, AlertCircle } from "lucide-react";
import { MainTab, SubTab } from "@/types/admin/adminStudyTab";
import Link from "next/link";
import PdfSVG from "/public/icons/pdf.svg";
import CCAdminStudyPagination from "@/components/admin/study/CCAdminStudyPagination";
import SCSearchResultNotFound from "@/components/ui/SCSearchResultNotFound";
import { formatFileSize } from "@/utils/attachedFileUtils";
import {
  StudyCurrentFilters,
  MEMBER_GRADE_LABELS,
  StudyList,
} from "@/types/study";
import { SUBCATEGORY_FROM_EN, SUBCATEGORY_TO_EN } from "@/types/category";
import { getStudies, searchStudies } from "@/app/api/study/SCStudyApi";
import { calculateProgress } from "@/utils/adminProgressUtil";
import { formatDate } from "@/utils/formatDateUtil";
import {
  getStudyAllEndRequest,
  StudyEndRequest,
} from "@/app/api/admin/study/SCAdminStudyEndGetApi";
import { getStatusColor } from "@/utils/badgeUtils";
import { STATUS_LABELS } from "@/types/progressStatus";
import DownloadButton from "@/components/detail/SCDownloadButton";
import CCAdminStudyProjectActionButtons from "@/components/ui/CCAdminActionButtons";

interface SCStudyContentListProps {
  currentTab: MainTab;
  currentView: SubTab;
  currentSearch?: string;
  currentPage: number;
  studyCurrentFilters: StudyCurrentFilters;
}

export default async function SCStudyContentList({
  currentTab,
  currentView,
  currentSearch = "",
  currentPage,
  studyCurrentFilters,
}: SCStudyContentListProps) {
  const statusByView =
    !currentView || currentView === "pending"
      ? "READY"
      : currentView === "list"
      ? "ALL"
      : "";

  const isDefaultFilters =
    (!currentSearch || currentSearch === "ALL") &&
    (studyCurrentFilters.category === "ALL" || !studyCurrentFilters.category) &&
    (studyCurrentFilters.subCategory === "ALL" ||
      !studyCurrentFilters.subCategory) &&
    (studyCurrentFilters.semester === "ALL" || !studyCurrentFilters.semester) &&
    (studyCurrentFilters.studyStatus === "ALL" ||
      !studyCurrentFilters.studyStatus) &&
    (statusByView === "ALL" || !statusByView);

  let studyMaterials: StudyList[] = [];
  let studyEndRequests: StudyEndRequest[] = [];
  let totalItems = 0;
  let totalPages = 1;
  let currentValidPage = 1;

  if (currentView === "end") {
    studyEndRequests = await getStudyAllEndRequest();
    totalItems = studyEndRequests.length;
    totalPages = 1;
    currentValidPage = 1;
  } else if (isDefaultFilters && currentView === "list") {
    const listData = await getStudies((currentPage ?? 1) - 1);
    studyMaterials = listData.content ?? [];
    totalItems = listData.totalElements ?? 0;
    totalPages = listData.totalPages ?? 1;
    currentValidPage = (listData.number ?? 0) + 1;
  } else {
    const searchData = await searchStudies(
      {
        keyword: studyCurrentFilters.search,
        category: studyCurrentFilters.category,
        subcategory: SUBCATEGORY_TO_EN[studyCurrentFilters.subCategory],
        studyStatus:
          currentView === "pending" ? "READY" : studyCurrentFilters.studyStatus,
        semester: studyCurrentFilters.semester,
      },
      {
        page: (currentPage ?? 1) - 1,
      }
    );
    studyMaterials = searchData.content ?? [];

    totalItems = searchData.totalElements ?? 0;
    totalPages = searchData.totalPages ?? 1;
    currentValidPage = (searchData.number ?? 0) + 1;
  }

  if (currentView !== "end" && studyMaterials.length === 0) {
    return (
      <div className="flex items-center justify-center max-h-screen w-full">
        <SCSearchResultNotFound mode="adminStudy" />
      </div>
    );
  }

  if (
    (currentView === "end" && studyEndRequests.length === 0) ||
    (currentView === "pending" && studyMaterials.length === 0)
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
      {currentTab === "study" && currentView === "pending" && (
        <>
          <div className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            ✔️ 스터디 개설 승인 대기 목록
          </div>

          {studyMaterials.map((study) => {
            return (
              <Link key={study.id} href={`/admin/study/${study.id}?tab=study`}>
                <div className="mt-4 card-list dark-default">
                  <div className="pb-4 flex flex-col space-y-1.5 p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-3">
                        <div className="flex gap-3 sm:flex-row sm:items-center flex-col items-start">
                          <div className="text-xl font-medium text-gray-900 dark:text-gray-200">
                            {study.title}
                          </div>

                          <div className="flex items-center gap-2">
                            <DefaultBadge
                              variant="custom"
                              className={getStatusColor(study.status)}
                            >
                              {
                                STATUS_LABELS[
                                  study.status as keyof typeof STATUS_LABELS
                                ]
                              }
                            </DefaultBadge>

                            <DefaultBadge
                              className="bg-gray-100 h-6 border border-gray-200 text-gray-700 
                            dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
                            >
                              {study.category}
                            </DefaultBadge>

                            <DefaultBadge
                              className="bg-gray-100 h-6 border border-gray-200 text-gray-700 
                            dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
                            >
                              {SUBCATEGORY_FROM_EN[study.subcategory] ??
                                study.subcategory}
                            </DefaultBadge>
                          </div>
                        </div>
                        <div className="text-base text-gray-600 dark:text-gray-300">
                          {study.description}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              스터디장 (학년): {study.studyCreatorName} (
                              {MEMBER_GRADE_LABELS[study.studyCreatorGrade]})
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              현재 인원: {study.currentParticipantNumber}/
                              {study.maxParticipantNumber}명
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {formatDate(study.startDate, "dot")} ~{" "}
                              {formatDate(study.endDate, "dot")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              진행률:{" "}
                              {calculateProgress(
                                study.startDate,
                                study.endDate
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
                          {study.attachments?.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-50 rounded-lg p-3
                            dark:bg-gray-700"
                            >
                              <div className="flex items-center gap-3">
                                <PdfSVG className="w-5 h-5 text-red-500" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                    {file.name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {formatFileSize(file.size)}
                                  </p>
                                </div>
                              </div>
                              <input
                                type="hidden"
                                name="fileName"
                                value={file.name}
                              />
                              <input
                                type="hidden"
                                name="studyId"
                                value={study.id}
                              />
                              <DownloadButton file={file} />
                            </div>
                          ))}
                        </div>
                      </div>

                      {study.status === "READY" && (
                        <div className="flex flex-row gap-2 w-full sm:w-[20rem] h-full justify-end items-end self-end">
                          <CCAdminStudyProjectActionButtons id={study.id} />
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
      {currentTab === "study" && currentView === "end" && (
        <>
          <div className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            ✔️ 스터디 종료 승인 대기 목록
          </div>

          {studyEndRequests.map((study) => (
            <Link
              key={study.studyId}
              href={`/admin/study/${study.studyId}?tab=study`}
            >
              <div key={study.studyId} className="mt-4 card-list dark-default">
                <div className="pb-4 flex flex-col space-y-1.5 p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <div className="flex gap-3 sm:flex-row sm:items-center flex-col items-start">
                        <div className="text-xl font-medium text-gray-900 dark:text-gray-200">
                          {study.title}
                        </div>
                        <div className="flex items-center gap-2">
                          <DefaultBadge
                            variant="custom"
                            className={getStatusColor(study.status)}
                          >
                            {
                              STATUS_LABELS[
                                study.status as keyof typeof STATUS_LABELS
                              ]
                            }
                          </DefaultBadge>
                          <DefaultBadge
                            className="bg-gray-100 h-6 border border-gray-200 text-gray-700 
                          dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
                          >
                            {study.category}
                          </DefaultBadge>
                          <DefaultBadge
                            className="bg-gray-100 h-6 border border-gray-200 text-gray-700 
                          dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
                          >
                            {SUBCATEGORY_FROM_EN[study.subCategory] ??
                              study.subCategory}
                          </DefaultBadge>
                        </div>
                      </div>
                      <div className="text-base text-gray-600 dark:text-gray-300">
                        {study.description}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            스터디장 (학년): {study.studyCreatorName} (
                            {MEMBER_GRADE_LABELS[study.studyCreatorGrade]})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            현재 인원: {study.currentParticipantNumber}/
                            {study.maxParticipantNumber}명
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {formatDate(study.startedAt, "dot")} ~{" "}
                            {formatDate(study.endedAt, "dot")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-0 mt-4 flex flex-col md:flex-row gap-5">
                    <div className="w-full overflow-x-auto">
                      <div className="flex gap-5 min-w-max">
                        {study.attachment && (
                          <div
                            key={study.attachment.id}
                            className="flex items-center justify-between bg-gray-50 rounded-lg p-3 w-78 sm:w-[25rem] flex-shrink-0
                          dark:bg-gray-700"
                          >
                            <div className="flex items-center gap-3">
                              <PdfSVG className="w-5 h-5 text-red-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                  {study.attachment.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatFileSize(study.attachment.size)}
                                </p>
                              </div>
                            </div>
                            <input
                              type="hidden"
                              name="fileName"
                              value={study.attachment.name}
                            />
                            <input
                              type="hidden"
                              name="studyId"
                              value={study.studyId}
                            />
                            <DownloadButton file={study.attachment} />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-row gap-2 w-full sm:w-[20rem] h-full justify-end items-end self-end">
                      <CCAdminStudyProjectActionButtons id={study.studyId} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </>
      )}

      {currentTab === "study" && currentView === "list" && (
        <>
          <div className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            📁 스터디 목록
          </div>

          {studyMaterials.map((study) => (
            <Link key={study.id} href={`/admin/study/${study.id}?tab=study`}>
              <div key={study.id} className="mt-4 card-list dark-default">
                <div className="pb-4 flex flex-col space-y-1.5 p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <div className="flex gap-3 sm:flex-row sm:items-center flex-col items-start">
                        <div className="text-xl font-medium text-gray-900 dark:text-gray-200">
                          {study.title}
                        </div>

                        <div className="flex items-center gap-2">
                          <DefaultBadge
                            variant="custom"
                            className={getStatusColor(study.status)}
                          >
                            {
                              STATUS_LABELS[
                                study.status as keyof typeof STATUS_LABELS
                              ]
                            }
                          </DefaultBadge>
                          <DefaultBadge
                            className="bg-gray-100 h-6 border border-gray-200 text-gray-700 
                          dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
                          >
                            {study.category}
                          </DefaultBadge>
                          <DefaultBadge
                            className="bg-gray-100 h-6 border border-gray-200 text-gray-700 
                          dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200"
                          >
                            {SUBCATEGORY_FROM_EN[study.subcategory] ??
                              study.subcategory}
                          </DefaultBadge>
                        </div>
                      </div>
                      <div className="text-base text-gray-600 dark:text-gray-300">
                        {study.description}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            스터디장 (학년): {study.studyCreatorName} (
                            {MEMBER_GRADE_LABELS[study.studyCreatorGrade]})
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            현재 인원: {study.currentParticipantNumber}/
                            {study.maxParticipantNumber}명
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {formatDate(study.startDate, "dot")} ~{" "}
                            {formatDate(study.endDate, "dot")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            진행률:{" "}
                            {calculateProgress(study.startDate, study.endDate)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-0 mt-4 flex flex-col md:flex-row gap-5">
                    <div className="w-full overflow-x-auto">
                      <div className="flex gap-5 min-w-max">
                        {study.attachments?.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-50 rounded-lg p-3 w-78 sm:w-[25rem] flex-shrink-0
                          dark:bg-gray-700"
                          >
                            <div className="flex items-center gap-3">
                              <PdfSVG className="w-5 h-5 text-red-500" />
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                  {file.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {formatFileSize(file.size)}
                                </p>
                              </div>
                            </div>

                            <input
                              type="hidden"
                              name="fileName"
                              value={file.name}
                            />
                            <input
                              type="hidden"
                              name="studyId"
                              value={study.id}
                            />
                            <DownloadButton file={file} />
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
