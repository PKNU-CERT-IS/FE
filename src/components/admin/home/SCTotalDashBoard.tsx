import {
  AlertTriangle,
  Award,
  BookOpen,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function SCTotalDashBoard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Link href={"/admin/members"}>
        <div className="text-card-foreground card-list">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-gray-600 leading-none tracking-tight">
              전체 회원
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-semibold text-gray-900">124명</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <p className="text-sm text-green-600">+2명 이번 달</p>
            </div>
          </div>
        </div>
      </Link>

      <Link href={"/admin/study"}>
        <div className="text-card-foreground card-list">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-gray-600 leading-none tracking-tight">
              진행 중인 스터디
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <BookOpen className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-semibold text-gray-900">18개</div>
            <div className="flex items-center mt-2">
              <Award className="h-4 w-4 text-blue-500 mr-1" />
              <p className="text-sm text-blue-600">+3개 신규 개설</p>
            </div>
          </div>
        </div>
      </Link>

      <Link href={"/admin/project"}>
        <div className="text-card-foreground card-list">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-gray-600 leading-none tracking-tight">
              진행 중인 프로젝트
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <BookOpen className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-semibold text-gray-900">7개</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <p className="text-sm text-green-600">+1개 신규 개설</p>
            </div>
          </div>
        </div>
      </Link>

      <Link href={"/admin/members"}>
        <div className="text-card-foreground card-list">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-gray-600 leading-none tracking-tight">
              탈퇴 위험
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-cert-dark-red" />
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-semibold text-cert-dark-red">3명</div>
            <p className="text-sm text-gray-600 mt-2">벌점 2점 이상 회원</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
