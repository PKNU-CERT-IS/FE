import { fetchWithAuth } from "@/lib/serverIntercept";

// 스터디 조회
export async function getProjects(page = 1, size = 10, sort = "id,desc") {
  try {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("size", size.toString());
    params.append("sort", sort);

    const res = await fetchWithAuth(`/project?${params.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`project 조회 실패: ${res.status}`);
    }

    const json = await res.json();
    console.log("project 조회", json);
    return json.data;
  } catch (error) {
    console.error("getProjects error:", error);
    throw error;
  }
}

// 검색
export async function searchProjects(
  page: number = 0,
  size: number = 6,
  searchRequest: {
    keyword?: string;
    category?: string;
    subcategory?: string;
    status?: string;
    semester?: string;
    empty?: boolean;
  } = {},
  sort: string[] = ["id,desc"]
) {
  const params = new URLSearchParams();

  Object.entries(searchRequest).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "ALL" &&
      value !== "all"
    ) {
      params.append(`searchRequest.${key}`, String(value));
    }
  });
  params.append("pageable.page", page.toString());
  params.append("pageable.size", size.toString());
  sort.forEach((s) => params.append("pageable.sort", s));

  const res = await fetchWithAuth(`/project/search?${params.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error(`프로젝트 검색 실패: ${res.status}`);
  }

  const json = await res.json();
  console.log("searchProjects 조회", json);
  return json.data;
}

export async function getDetailProject(projectId: number) {
  try {
    const res = await fetchWithAuth(`/project/detail?projectId=${projectId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error(`project 디테일 조회 실패: ${res.status}`);
    }
    const json = await res.json();
    console.log("project 디테일 조회", json);
    return json.data;
  } catch (error) {
    throw error;
  }
}
