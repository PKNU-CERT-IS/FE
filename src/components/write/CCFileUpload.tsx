"use client";

import { AttachedFile } from "@/types/attachedFile";
import DefaultButton from "@/components/ui/defaultButton";
import { Upload, Trash2 } from "lucide-react";
import {
  convertFileToAttachedFile,
  formatFileSize,
  getFileIcon,
} from "@/utils/attachedFileUtils";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  attachedFiles: AttachedFile[];
  onAttachmentsChange: (files: AttachedFile[]) => void;
  className?: string;
}

export default function FileUpload({
  attachedFiles,
  onAttachmentsChange,
  className,
}: FileUploadProps) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachedFiles = Array.from(files).map(convertFileToAttachedFile);
    onAttachmentsChange([...attachedFiles, ...newAttachedFiles]);
    e.target.value = "";
  };

  const handleRemoveFile = (index: number) => {
    onAttachmentsChange(attachedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-cert-red transition-colors",
          className
        )}
      >
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center gap-2"
        >
          <Upload className="w-8 h-8 text-gray-400" />
          <span className="text-sm text-gray-600">
            파일을 드래그하거나 클릭하여 업로드
          </span>
          <span className="text-xs text-gray-500">
            최대 10MB, PDF, DOC, XLS, PPT, 이미지 파일
          </span>
        </label>
      </div>

      {attachedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">
            첨부파일 ({attachedFiles.length})
          </h4>
          {attachedFiles.map((file, index) => (
            <div
              key={file.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-lg">{getFileIcon(file.type)}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <DefaultButton
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleRemoveFile(index)}
                className="text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </DefaultButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
