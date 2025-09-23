import { apiClient } from "@/lib/clientIntercept";
import { AttachedFile } from "@/types/attachedFile";
import { CategoryType, SubCategoryType } from "@/types/category";
import { SemesterType } from "@/types/project";

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
  externalUrl?: { title?: string; url?: string }; // FIXME: title, url 추가 필요
  demoUrl?: string; // 데모/배포 URL
  semester?: SemesterType;
  attachments?: AttachedFile[];
}
export interface UpdateProjectFormData extends CreateProjectFormData {
  projectId: number;
}

// 프로젝트 생성
export async function createProject(body: CreateProjectFormData) {
  try {
    const res = await apiClient.post("/project/create", body, {
      headers: { "Content-Type": "application/json" },
    });
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
  payload: UpdateProjectFormData
) {
  try {
    const res = await apiClient.put(`/project/update`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("projectId", projectId);
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
