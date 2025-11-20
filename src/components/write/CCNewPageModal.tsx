"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export default function NewPageModal({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 컴포넌트 마운트 시 애니메이션 시작
    setTimeout(() => {
      setIsVisible(true);
    }, 100); // 애니메이션 딜레이 (painting issue 방지)

    // ESC 키 처리
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden"; // 배경 스크롤 방지

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [router]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className={`
    fixed inset-0 z-50 flex items-center justify-center p-4
    bg-cert-black/50 
  `}
      onClick={() => router.back()}
    >
      <div
        className={`
    bg-white rounded-lg shadow-xl w-full max-w-5xl 
    transform transition-all duration-300 ease-out
    ${isVisible ? "opacity-100 scale-100 " : "opacity-0 scale-75 "}
  `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content-wrapper max-h-[90vh] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement,
  );
}
