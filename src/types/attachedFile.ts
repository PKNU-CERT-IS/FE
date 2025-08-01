import { FileCategory } from "@/types/project";

// 첨부파일 타입 정의
export interface AttachedFile {
  id: string;
  name: string;
  size: number; // bytes
  type: string; // MIME type
  category: FileCategory;
  downloadUrl: string;
  uploadDate: string;
  description?: string;
}
export function getFileIcon(type: string) {
  if (type.includes("pdf")) return "📄";
  if (type.includes("excel") || type.includes("spreadsheet")) return "📊";
  if (type.includes("word") || type.includes("document")) return "📝";
  if (type.includes("image")) return "🖼️";
  return "📎";
}
