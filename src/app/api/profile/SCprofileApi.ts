import { fetchWithAuth } from "@/lib/serverIntercept";

export async function getProfile() {
  const res = await fetchWithAuth("/profile/me", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return {
      success: false,
      message: "프로필 정보를 불러오는데 실패했습니다.",
    };
  }

  const data = await res.json();
  return { success: true, data: data.data };
}
