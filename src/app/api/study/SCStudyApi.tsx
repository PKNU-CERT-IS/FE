import { fetchWithAuth } from "@/lib/serverIntercept";
import { normalizeSemester } from "@/types/study";

// 스터디 조회
export async function getStudies(
  page: number,
  size: number = 20,
  sort: string
) {
  try {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("size", size.toString());
    params.append("sort", sort);

    const res = await fetchWithAuth(`/study?${params.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`스터디 조회 실패: ${res.status}`);
    }

    const json = await res.json();
    console.log("getStudies 조회", json);
    return json.data;
  } catch (error) {
    throw error;
  }
}

// 검색
export async function searchStudies(
  filters: {
    keyword?: string;
    category?: string;
    subCategory?: string;
    status?: string;
    semester?: string;
  } = {},
  options: { page?: number; size?: number; sort?: string[] } = {}
) {
  try {
    const params = new URLSearchParams();

    if (filters.keyword?.trim()) params.append("keyword", filters.keyword);
    if (filters.category && filters.category !== "ALL")
      params.append("category", filters.category);
    if (filters.subCategory && filters.subCategory !== "ALL")
      params.append("subcategory", filters.subCategory);
    if (filters.status && filters.status !== "ALL")
      params.append("status", filters.status);
    if (filters.semester && filters.semester !== "ALL") {
      params.append("semester", normalizeSemester(filters.semester));
    }

    params.append("page", String((options.page ?? 1) - 1)); // 0부터 시작
    params.append("size", String(options.size ?? 10));
    (options.sort ?? ["createdAt,desc"]).forEach((s) =>
      params.append("sort", s)
    );

    const res = await fetchWithAuth(`/study/search?${params.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`스터디 검색 실패: ${res.status}`);
    }

    const json = await res.json();
    console.log("searchStudies 조회", json);
    return json.data;
  } catch (error) {
    throw error;
  }
}

export async function getDetailStudy(studyId: number) {
  try {
    const res = await fetchWithAuth(`/study/detail?studyId=${studyId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error(`스터디 디테일 조회 실패: ${res.status}`);
    }
    const json = await res.json();
    console.log("study 디테일 조회", json);
    return json.data;
  } catch (error) {
    throw error;
  }
}
