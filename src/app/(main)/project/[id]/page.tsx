"server-only";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ProjectMaterial } from "@/types/project";
import AttachedFilesDownload from "@/components/project/CCAttachedFilesDownload";
import { Globe, BookText } from "lucide-react";
import Image from "next/image";
import { getProjectMaterials } from "@/mocks/mockProjectData";
import BackToListButton from "@/components/detail/SCBackToListButton";
import KebabMenu from "@/components/detail/CCKebabMenu";
import ShareButton from "@/components/detail/CCShareButton";
import { AUTHOR_STATUS_LABELS } from "@/types/project";
import DefaultBadge from "@/components/ui/defaultBadge";
import MeetingMinutes from "@/components/study/CCMeetingMinutes";
import EndRequestButton from "@/components/ui/endRequestButton";
import { getStatusColor } from "@/utils/badgeUtils";
import { STATUS_LABELS } from "@/types/progressStatus";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

const getProjectById = (id: string): ProjectMaterial | undefined => {
  const projects = getProjectMaterials();
  return projects.find((p) => p.id === id);
};

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const projectData = getProjectById(id);

  if (!projectData) {
    return {
      title: "프로젝트를 찾을 수 없습니다",
      description: "요청하신 프로젝트를 찾을 수 없습니다.",
    };
  }

  return {
    title: `${projectData.title} - CERT-IS Project`,
    description: projectData.description.substring(0, 160) + "...",
    openGraph: {
      title: projectData.title,
      description: projectData.description.substring(0, 160) + "...",
      type: "article",
      authors: [projectData.author],
      images: ["/logo.svg"],
    },
  };
}

// 외부 링크용 아이콘 반환
const getExternalLinkIcon = (type?: string) => {
  switch (type) {
    case "notion":
      return (
        <div className="w-5 h-5 bg-white border border-gray-300 rounded flex items-center justify-center">
          <span className="text-black font-bold text-sm">N</span>
        </div>
      );
    case "gdocs":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect width="20" height="20" rx="4" fill="#fff" />
          <rect x="5" y="3" width="10" height="14" rx="2" fill="#4285F4" />
          <rect x="7" y="6" width="6" height="1.2" rx="0.6" fill="#fff" />
          <rect x="7" y="8.5" width="6" height="1.2" rx="0.6" fill="#fff" />
          <rect x="7" y="11" width="4" height="1.2" rx="0.6" fill="#fff" />
        </svg>
      );
    case "drive":
      return <BookText className="w-5 h-5" />;
    case "figma":
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="8" fill="#fff" />
          <circle cx="10" cy="6.5" r="2.5" fill="#F24E1E" />
          <circle cx="10" cy="13.5" r="2.5" fill="#1ABCFE" />
          <circle cx="6.5" cy="10" r="2.5" fill="#A259FF" />
          <circle cx="13.5" cy="10" r="2.5" fill="#0ACF83" />
        </svg>
      );
    default:
      return <Globe className="w-5 h-5" />;
  }
};

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);
  const project = getProjectById(resolvedParams.id);

  if (!project) {
    notFound();
  }
  return (
    <div className="mx-auto max-w-full">
      {/* 뒤로가기 버튼 */}
      <BackToListButton currentUrl="project" />
      <article>
        {/* 프로젝트 이미지 */}
        <div className="relative h-96 mb-8 bg-gradient-to-br from-purple-400 to-indigo-600 overflow-hidden mt-6 rounded-lg">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              fill
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
              {STATUS_LABELS[project.status as keyof typeof STATUS_LABELS]}
            </DefaultBadge>
          </div>
        </div>

        {/* 헤더 */}
        <header className="border-b pb-6 dark:border-gray-700">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4 dark:text-gray-200">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-6 dark:text-gray-400">
            {/* authorStatus + author */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
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
              <span className="ml-1 sm:ml-0">{project.author}</span>
            </div>

            {/* 학기 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <strong>학기:</strong>
              <span>{project.semester}</span>
            </div>

            {/* 카테고리 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <strong>카테고리:</strong>
              <span>{project.category}</span>
            </div>

            {/* 하위 카테고리 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <strong>하위 카테고리:</strong>
              <span>{project.subCategory}</span>
            </div>
          </div>

          {/* 프로젝트 기간 및 참가 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
            <div>
              <h4 className="font-semibold text-gray-700 mb-1 dark:text-gray-300">
                프로젝트 기간
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {project.startDate} {project.endDate && `~ ${project.endDate}`}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-1 dark:text-gray-300">
                참가 인원
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {project.currentParticipants} / {project.maxParticipants}명
              </p>
            </div>
          </div>
        </header>

        {/* 본문 */}
        <div className="mt-16 max-w-none mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold">프로젝트 소개</h2>
            <KebabMenu currentId={id} currentUrl="project" />
          </div>
          <p className="text-lg leading-relaxed">{project.description}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          {/* 왼쪽 버튼 그룹 */}
          <div className="flex flex-row flex-wrap gap-2 sm:gap-4 w-full sm:w-auto">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 
                   px-2.5 sm:px-4 py-1.5 sm:py-2 
                   bg-gray-900 text-white rounded-md
                   hover:bg-gray-800 transition-colors 
                   text-md sm:text-base"
              >
                <svg
                  className="hidden sm:inline-block w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub 저장소
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 
                   px-2.5 sm:px-4 py-1.5 sm:py-2 
                   bg-blue-600 text-white rounded-md
                   hover:bg-blue-700 transition-colors 
                   text-md sm:text-base"
              >
                <svg
                  className="hidden sm:inline-block w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                데모 사이트
              </a>
            )}

            <button
              className="action-button inline-flex items-center justify-center gap-2 
                 px-2.5 sm:px-6 py-1.5 sm:py-2 
                 text-md sm:text-base"
            >
              프로젝트 참가하기
            </button>
          </div>

          {/* 종료 버튼 */}
          <span>
            <EndRequestButton id={project.id} />
          </span>
        </div>

        {/* 첨부파일 섹션 */}
        {project.attachedFiles && project.attachedFiles.length > 0 && (
          <div className="mb-8">
            <AttachedFilesDownload files={project.attachedFiles} />
          </div>
        )}

        {/* 외부 문서/링크 + 공유하기 */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          {project.externalLinks && project.externalLinks.length > 0 && (
            <div className="flex flex-row flex-wrap gap-2 sm:gap-3">
              {project.externalLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-2.5 py-2 sm:px-4 sm:py-2
                     bg-gray-100 text-gray-700 rounded-lg hover:bg-blue-100 transition-colors
                     border border-gray-200 dark:bg-gray-600 dark:border-gray-500
                     dark:text-gray-200 dark:hover:bg-gray-700 text-sm sm:text-base"
                >
                  {getExternalLinkIcon(link.type)}
                  <span className="font-medium">{link.label}</span>
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end mb-8 ">
          <ShareButton />
        </div>

        <MeetingMinutes studyId={"1"} currentUserId={1} studyLeaderId={1} />
      </article>
    </div>
  );
}
