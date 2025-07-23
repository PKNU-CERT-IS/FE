"server-only";

import type { StudyMaterial, CurrentFilters } from "@/types/study";
import { STATUS_LABELS, AUTHOR_STATUS_LABELS } from "@/types/study";
import CCStudyPagination from "@/components/study/CCStudyPagination";
import CCStudyDateInfo from "@/components/study/CCStudyDateInfo"; // 새로 생성한 클라이언트 컴포넌트
import SCStudySearchResultNotFound from "@/components/study/SCStudySearchResultNotFound";
import {
  getStatusColor,
  getProgressColor,
  parseSearchParams,
} from "@/utils/study/studyHelper";
import { downloadFile } from "@/actions/study/StudyDownloadFileServerAction";
import { joinStudy } from "@/actions/study/StudyJoinServerAction";

import DownloadGraySVG from "/public/icons/download-gray.svg";
import PdfSVG from "/public/icons/pdf.svg";

import Link from "next/link";

// 학습 자료 데이터를 가져오는 함수 (실제로는 DB에서 가져올 것)
async function getStudyMaterials(): Promise<StudyMaterial[]> {
  // 실제 환경에서는 데이터베이스에서 가져올 데이터
  const studyMaterials: StudyMaterial[] = [
    {
      id: "1",
      title: "OWASP Top 10 2023 취약점 분석",
      description: "최신 OWASP Top 10 취약점에 대한 상세 분석 자료입니다.",
      customTags: [
        { name: "OWASP", color: "bg-blue-100 text-blue-800" },
        { name: "Web Security", color: "bg-purple-100 text-purple-800" },
        { name: "Vulnerability", color: "bg-red-100 text-red-800" },
      ],
      author: "김보안",
      authorStatus: "student",
      semester: "2025-2",
      files: [
        { name: "OWASP_Top10_2023_Analysis.pdf", size: "3.2MB", type: "pdf" },
        { name: "Exploit_Examples.zip", size: "1.8MB", type: "zip" },
      ],
      category: "Web Security",
      hackingTechnique: "web_security",
      status: "in_progress",
      startDate: "2025-07-01",
      endDate: "2025-07-15",
      currentParticipants: 7,
      maxParticipants: 10,
    },
    {
      id: "2",
      title: "Metasploit Framework 완전 정복",
      description:
        "Metasploit을 활용한 침투 테스트 기법과 실습 자료를 종합적으로 다룹니다.",
      customTags: [
        { name: "Metasploit", color: "bg-purple-100 text-purple-800" },
        { name: "Penetration Testing", color: "bg-pink-100 text-pink-800" },
        { name: "Exploitation", color: "bg-red-100 text-red-800" },
      ],
      author: "이해커",
      authorStatus: "graduate",
      semester: "2025-2",
      files: [
        { name: "Metasploit_Guide.pdf", size: "5.1MB", type: "pdf" },
        { name: "Lab_Environment.ova", size: "2.3GB", type: "ova" },
      ],
      category: "Penetration Testing",
      hackingTechnique: "penetration_testing",
      status: "completed",
      startDate: "2025-03-01",
      endDate: "2025-05-31",
      currentParticipants: 10,
      maxParticipants: 10,
    },
    {
      id: "3",
      title: "암호화 기초의 RSA 구현",
      description:
        "암호학의 기초 이론부터 RSA 공개키암호시스템의 Python 구현까지 다룹니다.",
      customTags: [
        { name: "Cryptography", color: "bg-purple-100 text-purple-800" },
        { name: "RSA", color: "bg-green-100 text-green-800" },
        { name: "Python", color: "bg-blue-100 text-blue-800" },
      ],
      author: "박암호",
      authorStatus: "student",
      semester: "2025-2",
      files: [
        { name: "Cryptography_Basics.pdf", size: "2.7MB", type: "pdf" },
        { name: "RSA_Implementation.py", size: "15KB", type: "py" },
      ],
      category: "Cryptography",
      hackingTechnique: "cryptography",
      status: "not_started",
      startDate: "2025-07-20",
      currentParticipants: 1,
      maxParticipants: 10,
    },
    {
      id: "4",
      title: "디지털 포렌식의 실무 가이드",
      description:
        "Autopsy와 Volatility를 활용한 디지털 증거 수집 및 수집한 분석방법을 설명합니다.",
      customTags: [
        { name: "Digital Forensics", color: "bg-purple-100 text-purple-800" },
        { name: "Autopsy", color: "bg-blue-100 text-blue-800" },
        { name: "Volatility", color: "bg-cyan-100 text-cyan-800" },
      ],
      author: "최포렌식",
      authorStatus: "graduate",
      semester: "2025-2",
      files: [
        { name: "Forensics_Guide.pdf", size: "4.8MB", type: "pdf" },
        { name: "Sample_Evidence.dd", size: "512MB", type: "dd" },
      ],
      category: "Digital Forensics",
      hackingTechnique: "digital_forensics",
      status: "in_progress",
      startDate: "2025-06-15",
      endDate: "2025-08-15",
      currentParticipants: 5,
      maxParticipants: 10,
    },
    {
      id: "5",
      title: "네트워크 보안 모니터링",
      description:
        "Wireshark와 Snort를 활용한 네트워크 트래픽 분석 및 침입 시스템 구축 방법을 다룹니다.",
      customTags: [
        { name: "Network Security", color: "bg-green-100 text-green-800" },
        { name: "Wireshark", color: "bg-purple-100 text-purple-800" },
        { name: "IDS", color: "bg-orange-100 text-orange-800" },
      ],
      author: "정네트워크",
      authorStatus: "student",
      semester: "2025-2",
      files: [
        { name: "Network_Monitoring.pdf", size: "3.8MB", type: "pdf" },
        { name: "Snort_Rules.conf", size: "45KB", type: "conf" },
      ],
      category: "Network Security",
      hackingTechnique: "network_security",
      status: "completed",
      startDate: "2024-09-01",
      endDate: "2024-12-31",
      currentParticipants: 8,
      maxParticipants: 8,
    },
    {
      id: "6",
      title: "SQL Injection 심화 분석",
      description:
        "다양한 SQL Injection 공격 기법과 방어 전략을 실습과 함께 학습합니다.",
      customTags: [
        { name: "SQL Injection", color: "bg-red-100 text-red-800" },
        { name: "Web Security", color: "bg-purple-100 text-purple-800" },
        { name: "Database", color: "bg-blue-100 text-blue-800" },
      ],
      author: "김웹해킹",
      authorStatus: "graduate",
      semester: "2025-2",
      files: [
        { name: "SQLi_Analysis.pdf", size: "2.9MB", type: "pdf" },
        { name: "Vulnerable_App.zip", size: "850KB", type: "zip" },
      ],
      category: "Web Security",
      hackingTechnique: "web_security",
      status: "not_started",
      startDate: "2025-07-10",
      currentParticipants: 3,
      maxParticipants: 8,
    },
    {
      id: "7",
      title: "모바일 앱 보안 테스팅",
      description:
        "Android 및 iOS 앱의 보안 취약점 분석과 테스팅 방법론을 다룹니다.",
      customTags: [
        { name: "Mobile Security", color: "bg-green-100 text-green-800" },
        { name: "Android", color: "bg-blue-100 text-blue-800" },
        { name: "iOS", color: "bg-gray-100 text-gray-800" },
      ],
      author: "이모바일",
      authorStatus: "student",
      semester: "2025-2",
      files: [
        { name: "Mobile_Security_Guide.pdf", size: "4.1MB", type: "pdf" },
        { name: "Test_APK.zip", size: "2.5MB", type: "zip" },
      ],
      category: "Mobile Security",
      hackingTechnique: "mobile_security",
      status: "in_progress",
      startDate: "2025-07-05",
      endDate: "2025-08-05",
      currentParticipants: 6,
      maxParticipants: 12,
    },
  ];

  return studyMaterials;
}

interface SCStudyContentProps {
  searchParams: Promise<{
    search?: string;
    semester?: string;
    technique?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function SCStudyContent({
  searchParams,
}: SCStudyContentProps) {
  const ITEMS_PER_PAGE = 6;

  try {
    // Promise로 된 searchParams를 await 처리 (Next.js 15 방식)
    const resolvedSearchParams = await searchParams;

    // URL 파라미터에서 필터 값 추출 (안전한 파싱)
    const currentFilters: CurrentFilters =
      parseSearchParams(resolvedSearchParams);

    // 학습 자료 데이터 가져오기
    const studyMaterials = await getStudyMaterials();

    // 필터링 로직
    const filteredMaterials = studyMaterials.filter((material) => {
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
        matchesSearch && matchesSemester && matchesTechnique && matchesStatus
      );
    });

    // 페이지네이션 계산
    const totalPages = Math.ceil(filteredMaterials.length / ITEMS_PER_PAGE);
    const currentPage = Math.max(
      1,
      Math.min(currentFilters.page, totalPages || 1)
    );
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentMaterials = filteredMaterials.slice(startIndex, endIndex);

    return (
      <div className="mb-8">
        {/* 검색 결과 요약 */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            총{" "}
            <span className="font-semibold text-gray-900">
              {filteredMaterials.length}
            </span>
            개의 학습 자료가 있습니다.
            {currentFilters.search && (
              <span className="ml-1">
                &apos;
                <span className="font-medium">{currentFilters.search}</span>
                &apos; 검색 결과
              </span>
            )}
          </p>
        </div>

        {/* 카드 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {currentMaterials.map((material) => {
            const participationRate = Math.round(
              (material.currentParticipants / material.maxParticipants) * 100
            );
            const progressColor = getProgressColor(participationRate);

            return (
              <Link href={`/study/${material.id}`} key={material.id}>
                <div
                  key={material.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  {/* 상태 및 날짜 정보 */}
                  <div className="flex flex-wrap gap-2 mb-3 items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          material.status
                        )}`}
                      >
                        {STATUS_LABELS[material.status]}
                      </span>
                      {/* 날짜 정보를 클라이언트 컴포넌트로 교체 */}
                      <CCStudyDateInfo
                        status={material.status}
                        startDate={material.startDate}
                        endDate={material.endDate}
                        semester={material.semester}
                      />
                    </div>
                  </div>

                  {/* 제목 및 설명 */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {material.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {material.description}
                  </p>

                  {/* 커스텀 태그 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {material.customTags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded text-xs font-medium ${tag.color}`}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  {/* 파일 목록 */}
                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      첨부 파일
                    </h4>
                    {material.files.map((file, index) => (
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
                            value={material.id}
                          />
                          <button type="submit">
                            <DownloadGraySVG className="text-gray-400 hover:text-gray-600" />
                          </button>
                        </form>
                      </div>
                    ))}
                  </div>

                  {/* 참가 인원 Progress 바 */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">참가자</span>
                      <span className="text-sm font-medium text-gray-900">
                        {material.currentParticipants}/
                        {material.maxParticipants}
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
                    <span className="text-xs text-gray-500 mt-1 block">
                      {participationRate}%
                    </span>
                  </div>

                  {/* 작성자 및 참가하기 버튼 */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          material.authorStatus === "student"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {AUTHOR_STATUS_LABELS[material.authorStatus]}
                      </span>
                      <span className="text-sm text-gray-500">
                        {material.author}
                      </span>
                    </div>

                    {material.status === "in_progress" && (
                      <form action={joinStudy}>
                        <input
                          type="hidden"
                          name="studyId"
                          value={material.id}
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
                        >
                          참가하기
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 결과가 없을 때 */}
        {currentMaterials.length === 0 && <SCStudySearchResultNotFound />}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <CCStudyPagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={resolvedSearchParams}
          />
        )}
      </div>
    );
  } catch (error) {
    console.error("Error in SCStudyContent:", error);

    // 에러 발생 시 기본값으로 렌더링
    return (
      <div className="mb-8">
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            데이터를 불러오는 중 오류가 발생했습니다.
          </p>
        </div>
        <SCStudySearchResultNotFound
          title="데이터를 불러올 수 없습니다"
          description="페이지를 새로고침하거나 잠시 후 다시 시도해주세요."
        />
      </div>
    );
  }
}
