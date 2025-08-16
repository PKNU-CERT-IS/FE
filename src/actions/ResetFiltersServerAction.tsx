"use server";

import { redirect } from "next/navigation";

/**
 * 공용 필터 초기화 서버 액션
 * - bind로 pathname을 주입해서 사용하세요.
 * - form에서 전달되는 FormData는 두 번째 인자로 자동 주입될 수 있으므로 선택 파라미터로 둡니다.
 */
export async function resetFilters(pathname: string, _formData?: FormData) {
  void _formData; // eslint-disable-line @typescript-eslint/no-unused-vars
  redirect(pathname || "/");
}
