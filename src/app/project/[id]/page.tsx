import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { mockProjects } from "@/mocks/mockProjectData";
import { Project, ProjectCategoryType } from "@/types/project";

interface ProjectDetailPageProps {
  params: { id: string };
}

// 데이터를 가져오는 함수 (실제로는 API 호출)
const getProjectById = (id: number): Project | undefined => {
  return mockProjects.find((p) => p.id === id);
};

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const project = getProjectById(parseInt(params.id, 10));
  if (!project) {
    return { title: "프로젝트를 찾을 수 없음" };
  }
  return {
    title: `${project.title} | 프로젝트`,
    description: project.description.substring(0, 150),
  };
}

// 카테고리 뱃지 스타일
const CATEGORY_STYLES: { [key in ProjectCategoryType]?: string } = {
  "웹 해킹": "bg-blue-100 text-blue-800",
  리버싱: "bg-green-100 text-green-800",
  시스템: "bg-red-100 text-red-800",
  암호학: "bg-purple-100 text-purple-800",
};

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = getProjectById(parseInt(params.id, 10));

  if (!project) {
    notFound(); // 프로젝트가 없으면 404 페이지를 보여줌
  }

  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* 뒤로가기 버튼 */}
        <Link
          href="/project"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
          목록으로 돌아가기
        </Link>

        <article>
          {/* 헤더 */}
          <header className="mb-8 border-b pb-6">
            <span
              className={`mb-4 inline-block rounded-md px-2.5 py-1 text-sm font-medium ${
                CATEGORY_STYLES[project.category] || "bg-gray-100 text-gray-800"
              }`}
            >
              {project.category}
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              {project.title}
            </h1>
            <div className="mt-6 flex items-center gap-6 text-sm text-gray-500">
              <span>
                <strong>작성자:</strong> {project.author}
              </span>
              <span>
                <strong>작성일:</strong> {project.date}
              </span>
            </div>
          </header>

          {/* 본문 */}
          <div className="prose prose-lg max-w-none">
            <p>{project.description}</p>
          </div>

          {/* 기술 스택 */}
          <footer className="mt-10 border-t pt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              핵심 요소 (기술)
            </h4>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-gray-200 px-4 py-1.5 text-sm font-medium text-gray-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
