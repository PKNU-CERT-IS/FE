import { StatusType } from "@/types/progressStatus";
import { MemberGrade } from "@/types/study";
import { fetchWithAuth } from "@/lib/serverIntercept";

// 종료 요청 전용 -> 이제 새로 추가되는 이름,학년 추가해야함
export interface ProjectEndRequest {
  projectId: number;
  status: StatusType;
  submittedAt: string;
  attachment: {
    id: number;
    name: string;
    type: string;
    size: string;
    attachedUrl: string;
  };
  category: string;
  subCategory: string;
  title: string;
  description: string;
  creatorId: number;
  startedAt: string;
  endedAt: string;
  currentParticipantNumber: number;
  maxParticipantNumber: number;
  projectCreatorName: string;
  projectCreatorGrade: MemberGrade;
}

// 스터디 종료 요청 조회
export async function getProjectEndRequest(projectId: number) {
  try {
    const res = await fetchWithAuth(`/admin/project/end/${projectId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      return {
        success: false,
        message: "스터디 종료 조회를 불러오는데 실패했습니다.",
      };
    }
    const json = await res.json();
    return json.data;
  } catch (error) {
    throw error;
  }
}

export async function getProjectAllEndRequest(): Promise<ProjectEndRequest[]> {
  try {
    const res = await fetchWithAuth(`/admin/project/end`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("프로젝트 종료 요청 조회 실패");

    const json = await res.json();
    return json.data;
  } catch (error) {
    throw error;
  }
}
