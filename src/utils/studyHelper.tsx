import { CategoryType, SubCategoryType } from "@/types/category";
import { StatusType } from "@/types/progressStatus";
import type { SemesterType, StudySearchParams } from "@/types/study";
import { ProjectSearchParams } from "@/components/project/CCProjectPagination";

// 상수 정의
export const PARTICIPATION_THRESHOLDS = {
  GRAY_ZONE: 33,
  ORANGE_ZONE: 66,
} as const;

// Progress 바 색상 상수
export const PROGRESS_COLORS = {
  LOW: "#C7D3CC", // 33% 이하 - 연한 회색
  MEDIUM: "#F49236", // 66% 이하 - 주황색
  HIGH: "#16A34A", // 67% 이상 - 초록색
} as const;

/**
 * 참여율에 따른 Progress 바 색상을 반환합니다.
 * @param percentage - 참여율 (0-100)
 * @returns 색상 hex 코드
 */
export const getProgressColor = (percentage: number): string => {
  if (percentage <= PARTICIPATION_THRESHOLDS.GRAY_ZONE) {
    return PROGRESS_COLORS.LOW;
  }
  if (percentage <= PARTICIPATION_THRESHOLDS.ORANGE_ZONE) {
    return PROGRESS_COLORS.MEDIUM;
  }
  return PROGRESS_COLORS.HIGH;
};

/**
 * 현재 날짜로부터 목표 날짜까지의 일수를 계산합니다.
 * @param targetDate - 목표 날짜 (YYYY-MM-DD 형식)
 * @returns 남은 일수 (음수면 과거)
 */
export const calculateDaysFromNow = (targetDate: string): number => {
  const today = new Date();
  const target = new Date(targetDate);
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * D-DAY 표기
 */
export const getStudyPeriodLabel = (startDate?: string) => {
  if (!startDate) return null;
  return calculateDDay(startDate);
};

// study D-Day 계산 함수 (startDate 기준)
export function calculateDDay(startDate: string): string {
  const today = new Date();
  const start = new Date(startDate);

  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);

  const diffTime = start.getTime() - today.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "D-Day"; // 오늘 시작
  } else if (diffDays > 0) {
    return `D-${diffDays}`; // 시작일까지 남은 일수
  } else {
    return `D+${Math.abs(diffDays)}`; // 시작일부터 지난 일수
  }
}

export function parseSearchParams(
  searchParams?: StudySearchParams | ProjectSearchParams,
) {
  if (!searchParams) {
    return {
      search: "",
      semester: "ALL" as SemesterType,
      category: "ALL" as CategoryType,
      subCategory: "ALL" as SubCategoryType,
      studyStatus: "ALL" as StatusType,
      projectStatus: "ALL" as StatusType,
      page: 1,
    };
  }

  return {
    search: searchParams.search || "",
    semester: (searchParams.semester as SemesterType) || "ALL",
    category: (searchParams.category as CategoryType) || "ALL",
    subCategory: (searchParams.subCategory as SubCategoryType) || "ALL",
    studyStatus:
      "studyStatus" in searchParams
        ? (searchParams.studyStatus as StatusType) || "ALL"
        : "ALL",

    projectStatus:
      "projectStatus" in searchParams
        ? (searchParams.projectStatus as StatusType) || "ALL"
        : "ALL",
    page: parseInt(searchParams.page || "1", 10),
  };
}

/**
 * 페이지 URL 생성 유틸리티 함수
 */
export function createPageUrl(
  page: number,
  searchParams: StudySearchParams,
): string {
  const params = new URLSearchParams();
  const safeSearchParams = searchParams || {};
  Object.entries(safeSearchParams).forEach(([key, value]) => {
    if (value && key !== "page") {
      params.set(key, value);
    }
  });

  if (page > 1) {
    params.set("page", page.toString());
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}
