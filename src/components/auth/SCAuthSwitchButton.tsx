"server-only";

import Link from "next/link";
import { UserPlus, LockOpen } from "lucide-react";

type AuthSwitchPromptProps = {
  type: "login" | "signup";
};

export default function SCAuthSwitchButton({ type }: AuthSwitchPromptProps) {
  const isLogin = type === "login";

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs uppercase mb-5">
          <span className="bg-white px-2 text-gray-500">또는</span>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600 mb-3">
          {isLogin ? "아직 회원이 아니신가요?" : "이미 계정이 있으신가요?"}
        </p>
        <Link href={isLogin ? "/signup" : "/login"}>
          <button className="text-sm w-full h-11 border border-cert-red/30 text-cert-red cursor-pointer hover:bg-cert-red/5 hover:border-cert-red hover:text-cert-red transition-all duration-300 bg-transparent rounded-md flex items-center justify-center">
            {isLogin ? (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                회원가입
              </>
            ) : (
              <>
                <LockOpen className="w-4 h-4 mr-2 stroke-cert-red" />
                로그인
              </>
            )}
          </button>
        </Link>
      </div>
    </div>
  );
}
