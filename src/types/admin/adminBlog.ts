export const blogTabCategory = ["true", "false"] as const;
export type blogTabCategoryType = (typeof blogTabCategory)[number];

export const TAB_CONFIG: Record<blogTabCategoryType, { label: string }> = {
  true: { label: "외부 공개" },
  false: { label: "외부 비공개" },
};
