import { apiClient } from "@/lib/clientIntercept";

interface UpdateMemberRequest {
  targetMemberId: number;
  newRole: string;
  newGrade: string;
}

// 회원 삭제
export async function deleteMember(memberId: number) {
  const res = await apiClient.delete(`/admin/member/${memberId}`);
  return res.data;
}

// 회원 정보 수정
export async function updateMemberGradeRole(request: UpdateMemberRequest) {
  const res = await apiClient.post("/admin/member/update", {
    targetMemberId: request.targetMemberId,
    newRole: request.newRole,
    newGrade: request.newGrade,
  });
  return res.data;
}
