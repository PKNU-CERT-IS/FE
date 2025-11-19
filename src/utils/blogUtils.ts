import { BLOG_CATEGORIES, BlogCategory } from "@/types/blog";
import { formatDate } from "@/utils/formatDateUtil";

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
 * 검색 쿼리 하이라이트 함수
 */
export const highlightSearchTerm = (
  text: string,
  searchTerm: string,
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
  maxLength: number = 150,
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
