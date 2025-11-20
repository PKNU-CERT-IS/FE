import { cookies } from "next/headers";

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"
    }${url}`,
    {
      ...options,
      cache: "no-store", // 항상 최신 데이터 요청
      credentials: "include", // 쿠키 포함
      headers: {
        ...options.headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  );

  return res;
}
