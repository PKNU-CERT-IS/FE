import { BLOG_CATEGORIES, BlogCategory } from "@/types/blog";

// 카테고리 확인
export const isValidCategory = (category: string): category is BlogCategory => {
  return BLOG_CATEGORIES.includes(category as BlogCategory);
};
