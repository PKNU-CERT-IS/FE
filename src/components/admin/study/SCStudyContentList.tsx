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
import DefaultNoneResultUi from "@/components/ui/defaultNoneResultUi";
import TerminalSVG from "/public/icons/terminal.svg";
import Link from "next/link";
import PdfSVG from "/public/icons/pdf.svg";
import DownloadGraySVG from "/public/icons/download-gray.svg";
import { downloadFile } from "@/actions/study/StudyDownloadFileServerAction";
import CCAdminStudyPagination from "./CCAdminStudyPagination";

export const studies: Study[] = [
  {
    id: 1,
    isPending: true,
    title: "OWASP Top 10 스터디",
    description: "최신 OWASP Top 10을 주차별로 읽고 실습합니다.",
    content: "상세 소개...",
    category: "보안/웹",
    attachments: [
      {
        id: "file_1_1",
        name: "해커톤_기획서.pdf",
        size: 2547892,
        type: "application/pdf",
        category: "document",
        downloadUrl: "/api/files/download/hackathon_plan.pdf",
        uploadDate: "2025-01-15T09:30:00Z",
        description: "해커톤 전체 기획서 및 일정표",
      },
    ],
    startDate: "2025-09-01",
    endDate: "2025-11-30",
    maxParticipants: "12",
    author: "김보안",
  },
  {
    id: 2,
    isPending: false,
    title: "프론트엔드 성능 최적화 스터디",
    description: "렌더링 최적화/번들 분석 등 실무 중심",
    content: "상세 소개...",
    category: "프론트엔드",
    attachments: [
      {
        id: "file_1_1",
        name: "해커톤_기획서.pdf",
        size: 2547892,
        type: "application/pdf",
        category: "document",
        downloadUrl: "/api/files/download/hackathon_plan.pdf",
        uploadDate: "2025-01-15T09:30:00Z",
        description: "해커톤 전체 기획서 및 일정표",
      },
    ],
    startDate: "2025-08-20",
    endDate: "2025-10-08",
    maxParticipants: "8",
    author: "강찬희",
    currentParticipants: 5,
    progress: 70,
  },
];

interface SCStudyContentListProps {
  currentTab: MainTab;
  currentView: SubTab;
  currentSearch?: string;
  currentPage: number;
}

export default async function SCStudyContentList({
  currentTab,
  currentView,
  currentSearch = "",
  currentPage = 1,
}: SCStudyContentListProps) {
  const viewFiltered =
    currentView === "pending"
      ? studies.filter((s) => s.isPending)
      : currentView === "list"
      ? studies.filter((s) => !s.isPending)
      : studies;

  const searchFiltered = currentSearch
    ? viewFiltered.filter(
        (item) =>
          item.title?.toLowerCase().includes(currentSearch.toLowerCase()) ||
          item.description
            ?.toLowerCase()
            .includes(currentSearch.toLowerCase()) ||
          item.author?.toLowerCase().includes(currentSearch.toLowerCase())
      )
    : viewFiltered;

  const ITEMS_PER_PAGE = 3;
  const totalItems = searchFiltered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedContents = searchFiltered.slice(startIndex, endIndex);

  const totalPending = studies.filter((s) => s.isPending).length;
  const totalProgress = studies.filter((s) => !s.isPending).length;
  const pendingUntilCurrentPage = studies
    .filter((p) => p.isPending)
    .slice(0, currentPage * ITEMS_PER_PAGE).length;

  const progressUntilCurrentPage = studies
    .filter((p) => !p.isPending)
    .slice(0, currentPage * ITEMS_PER_PAGE).length;

  return (
    <>
      {currentTab === "study" && currentView === "pending" && (
        <>
          <div className="mt-4 text-lg text-gray-600">
            ✔️ 스터디 승인 대기 목록 ({pendingUntilCurrentPage}/{totalPending})
          </div>

          {paginatedContents.length === 0 ? (
            <div className="flex items-center justify-center max-h-screen w-full">
              <DefaultNoneResultUi
                icon={<TerminalSVG className="text-cert-dark-red" />}
                title="검색 결과가 없습니다"
                description="다른 검색어나 필터를 시도해보세요."
              />
            </div>
          ) : (
            paginatedContents.map((study) => (
              <Link key={study.id} href={`/admin/study/${study.id}?tab=study`}>
                <div key={study.id} className="mt-4 card-list">
                  <div className="pb-4 flex flex-col space-y-1.5 p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-3">
                        <div className="flex gap-3 sm:flex-row sm:items-center flex-col items-start">
                          <div className="text-xl font-medium">
                            {study.title}
                          </div>
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
                                {file.size}
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
                      <div className="flex flex-row gap-2 w-full sm:w-[20rem] h-full justify-end items-end self-end justify-self-end">
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
            ))
          )}
        </>
      )}

      {currentTab === "study" && currentView === "list" && (
        <>
          <div className="mt-4 text-lg text-gray-600">
            📁 스터디 목록 ({progressUntilCurrentPage}/{totalProgress})
          </div>

          {paginatedContents.length === 0 ? (
            <div className="flex items-center justify-center max-h-screen w-full">
              <DefaultNoneResultUi
                icon={<TerminalSVG className="text-cert-dark-red" />}
                title="검색 결과가 없습니다"
                description="다른 검색어나 필터를 시도해보세요."
              />
            </div>
          ) : (
            paginatedContents.map((study) => (
              <Link key={study.id} href={`/admin/study/${study.id}?tab=study`}>
                <div key={study.id} className="mt-4 card-list">
                  <div className="pb-4 flex flex-col space-y-1.5 p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-3">
                        <div className="flex gap-3 sm:flex-row sm:items-center flex-col items-start">
                          <div className="text-xl font-medium">
                            {study.title}
                          </div>
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
                              <p className="text-xs text-gray-500">
                                {file.size}
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
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
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
