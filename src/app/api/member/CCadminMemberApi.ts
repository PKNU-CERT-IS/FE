import { apiClient } from "@/lib/clientIntercept";

interface PenaltyRequest {
  memberId: number;
  penaltyPoints: number;
}

interface GrantGracePeriodRequest {
  memberId: number;
  gracePeriod: string; // yyyy-MM-dd 형식
}

interface UpdateMemberRequest {
  targetMemberId: number;
  newRole: string;
  newGrade: string;
}

// 벌점 부여
export async function assignPenalty(request: PenaltyRequest) {
  const res = await apiClient.post("/admin/member/penalty", request);
  return res.data;
}

// 유예기간 부여
export async function grantGracePeriod(request: GrantGracePeriodRequest) {
  const res = await apiClient.post("/admin/member/grace-period", request);
  return res.data;
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
