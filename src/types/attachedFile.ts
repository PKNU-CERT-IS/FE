export type AttachedType =
  | "PDF"
  | "HWP"
  | "WORD"
  | "PPT"
  | "PPTX"
  | "EXCEL"
  | "TEXT"
  | "PNG"
  | "JPEG"
  | "JPG"
  | "ZIP";

// 첨부파일 타입 정의
export interface AttachedFile {
  name: string;
  size: number; // bytes
  type: AttachedType;
  attachedUrl: string;
  id: number;
}

// 첨부파일에 대한 고유 key 생성
export const getFileKey = (file: AttachedFile) => {
  return `${file.attachedUrl}-${file.name}-${file.size}`;
};
