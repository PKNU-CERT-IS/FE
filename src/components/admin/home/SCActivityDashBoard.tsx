"server-only";

import Link from "next/link";
import ProgressBar from "@/components/ui/progressBar";
import { ActivityDashboardData } from "@/types/adminDashBoard";

// 대시보드 데이터
const activityDashboardData: ActivityDashboardData = {
  study: {
    thisMonthCreated: 8,
    completed: 5,
    successRate: 75,
    total: 18,
  },
  project: {
    thisMonthCreated: 3,
    completed: 2,
    successRate: 85,
    total: 7,
  },
  overall: {
    totalActivities: 25,
    completionRate: 78,
    overallProgress: 78,
  },
};

export default function SCActivityDashBoard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Link href={"/admin/study"}>
        <div className="card-list text-card-foreground">
          <div className="pb-4 flex flex-col space-y-1.5 p-6">
            <div className="text-lg font-medium leading-none tracking-tight text-gray-600">
              스터디 현황
            </div>
          </div>
          <div className="space-y-4 p-6 pt-0">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">이번 달 개설</span>
              <span className="font-medium text-cert-dark-red text-xl">
                {activityDashboardData.study.thisMonthCreated}개
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">완료</span>
              <span className="font-medium text-gray-900 text-xl">
                {activityDashboardData.study.completed}개
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">성공률</span>
                <span className="font-medium text-gray-900">
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

      <Link href={"/admin/project"}>
        <div className="card-list text-card-foreground">
          <div className="pb-4 flex flex-col space-y-1.5 p-6">
            <div className="text-lg font-medium leading-none tracking-tight text-gray-600">
              프로젝트 현황
            </div>
          </div>
          <div className="space-y-4 p-6 pt-0">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">이번 달 개설</span>
              <span className="font-medium text-cert-dark-red text-xl">
                {activityDashboardData.project.thisMonthCreated}개
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">완료</span>
              <span className="font-medium text-gray-900 text-xl">
                {activityDashboardData.project.completed}개
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">성공률</span>
                <span className="font-medium text-gray-900">
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

      <div className="card-list text-card-foreground">
        <div className="pb-4 flex flex-col space-y-1.5 p-6">
          <div className="text-lg font-medium leading-none tracking-tight text-gray-600">
            전체 활동 요약
          </div>
        </div>
        <div className="space-y-4 p-6 pt-0">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">총 활동 수</span>
            <span className="font-medium text-cert-dark-red text-xl">
              {activityDashboardData.overall.totalActivities}개
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">완료율</span>
            <span className="font-medium text-gray-900 text-xl">
              {activityDashboardData.overall.completionRate}%
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">전체 진행률</span>
              <span className="font-medium text-gray-900">
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
