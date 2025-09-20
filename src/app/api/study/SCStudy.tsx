import { fetchWithAuth } from "@/lib/serverIntercept";

// 스터디 조회
export async function getStudies(page = 0, size = 10, sort = "id,desc") {
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
    console.error("getStudies error:", error);
    throw error;
  }
}

// 검색
export async function searchStudies(
  page: number = 0,
  size: number = 6,
  searchRequest: {
    keyword?: string;
    category?: string;
    subcategory?: string;
    status?: string;
    semester?: string;
  } = {},
  sort: string[] = ["id,desc"]
) {
  const params = new URLSearchParams();

  Object.entries(searchRequest).forEach(([key, value]) => {
    if (value && value !== "ALL" && value !== "all") {
      params.append(key, value);
    }
  });

  params.append("page", page.toString());
  params.append("size", size.toString());
  sort.forEach((s) => params.append("sort", s));

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
