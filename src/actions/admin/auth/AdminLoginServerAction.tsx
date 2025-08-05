"use server";

import { redirect } from "next/navigation";

export async function adminLoginAction(formData: FormData) {
  const id = formData.get("id") as string;
  const password = formData.get("password") as string;

  // 간단한 예시 로그인 로직 (실제에서는 DB 조회 or 인증 API 사용)
  const isValid = id === "admin" && password === "1234";

  if (!isValid) {
    // 예: 오류 처리 방식에 따라 return or redirect
    throw new Error("아이디 또는 비밀번호가 틀렸습니다");
  }

  // 로그인 성공 시 리다이렉트
  redirect("/admin");
}
