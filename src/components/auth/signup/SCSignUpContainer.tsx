"server-only";

import SCAuthSwitchButton from "@/components/auth/SCAuthSwitchButton";
import SCAuthTitle from "@/components/auth/SCAuthTitle";
import CCSignUpForm from "@/components/auth/signup/CCSignUpForm";

export default function SCSignUpContainer() {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-lg bg-white/95 backdrop-blur-sm border border-gray-200 shadow-2xl dark:bg-gray-800 dark:border-gray-700">
        <SCAuthTitle
          title="회원가입"
          description="CERT-IS에 오신 걸 환영합니다!"
        />
        <div className="flex flex-col space-y-1.5 p-6 pb-0 pt-1">
          <div className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            계정 생성
          </div>
          <div className="text-sm text-muted-foreground dark:text-gray-400">
            아래 정보를 입력하여 새 계정을 만드세요
          </div>
        </div>
        <div className="p-6 space-y-6">
          <CCSignUpForm />
          <SCAuthSwitchButton type="signup" />
        </div>
      </div>
    </div>
  );
}
