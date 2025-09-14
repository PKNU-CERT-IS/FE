import { fetchWithAuth } from "@/lib/serverIntercept";

// 프로필 정보 조회
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

  const { data } = await res.json();
  return data;
}

// 프로필 스터디 정보 조회
export async function getProfileStudy() {
  const res = await fetchWithAuth("/profile/me/study", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return {
      success: false,
      message: "프로필 정보를 불러오는데 실패했습니다.",
    };
  }

  const { data } = await res.json();
  return data;
}

// 프로필 프로젝트 정보 조회
export async function getProfileProject() {
  const res = await fetchWithAuth("/profile/me/project", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return {
      success: false,
      message: "프로필 정보를 불러오는데 실패했습니다.",
    };
  }

  const { data } = await res.json();
  return data;
}

// 프로필 블로그 정보 조회
export async function getProfileBlog() {
  const res = await fetchWithAuth("/profile/me/blog", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return {
      success: false,
      message: "프로필 정보를 불러오는데 실패했습니다.",
    };
  }

  const { data } = await res.json();
  return data;
}
