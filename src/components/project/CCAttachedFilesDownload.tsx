"use client";

import React, { useId, useState } from "react";
import { FileCategory } from "@/types/project";
import {
  Download,
  File,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  Archive,
  Code,
  Database,
  FileBarChart,
  Presentation,
  Folder,
  CheckCircle2,
  DownloadCloud,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { AttachedFile, getFileKey } from "@/types/attachedFile";

interface AttachedFilesDownloadProps {
  files: AttachedFile[];
  /** 접기/펼치기 UI 사용 여부 (기본값: true) */
  collapsible?: boolean;
  /** 초기 펼침 상태 (기본값: false) */
  defaultOpen?: boolean;
}

// 파일 크기를 사람이 읽기 쉬운 형태로 변환
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// 파일 카테고리별 아이콘 반환
const getFileIcon = (category: FileCategory) => {
  const iconClass = "w-5 h-5";
  switch (category) {
    case "document":
      return <FileText className={iconClass} />;
    case "image":
      return <ImageIcon className={iconClass} />;
    case "video":
      return <Video className={iconClass} />;
    case "audio":
      return <Music className={iconClass} />;
    case "archive":
      return <Archive className={iconClass} />;
    case "code":
      return <Code className={iconClass} />;
    case "dataset":
      return <Database className={iconClass} />;
    case "report":
      return <FileBarChart className={iconClass} />;
    case "presentation":
      return <Presentation className={iconClass} />;
    default:
      return <File className={iconClass} />;
  }
};

// 파일 카테고리별 색상 테마
const getCategoryColor = (type: FileCategory): string => {
  switch (type) {
    case "document":
      return "bg-blue-50 border-blue-200 text-blue-700";
    case "image":
      return "bg-green-50 border-green-200 text-green-700";
    case "video":
      return "bg-purple-50 border-purple-200 text-purple-700";
    case "audio":
      return "bg-pink-50 border-pink-200 text-pink-700";
    case "archive":
      return "bg-orange-50 border-orange-200 text-orange-700";
    case "code":
      return "bg-gray-50 border-gray-200 text-gray-700";
    case "dataset":
      return "bg-indigo-50 border-indigo-200 text-indigo-700";
    case "report":
      return "bg-emerald-50 border-emerald-200 text-emerald-700";
    case "presentation":
      return "bg-yellow-50 border-yellow-200 text-yellow-700";
    default:
      return "bg-gray-50 border-gray-200 text-gray-700";
  }
};

// 파일 카테고리 한글 라벨
const getCategoryLabel = (category: FileCategory): string => {
  const labels: Record<FileCategory, string> = {
    document: "문서",
    image: "이미지",
    video: "동영상",
    audio: "오디오",
    archive: "압축파일",
    code: "소스코드",
    dataset: "데이터셋",
    report: "보고서",
    presentation: "프레젠테이션",
    other: "기타",
  };
  return labels[category];
};

const mapMimeToCategory = (mime: string): FileCategory => {
  if (mime.startsWith("image/")) return "image"; // jpg, png, gif 등
  if (mime.startsWith("video/")) return "video"; // mp4, avi 등
  if (mime.startsWith("audio/")) return "audio"; // mp3, wav 등
  if (
    mime.includes("zip") ||
    mime.includes("rar") ||
    mime.includes("compressed")
  )
    return "archive";
  if (
    mime.includes("pdf") ||
    mime.includes("msword") ||
    mime.includes("officedocument") ||
    mime.includes("text")
  )
    return "document";
  if (
    mime.includes("json") ||
    mime.includes("javascript") ||
    mime.includes("typescript")
  )
    return "code";
  return "other";
};

export default function AttachedFilesDownload({
  files,
  collapsible = true,
  defaultOpen = false,
}: AttachedFilesDownloadProps) {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [downloadingFiles, setDownloadingFiles] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const panelId = useId();

  if (!files || files.length === 0) {
    return null;
  }

  // 파일 선택/해제
  const toggleFileSelection = (fileKey: string) => {
    setSelectedFiles((prev) =>
      prev.includes(fileKey)
        ? prev.filter((id) => id !== fileKey)
        : [...prev, fileKey]
    );
  };

  // 전체 선택/해제
  const toggleAllFiles = () => {
    setSelectedFiles((prev) =>
      prev.length === files.length ? [] : files.map((f) => getFileKey(f))
    );
  };

  // 단일 파일 다운로드
  const downloadFile = async (file: AttachedFile) => {
    const fileKey = getFileKey(file);
    setDownloadingFiles((prev) => [...prev, fileKey]);

    try {
      const link = document.createElement("a");
      link.href = file.attachedUrl;
      link.download = file.name;
      link.click();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloadingFiles((prev) => prev.filter((id) => id !== fileKey));
    }
  };

  // 선택된 파일 다운로드
  const downloadSelectedFiles = async () => {
    const selectedFileObjects = files.filter((f) =>
      selectedFiles.includes(getFileKey(f))
    );
    for (const file of selectedFileObjects) {
      await downloadFile(file);
    }
    setSelectedFiles([]);
  };
  return (
    <div className=" border rounded-lg shadow-xs dark-default">
      {/* 헤더 (토글 영역) */}
      <div className="flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-3">
          <Folder className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200">
            첨부파일 ({files.length}개)
          </h3>
        </div>

        {collapsible && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center whitespace-nowrap text-sm text-gray-500 hover:text-gray-900 cursor-pointer dark:text-gray-400 dark:hover:text-gray-500"
            aria-expanded={open}
            aria-controls={panelId}
          >
            {open ? (
              <>
                접기 <ChevronUp className="w-4 h-4 ml-1" />
              </>
            ) : (
              <>
                펼치기 <ChevronDown className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        )}
      </div>

      {/* 액션 바 */}
      <div
        className={`px-4 ${open ? "block" : collapsible ? "hidden" : "block"}`}
      >
        <div className="flex items-center mb-3 sm:mb-4">
          <button
            onClick={toggleAllFiles}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs sm:text-sm text-gray-600 hover:text-cert-red transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {selectedFiles.length === files.length ? "전체 해제" : "전체 선택"}
          </button>

          {selectedFiles.length > 0 && (
            <button
              onClick={downloadSelectedFiles}
              className="ml-auto flex items-center action-button gap-1.5 px-2.5 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
            >
              <DownloadCloud className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              선택한 파일 다운로드 ({selectedFiles.length}개)
            </button>
          )}
        </div>
      </div>
      {/* 본문: 접기/펼치기 애니메이션 */}
      <div
        id={panelId}
        className={`transition-[max-height] duration-300 ease-out overflow-hidden ${
          open || !collapsible ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="px-3 sm:px-4 pb-4">
          <div className="space-y-2 sm:space-y-3">
            {files.map((file) => {
              const fileKey = getFileKey(file);
              const isSelected = selectedFiles.includes(fileKey);
              const isDownloading = downloadingFiles.includes(fileKey);

              return (
                <div
                  key={fileKey}
                  className={`border rounded-lg p-3 sm:p-4 transition-all ${
                    isSelected
                      ? "border-red-200 bg-red-50 dark:bg-red-500/20 dark:border-red-800"
                      : "border-gray-200 hover:border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleFileSelection(fileKey)}
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cert-red rounded focus:ring-red-500"
                      />

                      {/* 아이콘 */}
                      <div
                        className={`p-1.5 sm:p-2 rounded-lg border ${getCategoryColor(
                          mapMimeToCategory(file.type)
                        )}`}
                      >
                        {getFileIcon(mapMimeToCategory(file.type))}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                          <h4 className="flex-1 min-w-0 font-medium text-sm sm:text-base text-gray-900 break-words dark:text-gray-300">
                            {file.name}
                          </h4>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium w-fit ${getCategoryColor(
                              mapMimeToCategory(file.type)
                            )}`}
                          >
                            {getCategoryLabel(mapMimeToCategory(file.type))}
                          </span>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          <span>{formatFileSize(file.size)}</span>
                          {/* <span>
                            {new Date(file.uploadDate).toLocaleDateString()}
                          </span> */}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center flex-shrink-0 ml-2 sm:ml-4">
                      <button
                        onClick={() => downloadFile(file)}
                        disabled={isDownloading}
                        className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-4 sm:py-2 border border-gray-100 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 cursor-pointer dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                      >
                        {isDownloading ? (
                          <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 border-2 border-gray-300 border-t-cert-red rounded-full animate-spin" />
                        ) : (
                          <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        )}
                        <span className="text-xs sm:text-sm font-medium">
                          {isDownloading ? "다운로드 중..." : "다운로드"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 비어있을 때 표시 (이 컴포넌트는 files 없으면 null 반환하므로 일반적으로 안 옴) */}
          {files.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Folder className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>첨부파일이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
