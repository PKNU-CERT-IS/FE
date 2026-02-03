import Link from "next/link";
import { getMembersForStaff } from "@/app/api/member/SCadminMemberApi";
import { searchProjects } from "@/app/api/project/SCProjectApi";
import { searchStudies } from "@/app/api/study/SCStudyApi";
import { BookOpen, TrendingUp, Users } from "lucide-react";

export default async function SCTotalDashBoard() {
  const studyData = await searchStudies({ studyStatus: "INPROGRESS" });
  const studyCount = studyData?.content?.length ?? 0;
  const projectData = await searchProjects({ projectStatus: "INPROGRESS" });
  const projectCount = projectData?.content?.length ?? 0;

  const members = await getMembersForStaff();
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* 전체 회원 */}
      <Link href={"/admin/members"}>
        <div className="card-list dark-default">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-none tracking-tight">
              전체 회원
            </div>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-300" />
            </div>
          </div>

          <div className="p-6 pt-0">
            <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {members.length}명
            </div>
          </div>
        </div>
      </Link>

      {/* 진행 중인 스터디 */}
      <Link
        href={{
          pathname: "/admin/study",
          query: { tab: "study", view: "list" },
        }}
      >
        <div className="card-list dark-default">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-none tracking-tight">
              진행 중인 스터디
            </div>
            <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
              <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="p-6 pt-0">
            <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {studyCount}개
            </div>
          </div>
        </div>
      </Link>

      {/* 진행 중인 프로젝트 */}
      <Link
        href={{
          pathname: "/admin/study",
          query: { tab: "project", view: "list" },
        }}
      >
        <div className="card-list dark-default">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-300 leading-none tracking-tight">
              진행 중인 프로젝트
            </div>
            <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
              <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="p-6 pt-0">
            <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {projectCount}개
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
