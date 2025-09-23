import { apiClient } from "@/lib/clientIntercept";
import { CreateStudyFormData, UpdateStudyFormData } from "@/types/study";

// 스터디 수정
export async function updateStudy(
  studyId: number,
  payload: UpdateStudyFormData
) {
  try {
    const res = await apiClient.put(`/study/update`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("studyId", studyId);
    return res.data;
  } catch (error) {
    throw error;
  }
}

// 스터디 생성
export async function createStudy(body: CreateStudyFormData) {
  try {
    const res = await apiClient.post("/study/create", body, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

// 스터디 삭제
export async function deleteStudy(studyId: number) {
  try {
    const res = await apiClient.delete(`/study/delete`, {
      data: { studyId },
      headers: { "Content-Type": "application/json" },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}

// 디테일 페이지 조회 -> 수정 위해서 필요
export async function getCCDetailStudy(studyId: number) {
  try {
    const res = await apiClient.get(`/study/detail?studyId=${studyId}`, {
      headers: { "Content-Type": "application/json" },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}
