"use client";

import DefaultButton from "@/components/ui/defaultButton";
import LockSVG from "/public/icons/lock.svg";
import ProfileSVG from "/public/icons/profile.svg";
import { loginAction } from "@/actions/auth/LoginServerAction";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, LockOpen, Loader2 } from "lucide-react";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { set } from "date-fns";

export default function CCLoginInput() {
  const { showPassword, setShowPassword, loginFormData, setLoginFormData } =
    useAuth();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string>("");

  // savedId → 초기 렌더에만 적용
  useEffect(() => {
    const savedId = localStorage.getItem("savedId");
    if (savedId) {
      setLoginFormData({
        ...loginFormData,
        id: savedId,
        rememberId: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // 브라우저 기본 submit 동작 차단 이전 DOM rollaback 방지

    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const result = await loginAction(formData);
        if (result.success) {
          setAuth(true, result.role);
          router.push("/");
        } else {
          setErrorMessage("아이디 또는 비밀번호 입력이 올바르지 않습니다.");
        }
      } catch (err) {
        console.log(err);
      }

      // formData에서 직접 반영
      const id = (formData.get("id") ?? "") as string;
      const rememberId = formData.get("rememberId") !== null;

      if (rememberId) {
        localStorage.setItem("savedId", id);
      } else {
        localStorage.removeItem("savedId");
      }

      // 상태도 제출 값 기반으로 업데이트
      setLoginFormData((prev) => ({
        ...prev,
        id,
        rememberId,
        password: "", // 제출 후 비번 리셋
      }));
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
            className="absolute right-0 top-0 h-10 px-3 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 cursor-pointer" />
            ) : (
              <Eye className="w-4 h-4 cursor-pointer" />
            )}
          </button>
        </div>
        {errorMessage && (
          <p className="text-sm text-red-600 font-medium pl-1">
            {errorMessage}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <label className="flex items-center space-x-2 pt-1 pb-1 pl-1 cursor-pointer">
          <input
            type="checkbox"
            name="rememberId"
            className="accent-cert-dark-red w-4 h-4 rounded"
            checked={loginFormData.rememberId}
            onChange={(e) =>
              setLoginFormData({
                ...loginFormData,
                rememberId: e.target.checked,
              })
            }
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">
            아이디 기억하기
          </span>
        </label>
      </div>

      {/* 로그인 버튼 */}
      <DefaultButton
        type="submit"
        disabled={isPending}
        className="w-full h-12 text-white font-medium shadow-lg flex justify-center items-center gap-2"
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
