"server-only";
import SCAuthTitle from "@/components/auth/SCAuthTitle";
import CCAdminLoginForm from "@/components/admin/login/CCAdminLoginForm";

export default function SCAdminLogin() {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-lg bg-white/95 backdrop-blur-sm border border-gray-200 shadow-2xl dark:bg-gray-800 dark:border-gray-700">
        <SCAuthTitle
          title={"관리자 로그인"}
          description={"사이버 보안 동아리 관리자 전용 시스템"}
        />
        <div className="space-y-6 p-6 pt-0">
          <CCAdminLoginForm />
        </div>
      </div>
    </div>
  );
}
