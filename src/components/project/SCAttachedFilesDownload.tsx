"use client";

import React, { useState } from "react";
import { AttachedFile, FileCategory } from "@/types/project";
import {
  Download,
  File,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Code,
  Database,
  FileBarChart,
  Presentation,
  Folder,
  Info,
  CheckCircle2,
  DownloadCloud,
} from "lucide-react";

interface AttachedFilesDownloadProps {
  files: AttachedFile[];
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
      return <Image className={iconClass} />;
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
const getCategoryColor = (category: FileCategory): string => {
  switch (category) {
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

export default function AttachedFilesDownload({
  files,
}: AttachedFilesDownloadProps) {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [downloadingFiles, setDownloadingFiles] = useState<string[]>([]);

  if (!files || files.length === 0) {
    return null;
  }

  // 파일 선택/해제
  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId]
    );
  };

  // 모든 파일 선택/해제
  const toggleAllFiles = () => {
    setSelectedFiles((prev) =>
      prev.length === files.length ? [] : files.map((f) => f.id)
    );
  };

  // 단일 파일 다운로드
  const downloadFile = async (file: AttachedFile) => {
    setDownloadingFiles((prev) => [...prev, file.id]);

    try {
      // 실제 다운로드 로직 (API 호출)
      const link = document.createElement("a");
      link.href = file.downloadUrl;
      link.download = file.name;
      link.click();

      // 시뮬레이션을 위한 딜레이
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setDownloadingFiles((prev) => prev.filter((id) => id !== file.id));
    }
  };

  // 선택된 파일들 일괄 다운로드
  const downloadSelectedFiles = async () => {
    const selectedFileObjects = files.filter((f) =>
      selectedFiles.includes(f.id)
    );

    for (const file of selectedFileObjects) {
      await downloadFile(file);
    }

    setSelectedFiles([]);
  };

  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Folder className="w-6 h-6 text-gray-600" />
          <h3 className="text-xl font-semibold text-gray-900">
            첨부파일 ({files.length}개)
          </h3>
          <button
            onClick={toggleAllFiles}
            className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            {selectedFiles.length === files.length ? "전체 해제" : "전체 선택"}
          </button>
        </div>

        {selectedFiles.length > 0 && (
          <button
            onClick={downloadSelectedFiles}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <DownloadCloud className="w-4 h-4" />
            선택한 파일 다운로드 ({selectedFiles.length}개)
          </button>
        )}
      </div>

      {/* 파일 목록 */}
      <div className="space-y-3">
        {files.map((file) => {
          const isSelected = selectedFiles.includes(file.id);
          const isDownloading = downloadingFiles.includes(file.id);

          return (
            <div
              key={file.id}
              className={`border rounded-lg p-4 transition-all ${
                isSelected
                  ? "border-red-200 bg-red-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleFileSelection(file.id)}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                  />

                  <div
                    className={`p-2 rounded-lg border ${getCategoryColor(
                      file.category
                    )}`}
                  >
                    {getFileIcon(file.category)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 truncate">
                        {file.name}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                          file.category
                        )}`}
                      >
                        {getCategoryLabel(file.category)}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{formatFileSize(file.size)}</span>
                      <span>
                        {new Date(file.uploadDate).toLocaleDateString()}
                      </span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {file.type}
                      </span>
                    </div>

                    {file.description && (
                      <div className="mt-2 flex items-start gap-2">
                        <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-600">
                          {file.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* 미리보기 버튼 (이미지, 문서 등에만) */}
                  {file.category === "image" || file.category === "document"}

                  {/* 다운로드 버튼 */}
                  <button
                    onClick={() => downloadFile(file)}
                    disabled={isDownloading}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    {isDownloading ? (
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-red-600 rounded-full animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">
                      {isDownloading ? "다운로드 중..." : "다운로드"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {files.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Folder className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>첨부파일이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
