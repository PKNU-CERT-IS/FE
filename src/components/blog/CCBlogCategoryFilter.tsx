"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BLOG_CATEGORIES, BlogCategory } from "@/types/blog";
import DefaultButton from "@/components/ui/defaultButton";

interface CCBlogCategoryFilterProps {
  currentCategory: BlogCategory;
  currentSearch: string;
}

export default function CCBlogCategoryFilter({
  currentCategory,
  currentSearch,
}: CCBlogCategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleCategoryChange = (newCategory: BlogCategory) => {
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
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.push(newUrl);
  };

  return (
    <div className="sm:w-auto w-full overflow-x-auto scrollbar-hide">
      <div className="inline-flex gap-2 sm:flex-wrap">
        {BLOG_CATEGORIES.map((category) => (
          <DefaultButton
            key={category}
            variant={currentCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryChange(category)}
            className={`
            whitespace-nowrap flex-shrink-0
            ${
              currentCategory === category
                ? "category-filter-active"
                : "category-filter"
            }
          `}
          >
            {category}
          </DefaultButton>
        ))}
      </div>
    </div>
  );
}
