"use client";

import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore"; // ✅ zustand 전역 상태
import { logoutAction } from "@/actions/auth/LogoutServerAction"; // ✅ 서버 로그아웃

interface LoginButtonProps {
  className?: string;
  href?: string;
  initialIsLogin?: boolean;
}

export default function LoginButton({
  className = "",
  href = "/login", // 기본값
}: LoginButtonProps) {
  const { isLogin, logout } = useAuthStore();

  async function handleLogout() {
    await logoutAction(); // 서버 로그아웃 실행 (refreshToken 만료 + 쿠키 삭제)
    logout(); // 클라이언트 상태 초기화
    window.location.href = "/login"; // ✅ 강제 새로고침 + 리다이렉트
  }

  const effectiveLogin = isLogin;

  if (effectiveLogin) {
    return (
      <button
        onClick={handleLogout}
        className={`px-3 ml-4 text-white  flex items-center cursor-pointer bg-cert-dark-red py-1.5 group border border-cert-dark-red rounded-md transition-all duration-300 shadow-cert-navbar hover:shadow-lg hover:bg-cert-dark-red/80 hover:border-cert-dark-red ${className}`}
      >
        <LogOut className="w-4 h-4" />
        <div className="ml-3">Logout</div>
      </button>
    );
  }

  return (
    <Link href={href}>
      <div
        className={`px-3 ml-4 text-white flex items-center bg-cert-dark-red py-1.5 group border border-cert-dark-red rounded-md transition-all duration-300 shadow-cert-navbar hover:shadow-lg hover:bg-cert-dark-red/80 hover:border-cert-dark-red ${className}`}
      >
        <LogIn className="w-4 h-4" />
        <div className="ml-3">Login</div>
      </div>
    </Link>
  );
}
