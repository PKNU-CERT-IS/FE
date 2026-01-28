"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor as ToastEditorType } from "@toast-ui/react-editor";
import "prismjs/themes/prism.css";
import "tui-color-picker/dist/tui-color-picker.css";
import { NewPageCategoryType } from "@/types/newPageForm";
import { imageUploadApi } from "@/app/api/CCImageUploadApi";
import AlertModal from "@/components/ui/defaultAlertModal";

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

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface MarkdownEditorProps {
  content: string;
  setContent: (content: string) => void;
  type: NewPageCategoryType;
}

export default function MarkdownEditor({
  content,
  setContent,
  type,
}: MarkdownEditorProps) {
  const editorRef = useRef<ToastEditorType>(null);

  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");

  // 에디터 내용 변경 핸들러
  const handleChange = () => {
    if (!editorRef.current) return;
    const instance = editorRef.current.getInstance();
    setContent(instance.getMarkdown());
  };

  const handleImageUpload = async (
    blob: Blob,
    callback: (url: string, altText: string) => void,
  ) => {
    if (blob.size > MAX_FILE_SIZE) {
      setAlertMessage("이미지 파일 크기는 최대 10MB까지 허용됩니다.");
      setAlertOpen(true);
      return false;
    }

    const formData = new FormData();
    formData.append("file", blob);
    formData.append("type", type);

    // 이미지 업로드 API 호출
    // 해당 컴포넌트에서만 사용하고 있어 별도의 util 함수로 분리하지 않음
    try {
      const result = await imageUploadApi.uploadImage(blob, type);

      if (result.data && result.data.imageUrl) {
        // 성공 시 에디터에 이미지 삽입
        const altText = (blob as File).name || "image";
        callback(result.data.imageUrl, altText);
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      console.error(error);
      setAlertMessage(
        error.response?.data?.message ||
          "이미지 업로드에 실패했습니다. 다시 시도해주세요.",
      );
      setAlertOpen(true);
    }

    return false; // 기본 Base64 변환 방지
  };

  return (
    // 다크모드/라이트모드에 따라 테두리 색상 자동 적용 (Tailwind 클래스 활용)
    <div className="toast-ui-editor-container border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
      <Editor
        ref={editorRef}
        initialValue={content || " "}
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
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

      <AlertModal
        key={alertMessage}
        isOpen={alertOpen}
        message={alertMessage}
        type="error"
        duration={6000}
        onClose={() => setAlertOpen(false)}
      />
    </div>
  );
}
