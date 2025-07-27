"use client";

import { useRouter, useSearchParams } from "next/navigation";
import DefaultButton from "@/components/ui/defaultButton";
import { boardCategories, BoardCategoryType } from "@/types/board";

interface BoardCategoryProps {
  selectedCategory: BoardCategoryType;
}

export default function BoardCategory({
  selectedCategory,
}: BoardCategoryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (category: BoardCategoryType) => {
    const params = new URLSearchParams(searchParams);

    if (category === "전체") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    params.delete("page"); // 카테고리 변경 시 첫 페이지로

    const queryString = params.toString();
    const newUrl = queryString ? `/board?${queryString}` : "/board";
    router.push(newUrl);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {boardCategories.map((category) => (
        <DefaultButton
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategoryChange(category)}
          className={
            selectedCategory === category
              ? "category-filter-active"
              : "category-filter"
          }
        >
          {category}
        </DefaultButton>
      ))}
    </div>
  );
}
