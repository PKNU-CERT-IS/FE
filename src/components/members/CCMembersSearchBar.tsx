"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DefaultSearchBar from "@/components/ui/defaultSearchBar";
import SearchSVG from "/public/icons/search.svg";

const DEBOUNCE_DELAY = 200;

interface MembersSearchBarProps {
  currentKeyword: string;
}

export default function MembersSearchBar({
  currentKeyword,
}: MembersSearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchInput, setSearchInput] = useState<string>(currentKeyword);
  const prevSearchInput = useRef<string>(searchInput);

  const isAdmin = pathname.startsWith("/admin");
  const placeholder = isAdmin
    ? "이름, 전공, 학번으로 검색하세요..."
    : "이름, 전공, 기술 스택으로 검색하세요...";

  useEffect(() => {
    setSearchInput(currentKeyword);
  }, [currentKeyword]);

  useEffect(() => {
    if (prevSearchInput.current === searchInput) return;
    prevSearchInput.current = searchInput;

    const debounceTimer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (searchInput) {
        params.set("keyword", searchInput);
      } else {
        params.delete("keyword");
      }

      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

      router.push(newUrl);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(debounceTimer);
  }, [searchInput, router, searchParams]);

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
