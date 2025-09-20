import { apiClient } from "@/lib/clientIntercept";
import { AttachedFile } from "@/types/attachedFile";
import { CategoryType, SubCategoryType } from "@/types/category";

export interface CreateProjectFormData {
  title: string;
  description: string;
  category: string;
  subCategory: string;
  startDate: string;
  endDate: string;
  githubUrl?: string;
  thumbnailUrl?: string;
  maxParticipants: number;
  externalUrl?: string; // FIXME: title, url 추가 필요
  demoUrl?: string; // 데모/배포 URL
  externalLinks?: { label: string; url: string; type?: string }[];
  semester?: string;
  attachments?: AttachedFile[];
}

// 프로젝트 생성
export async function createProject(body: CreateProjectFormData) {
  try {
    const res = await apiClient.post("/project/create", body, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}
