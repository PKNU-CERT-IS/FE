"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor as ToastEditorType } from "@toast-ui/react-editor";
import "prismjs/themes/prism.css";
import "tui-color-picker/dist/tui-color-picker.css";

// SSR 방지 Dynamic Import
const Editor = dynamic(
  () => import("@toast-ui/react-editor").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="h-[600px] w-full bg-gray-50 dark:bg-gray-800 animate-pulse rounded-md border border-gray-200 dark:border-gray-700" />
    ),
  },
);

interface MarkdownEditorProps {
  content: string;
  setContent: (content: string) => void;
}

export default function MarkdownEditor({
  content,
  setContent,
}: MarkdownEditorProps) {
  const editorRef = useRef<ToastEditorType>(null);

  // 에디터 내용 변경 핸들러
  const handleChange = () => {
    if (!editorRef.current) return;
    const instance = editorRef.current.getInstance();
    setContent(instance.getMarkdown());
  };

  /**
   * 이미지 업로드 훅 (addImageBlobHook)
   * - 기본 Base64 변환 동작을 가로챕니다.
   * - 현재는 경고창을 띄우고 동작을 막습니다.
   * - 추후 여기에 S3 업로드 API 통신 코드를 작성하면 됩니다.
   */
  const handleImageUpload = (
    blob: Blob,
    callback: (url: string, altText: string) => void,
  ) => {
    console.log("이미지 업로드 시도:", blob);

    // TODO: 여기에 S3 이미지 업로드 API 호출 로직 구현 필요
    alert(
      "현재 이미지 업로드는 준비 중입니다.\n(서버 부하 방지를 위해 Base64 변환이 차단되었습니다.)",
    );

    // callback(imageUrl, 'alt text'); // 성공 시 이 콜백을 호출해야 에디터에 삽입됨
    return false; // false를 반환하여 기본 동작(Base64 변환) 중단
  };

  return (
    // 다크모드/라이트모드에 따라 테두리 색상 자동 적용 (Tailwind 클래스 활용)
    <div className="toast-ui-editor-container border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
      <Editor
        ref={editorRef}
        initialValue={content || " "}
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        // HTML의 class="dark" 유무를 판단하여 테마 적용
        theme={
          typeof document !== "undefined" &&
          document.documentElement.classList.contains("dark")
            ? "dark"
            : "light"
        }
        onChange={handleChange}
        hooks={{
          addImageBlobHook: handleImageUpload,
        }}
        toolbarItems={[
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task", "indent", "outdent"],
          ["table", "image", "link"],
          ["code", "codeblock"],
          ["scrollSync"],
        ]}
      />
    </div>
  );
}
