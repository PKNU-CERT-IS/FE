"use client";

import DefaultButton from "@/components/ui/defaultButton";
import LockSVG from "/public/icons/lock.svg";
import ProfileSVG from "/public/icons/profile.svg";
import { loginAction } from "@/actions/auth/LoginServerAction";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, LockOpen } from "lucide-react";

export default function CCLoginInput() {
  const { showPassword, setShowPassword, loginFormData, setLoginFormData } =
    useAuth();

  return (
    <form action={loginAction} className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="id"
          className="font-medium text-gray-700 flex items-center gap-2"
        >
          <ProfileSVG className="w-4 h-4 stroke-cert-dark-red" />
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
          className="text-sm text-gray-700 h-11 border-gray-300 w-full rounded-md border bg-background px-3 py-2"
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="font-medium text-gray-700 flex items-center gap-2"
        >
          <LockSVG className="w-4 h-4 stroke-cert-dark-red" />
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
            className="text-sm text-gray-700 h-11 pr-10 border-gray-300 flex w-full rounded-md border bg-background px-3 py-2 placeholder:text-muted-foreground"
            required
          />
          <button
            type="button"
            className="absolute right-0 top-0 h-11 px-3 text-gray-400 hover:text-gray-600"
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

      <div className="space-y-3">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="rememberId"
            checked={loginFormData.rememberId}
            onChange={(e) =>
              setLoginFormData({
                ...loginFormData,
                rememberId: e.target.checked,
              })
            }
          />
          <span className="text-sm text-gray-700">아이디 기억하기</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="autoLogin"
            checked={loginFormData.autoLogin}
            onChange={(e) =>
              setLoginFormData({
                ...loginFormData,
                autoLogin: e.target.checked,
              })
            }
          />
          <span className="text-sm text-gray-700">자동 로그인</span>
        </label>
      </div>

      <DefaultButton
        type="submit"
        className="w-full h-12 text-white font-medium shadow-lg "
      >
        <LockOpen className="w-4 h-4 stroke-white" />
        로그인
      </DefaultButton>
    </form>
  );
}
