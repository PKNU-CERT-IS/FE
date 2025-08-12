export const MAIN_TABS = ["study", "project"] as const;
export type MainTab = (typeof MAIN_TABS)[number];

export const SUB_TABS = ["pending", "list"] as const;
export type SubTab = (typeof SUB_TABS)[number];

export const TAB_CONFIG: Record<MainTab, { label: string }> = {
  study: { label: "Study" },
  project: { label: "Project" },
};

export const SUBTAB_CONFIG: Record<SubTab, { label: string }> = {
  pending: { label: "승인 대기" },
  list: { label: "목록" },
};

export const isValidMainTab = (t: string): t is MainTab =>
  MAIN_TABS.includes(t as MainTab);

export const isValidSubTab = (v: string): v is SubTab =>
  SUB_TABS.includes(v as SubTab);
