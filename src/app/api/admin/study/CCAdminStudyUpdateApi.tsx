import { apiClient } from "@/lib/clientIntercept";
import { UpdateStudyFormData } from "@/types/study";

// admin 스터디 수정
export async function updateAdminStudy(
  studyId: number,
  payload: UpdateStudyFormData
) {
  try {
    const res = await apiClient.put(`/admin/study/update`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}
