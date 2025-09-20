"use client";

import { apiClient } from "@/lib/clientIntercept";
import { NewBoardFormData } from "@/types/board";
import { AttachedFile } from "@/types/attachedFile";

interface UpdateBoardPayload {
  title: string;
  content: string;
  description?: string;
  category: string;
  attachments?: AttachedFile[];
}

// 게시글 생성
export async function createBoard(body: NewBoardFormData) {
  try {
    const res = await apiClient.post("/board/create", body, {
      headers: { "Content-Type": "application/json" },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}

// 좋아요
export async function postLike(boardId: number) {
  try {
    const res = await apiClient.post(`/board/like/${boardId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

// 게시글 삭제
export async function deleteBoard(boardId: number) {
  try {
    const res = await apiClient.delete(`/board/delete/${boardId}`, {
      data: { boardId },
      headers: { "Content-Type": "application/json" },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}

// 게시글 수정
export async function updateBoard(
  boardId: number,
  payload: UpdateBoardPayload
) {
  try {
    const res = await apiClient.put(`/board/edit/${boardId}`, payload, {
      headers: { "Content-Type": "application/json" },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}

// 디테일 페이지 조회 -> 수정 위해서 필요
export async function getCCDetailBoard(boardId: number) {
  try {
    const res = await apiClient.get(`/board/detail/${boardId}`, {
      headers: { "Content-Type": "application/json" },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}
