"use server";

import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
  const accountNumber = formData.get("id") as string;
  const password = formData.get("password") as string;

  const res = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accountNumber, password }),
    credentials: "include",
  });

  if (!res.ok) {
    return { success: false, message: "아이디 또는 비밀번호가 틀렸습니다" };
  }

  const data = await res.json();

  (await cookies()).set("accessToken", data.data.accessToken, {
    httpOnly: false,
    secure: true,
    sameSite: "lax",
  });

  // ✅ Spring의 Set-Cookie 헤더에서 RefreshToken 추출해서 설정
  const setCookieHeaders = res.headers.get("set-cookie");
  if (setCookieHeaders) {
    const refreshTokenMatch = setCookieHeaders.match(/refreshToken=([^;]+)/);
    if (refreshTokenMatch) {
      const refreshToken = refreshTokenMatch[1];

      (await cookies()).set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 14, // 14일
      });
    }
  }

  // 로그인 성공 시 리다이렉트
  return { success: true, role: data.data.role };
}
