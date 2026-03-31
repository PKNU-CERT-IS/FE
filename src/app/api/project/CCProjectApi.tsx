import { AttachedFile } from "@/types/attachedFile";
import { SemesterType } from "@/types/study";
import { apiClient } from "@/lib/clientIntercept";
import { withIdempotentRetry } from "@/lib/idempotency";

export interface CreateProjectFormData {
  title: string;
  description: string;
  content: string;
  category: string;
  subCategory: string;
  startDate: string;
  endDate: string;
  githubUrl?: string;
  thumbnailUrl?: string;
  maxParticipants: number;
  externalUrl?: { title?: string; url?: string };
  demoUrl?: string; // 데모/배포 URL
  semester?: SemesterType;
  attachments?: AttachedFile[];
}
export interface UpdateProjectFormData extends CreateProjectFormData {
  projectId: number;
}

// 프로젝트 생성
export async function createProject(
  body: CreateProjectFormData,
  idempotencyKey?: string,
) {
  try {
    const execute = () =>
      apiClient.post("/project/create", body, {
        headers: {
          "Content-Type": "application/json",
          ...(idempotencyKey ? { "X-Idempotency-Key": idempotencyKey } : {}),
        },
      });

    const res = idempotencyKey
      ? await withIdempotentRetry(execute)
      : await execute();
    console.log(res.data);
    return res.data;
  } catch (error) {
    throw error;
  }
}

// 디테일 페이지 조회 -> 수정 위해서 필요
export async function getCCDetailProject(projectId: number) {
  try {
    const res = await apiClient.get(`/project/detail?projectId=${projectId}`, {
      headers: { "Content-Type": "application/json" },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function updateProject(
  projectId: number,
  payload: UpdateProjectFormData,
  idempotencyKey?: string,
) {
  try {
    const execute = () =>
      apiClient.put(`/project/update`, payload, {
        headers: {
          "Content-Type": "application/json",
          ...(idempotencyKey ? { "X-Idempotency-Key": idempotencyKey } : {}),
        },
      });

    const res = idempotencyKey
      ? await withIdempotentRetry(execute)
      : await execute();
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProject(projectId: number) {
  try {
    const res = await apiClient.delete(`/project/delete`, {
      data: { projectId },
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

// 프로젝트 종료 요청
export async function endProject(
  projectId: number,
  attachment: {
    id: number;
    name: string;
    type: string;
    attachedUrl: string;
    size: number;
  },
  idempotencyKey?: string,
) {
  try {
    const execute = () =>
      apiClient.post(
        "/project/end",
        {
          projectId,
          attachment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            ...(idempotencyKey ? { "X-Idempotency-Key": idempotencyKey } : {}),
          },
        },
      );

    const res = idempotencyKey
      ? await withIdempotentRetry(execute)
      : await execute();
    return res.data;
  } catch (error) {
    throw error;
  }
}
