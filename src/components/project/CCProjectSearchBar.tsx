"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DefaultSearchBar from "@/components/ui/defaultSearchBar";
import SearchSVG from "/public/icons/search.svg";

const DEBOUNCE_DELAY = 200;

interface ProjectSearchBarProps {
  currentSearch: string;
}

export default function ProjectSearchBar({
  currentSearch,
}: ProjectSearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchInput, setSearchInput] = useState<string>(currentSearch);
  const prevSearchInput = useRef<string>(searchInput);

  const isAdmin = pathname.startsWith("/admin");
  const placeholder = isAdmin
    ? "스터디/프로젝트 제목, 설명, 작성자로 검색하세요..."
    : "프로젝트 제목, 설명, 작성자로 검색하세요...";

  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  // 디바운싱 처리
  useEffect(() => {
    if (prevSearchInput.current === searchInput) return;
    prevSearchInput.current = searchInput;

    const debounceTimer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (searchInput) {
        params.set("search", searchInput);
      } else {
        params.delete("search");
      }
      params.delete("page"); // 검색 시 첫 페이지로

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.push(newUrl, { scroll: false });
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(debounceTimer);
  }, [searchInput, router, pathname, searchParams]);

  return (
    <div className="relative flex-1">
      <SearchSVG className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <DefaultSearchBar
        placeholder={`${placeholder}`}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
