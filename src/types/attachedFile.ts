// 첨부파일 타입 정의
export interface AttachedFile {
  name: string;
  size: number; // bytes
  type: string;
  attachedUrl: string;
}

// 첨부파일에 대한 고유 key 생성
export const getFileKey = (file: AttachedFile) => {
  // attachedUrl + name + size 조합으로 고유성 확보
  return `${file.attachedUrl}-${file.name}-${file.size}`;
};
