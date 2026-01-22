"use client";

import dynamic from "next/dynamic";
// 기본 에디터 스타일
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/editor/dist/toastui-editor.css";
// 코드 하이라이팅 스타일
import "prismjs/themes/prism-tomorrow.css";

// 코드 블록 테마 (어두운 테마)

interface ViewerProps {
  content: string;
}

// SSR 방지를 위해 dynamic import 사용
const Viewer = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Viewer),
  { ssr: false },
);

export default function defaultMarkdownRenderer({ content }: ViewerProps) {
  return (
    <div className="toast-ui-viewer-container">
      <Viewer
        initialValue={content}
        theme={
          document.documentElement.classList.contains("dark") ? "dark" : "light"
        }
      />
    </div>
  );
}
