import { blogTabCategory, blogTabCategoryType } from "@/types/admin/adminBlog";

export const isValidTab = (tab: string): tab is blogTabCategoryType =>
  blogTabCategory.includes(tab as blogTabCategoryType);
