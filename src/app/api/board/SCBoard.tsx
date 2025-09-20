// import { fetchWithAuth } from "@/lib/serverIntercept";

import { fetchWithAuth } from "@/lib/serverIntercept";

// 게시글 조회
export async function getBoards(
  search: string = "",
  category?: string, // 기본값 ALL
  page: number = 1,
  size: number = 10
) {
  try {
    const params = new URLSearchParams();

    if (search) {
      params.append("search", search);
    }
    params.append("category", category || "NOTICE");
    params.append("page", page.toString());
    params.append("size", size.toString());

    const url = `/board/keyword?${params.toString()}`;
    console.log("📡 최종 요청 URL:", url);

    const res = await fetchWithAuth(url, {
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

// // 게시글 조회
// export async function getBoards(
//   search: string = "",
//   category: BoardCategoryTypeEN | "" = "",
//   page: number = 1,
//   size: number = 10
// ): Promise<{
//   content: BoardListItem[];
//   totalElements: number;
//   totalPages: number;
//   size: number;
//   number: number;
// }> {
//   try {
//     const params = new URLSearchParams();
//     params.append("search", search ?? "");

//     if (category && category !== "ALL") {
//       params.append("category", category);
//     }

//     params.append("page", page.toString());
//     params.append("size", size.toString());

//     const res = await fetchWithAuth(`/board/keyword?${params.toString()}`, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });

//     if (!res.ok) {
//       throw new Error(`게시판 조회 실패: ${res.status}`);
//     }

//     const json = await res.json();
//     return json.data;
//   } catch (error) {
//     throw error;
//   }
// }

// // 게시글 상세 조회
// export async function getDetailBoard(boardId: number): Promise<BoardDetail> {
//   try {
//     const res = await fetchWithAuth(`/board/detail/${boardId}`, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });

//     if (!res.ok) {
//       throw new Error(`게시판 조회 실패: ${res.status}`);
//     }

//     const json = await res.json();
//     return json.data;
//   } catch (error) {
//     throw error;
//   }
// }
