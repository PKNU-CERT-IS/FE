"server-only";
import SCAuthSwitchButton from "@/components/auth/SCAuthSwitchButton";
import SCAuthTitle from "@/components/auth/SCAuthTitle";
import { Fingerprint } from "lucide-react";
import CCLoginForm from "@/components/auth/login/CCLoginForm";

export default function SCLoginContainer() {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-lg bg-white/95 backdrop-blur-sm border border-gray-200 shadow-2xl dark:bg-gray-800 dark:border-gray-700">
        <SCAuthTitle
          title={"로그인"}
          description={"사이버 보안 동아리 회원 전용 시스템"}
        />

        <div className="space-y-6 p-6 pt-0">
          <CCLoginForm />
          <SCAuthSwitchButton type="login" />

          <div className="bg-cert-red/5 border border-cert-red/20 rounded-lg p-3 dark:bg-cert-red/30">
            <div className="flex items-start gap-2">
              <Fingerprint className="w-4 h-4 text-cert-red mt-0.5" />
              <div className="text-xs text-gray-700 dark:text-gray-300">
                <p className="font-semibold mb-1">보안 알림</p>
                <p>
                  안전한 로그인을 위해 개인정보를 보호하고, 의심스러운 활동이
                  감지되면 즉시 관리자에게 문의하세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
