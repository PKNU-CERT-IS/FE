"use client";
import MarkdownRenderer from "@/components/ui/defaultMarkdownRenderer";
import "highlight.js/styles/github.css";
import { Edit, Eye } from "lucide-react";

interface MarkdownEditorProps {
  content: string;
  setContent: (content: string) => void;
}

export default function MarkdownEditor({
  content,
  setContent,
}: MarkdownEditorProps) {
  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <div className="bg-gray-50 px-3 py-2 border-b border-gray-300">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Edit className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              마크다운 편집
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              실시간 미리보기
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 min-h-[500px]">
        <div className="border-r border-gray-300">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[500px] p-4 border-none outline-none resize-none font-mono text-sm"
            placeholder="내용을 입력하세요... (Markdown 지원)"
            required
          />
        </div>

        <div className="bg-gray-50">
          <div className="h-[500px] p-4 overflow-y-auto">
            {content ? (
              <MarkdownRenderer content={content} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 italic">
                  왼쪽에서 내용을 입력하면 실시간으로 미리보기가 표시됩니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
