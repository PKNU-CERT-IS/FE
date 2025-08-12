import { AttachedFile } from "@/types/attachedFile";

// study 폼 데이터 타입
export interface StudyCreateFormData {
  id: number;
  isPending: boolean;
  title: string;
  description: string;
  content: string;
  category: string;
  tags?: string[];
  attachments: AttachedFile[];
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  maxParticipants: string;
  author: string;
}
// 외부링크
export interface ExternalLink {
  label: string;
  url: string;
}
// project 폼 데이터 타입
export interface ProjectCreateFormData {
  id: number;
  isPending: boolean;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  attachments: AttachedFile[];
  startDate: string;
  endDate: string;
  maxParticipants: string;
  githubUrl?: string;
  demoUrl?: string;
  externalLinks: ExternalLink[];
  projectImage: File | null;
  author: string;
}

export type Study =
  | ({
      isPending: true;
      currentParticipants?: never;
      progress?: never;
    } & StudyCreateFormData)
  | ({
      isPending: false;
      currentParticipants: number;
      progress?: number;
    } & StudyCreateFormData);

export const isApprovedStudy = (
  s: Study
): s is Extract<Study, { isPending: false }> => s.isPending === false;

export type Project =
  | ({
      isPending: true;
      currentParticipants?: never;
      progress?: never;
    } & ProjectCreateFormData)
  | ({
      isPending: false;
      currentParticipants: number;
      progress?: number;
    } & ProjectCreateFormData);

export const isApprovedProject = (
  p: Project
): p is Extract<Project, { isPending: false }> => p.isPending === false;
