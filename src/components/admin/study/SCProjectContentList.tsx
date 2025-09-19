"server-only";

import DefaultBadge from "@/components/ui/defaultBadge";
import { Calendar, Target, User, Users } from "lucide-react";
import RequestActionButtons from "@/components/ui/requestActionButtons";
import { MainTab, SubTab } from "@/types/admin/adminStudyTab";
import {
  approveRequest,
  rejectRequest,
} from "@/actions/admin/study/AdminRequestServerAction";
import { isApprovedProject, Project } from "@/types/admin/adminCreateFormData";
import Link from "next/link";
import PdfSVG from "/public/icons/pdf.svg";
import DownloadGraySVG from "/public/icons/download-gray.svg";
import { downloadFile } from "@/actions/study/StudyDownloadFileServerAction";
import CCAdminStudyPagination from "@/components/admin/study/CCAdminStudyPagination";
import SCSearchResultNotFound from "@/components/ui/SCSearchResultNotFound";
import { formatFileSize } from "@/utils/attachedFileUtils";
import { CurrentFilters } from "@/types/project";

export const projects: Project[] = [
  // 승인 대기: 폼에서 제출된 필드만 존재
  {
    id: 1,
    isPending: true,
    title: "CERT-IS 홈페이지 리뉴얼",
    description:
      "Next.js + Tailwind 기반으로 동아리 홈페이지 리뉴얼. 접근성 개선과 Admin 콘솔 추가.",
    content: `## 목표
- SSR/ISR 적용으로 초기 로딩 개선
- Admin 대시보드 구현
- 접근성(ARIA) 점검

## 기술 스택
- Next.js, TypeScript, TailwindCSS, Supabase`,
    semester: "2025-2",
    status: "not_started",
    category: "CS",
    subCategory: "논리회로",
    attachments: [
      {
        name: "요구사항_정의서.pdf",
        size: 314572,
        type: "application/pdf",
        attachedUrl: "/api/files/download/requirements-spec.pdf",
      },
    ],
    startDate: "2025-08-25",
    endDate: "2025-11-30",
    maxParticipants: "6",
    githubUrl: "https://github.com/cert-is/renewal",
    demoUrl: "https://cert-is.dev",
    externalLinks: [
      { label: "디자인 시안(Figma)", url: "https://figma.com/file/xyz" },
      { label: "API 명세서(Notion)", url: "https://notion.so/abc" },
    ],
    projectImage: null,
    author: "김보안",
    // ✅ pending이라 currentParticipants/progress 없음 (never)
  },

  // 승인됨: 참가/진행률 필드 허용
  {
    id: 2,
    isPending: false,
    title: "웹 취약점 자동 필터링 PoC",
    description:
      "OWASP Top 10 중심 경량 필터링 PoC. False Positive 최소화에 집중.",
    content: `### 구성
- 크롤러 → 검사기 → 리포터
- 모듈형 규칙 엔진 설계`,
    semester: "2025-2",
    status: "in_progress",
    category: "CTF",
    subCategory: "포너블",
    attachments: [
      {
        name: "웹 취약점 자동 스캐너 프로젝트_기획서.pdf",
        size: 2547892,
        type: "application/pdf",
        attachedUrl: "/api/files/download/scanner_plan.pdf",
      },
    ],
    startDate: "2025-09-02",
    endDate: "2025-10-15",
    maxParticipants: "4",
    githubUrl: "https://github.com/cert-is/sec-scanner-poc",
    demoUrl: "",
    externalLinks: [
      { label: "레퍼런스 자료 모음", url: "https://notion.so/ref-sec" },
    ],
    projectImage: null,
    author: "김첨지",

    currentParticipants: 3, // 필수
    progress: 45, // 선택
  },
  {
    id: 3,
    isPending: false,
    title: "웹 자동 스캐너 PoC",
    description:
      "OWASP Top 10 중심 경량 스캐너 PoC. False Positive 최소화에 집중.",
    content: `### 구성
- 크롤러 → 검사기 → 리포터
- 모듈형 규칙 엔진 설계`,
    semester: "2025-2",
    status: "in_progress",
    category: "RED",
    subCategory: "모의해킹",
    attachments: [
      {
        name: "웹 자동 스캐너 프로젝트_기획서.pdf",
        size: 2547892,
        type: "application/pdf",
        attachedUrl: "/api/files/download/scanner_plan.pdf",
      },
    ],
    startDate: "2025-09-02",
    endDate: "2025-10-15",
    maxParticipants: "4",
    githubUrl: "https://github.com/cert-is/sec-scanner-poc",
    demoUrl: "",
    externalLinks: [
      { label: "레퍼런스 자료 모음", url: "https://notion.so/ref-sec" },
    ],
    projectImage: null,
    author: "김첨지",

    currentParticipants: 3, // 필수
    progress: 45, // 선택
  },
  {
    id: 4,
    isPending: false,
    title: "웹 취약점 자동 스캐너 PoC",
    description:
      "OWASP Top 10 중심 경량 스캐너 PoC. False Positive 최소화에 집중.",
    content: `### 구성
- 크롤러 → 검사기 → 리포터
- 모듈형 규칙 엔진 설계`,
    semester: "2025-2",
    status: "in_progress",
    category: "RED",
    subCategory: "취약점 연구",
    attachments: [
      {
        name: "웹 취약점 자동 스캐너 프로젝트_기획서.pdf",
        size: 2547892,
        type: "application/pdf",
        attachedUrl: "/api/files/download/scanner_plan.pdf",
      },
    ],
    startDate: "2025-09-02",
    endDate: "2025-10-15",
    maxParticipants: "4",
    githubUrl: "https://github.com/cert-is/sec-scanner-poc",
    demoUrl: "",
    externalLinks: [
      { label: "레퍼런스 자료 모음", url: "https://notion.so/ref-sec" },
    ],
    projectImage: null,
    author: "김첨지",

    currentParticipants: 3, // 필수
    progress: 45, // 선택
  },
];

interface SCProjectContentListProps {
  currentTab: MainTab;
  currentView: SubTab;
  currentSearch?: string;
  currentPage?: number;
  currentFilters: CurrentFilters;
}

export default function SCProjectContentList({
  currentTab,
  currentView,
  currentSearch = "",
  currentPage = 1,
  currentFilters,
}: SCProjectContentListProps) {
  const viewFiltered =
    currentView === "pending"
      ? projects.filter((p) => p.isPending)
      : currentView === "list"
      ? projects.filter((p) => !p.isPending)
      : projects;

  const filteredProjectMaterials = viewFiltered.filter((item) => {
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

  const ITEMS_PER_PAGE = 2;
  const totalItems = filteredProjectMaterials.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedContents = filteredProjectMaterials.slice(
    startIndex,
    endIndex
  );

  const totalPending = projects.filter((p) => p.isPending).length;
  const totalProgress = projects.filter((p) => !p.isPending).length;
  const pendingUntilCurrentPage = projects
    .filter((p) => p.isPending)
    .slice(0, currentPage * ITEMS_PER_PAGE).length;

  const progressUntilCurrentPage = projects
    .filter((p) => !p.isPending)
    .slice(0, currentPage * ITEMS_PER_PAGE).length;

  if (paginatedContents.length === 0) {
    return (
      <div className="flex items-center justify-center max-h-screen w-full">
        <SCSearchResultNotFound mode="adminProject" />
      </div>
    );
  }

  return (
    <>
      {currentTab === "project" && currentView === "pending" && (
        <>
          <div className="mt-4 text-lg text-gray-600">
            ✔️ 프로젝트 승인 대기 목록 ({pendingUntilCurrentPage}/{totalPending}
            )
          </div>
          {paginatedContents.map((project) => (
            <Link
              key={project.id}
              href={`/admin/study/${project.id}?tab=project`}
            >
              <div key={project.id} className="mt-4 card-list">
                {/* 헤더 */}
                <div className="pb-4 flex flex-col space-y-1.5 p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <div className="flex gap-3 sm:flex-row sm:items-center flex-col items-start">
                        <div className="text-xl font-medium">
                          {project.title}
                        </div>
                        <div className="flex items-center gap-2">
                          {project.isPending ? (
                            <DefaultBadge className="bg-red-100 text-red-800">
                              승인 대기
                            </DefaultBadge>
                          ) : (
                            <DefaultBadge className="bg-yellow-100 text-yellow-800">
                              승인됨
                            </DefaultBadge>
                          )}
                          <DefaultBadge className="bg-green-100 text-green-800">
                            {project.category}
                          </DefaultBadge>
                          <DefaultBadge className="bg-green-100 text-green-800">
                            {project.subCategory}
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
                            프로젝트장: {project.author}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            최대 인원: {project.maxParticipants}명
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            {project.startDate} ~ {project.endDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-0 mt-4 flex justify-between flex-col md:flex-row gap-5">
                    {project.attachments?.map((file, index) => (
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
                            name="projectId"
                            value={project.id}
                          />
                          <button type="submit">
                            <DownloadGraySVG className="text-gray-400 hover:text-gray-600" />
                          </button>
                        </form>
                      </div>
                    ))}
                    <div className="flex flex-row gap-2 w-full sm:w-[20rem] h-full justify-end items-end self-end justify-self-end">
                      <RequestActionButtons
                        id={project.id}
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

      {currentTab === "project" && currentView === "list" && (
        <>
          <div className="mt-4 text-lg text-gray-600">
            📁 프로젝트 목록 ({progressUntilCurrentPage}/{totalProgress})
          </div>
          {paginatedContents.map((project) => (
            <Link
              key={project.id}
              href={`/admin/study/${project.id}?tab=project`}
            >
              <div key={project.id} className="mt-4 card-list">
                {/* 헤더 */}
                <div className="pb-4 flex flex-col space-y-1.5 p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <div className="flex gap-3 sm:flex-row sm:items-center flex-col items-start">
                        <div className="text-xl font-medium">
                          {project.title}
                        </div>
                        <div className="flex items-center gap-2">
                          {project.isPending ? (
                            <DefaultBadge className="bg-red-100 text-red-800">
                              승인 대기
                            </DefaultBadge>
                          ) : (
                            <DefaultBadge className="bg-yellow-100 text-yellow-800">
                              승인됨
                            </DefaultBadge>
                          )}
                          <DefaultBadge className="bg-green-100 text-green-800">
                            {project.category}
                          </DefaultBadge>
                          <DefaultBadge className="bg-green-100 text-green-800">
                            {project.subCategory}
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
                            프로젝트장: {project.author}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          {isApprovedProject(project) ? (
                            <span className="text-sm">
                              현재 인원: {project.currentParticipants}/
                              {project.maxParticipants}명
                            </span>
                          ) : (
                            <span className="text-sm">
                              최대 인원: {project.maxParticipants}명
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">
                            {project.startDate} ~ {project.endDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-gray-500" />
                          {isApprovedProject(project) && (
                            <span className="text-sm">
                              진행률: {project.progress}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 mt-4 ">
                    {project.attachments?.map((file, index) => (
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
                            name="projectId"
                            value={project.id}
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
