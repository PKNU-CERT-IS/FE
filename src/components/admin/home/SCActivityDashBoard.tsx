"server-only";

import Link from "next/link";
import { ProjectList } from "@/types/project";
import { StudyList } from "@/types/study";
import { searchProjects } from "@/app/api/project/SCProjectApi";
import { searchStudies } from "@/app/api/study/SCStudyApi";
import ProgressBar from "@/components/ui/progressBar";

function isThisMonth(date: string) {
  const now = new Date();
  const d = new Date(date);
  return (
    d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()
  );
}

export default async function SCActivityDashBoard() {
  const studyData = await searchStudies();
  const projectData = await searchProjects();

  const studies = studyData?.content ?? [];
  const projects = projectData?.content ?? [];

  const thisMonthStudyCreated = studies.filter((s: StudyList) =>
    isThisMonth(s.startDate),
  ).length;
  const thisMonthStudyCompleted = studies.filter(
    (s: StudyList) => s.status === "COMPLETED" && isThisMonth(s.endDate),
  ).length;
  const studySuccessRate =
    thisMonthStudyCreated > 0
      ? Math.round((thisMonthStudyCompleted / thisMonthStudyCreated) * 100)
      : 0;

  const thisMonthProjectCreated = projects.filter((p: ProjectList) =>
    isThisMonth(p.startDate),
  ).length;
  const thisMonthProjectCompleted = projects.filter(
    (p: ProjectList) => p.status === "COMPLETED" && isThisMonth(p.endDate),
  ).length;
  const projectSuccessRate =
    thisMonthProjectCreated > 0
      ? Math.round((thisMonthProjectCompleted / thisMonthProjectCreated) * 100)
      : 0;

  const activityDashboardData = {
    study: {
      thisMonthCreated: thisMonthStudyCreated,
      completed: thisMonthStudyCompleted,
      successRate: studySuccessRate,
      total: studies.length,
    },
    project: {
      thisMonthCreated: thisMonthProjectCreated,
      completed: thisMonthProjectCompleted,
      successRate: projectSuccessRate,
      total: projects.length,
    },
    overall: {
      totalActivities: studies.length + projects.length,
      completionRate: Math.round(
        ((thisMonthStudyCompleted + thisMonthProjectCompleted) /
          (thisMonthStudyCreated + thisMonthProjectCreated || 1)) *
          100,
      ),
      overallProgress: Math.round(
        ((thisMonthStudyCompleted + thisMonthProjectCompleted) /
          (studies.length + projects.length || 1)) *
          100,
      ),
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Link
        href={{
          pathname: "/admin/study",
          query: { tab: "study", view: "list" },
        }}
      >
        <div className="card-list dark-default text-card-foreground">
          <div className="pb-4 flex flex-col space-y-1.5 p-6">
            <div className="text-lg font-medium leading-none tracking-tight text-gray-600 dark:text-gray-300">
              스터디 현황
            </div>
          </div>

          <div className="space-y-4 p-6 pt-0">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                이번 달 개설
              </span>
              <span className="font-medium text-cert-dark-red dark:text-cert-red text-xl">
                {activityDashboardData.study.thisMonthCreated}개
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">완료</span>
              <span className="font-medium text-gray-900 dark:text-gray-100 text-xl">
                {activityDashboardData.study.completed}개
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">성공률</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {activityDashboardData.study.successRate}%
                </span>
              </div>
              <ProgressBar
                value={activityDashboardData.study.successRate}
                className="h-3"
              />
            </div>
          </div>
        </div>
      </Link>

      <Link
        href={{
          pathname: "/admin/study",
          query: { tab: "project", view: "list" },
        }}
      >
        <div className="card-list dark-default text-card-foreground">
          <div className="pb-4 flex flex-col space-y-1.5 p-6">
            <div className="text-lg font-medium leading-none tracking-tight text-gray-600 dark:text-gray-300">
              프로젝트 현황
            </div>
          </div>

          <div className="space-y-4 p-6 pt-0">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                이번 달 개설
              </span>
              <span className="font-medium text-cert-dark-red dark:text-cert-red text-xl">
                {activityDashboardData.project.thisMonthCreated}개
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">완료</span>
              <span className="font-medium text-gray-900 dark:text-gray-100 text-xl">
                {activityDashboardData.project.completed}개
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">성공률</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {activityDashboardData.project.successRate}%
                </span>
              </div>
              <ProgressBar
                value={activityDashboardData.project.successRate}
                className="h-3"
              />
            </div>
          </div>
        </div>
      </Link>

      <div className="card-list dark-default text-card-foreground">
        <div className="pb-4 flex flex-col space-y-1.5 p-6">
          <div className="text-lg font-medium leading-none tracking-tight text-gray-600 dark:text-gray-300">
            전체 활동 요약
          </div>
        </div>

        <div className="space-y-4 p-6 pt-0">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">총 활동 수</span>
            <span className="font-medium text-cert-dark-red dark:text-cert-red text-xl">
              {activityDashboardData.overall.totalActivities}개
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-400">완료율</span>
            <span className="font-medium text-gray-900 dark:text-gray-100 text-xl">
              {activityDashboardData.overall.completionRate}%
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">
                전체 진행률
              </span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {activityDashboardData.overall.overallProgress}%
              </span>
            </div>

            <ProgressBar
              value={activityDashboardData.overall.overallProgress}
              className="h-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
