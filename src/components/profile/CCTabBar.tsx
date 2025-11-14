"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
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
  const searchParams = useSearchParams();

  const [localTab, setLocalTab] = useState(currentTab);

  // 서버에서 새로운 탭이 오면 동기화
  useEffect(() => {
    setLocalTab(currentTab);
  }, [currentTab]);

  const handleTabClick = (tab: ProfileTabCategoryType) => {
    // 1) 클릭 즉시 UI 변경
    setLocalTab(tab);

    // 2) URL만 변경 → 서버 fetch는 뒤에서 진행됨
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="h-10 items-center justify-center rounded-md p-1 grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800">
      {profileTabCategory.map((tab) => {
        const { label, Icon } = TAB_CONFIG[tab];
        const isActive = localTab === tab;

        return (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all duration-150
              ${
                isActive
                  ? "bg-cert-red text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400"
              }
            `}
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
