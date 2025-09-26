import { fetchWithAuth } from "@/lib/serverIntercept";
import { StatusType } from "@/types/progressStatus";
import { MemberGrade } from "@/types/study";

export interface StudyEndRequest {
  studyId: number;
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
  studyCreatorName: string;
  studyCreatorGrade: MemberGrade;
}

// 스터디 종료 요청 조회
export async function getStudyEndRequest(studyId: number) {
  try {
    const res = await fetchWithAuth(`/admin/study/end/${studyId}`, {
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

// 스터디 종료 요청 조회
export async function getStudyAllEndRequest(): Promise<StudyEndRequest[]> {
  try {
    const res = await fetchWithAuth(`/admin/study/end`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("스터디 종료 요청 조회 실패");

    const json = await res.json();
    return json.data;
  } catch (error) {
    throw error;
  }
}
