import { Metadata } from "next";
import BoardSearchBar from "@/components/board/CCBoardSearchBar";
import BoardCategory from "@/components/board/CCBoardCategory";
import BoardContents from "@/components/board/SCBoardContents";
import PlusSVG from "/public/icons/plus.svg";
import {
  boardCategoriesEN,
  BoardCategoryType,
  BoardCategoryTypeEN,
  toKoreanCategory,
} from "@/types/board";
import Link from "next/link";
import { Suspense } from "react";
import SCBoardSkeleton from "@/components/board/ScBoardSkeleton";

const ITEMS_PER_PAGE = 5;

interface BoardPageProps {
  searchParams: Promise<{
    page?: string;
    keyword?: string;
    category?: string;
  }>;
}

const isValidCategory = (category: string): category is BoardCategoryTypeEN => {
  return (boardCategoriesEN as readonly string[]).includes(category);
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ keyword?: string; category?: string }>;
}): Promise<Metadata> {
  const { keyword, category } = await searchParams;

  const validCategory =
    category && isValidCategory(category) ? category : "전체";

  return {
    title: `CERT-IS Board${
      validCategory !== "전체" ? ` - ${validCategory}` : ""
    }${keyword ? ` | ${keyword}` : ""}`,
    description:
      keyword && validCategory !== "전체"
        ? `'${keyword}', '${validCategory}' 관련 보안 게시판 글 목록입니다.`
        : keyword
        ? `'${keyword}' 관련 보안 게시판 글 목록입니다.`
        : validCategory !== "전체"
        ? `'${validCategory}' 관련 보안 게시판 글 목록입니다.`
        : "CERT-IS 동아리 보안 게시판 글 목록입니다.",
    openGraph: {
      title: "CERT-IS Board",
      description: "보안 정보와 기술 자료를 공유하는 전문 게시판입니다.",
      images: ["/logo.svg"],
    },
  };
}

// --- Page Component ---
export default async function BoardPage({ searchParams }: BoardPageProps) {
  const { page, keyword, category } = await searchParams;

  const currentPage = parseInt(page || "1", 10);
  const currentSearch = keyword || "";

  const currentCategory: BoardCategoryType =
    category && isValidCategory(category)
      ? toKoreanCategory(category as BoardCategoryTypeEN)
      : "전체";

  return (
    <div className="space-y-6">
      {/* 검색/카테고리 영역 */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
        <div className="flex-1 w-full">
          <BoardSearchBar currentSearch={currentSearch} />
        </div>

        <BoardCategory selectedCategory={currentCategory} />

        <Link
          scroll={false}
          href="/board/write"
          className="inline-flex gap-2 px-4 py-2 action-button whitespace-nowrap sm:w-auto w-full justify-center"
        >
          <PlusSVG className="w-4 h-4" />새 글 작성
        </Link>
      </div>

      <Suspense fallback={<SCBoardSkeleton />}>
        <BoardContents
          keyword={currentSearch}
          category={currentCategory} // 한글 카테고리 그대로 전달
          page={currentPage}
          size={ITEMS_PER_PAGE}
        />
      </Suspense>
    </div>
  );
}
