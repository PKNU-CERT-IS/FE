import { BlogPost, BlogCategory } from "@/types/blog";

/**
 * 블로그 포스트를 검색어와 카테고리로 필터링하는 함수
 */
export const filterBlogPosts = (
  posts: BlogPost[],
  category: BlogCategory = "전체"
): BlogPost[] => {
  let filteredPosts = [...posts];

  // 카테고리 필터링
  if (category !== "전체") {
    filteredPosts = filteredPosts.filter((post) => post.category === category);
  }

  // 최신순으로 정렬 (게시된 포스트만)
  return filteredPosts
    .filter((post) => post.published !== false)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
};

/**
 * 날짜 문자열을 안전하게 포맷팅하는 함수
 */
export const formatDate = (
  dateString: string,
  format: "short" | "long" = "short"
): string => {
  try {
    const date = new Date(dateString);

    // Invalid Date 체크
    if (isNaN(date.getTime())) {
      return dateString; // 원본 문자열 반환
    }

    if (format === "long") {
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      });
    }

    return date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\./g, "-")
      .replace(/-$/, "");
  } catch (error) {
    console.warn("Date formatting error:", error);
    return dateString;
  }
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
export const getCategoryColor = (category: BlogCategory): string => {
  const colorMap: Record<BlogCategory, string> = {
    전체: "bg-gray-50 text-gray-600 border border-gray-200",
    개발: "bg-blue-50 text-blue-600 border border-blue-200",
    학습: "bg-green-50 text-green-600 border border-green-200",
    활동: "bg-purple-50 text-purple-600 border border-purple-200",
  };

  return colorMap[category] || colorMap["전체"];
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
