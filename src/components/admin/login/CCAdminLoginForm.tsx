"use client";

import DefaultButton from "@/components/ui/defaultButton";
import LockSVG from "/public/icons/lock.svg";
import ProfileSVG from "/public/icons/profile.svg";
import { useAuthStore } from "@/store/authStore";
import { loginAction } from "@/actions/auth/LoginServerAction";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, LockOpen, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function CCAdminLoginForm() {
  const { showPassword, setShowPassword, loginFormData, setLoginFormData } =
    useAuth();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        const result = await loginAction(formData);
        if (result.success) {
          setAuth(true, result.role);
          router.push("/admin");
        } else {
          // 에러 처리 UI 추가 가능
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {/* 아이디 입력 */}
      <div className="space-y-2">
        <label
          htmlFor="id"
          className="font-medium text-gray-700 flex items-center gap-2 dark:text-gray-200"
        >
          <ProfileSVG className="w-4 h-4 stroke-cert-dark-red dark:stroke-cert-red" />
          아이디
        </label>
        <input
          id="id"
          name="id"
          type="text"
          placeholder="아이디를 입력하세요"
          value={loginFormData.id}
          onChange={(e) =>
            setLoginFormData({ ...loginFormData, id: e.target.value })
          }
          required
          className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent 
            dark:border-gray-600"
        />
      </div>

      {/* 비밀번호 입력 */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="font-medium text-gray-700 flex items-center gap-2 dark:text-gray-200"
        >
          <LockSVG className="w-4 h-4 stroke-cert-dark-red dark:stroke-cert-red" />
          비밀번호
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={loginFormData.password}
            onChange={(e) =>
              setLoginFormData({ ...loginFormData, password: e.target.value })
            }
            placeholder="비밀번호를 입력하세요"
            className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-cert-red focus:border-transparent 
              dark:border-gray-600"
            required
          />
          <button
            type="button"
            className="absolute right-0 top-0 h-9 px-3 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 cursor-pointer" />
            ) : (
              <Eye className="w-4 h-4 cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      {/* 로그인 버튼 */}
      <DefaultButton
        type="submit"
        className="w-full h-12 text-white font-medium shadow-lg flex justify-center items-center gap-2"
        disabled={isPending} // 로딩 중 버튼 비활성화
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            로그인 중...
          </>
        ) : (
          <>
            <LockOpen className="w-4 h-4 stroke-white" />
            로그인
          </>
        )}
      </DefaultButton>
    </form>
  );
}
