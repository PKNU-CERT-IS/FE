"use client";

import { useState } from "react";

interface CCPublishedCheckboxProps {
  postId: number;
  published: boolean;
}

export default function CCPublishedCheckbox({
  postId,
  published,
}: CCPublishedCheckboxProps) {
  const [isPublished, setIsPublished] = useState(published);

  const handleTogglePublic = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.checked;
    setIsPublished(nextValue);

    try {
      console.log("API 요청 보내기:", postId, nextValue);
    } catch (err) {
      console.error("업데이트 실패:", err);
      setIsPublished(!nextValue);
    }
  };

  return (
    <label
      className="flex items-center gap-2 cursor-pointer"
      onClick={(e) => e.stopPropagation()}
    >
      <input
        type="checkbox"
        checked={isPublished}
        onChange={handleTogglePublic}
        className="rounded z-10"
      />
      <span className="text-sm">외부 공개</span>
    </label>
  );
}
