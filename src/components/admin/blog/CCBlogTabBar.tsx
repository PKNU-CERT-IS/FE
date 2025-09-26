"use client";

import {
  blogTabCategory,
  blogTabCategoryType,
  TAB_CONFIG,
} from "@/types/admin/adminBlog";
import { isValidTab } from "@/utils/adminBlogUtils";
import { useRouter, useSearchParams } from "next/navigation";

export default function CCBlogTabBar() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("isPublic");
  const currentTab: blogTabCategoryType = tab && isValidTab(tab) ? tab : "true";

  const router = useRouter();
  const handleTabClick = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("isPublic", tab);
    router.replace(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="h-10 items-center justify-center rounded-md p-1 text-muted-foreground grid w-full grid-cols-2 bg-gray-100 ">
      {blogTabCategory.map((tabKey) => {
        const { label } = TAB_CONFIG[tabKey];
        const isActive = currentTab === tabKey;
        return (
          <button
            key={tabKey}
            onClick={() => handleTabClick(tabKey)}
            className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all duration-300 cursor-pointer ${
              isActive ? "bg-cert-red text-white shadow-sm" : "text-gray-500"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
