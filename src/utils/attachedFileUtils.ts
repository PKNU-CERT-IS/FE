import { AttachedFile, AttachedType } from "@/types/attachedFile";

export const formatFileSize = (sizeInBytes: number | string) => {
  const size =
    typeof sizeInBytes === "string" ? Number(sizeInBytes) : sizeInBytes;

  if (size < 1024) return `${size} B`;
  const sizeInKB = size / 1024;
  if (sizeInKB < 1024) return `${sizeInKB.toFixed(1)} KB`;
  const sizeInMB = sizeInKB / 1024;
  if (sizeInMB < 1024) return `${sizeInMB.toFixed(1)} MB`;
  const sizeInGB = sizeInMB / 1024;
  return `${sizeInGB.toFixed(1)} GB`;
};
/**
 * MIME 타입이나 파일명 확장자를 AttachedType enum 값으로 변환
 */
export function mapToAttachedType(
  file: File | { type: string; name: string; id: number },
): AttachedType {
  const mime = file.type?.toLowerCase() ?? "";
  const ext = file.name?.split(".").pop()?.toLowerCase() ?? "";

  // 문서
  if (mime === "application/pdf" || ext === "pdf") return "PDF";
  if (mime === "application/haansofthwp" || ext === "hwp") return "HWP";
  if (ext === "hwpx" || mime === "application/vnd.hancom.hwpx") return "HWPX";
  if (
    mime === "application/msword" ||
    mime.includes("word") ||
    ["doc", "docx"].includes(ext)
  )
    return "WORD";
  if (mime.includes("presentation") || ["ppt", "pptx"].includes(ext))
    return ext === "pptx" ? "PPTX" : "PPT";
  if (mime.includes("excel") || ["xls", "xlsx"].includes(ext)) return "EXCEL";
  if (mime === "text/csv" || ext === "csv") return "CSV";
  if (mime === "text/plain" || ext === "txt") return "TEXT";

  // 이미지
  if (mime.startsWith("image/png") || ext === "png") return "PNG";
  if (mime.startsWith("image/jpeg") || ext === "jpeg") return "JPEG";
  if (ext === "jpg") return "JPG";

  // 압축
  if (mime === "application/zip" || ext === "zip") return "ZIP";

  return "TEXT";
}

export async function convertFileToAttachedFile(
  file: File,
): Promise<AttachedFile> {
  const reader = new FileReader();
  const base64 = await new Promise<string>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("FileReader error"));
    reader.readAsDataURL(file);
  });

  return {
    id: Number(crypto.randomUUID()),
    name: file.name,
    size: file.size,
    type: mapToAttachedType(file),
    attachedUrl: base64,
  };
}

// 파일 아이콘
export function getFileIcon(type: string): string {
  switch (type) {
    case "PDF":
    case "HWP":
    case "WORD":
      return "📄";
    case "PPT":
    case "PPTX":
      return "📊";
    case "XLS":
    case "EXCEL":
      return "📈";
    case "PNG":
    case "JPG":
      return "🖼️";
    case "ZIP":
      return "🗜️";
    default:
      return "📎";
  }
}
