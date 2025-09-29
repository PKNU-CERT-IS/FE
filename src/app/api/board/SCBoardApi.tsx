import { fetchWithAuth } from "@/lib/serverIntercept";

// 게시글 조회
export async function getBoards(
  keyword?: string,
  category?: string,
  page: number = 0,
  size: number = 10
) {
  try {
    const params = new URLSearchParams();
    if (keyword) {
      params.append("keyword", keyword);
    }
    if (category && category !== "전체" && category !== "ALL") {
      params.append("category", category);
    }
    params.append("page", page.toString());
    params.append("size", size.toString());
    console.log(params.toString());
    const res = await fetchWithAuth(`/board/search?${params.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`게시판 조회 실패: ${res.status}`);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    throw error;
  }
}

// 디테일 페이지 조회
export async function getDetailBoard(boardId: number) {
  try {
    const res = await fetchWithAuth(`/board/detail/${boardId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error(`게시판 조회 실패: ${res.status}`);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    throw error;
  }
}
