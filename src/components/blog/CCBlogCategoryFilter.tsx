"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  BLOG_CATEGORIES,
  BlogCategory as BlogCategoryType,
} from "@/types/blog";
import DefaultButton from "@/components/ui/defaultButton";

interface CCBlogCategoryFilterProps {
  currentCategory: BlogCategoryType;
  currentSearch: string;
}

export default function CCBlogCategoryFilter({
  currentCategory,
  currentSearch,
}: CCBlogCategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (newCategory: BlogCategoryType) => {
    const params = new URLSearchParams(searchParams);

    if (newCategory !== "전체") {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }

    if (currentSearch) {
      params.set("search", currentSearch);
    }

    // 카테고리 변경 시 첫 페이지로 리셋
    params.delete("page");

    const queryString = params.toString();
    const newUrl = queryString ? `/blog?${queryString}` : "/blog";

    router.push(newUrl);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {BLOG_CATEGORIES.map((category) => (
        <DefaultButton
          key={category}
          variant={currentCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategoryChange(category)}
          className={
            currentCategory === category
              ? "bg-cert-red text-white hover:bg-cert-red/80"
              : "border-gray-300 text-gray-600 hover:border-cert-red"
          }
        >
          {category}
        </DefaultButton>
      ))}
    </div>
  );
}
