import { AttachedFile } from "@/types/attachedFile";
import { SemesterType } from "@/types/project";
import { apiClient } from "@/lib/clientIntercept";

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

// admin 프로젝트 수정
export async function updateAdminProject(
  projectId: number,
  payload: UpdateProjectFormData,
) {
  try {
    const res = await apiClient.put(`/admin/project/update`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}
