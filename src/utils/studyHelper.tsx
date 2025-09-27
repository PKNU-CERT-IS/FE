import { ProjectSearchParams } from "@/components/project/CCProjectPagination";
import { CategoryType, SubCategoryType } from "@/types/category";
import { StatusType } from "@/types/progressStatus";
import type { SemesterType, StudySearchParams } from "@/types/study";

export function isCategoryType(value: string): value is CategoryType {
  const validCategories: CategoryType[] = [
    "ALL",
    "CTF",
    "CS",
    "RED",
    "BLUE",
    "GRC",
    "MISC",
  ];
  return validCategories.includes(value as CategoryType);
}

export function isSubCategoryType(value: string): value is SubCategoryType {
  const validSubCategories: SubCategoryType[] = [
    "ALL",
    // CTF
    "포너블",
    "리버싱",
    "웹해킹",
    "디지털 포렌식",
    "암호학",
    "WEB3",
    "AI",
    "MISC",
    // CS
    "논리회로",
    "정수론",
    "선형대수학",
    "알고리즘",
    "프로그래밍언어론",
    "컴파일러",
    "컴퓨터 구조",
    "운영체제",
    "통신/네트워크",
    "네트워크 보안",
    "데이터베이스",
    "C/C++",
    "Python",
    "어샘블리어",
    "JavaScript",
    "개발 생명주기",
    "소프트웨어 설계",
    "시큐어 코딩",
    "오픈소스 활용",
    "프론트/백/API",
    "윈도우 커널",
    "리눅스 커널",
    "가상화 및 컨테이너",
    "레이스 컨디션",
    "정형 검증",
    "데이터 과학 및 분석",
    "인공지능",
    "시계열 데이터",
    // RED
    "모의해킹",
    "취약점 연구",
    "APT Analysis",
    "소스코드 분석",
    "Taint Analysis",
    "File Format과 파싱",
    "Diffing",
    "메모리 덤프",
    "후킹",
    "바이너리 패치",
    "퍼징",
    "원데이 분석",
    "보호기법",
    "Primitive",
    "Exploit 개발",
    "Heap Exploit",
    "리버스쉘",
    "DoS",
    "방어 시스템 우회",
    "공격 인프라와 C2",
    "악성코드 제작",
    "패킹/난독화/안티디버깅",
    "클라우드 보안",
    "모바일 해킹",
    "펌웨어/IoT 해킹",
    "게임 해킹",
    "차량 보안",
    "AI 보안",
    // BLUE
    "침입 탐지 및 방어(관제)",
    "사용자 행위 분석",
    "HoneyPots",
    "침해 사고 대응(DFIR)",
    "메모리 포렌식",
    "네트워크 포렌식",
    "악성코드 분석",
    "CTI Analysis",
    "위협 인텔리전스 플랫폼(TIP) 활용",
    "Threat Hunting",
    "보안 아키텍처/엔지니어링",
    "보안 데이터 엔지니어링",
    "보안 자동화 및 오케스트레이션(SOAR)",
    "AppSec",
    "DevSecOps",
    "CI/CD Security",
    "소프트웨어 공급망 보안",
    "OT/ICS 보안",
    // GRC
    "보안 정책 및 표준 관리(ISMS/ISO)",
    "위험 관리 및 위협 모델링",
    "컴플라이언스(GDPR, PCI-DSS)",
    "정보통신망이용촉진및정보보호등에관한법률",
    "사업 연속성 계획 및 재해 복구",
    // MISC
    "모니터링 시스템 개발",
    "자동화 시스템 개발",
    "오픈소스 분석",
    "Third Party Program",
    "백엔드 프레임워크",
    "프론트 프레임워크",
    "모바일 앱 프레임워크",
    "게임 엔진",
    "Windows MFC",
    "클라우드 플랫폼",
    "코드형 인프라",
    "블록체인 및 분산원장기술",
    "머신러닝",
    "빅데이터 처리",
    "텍스트/음성/영상처리",
    "디지털 신호 처리",
    "Embedded/MCU",
    "펌웨어 설계",
    "회로 분석/설계",
    "집적회로 설계",
    "논리회로 설계",
    "이동통신 공학",
    "디지털 통신 공학",
    "채널 코딩 이론",
    "SIGINT",
    "대수학",
    "유한체이론",
    "암호알고리즘 설계/분석",
    "양자내성암호",
    "병렬처리 프로그래밍",
    "의공학",
    "OSINT",
    "HUMINT",
  ];
  return validSubCategories.includes(value as SubCategoryType);
}

export function isStatusType(value: string): value is StatusType {
  const validStatuses: StatusType[] = [
    "ALL",
    "READY",
    "INPROGRESS",
    "COMPLETED",
  ];
  return validStatuses.includes(value as StatusType);
}

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
 * 스터디 상태에 따른 날짜 정보를 반환합니다.
 * @param startDate - 시작 날짜
 * @param endDate - 종료 날짜
 * @returns 상태별 날짜 표시 문자열
 */
export const getStatusDateInfo = (
  startDate?: string,
  endDate?: string
): { status: StatusType; label: string } => {
  const now = new Date();
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  if (start && now < start) {
    const daysLeft = calculateDaysFromNow(startDate!);
    return {
      status: "READY",
      label: daysLeft > 0 ? `${daysLeft}일 뒤` : "곧 시작",
    };
  }

  if (end && now > end) {
    const semester = startDate
      ? getSemesterFromStartDate(startDate)
      : undefined;
    return {
      status: "COMPLETED",
      label: semester ? `${semester} 진행` : "완료",
    };
  }

  if (end) {
    const daysLeft = calculateDaysFromNow(endDate!);
    return {
      status: "INPROGRESS",
      label: daysLeft > 0 ? `D-${daysLeft}` : "종료 임박",
    };
  }

  return { status: "INPROGRESS", label: "진행 중" };
};

/**
 * D-DAY 표기
 */
export const getStudyPeriodLabel = (endDate?: string) => {
  if (!endDate) return null;

  const diffDays = calculateDaysFromNow(endDate);

  if (diffDays === 0) {
    return "D-Day";
  }

  if (diffDays > 0) {
    return `D-${diffDays}`; // 종료일까지 남은 일수
  }

  return `D+${Math.abs(diffDays)}`; // 종료일로부터 지난 일수
};

// study D-Day 계산을 위한 함수
export function calculateDDay(startDate: string): string {
  const today = new Date();
  const start = new Date(startDate);

  // 시간을 00:00:00 으로 맞추기
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);

  const diffTime = start.getTime() - today.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "D+0"; // 오늘
  } else if (diffDays > 0) {
    return `D+${diffDays}`; // 미래
  } else {
    return `D${diffDays}`; // 과거 (자동으로 D-3 형태가 됨)
  }
}

/**
 * 참여율을 계산합니다.
 * @param current - 현재 참가자 수
 * @param max - 최대 참가자 수
 * @returns 참여율 (0-100, 반올림)
 */
export const calculateParticipationRate = (
  current: number,
  max: number
): number => {
  if (max === 0) return 0;
  return Math.round((current / max) * 100);
};

export function parseSearchParams(
  searchParams?: StudySearchParams | ProjectSearchParams
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
      "status" in searchParams
        ? (searchParams.status as StatusType) || "ALL"
        : "ALL",
    page: parseInt(searchParams.page || "1", 10),
  };
}

/**
 * 페이지 URL 생성 유틸리티 함수
 */
export function createPageUrl(
  page: number,
  searchParams: StudySearchParams
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

/**
 * 시작 날짜 기준으로 학기를 계산합니다.
 * @param startDate - 스터디 시작일 (YYYY-MM-DD or ISO string)
 * @returns 학기 문자열 (예: "2025-1", "2025-2")
 */
export function getSemesterFromStartDate(startDate?: string): SemesterType {
  if (!startDate) return "ALL";

  const date = new Date(startDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return month >= 1 && month <= 6 ? `${year}-01` : `${year}-02`;
}
