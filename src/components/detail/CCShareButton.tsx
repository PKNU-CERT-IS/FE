"use client";
import { memo } from "react";
import DefaultButton from "@/components/ui/defaultButton";
import { Share2 } from "lucide-react";

// 공유 버튼
function ShareButton() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title, // 타이틀
          url: window.location.href, // url
        });
      } catch (error) {
        console.log("공유 취소됨", error);
      }
    } else {
      // Web Share Api를 지원하지 않는 브라우저
      await navigator.clipboard.writeText(window.location.href);
      alert("링크가 클립보드에 복사되었습니다!");
    }
  };

  return (
    <DefaultButton
      variant="outline"
      size="sm"
      onClick={handleShare}
      className="dark:bg-gray-800 dark:border-gray-700"
    >
      <Share2 className="w-4 h-4 mr-2" />
      공유하기
    </DefaultButton>
  );
}
export default memo(ShareButton);
