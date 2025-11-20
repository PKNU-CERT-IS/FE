"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BoardCategoryType,
  boardCategories,
  toEnglishCategory,
} from "@/types/board";
import { cn } from "@/lib/utils";
import DefaultButton from "@/components/ui/defaultButton";

interface BoardCategoryProps {
  selectedCategory: BoardCategoryType;
}

export default function BoardCategory({
  selectedCategory,
}: BoardCategoryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleCategoryChange = (category: BoardCategoryType) => {
    if (isPending) return;
    const params = new URLSearchParams(searchParams);

    if (category === "전체") {
      params.delete("category");
    } else {
      params.set("category", toEnglishCategory(category));
    }
    params.delete("page");

    const queryString = params.toString();
    const newUrl = queryString ? `/board?${queryString}` : "/board";

    startTransition(() => {
      router.push(newUrl);
    });
  };

  return (
    <div className="sm:w-auto w-full overflow-x-auto scrollbar-hide">
      <div className="inline-flex gap-2 sm:flex-wrap">
        {boardCategories.map((category) => {
          const isActive = selectedCategory === category;

          return (
            <DefaultButton
              key={category}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => {
                if (!isPending) handleCategoryChange(category);
              }}
              className={cn(
                "whitespace-nowrap flex-shrink-0",
                isActive
                  ? "category-filter-active"
                  : "category-filte dark:text-gray-200",
                isPending
                  ? "cursor-wait pointer-events-none"
                  : "cursor-pointer",
              )}
            >
              {category}
            </DefaultButton>
          );
        })}
      </div>
    </div>
  );
}
