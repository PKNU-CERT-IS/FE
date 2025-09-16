import { fetchWithAuth } from "@/lib/serverIntercept";

// 게시글 조회
export async function getBoards(
  search: string = "",
  category: string = "",
  page: number = 1,
  size: number = 10
) {
  try {
    const params = new URLSearchParams();
    params.append("search", search ?? "");
    params.append("category", category || "NOTICE"); // FIXME: all 해결되면 수정되어야 함
    params.append("page", page.toString());
    params.append("size", size.toString());

    const res = await fetchWithAuth(`/board/keyword?${params.toString()}`, {
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
