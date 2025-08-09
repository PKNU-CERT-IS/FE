export const blogTabCategory = ["allPosts", "publishedPosts"] as const;
export type blogTabCategoryType = (typeof blogTabCategory)[number];

export const TAB_CONFIG: Record<blogTabCategoryType, { label: string }> = {
  allPosts: { label: "전체 게시글" },
  publishedPosts: { label: "외부 공개" },
};
