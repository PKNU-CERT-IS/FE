"use client";

import {
  MAIN_TABS,
  MainTab,
  SUB_TABS,
  SubTab,
  SUBTAB_CONFIG,
  TAB_CONFIG,
} from "@/types/admin/adminStudyTab";
import { useRouter } from "next/navigation";

interface CCStudyTabBarProps {
  currentTab: MainTab;
  currentView: SubTab;
}
export default function CCStudyTabBar({
  currentTab,
  currentView,
}: CCStudyTabBarProps) {
  const router = useRouter();

  const handleMainTabClick = (tab: MainTab) => {
    const params = new URLSearchParams();
    params.set("tab", tab);
    params.set("view", "list");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleSubTabClick = (view: SubTab) => {
    const params = new URLSearchParams();
    params.set("tab", currentTab);
    params.set("view", view);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="grid grid-cols-2 gap-10">
      <div className="mt-5 grid grid-cols-2 w-full h-10 rounded-md p-1 bg-gray-100 text-muted-foreground">
        {MAIN_TABS.map((tab) => {
          const isActive = currentTab === tab;
          return (
            <button
              key={tab}
              onClick={() => handleMainTabClick(tab)}
              className={`inline-flex items-center justify-center gap-2 rounded-sm px-3 py-1.5 text-sm font-medium transition-all cursor-pointer
                ${
                  isActive
                    ? "bg-cert-red text-white shadow-sm"
                    : "text-gray-500"
                }`}
            >
              {TAB_CONFIG[tab].label}
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-3 w-full h-10 rounded-md p-1 bg-gray-100">
        {SUB_TABS.map((view) => {
          const isActive = currentView === view;
          return (
            <button
              key={view}
              onClick={() => handleSubTabClick(view)}
              className={`inline-flex items-center justify-center gap-2 rounded-sm px-3 py-1.5 text-sm font-medium transition-all cursor-pointer
                ${
                  isActive
                    ? "bg-cert-red text-white shadow-sm"
                    : "text-gray-500"
                }`}
            >
              {SUBTAB_CONFIG[view].label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
