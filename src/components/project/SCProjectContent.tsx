"server-only";

import type { ProjectMaterial, CurrentFilters } from "@/types/project";
import { STATUS_LABELS, AUTHOR_STATUS_LABELS } from "@/types/project";
import CCStudyPagination from "@/components/study/CCStudyPagination";
import CCStudyDateInfo from "@/components/study/CCStudyDateInfo";
import SCStudySearchResultNotFound from "@/components/study/SCStudySearchResultNotFound";
import { getStatusColor, parseSearchParams } from "@/utils/projectUtils";

import GithubSVG from "/public/icons/github.svg";
import ChainSVG from "/public/icons/chain.svg";
// 프로젝트 데이터를 가져오는 함수
async function getProjectMaterials(): Promise<ProjectMaterial[]> {
  const projectMaterials: ProjectMaterial[] = [
    {
      id: "1",
      title: "Social Impact Hackathon 2025",
      description:
        "의미 있는 것 만들고 싶지 않아? 사회적 가치를 창출하는 해커톤 프로젝트입니다.",
      image: "/images/projects/hackathon-2025.jpg",
      customTags: [
        { name: "Hackathon", color: "bg-purple-100 text-purple-800" },
        { name: "Social Impact", color: "bg-green-100 text-green-800" },
        { name: "Innovation", color: "bg-blue-100 text-blue-800" },
      ],
      author: "NEXT42",
      authorStatus: "organization",
      semester: "2025-2",
      category: "Hackathon",
      hackingTechnique: "web_security",
      status: "in_progress",
      startDate: "2025-06-06",
      endDate: "2025-06-08",
      currentParticipants: 42,
      maxParticipants: 100,
      githubUrl: "https://github.com/next42/social-impact-hackathon",
      demoUrl: "https://hackathon.next42.kr",
      stars: 156,
    },
    {
      id: "2",
      title: "OWASP Top 10 2023 취약점 분석",
      description:
        "최신 OWASP Top 10 취약점에 대한 상세 분석과 실습 환경을 제공합니다.",
      image: "/images/projects/owasp-analysis.jpg",
      customTags: [
        { name: "OWASP", color: "bg-blue-100 text-blue-800" },
        { name: "Web Security", color: "bg-red-100 text-red-800" },
        { name: "Vulnerability", color: "bg-orange-100 text-orange-800" },
      ],
      author: "김보안",
      authorStatus: "student",
      semester: "2025-2",
      category: "Security Research",
      hackingTechnique: "web_security",
      status: "completed",
      startDate: "2025-01-01",
      endDate: "2025-06-30",
      currentParticipants: 15,
      maxParticipants: 20,
      githubUrl: "https://github.com/security-team/owasp-top10-analysis",
      demoUrl: "https://owasp-demo.security-lab.kr",
      stars: 89,
    },
    {
      id: "3",
      title: "AI 기반 악성코드 탐지 시스템",
      description:
        "머신러닝과 딥러닝을 활용한 실시간 악성코드 탐지 및 분류 시스템입니다.",
      image: "/images/projects/ai-malware-detection.jpg",
      customTags: [
        { name: "AI/ML", color: "bg-purple-100 text-purple-800" },
        { name: "Malware Detection", color: "bg-red-100 text-red-800" },
        { name: "Deep Learning", color: "bg-indigo-100 text-indigo-800" },
      ],
      author: "이머신러닝",
      authorStatus: "graduate",
      semester: "2025-2",
      category: "AI Security",
      hackingTechnique: "ai_security",
      status: "in_progress",
      startDate: "2025-03-01",
      endDate: "2025-12-31",
      currentParticipants: 8,
      maxParticipants: 12,
      githubUrl: "https://github.com/ai-security/malware-detection",
      stars: 234,
    },
    {
      id: "4",
      title: "블록체인 기반 디지털 신원 인증",
      description:
        "블록체인 기술을 활용한 탈중앙화 디지털 신원 인증 시스템 개발 프로젝트입니다.",
      image: "/images/projects/blockchain-identity.jpg",
      customTags: [
        { name: "Blockchain", color: "bg-yellow-100 text-yellow-800" },
        { name: "Identity", color: "bg-green-100 text-green-800" },
        { name: "Decentralized", color: "bg-blue-100 text-blue-800" },
      ],
      author: "박블록체인",
      authorStatus: "student",
      semester: "2025-2",
      category: "Blockchain Security",
      hackingTechnique: "blockchain_security",
      status: "not_started",
      startDate: "2025-08-01",
      currentParticipants: 3,
      maxParticipants: 15,
      githubUrl: "https://github.com/blockchain-team/digital-identity",
      stars: 67,
    },
    {
      id: "5",
      title: "IoT 디바이스 보안 프레임워크",
      description:
        "IoT 환경에서의 보안 취약점 분석과 안전한 통신 프로토콜 구현 프로젝트입니다.",
      image: "/images/projects/iot-security.jpg",
      customTags: [
        { name: "IoT", color: "bg-cyan-100 text-cyan-800" },
        { name: "Security Framework", color: "bg-purple-100 text-purple-800" },
        { name: "Protocol", color: "bg-gray-100 text-gray-800" },
      ],
      author: "최IoT보안",
      authorStatus: "graduate",
      semester: "2025-2",
      category: "IoT Security",
      hackingTechnique: "iot_security",
      status: "completed",
      startDate: "2024-09-01",
      endDate: "2025-02-28",
      currentParticipants: 12,
      maxParticipants: 12,
      githubUrl: "https://github.com/iot-security/framework",
      demoUrl: "https://iot-demo.security-lab.kr",
      stars: 178,
    },
  ];

  return projectMaterials;
}

interface SCProjectContentProps {
  searchParams: Promise<{
    search?: string;
    semester?: string;
    technique?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function SCProjectContent({
  searchParams,
}: SCProjectContentProps) {
  const ITEMS_PER_PAGE = 6;

  try {
    const resolvedSearchParams = await searchParams;
    const currentFilters: CurrentFilters =
      parseSearchParams(resolvedSearchParams);

    const projectMaterials = await getProjectMaterials();

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
            개의 프로젝트가 있습니다.
            {currentFilters.search && (
              <span className="ml-1">
                &apos;
                <span className="font-medium">{currentFilters.search}</span>
                &apos; 검색 결과
              </span>
            )}
          </p>
        </div>

        {/* 프로젝트 카드 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {currentMaterials.map((project) => {
            return (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                {/* 프로젝트 이미지 */}
                <div className="relative h-76 bg-gradient-to-br from-purple-400 to-indigo-600 overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    // 이미지가 없을 경우 그라데이션 배경
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

                <div className="p-6">
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
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
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
                            ? "bg-purple-100 text-purple-800"
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
                        >
                          <ChainSVG className="w-5 h-5" />
                        </a>
                      )}

                      {/* 참가하기 버튼 */}
                      <button
                        type="button"
                        className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
                      >
                        참가하기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
          <CCStudyPagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchParams={resolvedSearchParams}
          />
        )}
      </div>
    );
  } catch (error) {
    console.error("Error in SCProjectContent:", error);

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
