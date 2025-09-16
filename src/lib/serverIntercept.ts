import { cookies } from "next/headers";

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  let res = await fetch(
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
    }
  );

  if (res.status === 401) {
    // accessToken이 만료된 경우 토큰 갱신 시도
    const refreshRes = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"
      }/auth/token/refresh`,
      {
        method: "POST",
        credentials: "include", // 쿠키 포함
      }
    );

    if (!refreshRes.ok) {
      // 리프레시 토큰도 만료된 경우
      throw new Error("Unauthorized");
    }

    const { accessToken: newAccessToken } = await refreshRes.json();

    res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"
      }${url}`,
      {
        ...options,
        cache: "no-store",
        credentials: "include",
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      }
    );
  }
  return res;
}
