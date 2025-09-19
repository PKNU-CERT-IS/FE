"use client";
import { useState } from "react";
import DefaultButton from "@/components/ui/defaultButton";
import { Heart } from "lucide-react";
import { postLike } from "@/api/board/CCboard";
import { useRouter } from "next/navigation";
import AlertModal from "@/components/ui/defaultAlertModal";
import { AxiosError } from "axios";

interface LikeButtonProps {
  currentLikes: number;
  boardId: number;
  liked: boolean;
}

export default function LikeButton({
  currentLikes,
  boardId,
  liked,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [likes, setLikes] = useState<number>(currentLikes);
  const [loading, setLoading] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const router = useRouter();

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);

    try {
      setIsLiked(!isLiked);
      setLikes(isLiked ? likes - 1 : likes + 1);
      await postLike(boardId);
      router.refresh();
    } catch (error) {
      setIsLiked(isLiked);
      setLikes(likes);
      const err = error as AxiosError; // 타입 가드
      if (err.response?.status === 400) {
        setAlertOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <DefaultButton
        variant="outline"
        size="sm"
        onClick={handleLike}
        className={`dark:bg-gray-800 ${
          isLiked ? "text-cert-red " : ""
        } border-0 hover:bg-white hover:text-cert-red dark:hover:bg-gray-800`}
      >
        <Heart
          className={`w-4 h-4  ${
            isLiked ? "fill-cert-red text-cert-red" : ""
          } `}
        />
        좋아요 {likes}
      </DefaultButton>
      <AlertModal
        isOpen={alertOpen}
        message="자기 자신에게는 좋아요를 누를 수 없습니다."
        type="warning"
        duration={2500}
        onClose={() => setAlertOpen(false)}
      />
    </>
  );
}
