"use client";

import React, { useId, useState } from "react";
import {
  Download,
  File,
  FileText,
  Image as ImageIcon,
  Archive,
  Presentation,
  Folder,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
} from "lucide-react";
import { AttachedFile, AttachedType } from "@/types/attachedFile";

interface AttachedFilesDownloadProps {
  files: AttachedFile[];
  collapsible?: boolean;
  defaultOpen?: boolean;
}

// 파일 크기 포맷
const formatFileSize = (bytes: number | string): string => {
  const numBytes = typeof bytes === "string" ? Number(bytes) : bytes;
  if (numBytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(numBytes) / Math.log(k));
  return parseFloat((numBytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const iconClass = "w-5 h-5";

// 아이콘 매핑
export const getFileIcon = (type: AttachedType) => {
  switch (type) {
    case "PDF":
    case "HWP":
    case "WORD":
    case "TEXT":
      return <FileText className={iconClass} />;
    case "PPT":
    case "PPTX":
      return <Presentation className={iconClass} />;
    case "EXCEL":
      return <FileSpreadsheet className={iconClass} />;
    case "PNG":
    case "JPEG":
    case "JPG":
      return <ImageIcon className={iconClass} />;
    case "ZIP":
      return <Archive className={iconClass} />;
    default:
      return <File className={iconClass} />;
  }
};

// 색상 매핑
export const getCategoryColor = (type: AttachedType): string => {
  switch (type) {
    case "PDF":
    case "HWP":
    case "WORD":
    case "TEXT":
      return "bg-blue-50 border-blue-200 text-blue-700";
    case "PPT":
    case "PPTX":
      return "bg-yellow-50 border-yellow-200 text-yellow-700";
    case "EXCEL":
      return "bg-green-50 border-green-200 text-green-700";
    case "PNG":
    case "JPEG":
    case "JPG":
      return "bg-purple-50 border-purple-200 text-purple-700";
    case "ZIP":
      return "bg-orange-50 border-orange-200 text-orange-700";
    default:
      return "bg-gray-50 border-gray-200 text-gray-700";
  }
};

export const mapMimeToCategory = (
  mime: string,
  filename?: string
): AttachedType => {
  const lowerMime = mime.toLowerCase();
  const ext = filename?.split(".").pop()?.toLowerCase();

  if (lowerMime.includes("pdf") || ext === "pdf") return "PDF";
  if (lowerMime.includes("haansofthwp") || ext === "hwp") return "HWP";
  if (
    lowerMime.includes("msword") ||
    lowerMime.includes("wordprocessingml") ||
    ["doc", "docx"].includes(ext ?? "")
  )
    return "WORD";
  if (lowerMime.includes("presentation") || ["ppt", "pptx"].includes(ext ?? ""))
    return ext === "pptx" ? "PPTX" : "PPT";
  if (lowerMime.includes("excel") || ["xls", "xlsx"].includes(ext ?? ""))
    return "EXCEL";
  if (lowerMime === "text/plain" || ext === "txt") return "TEXT";

  if (lowerMime.startsWith("image/png") || ext === "png") return "PNG";
  if (lowerMime.startsWith("image/jpeg") || ext === "jpeg") return "JPEG";
  if (ext === "jpg") return "JPG";

  if (
    lowerMime.includes("zip") ||
    lowerMime.includes("rar") ||
    lowerMime.includes("compressed") ||
    ["zip", "rar"].includes(ext ?? "")
  )
    return "ZIP";

  return "PDF";
};

export default function AttachedFilesDownload({
  files,
  collapsible = true,
  defaultOpen = false,
}: AttachedFilesDownloadProps) {
  const [downloadingFiles, setDownloadingFiles] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const panelId = useId();

  if (!files || files.length === 0) return null;

  // 단일 파일 다운로드
  const downloadFile = async (file: AttachedFile) => {
    setDownloadingFiles((prev) => [...prev, file.id]);
    try {
      const link = document.createElement("a");
      link.href = file.attachedUrl;
      link.download = file.name || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloadingFiles((prev) => prev.filter((id) => id !== file.id));
    }
  };

  return (
    <div className="border rounded-lg shadow-xs dark-default">
      {/* 헤더 */}
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

      {/* 본문 */}
      <div
        id={panelId}
        className={`transition-[max-height] duration-300 ease-out overflow-hidden ${
          open || !collapsible ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="px-3 sm:px-4 pb-4">
          <div className="space-y-2 sm:space-y-3">
            {files.map((file) => {
              const isDownloading = downloadingFiles.includes(file.id);

              return (
                <div
                  key={file.id}
                  className="border rounded-lg p-3 sm:p-4 transition-all border-gray-200 hover:border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                      <div
                        className={`p-1.5 sm:p-2 rounded-lg border ${getCategoryColor(
                          mapMimeToCategory(file.type)
                        )}`}
                      >
                        {getFileIcon(mapMimeToCategory(file.type))}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-medium text-sm sm:text-base text-gray-900 break-words dark:text-gray-300">
                          {file.name}
                        </h4>
                        <div className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          {formatFileSize(file.size)}
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
        </div>
      </div>
    </div>
  );
}
