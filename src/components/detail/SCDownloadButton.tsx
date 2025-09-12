import DefaultButton from "@/components/ui/defaultButton";
import { Download } from "lucide-react";
export default function DownloadButton({
  fileName,
  fileId,
}: {
  fileName: string;
  fileId?: string;
}) {
  return (
    <a href={`/api/download/${fileId || fileName}`} download>
      <DefaultButton
        variant="outline"
        size="sm"
        className="dark:bg-gray-800 dark:border-gray-600"
      >
        <Download className="w-4 h-4 mr-2" />
        다운로드
      </DefaultButton>
    </a>
  );
}
