"use client";
import { useState } from "react";
import DefaultButton from "@/components/ui/defaultButton";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  currentLikes: number;
}

export default function LikeButton({ currentLikes }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(currentLikes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    // API 호출: await fetch(`/api/posts/${postId}/like`...
  };

  return (
    <DefaultButton
      variant="outline"
      size="sm"
      onClick={handleLike}
      className={`dark:bg-gray-800 ${
        isLiked ? "text-cert-red " : ""
      } border-0 hover:bg-white hover:text-cert-red dark:hover:bg-gray-800`}
    >
      <Heart
        className={`w-4 h-4  ${isLiked ? "fill-cert-red text-cert-red" : ""} `}
      />
      좋아요 {likes}
    </DefaultButton>
  );
}
