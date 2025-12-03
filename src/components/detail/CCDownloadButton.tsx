"use client";

import { memo } from "react";
import { usePathname } from "next/navigation";
import { AttachedFile } from "@/types/attachedFile";
import DefaultButton from "@/components/ui/defaultButton";
import { Download } from "lucide-react";

export interface EndAttchedFile {
  id: number;
  name: string;
  type: string;
  size: string;
  attachedUrl: string;
}

function DownloadButton({ file }: { file: AttachedFile | EndAttchedFile }) {
  const pathname = usePathname();

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!file) return;

    const link = document.createElement("a");
    link.href = file.attachedUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isDetailPageDownload = (() => {
    const parts = pathname.split("/").filter(Boolean);
    return (parts[0] === "study" || parts[0] === "board") && parts.length === 2;
  })();

  if (isDetailPageDownload) {
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

  return (
    <button type="button" onClick={handleDownload} className="cursor-pointer">
      <Download className="w-5 h-5 mr-2 text-gray-400 hover:text-gray-600 dark:text-gray-400" />
    </button>
  );
}
export default memo(DownloadButton);
