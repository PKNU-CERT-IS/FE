import { fetchWithAuth } from "@/lib/serverIntercept";
import { normalizeSemester } from "@/types/study";

// 스터디 조회
export async function getStudies(page: number = 0, size?: number) {
  try {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    if (size) {
      params.append("size", size.toString());
    }
    const res = await fetchWithAuth(`/study?${params.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`스터디 조회 실패: ${res.status}`);
    }

    const json = await res.json();
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
    subcategory?: string;
    studyStatus?: string;
    semester?: string;
  } = {}
) {
  try {
    const params = new URLSearchParams();

    if (filters.keyword?.trim()) params.append("keyword", filters.keyword);
    if (filters.category && filters.category !== "ALL")
      params.append("category", filters.category);
    if (filters.subcategory && filters.subcategory !== "ALL")
      params.append("subcategory", filters.subcategory);
    if (filters.studyStatus && filters.studyStatus !== "ALL")
      params.append("studyStatus", filters.studyStatus);
    if (filters.semester && filters.semester !== "ALL") {
      params.append("semester", normalizeSemester(filters.semester));
    }

    const res = await fetchWithAuth(`/study/search?${params.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`스터디 검색 실패: ${res.status}`);
    }

    const json = await res.json();
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
    return json.data;
  } catch (error) {
    throw error;
  }
}
