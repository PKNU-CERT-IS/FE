"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DefaultSearchBar from "@/components/ui/defaultSearchBar";
import SearchSVG from "/public/icons/search.svg";

const DEBOUNCE_DELAY = 200;
interface BoardSearchBarProps {
  currentSearch: string;
}

export default function BoardSearchBar({ currentSearch }: BoardSearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState<string>(currentSearch);
  const prevSearchInput = useRef<string>(searchInput);

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
      const newUrl = queryString ? `/board?${queryString}` : "/board";
      router.push(newUrl);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(debounceTimer);
  }, [searchInput, router, searchParams]);

  return (
    <div className="relative flex-1">
      <SearchSVG className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <DefaultSearchBar
        placeholder="제목, 내용, 작성자로 검색하세요..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
