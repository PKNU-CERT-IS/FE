"use client";

import { AttachedFile, getFileKey } from "@/types/attachedFile";
import DefaultButton from "@/components/ui/defaultButton";
import { Upload, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  convertFileToAttachedFile,
  formatFileSize,
  getFileIcon,
} from "@/utils/attachedFileUtils";

interface FileUploadProps {
  attachments: AttachedFile[];
  onAttachmentsChange: (files: AttachedFile[]) => void;

  className?: string;
}
export default function FileUpload({
  attachments,
  onAttachmentsChange,
  className,
}: FileUploadProps) {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachedFiles = await Promise.all(
      Array.from(files).map((file) => convertFileToAttachedFile(file))
    );
    onAttachmentsChange([...attachments, ...newAttachedFiles]);
    e.target.value = "";
  };

  const handleRemoveFile = (name: string) => {
    const updatedAttachments = attachments.filter((file) => file.name !== name);
    onAttachmentsChange(updatedAttachments);
  };
  return (
    <div className="space-y-4">
      <div
        className={cn(
          "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-cert-red transition-colors",
          "dark:border-gray-600 dark:hover:border-cert-red dark:bg-gray-800/40",
          className
        )}
      >
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif,.hwp,.hwpx,.csv"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center gap-2"
        >
          <Upload className="w-8 h-8 text-gray-400 dark:text-gray-300" />
          <span className="text-sm text-gray-600 dark:text-gray-200">
            파일을 드래그하거나 클릭하여 업로드
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            최대 10MB, HWP, PDF, DOC, XLS, PPT, 이미지 파일
          </span>
        </label>
      </div>

      {attachments.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200">
            첨부파일 ({attachments.length})
          </h4>
          {attachments.map((file) => (
            <div
              key={getFileKey(file)}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg 
                   dark:bg-gray-700 dark:border dark:border-gray-700"
            >
              <span className="text-lg">{getFileIcon(file.type)}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <DefaultButton
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleRemoveFile(file.name)}
                className="text-cert-red hover:bg-red-50 hover:text-cert-red 
                     dark:hover:bg-red-900/30 dark:bg-gray-600"
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
