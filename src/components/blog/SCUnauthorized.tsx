"server-only";

import Link from "next/link";
import { Lock } from "lucide-react";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
      {/* 아이콘 */}
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100">
        <Lock className="w-10 h-10 text-red-500" />
      </div>

      {/* 안내 문구 */}
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        권한이 없는 접근입니다
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        이 게시글은 로그인한 사용자만 볼 수 있습니다.
      </p>

      {/* 로그인 버튼 */}
      <Link
        href="/login"
        className="px-6 py-2 rounded-md bg-cert-red text-white hover:bg-cert-dark-red transition"
      >
        로그인하러 가기
      </Link>
    </div>
  );
}
