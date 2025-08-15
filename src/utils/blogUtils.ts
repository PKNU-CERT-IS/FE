import {
  BlogPost,
  BlogCategory,
  BlogCategory as BlogCategoryType,
  BLOG_CATEGORIES,
} from "@/types/blog";
import { formatDate } from "@/utils/formatDateUtil";

const filterByBlogSearch = (post: BlogPost, search: string) => {
  if (search === "") return true;

  const searchLower = search.toLowerCase();
  return (
    post.title.toLowerCase().includes(searchLower) ||
    (post.author ?? "").toLowerCase().includes(searchLower) ||
    (post.content ?? "").toLowerCase().includes(searchLower) ||
    (post.excerpt ?? "").toLowerCase().includes(searchLower) ||
    (post.tags ?? []).some((tag) => tag.toLowerCase().includes(searchLower))
  );
};

/**
 * 카테고리 필터
 */
const filterByBlogCategory = (post: BlogPost, category: BlogCategory) => {
  return category === "전체" || post.category === category;
};

/**
 * 블로그 포스트를 검색어와 카테고리로 필터링하는 함수
 */
export const filterBlogPosts = (
  posts: BlogPost[],
  search: string,
  category: BlogCategory
): BlogPost[] => {
  return posts
    .filter(
      (post) =>
        post.published !== false &&
        filterByBlogSearch(post, search) &&
        filterByBlogCategory(post, category)
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
};

/**
 * 상대적인 시간을 반환하는 함수 (예: "3일 전", "1주 전")
 */
export const getRelativeTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
        return diffInMinutes <= 1 ? "방금 전" : `${diffInMinutes}분 전`;
      }
      return `${diffInHours}시간 전`;
    } else if (diffInDays === 1) {
      return "어제";
    } else if (diffInDays < 7) {
      return `${diffInDays}일 전`;
    } else if (diffInDays < 30) {
      const diffInWeeks = Math.floor(diffInDays / 7);
      return `${diffInWeeks}주 전`;
    } else if (diffInDays < 365) {
      const diffInMonths = Math.floor(diffInDays / 30);
      return `${diffInMonths}개월 전`;
    } else {
      const diffInYears = Math.floor(diffInDays / 365);
      return `${diffInYears}년 전`;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return formatDate(dateString);
  }
};

/**
 * 블로그 포스트의 읽기 시간을 계산하는 함수
 */
export const calculateReadingTime = (content: string): number => {
  // 평균 읽기 속도: 분당 200단어 (한국어 기준)
  const wordsPerMinute = 200;

  // HTML 태그 제거 및 단어 수 계산
  const plainText = content.replace(/<[^>]*>/g, "");
  const wordCount = plainText.split(/\s+/).length;

  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return Math.max(1, readingTime); // 최소 1분
};

/**
 * 태그 배열을 문자열로 변환하는 함수
 */
export const formatTags = (tags: string[]): string => {
  return tags.map((tag) => `#${tag}`).join(" ");
};

/**
 * 블로그 포스트 URL 생성 함수
 */
export const generateBlogPostUrl = (post: BlogPost): string => {
  return `/blog/${post.slug || post.id}`;
};

/**
 * 카테고리별 색상 클래스를 반환하는 함수
 */
export const getCategoryColor = (category: BlogCategoryType) => {
  switch (category) {
    case "CTF":
      return "bg-purple-50 text-purple-600 border-purple-200";
    case "RED":
      return "bg-red-50 text-red-600 border-red-200";
    case "CS":
      return "bg-orange-50 text-orange-600 border-orange-200";
    case "BLUE":
      return "bg-blue-50 text-blue-600 border-blue-200";
    case "GRC":
      return "bg-green-50 text-green-600 border-green-200";
    case "MISC":
      return "bg-sky-50 text-sky-600 border-sky-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

/**
 * 검색 쿼리 하이라이트 함수
 */
export const highlightSearchTerm = (
  text: string,
  searchTerm: string
): string => {
  if (!searchTerm.trim()) return text;

  const regex = new RegExp(`(${searchTerm})`, "gi");
  return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
};

/**
 * 블로그 포스트 요약 생성 함수
 */
export const generateExcerpt = (
  content: string,
  maxLength: number = 150
): string => {
  // HTML 태그 제거
  const plainText = content.replace(/<[^>]*>/g, "");

  if (plainText.length <= maxLength) {
    return plainText;
  }

  // 문장 단위로 자르기
  const sentences = plainText.split(/[.!?]\s+/);
  let excerpt = "";

  for (const sentence of sentences) {
    if ((excerpt + sentence).length > maxLength) {
      break;
    }
    excerpt += sentence + ". ";
  }

  return excerpt.trim() + (excerpt.length < plainText.length ? "..." : "");
};

export const isValidCategory = (category: string): category is BlogCategory => {
  return BLOG_CATEGORIES.includes(category as BlogCategory);
};
