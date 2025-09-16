import { Metadata } from "next";
import BoardSearchBar from "@/components/board/CCBoardSearchBar";
import BoardCategory from "@/components/board/CCBoardCategory";
import BoardCardList from "@/components/board/SCBoardCardList";
import BoardPagination from "@/components/board/SCBoardPagination";
import PlusSVG from "/public/icons/plus.svg";
import {
  boardCategoriesEN,
  BoardCategoryType,
  BoardCategoryTypeEN,
  toKoreanCategory,
} from "@/types/board";
import Link from "next/link";
import { getBoards } from "@/api/board/SCBoard";

const ITEMS_PER_PAGE = 5;

interface BoardPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string;
  }>;
}

const isValidCategory = (category: string): category is BoardCategoryTypeEN => {
  return (boardCategoriesEN as readonly string[]).includes(category);
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
    category && isValidCategory(category)
      ? toKoreanCategory(category as BoardCategoryTypeEN)
      : "전체";

  const getBoardList = async (
    search = "",
    category = "",
    page = 0,
    size = 10
  ) => {
    const data = await getBoards(search, category, page, size);
    return {
      contents: data.content ?? [],
      totalItems: data.totalElements ?? data.totalCount ?? 0,
    };
  };

  const { contents, totalItems } = await getBoardList(
    currentSearch,
    currentCategory !== "전체" ? category! : "",
    currentPage - 1,
    ITEMS_PER_PAGE
  );

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

      <BoardCardList contents={contents} />

      <BoardPagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentSearch={currentSearch}
        currentCategory={currentCategory}
      />
    </div>
  );
}
