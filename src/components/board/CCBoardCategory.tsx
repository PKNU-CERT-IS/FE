"use client";

import { useRouter, useSearchParams } from "next/navigation";
import DefaultButton from "@/components/ui/defaultButton";
import {
  boardCategories,
  BoardCategoryType,
  toEnglishCategory,
} from "@/types/board";

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
      params.set("category", toEnglishCategory(category));
    }
    params.delete("page");

    const queryString = params.toString();
    const newUrl = queryString ? `/board?${queryString}` : "/board";
    router.push(newUrl);
  };
  return (
    <div className="sm:w-auto w-full overflow-x-auto scrollbar-hide">
      <div className="inline-flex gap-2 sm:flex-wrap">
        {boardCategories.map((category) => (
          <DefaultButton
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryChange(category)}
            className={`cursor-pointer whitespace-nowrap flex-shrink-0 ${
              selectedCategory === category
                ? "category-filter-active"
                : "category-filte dark:text-gray-200"
            }`}
          >
            {category}
          </DefaultButton>
        ))}
      </div>
    </div>
  );
}
