import { fetchWithAuth } from "@/lib/serverIntercept";
import { normalizeSemester } from "@/types/study";

// 프로젝트 조회
export async function getProjects(
  page = 1,
  size = 10,
  sort = "createdAt,desc"
) {
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
    return json.data;
  } catch (error) {
    throw error;
  }
}

// 검색
export async function searchProjects(
  filters: {
    keyword?: string;
    category?: string;
    subcategory?: string;
    projectStatus?: string;
    semester?: string;
  } = {},
  options: { page?: number; size?: number; sort?: string[] } = {}
) {
  try {
    const params = new URLSearchParams();

    if (filters.keyword?.trim()) params.append("keyword", filters.keyword);
    if (filters.semester && filters.semester !== "ALL") {
      params.append("semester", normalizeSemester(filters.semester));
    }
    if (filters.category && filters.category !== "ALL") {
      params.append("category", filters.category);
    }
    if (filters.subcategory && filters.subcategory !== "ALL") {
      params.append("subcategory", filters.subcategory);
    }
    if (filters.projectStatus && filters.projectStatus !== "ALL") {
      params.append("projectStatus", filters.projectStatus);
    }
    params.append("page", String((options.page ?? 1) - 1));
    params.append("size", String(options.size ?? 10));
    (options.sort ?? ["createdAt,desc"]).forEach((s) =>
      params.append("sort", s)
    );

    const res = await fetchWithAuth(`/project/search?${params.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`project 검색 실패: ${res.status}`);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    throw error;
  }
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
    return json.data;
  } catch (error) {
    throw error;
  }
}
