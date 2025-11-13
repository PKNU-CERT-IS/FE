"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BLOG_CATEGORIES, BlogCategory } from "@/types/blog";
import DefaultButton from "@/components/ui/defaultButton";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

interface CCBlogCategoryFilterProps {
  currentCategory: BlogCategory;
  currentKeyword: string;
}

export default function CCBlogCategoryFilter({
  currentCategory,
  currentKeyword,
}: CCBlogCategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleCategoryChange = (newCategory: BlogCategory) => {
    if (isPending) return;

    const params = new URLSearchParams(searchParams);

    if (newCategory !== "전체") {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }

    if (currentKeyword) {
      params.set("search", currentKeyword);
    }

    params.delete("page");

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    startTransition(() => {
      router.push(newUrl);
    });
  };

  return (
    <div className="sm:w-auto w-full overflow-x-auto scrollbar-hide">
      <div className="inline-flex gap-2 sm:flex-wrap">
        {BLOG_CATEGORIES.map((category) => {
          const isActive = currentCategory === category;
          return (
            <DefaultButton
              key={category}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(category)}
              className={cn(
                "whitespace-nowrap flex-shrink-0",
                isActive ? "category-filter-active" : "category-filter",
                isPending && "pointer-events-none cursor-wait"
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
