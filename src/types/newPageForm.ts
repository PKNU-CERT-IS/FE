import { AttachedFile } from "@/types/attachedFile";

export const newPageCategories = ["board", "blog", "study", "project"] as const;

export type NewPageCategoryType = (typeof newPageCategories)[number];

// 임시 새 페이지 폼 데이터 타입
export interface NewPageFormData {
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  content: string;
  files: File[];
  attachedFiles?: AttachedFile[];
  maxParticipants?: number;
  isCategoryOpen: boolean;
  githubUrl?: string;
  demoUrl?: string;
  externalUrl?: { url: string; title: string };
  projectImage?: string;
}
