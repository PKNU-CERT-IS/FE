"use client";

import DefaultButton from "@/components/ui/defaultButton";
import { AttachedFile } from "@/types/attachedFile";
import { Download } from "lucide-react";

export default function DownloadButton({ file }: { file: AttachedFile }) {
  const handleDownload = () => {
    if (!file) return;

    const link = document.createElement("a");
    link.href = file.attachedUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DefaultButton
      variant="outline"
      size="sm"
      className="dark:bg-gray-800 dark:border-gray-600"
      onClick={handleDownload}
    >
      <Download className="w-4 h-4 mr-2" />
      다운로드
    </DefaultButton>
  );
}
