"server-only";

import DefaultBadge from "@/components/ui/defaultBadge";
import { Calendar, User, Users, Target } from "lucide-react";
import RequestActionButtons from "@/components/ui/requestActionButtons";
import { MainTab, SubTab } from "@/types/admin/adminStudyTab";
import { Study, isApprovedStudy } from "@/types/admin/adminCreateFormData";
import {
  approveRequest,
  rejectRequest,
} from "@/actions/admin/study/AdminRequestServerAction";
import Link from "next/link";
import PdfSVG from "/public/icons/pdf.svg";
import DownloadGraySVG from "/public/icons/download-gray.svg";
import { downloadFile } from "@/actions/study/StudyDownloadFileServerAction";
import CCAdminStudyPagination from "@/components/admin/study/CCAdminStudyPagination";
import SCSearchResultNotFound from "@/components/ui/SCSearchResultNotFound";
import { formatFileSize } from "@/utils/attachedFileUtils";
import { CurrentFilters } from "@/types/study";

export const studies: Study[] = [
  {
    id: 1,
    isPending: true,
    title: "OWASP Top 10 스터디",
    description: "최신 OWASP Top 10을 주차별로 읽고 실습합니다.",
    content: "상세 소개...",
    semester: "2025-2",
    category: "CTF",
    subCategory: "AI",
    attachments: [
      {
        name: "해커톤_기획서.pdf",
        size: 2547892,
        type: "application/pdf",
        attachedUrl: "/api/files/download/hackathon_plan.pdf",
      },
    ],
    startDate: "2025-09-01",
    endDate: "2025-11-30",
    maxParticipants: "12",
    author: "김보안",
    status: "not_started",
  },
  {
    id: 2,
    isPending: false,
    title: "프론트엔드 성능 최적화 스터디",
    description: "렌더링 최적화/번들 분석 등 실무 중심",
    content: "상세 소개...",
    semester: "2025-2",
    category: "CS",
    subCategory: "정수론",
    attachments: [
      {
        name: "해커톤_기획서.pdf",
        size: 2547892,
        type: "application/pdf",
        attachedUrl: "/api/files/download/hackathon_plan.pdf",
      },
    ],
    startDate: "2025-08-20",
    endDate: "2025-10-08",
    maxParticipants: "8",
    author: "강찬희",
    currentParticipants: 5,
    progress: 70,
    status: "in_progress",
  },
  {
    id: 3,
    isPending: false,
    title: "웹 최적화 스터디",
    description: "렌더링 최적화/번들 분석 등 실무 중심",
    content: "상세 소개...",
    semester: "2025-2",
    category: "CS",
    subCategory: "선형대수학",
    attachments: [
      {
        name: "해커톤_기획서.pdf",
        size: 2547892,
        type: "application/pdf",
        attachedUrl: "/api/files/download/hackathon_plan.pdf",
      },
    ],
    startDate: "2025-08-20",
    endDate: "2025-10-08",
    maxParticipants: "8",
    author: "강찬희",
    currentParticipants: 5,
    progress: 70,
    status: "in_progress",
  },
];

interface SCStudyContentListProps {
  currentTab: MainTab;
  currentView: SubTab;
  currentSearch?: string;
  currentPage: number;
  currentFilters: CurrentFilters;
}

export default async function SCStudyContentList({
  currentTab,
  currentView,
  currentSearch = "",
  currentPage = 1,
  currentFilters,
}: SCStudyContentListProps) {
  const viewFiltered =
    currentView === "pending"
      ? studies.filter((s) => s.isPending)
      : currentView === "list"
      ? studies.filter((s) => !s.isPending)
      : studies;

  const filteredStudyMaterials = viewFiltered.filter((item) => {
    const matchesSearch =
      !currentSearch ||
      item.title?.toLowerCase().includes(currentSearch.toLowerCase()) ||
      item.description?.toLowerCase().includes(currentSearch.toLowerCase()) ||
      item.author?.toLowerCase().includes(currentSearch.toLowerCase());

    const matchesSemester =
      currentFilters.semester === "all" ||
      item.semester === currentFilters.semester;

    const matchesCategory =
      currentFilters.category === "all" ||
      item.category === currentFilters.category;

    const matchesSubCategory =
      currentFilters.subCategory === "all" ||
      item.subCategory === currentFilters.subCategory;

    const matchesStatus =
      currentFilters.status === "all" || item.status === currentFilters.status;

    return (
      matchesSearch &&
      matchesSemester &&
      matchesCategory &&
      matchesSubCategory &&
      matchesStatus
    );
  });

  // 🔹 페이지네이션
  const ITEMS_PER_PAGE = 3;
  const totalItems = filteredStudyMaterials.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedContents = filteredStudyMaterials.slice(startIndex, endIndex);

  const totalPending = studies.filter((s) => s.isPending).length;
  const totalProgress = studies.filter((s) => !s.isPending).length;
  const pendingUntilCurrentPage = studies
    .filter((p) => p.isPending)
    .slice(0, currentPage * ITEMS_PER_PAGE).length;

  const progressUntilCurrentPage = studies
    .filter((p) => !p.isPending)
    .slice(0, currentPage * ITEMS_PER_PAGE).length;

  if (paginatedContents.length === 0) {
    return (
      <div className="flex items-center justify-center max-h-screen w-full">
        <SCSearchResultNotFound mode="adminStudy" />
      </div>
    );
  }

  return (
    <>
      {currentTab === "study" && currentView === "pending" && (
        <>
          <div className="mt-4 text-lg text-gray-600">
            ✔️ 스터디 승인 대기 목록 ({pendingUntilCurrentPage}/{totalPending})
          </div>

          {paginatedContents.map((study) => (
            <Link key={study.id} href={`/admin/study/${study.id}?tab=study`}>
              <div key={study.id} className="mt-4 card-list">
                <div className="pb-4 flex flex-col space-y-1.5 p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <div className="flex gap-3 sm:flex-row sm:items-center flex-col items-start">
                        <div className="text-xl font-medium">{study.title}</div>
                        <div className="flex items-center gap-2">
                          {study.isPending ? (
                            <DefaultBadge className="bg-red-100 text-red-800">
                              승인 대기
                            </DefaultBadge>
                          ) : (
                            <DefaultBadge className="bg-yellow-100 text-yellow-800">
                              승인됨
                            </DefaultBadge>
                          )}
                          <DefaultBadge className="bg-green-100 text-green-800">
                            {study.category}
                          </DefaultBadge>
                          <DefaultBadge className="bg-green-100 text-green-800">
                            {study.subCategory}
                          </DefaultBadge>
                        </div>
                      </div>
                      <div className="text-base text-gray-600">
                        {study.description}
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
                            스터디장: {study.author}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            최대 인원: {study.maxParticipants}명
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            {study.startDate} ~ {study.endDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-0 mt-4 flex justify-between flex-col md:flex-row gap-5">
                    {study.attachments?.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 rounded-lg p-3 w-full sm:w-[35rem]"
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
                            value={study.id}
                          />
                          <button type="submit">
                            <DownloadGraySVG className="text-gray-400 hover:text-gray-600" />
                          </button>
                        </form>
                      </div>
                    ))}
                    <div className="flex flex-row gap-2 w-full sm:w-[20rem] h-full justify-end items-end self-end justify-self-en">
                      <RequestActionButtons
                        id={study.id}
                        approveAction={approveRequest}
                        rejectAction={rejectRequest}
                      />
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
          <div className="mt-4 text-lg text-gray-600">
            📁 스터디 목록 ({progressUntilCurrentPage}/{totalProgress})
          </div>

          {paginatedContents.map((study) => (
            <Link key={study.id} href={`/admin/study/${study.id}?tab=study`}>
              <div key={study.id} className="mt-4 card-list">
                <div className="pb-4 flex flex-col space-y-1.5 p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <div className="flex gap-3 sm:flex-row sm:items-center flex-col items-start">
                        <div className="text-xl font-medium">{study.title}</div>
                        <div className="flex items-center gap-2">
                          {study.isPending ? (
                            <DefaultBadge className="bg-red-100 text-red-800">
                              승인 대기
                            </DefaultBadge>
                          ) : (
                            <DefaultBadge className="bg-yellow-100 text-yellow-800">
                              승인됨
                            </DefaultBadge>
                          )}
                          <DefaultBadge className="bg-green-100 text-green-800">
                            {study.category}
                          </DefaultBadge>
                          <DefaultBadge className="bg-green-100 text-green-800">
                            {study.subCategory}
                          </DefaultBadge>
                        </div>
                      </div>
                      <div className="text-base text-gray-600">
                        {study.description}
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
                            스터디장: {study.author}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          {isApprovedStudy(study) ? (
                            <span className="text-sm">
                              현재 인원: {study.currentParticipants}/
                              {study.maxParticipants}명
                            </span>
                          ) : (
                            <span className="text-sm">
                              최대 인원: {study.maxParticipants}명
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            {study.startDate} ~ {study.endDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-gray-500" />
                          {isApprovedStudy(study) && (
                            <span className="text-sm">
                              진행률: {study.progress}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 mt-4 ">
                    {study.attachments?.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                      >
                        <div className="flex items-center gap-3">
                          <PdfSVG className="w-5 h-5 text-red-500" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">{file.size}</p>
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
                            value={study.id}
                          />
                          <button type="submit">
                            <DownloadGraySVG className="text-gray-400 hover:text-gray-600" />
                          </button>
                        </form>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </>
      )}
      {totalItems > 0 && (
        <CCAdminStudyPagination
          currentPage={validPage}
          totalPages={totalPages}
          currentSearch={currentSearch}
          currentTab={currentTab}
          currentView={currentView}
        />
      )}
    </>
  );
}
