"use server";

import { cookies } from "next/headers";
import { fetchWithAuth } from "@/lib/serverIntercept";

export async function logoutAction() {
  // 서버 API 호출 (토큰 무효화)
  await fetchWithAuth("/auth/logout", {
    method: "POST",
  });

  // 쿠키 삭제
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}
