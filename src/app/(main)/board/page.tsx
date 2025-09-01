import { Metadata } from "next";
import { mockBoardData } from "@/mocks/mockBoardData";
import BoardSearchBar from "@/components/board/CCBoardSearchBar";
import BoardCategory from "@/components/board/CCBoardCategory";
import BoardCardList from "@/components/board/SCBoardCardList";
import BoardPagination from "@/components/board/SCBoardPagination";
import PlusSVG from "/public/icons/plus.svg";
import { boardCategories, BoardCategoryType } from "@/types/board";
import { filterBoardData } from "@/utils/boardUtils";
import Link from "next/link";

const ITEMS_PER_PAGE = 8;

interface BoardPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
  }>;
}
const isValidCategory = (category: string): category is BoardCategoryType => {
  return boardCategories.includes(category as BoardCategoryType);
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}): Promise<Metadata> {
  const { search, category } = await searchParams;

  const validCategory =
    category && isValidCategory(category) ? category : "전체";

  return {
    title: `CERT-IS Board${
      validCategory !== "전체" ? ` - ${validCategory}` : ""
    }${search ? ` | ${search}` : ""}`,
    description:
      search && validCategory !== "전체"
        ? `'${search}', '${validCategory}' 관련 보안 게시판 글 목록입니다.`
        : search
        ? `'${search}' 관련 보안 게시판 글 목록입니다.`
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
export default async function BoardPage({ searchParams }: BoardPageProps) {
  const { page, search, category } = await searchParams;

  const currentPage = parseInt(page || "1", 10);
  const currentSearch = search || "";
  const currentCategory: BoardCategoryType =
    category && isValidCategory(category) ? category : "전체";

  const filteredContents = filterBoardData(
    mockBoardData,
    currentSearch,
    currentCategory
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginatedContents = filteredContents.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
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

      <BoardCardList contents={paginatedContents} />

      <BoardPagination
        currentPage={currentPage}
        totalItems={filteredContents.length}
        itemsPerPage={ITEMS_PER_PAGE}
        currentSearch={currentSearch}
        currentCategory={currentCategory}
      />
    </div>
  );
}
