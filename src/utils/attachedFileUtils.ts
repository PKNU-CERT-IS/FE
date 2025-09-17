import { AttachedFile } from "@/types/attachedFile";

// 파일 사이즈 포맷팅
export const formatFileSize = (sizeInBytes: number): string => {
  if (sizeInBytes < 1024) return `${sizeInBytes} B`;
  const sizeInKB = sizeInBytes / 1024;
  if (sizeInKB < 1024) return `${sizeInKB.toFixed(1)} KB`;
  const sizeInMB = sizeInKB / 1024;
  if (sizeInMB < 1024) return `${sizeInMB.toFixed(1)} MB`;
  const sizeInGB = sizeInMB / 1024;
  return `${sizeInGB.toFixed(1)} GB`;
};

// 파일 아이콘
export function getFileIcon(type: string) {
  if (type.includes("pdf")) return "📄";
  if (type.includes("excel") || type.includes("spreadsheet")) return "📊";
  if (type.includes("word") || type.includes("document")) return "📝";
  if (type.includes("image")) return "🖼️";
  return "📎";
}

// 파일을 AttachedFile 타입으로 변환
export const convertFileToAttachedFile = (file: File): AttachedFile => ({
  name: file.name,
  size: file.size,
  type: file.type,
  attachedUrl: `https://www.cert-is.com/uploads/${encodeURIComponent(
    file.name
  )}`,
});
