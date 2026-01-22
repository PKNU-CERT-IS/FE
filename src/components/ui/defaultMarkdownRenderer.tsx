"use client";

import dynamic from "next/dynamic";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "prismjs/themes/prism-tomorrow.css";

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
