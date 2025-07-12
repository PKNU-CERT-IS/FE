"use client";

import { useRouter } from "next/navigation";
import {
  profileTabCategory,
  ProfileTabCategoryType,
  TAB_CONFIG,
} from "@/types/profile";

interface CCTabBarProps {
  currentTab: string;
}

export default function CCTabBar({ currentTab }: CCTabBarProps) {
  const router = useRouter();

  const handleTabClick = (tab: ProfileTabCategoryType) => {
    const params = new URLSearchParams();
    params.set("tab", tab);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="h-10 items-center justify-center rounded-md p-1 text-muted-foreground grid w-full grid-cols-2 bg-gray-100 ">
      {profileTabCategory.map((tab) => {
        const { label, Icon } = TAB_CONFIG[tab];
        const isActive = currentTab === tab;

        return (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all duration-300
              ${
                isActive ? "bg-red-600 text-white shadow-sm" : "text-gray-500"
              }`}
          >
            <Icon
              className={`w-4 h-4 ${
                isActive ? "stroke-white" : "stroke-gray-500"
              }`}
            />
            {label}
          </button>
        );
      })}
    </div>
  );
}
