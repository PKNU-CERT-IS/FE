import { AttachedFile } from "@/types/attachedFile";

export type SemesterType = "all" | "2025-2";

// 메인 카테고리 (타입 변경 없음)
export type CategoryType =
  | "all"
  | "CTF"
  | "CS"
  | "RED"
  | "BLUE"
  | "GRC"
  | "MISC";

// 서브 카테고리 (타입 변경 없음)
export type SubCategoryType =
  | "all"
  // CTF
  | "포너블"
  | "리버싱"
  | "웹해킹"
  | "디지털 포렌식"
  | "암호학"
  | "WEB3"
  | "AI"
  | "MISC"
  // CS
  | "논리회로"
  | "정수론"
  | "선형대수학"
  | "알고리즘"
  | "프로그래밍언어론"
  | "컴파일러"
  | "컴퓨터 구조"
  | "운영체제"
  | "통신/네트워크"
  | "네트워크 보안"
  | "데이터베이스"
  | "C/C++"
  | "Python"
  | "어샘블리어"
  | "JavaScript"
  | "개발 생명주기"
  | "소프트웨어 설계"
  | "시큐어 코딩"
  | "오픈소스 활용"
  | "프론트/백/API"
  | "윈도우 커널"
  | "리눅스 커널"
  | "가상화 및 컨테이너"
  | "레이스 컨디션"
  | "정형 검증"
  | "데이터 과학 및 분석"
  | "인공지능"
  | "시계열 데이터"
  // RED
  | "모의해킹"
  | "취약점 연구"
  | "APT Analysis"
  | "소스코드 분석"
  | "Taint Analysis"
  | "File Format과 파싱"
  | "Diffing"
  | "메모리 덤프"
  | "후킹"
  | "바이너리 패치"
  | "퍼징"
  | "원데이 분석"
  | "보호기법"
  | "Primitive"
  | "Exploit 개발"
  | "Heap Exploit"
  | "리버스쉘"
  | "DoS"
  | "방어 시스템 우회"
  | "공격 인프라와 C2"
  | "악성코드 제작"
  | "패킹/난독화/안티디버깅"
  | "클라우드 보안"
  | "모바일 해킹"
  | "펌웨어/IoT 해킹"
  | "게임 해킹"
  | "차량 보안"
  | "AI 보안"
  // BLUE
  | "침입 탐지 및 방어(관제)"
  | "사용자 행위 분석"
  | "HoneyPots"
  | "침해 사고 대응(DFIR)"
  | "메모리 포렌식"
  | "네트워크 포렌식"
  | "악성코드 분석"
  | "CTI Analysis"
  | "위협 인텔리전스 플랫폼(TIP) 활용"
  | "Threat Hunting"
  | "보안 아키텍처/엔지니어링"
  | "보안 데이터 엔지니어링"
  | "보안 자동화 및 오케스트레이션(SOAR)"
  | "AppSec"
  | "DevSecOps"
  | "CI/CD Security"
  | "소프트웨어 공급망 보안"
  | "OT/ICS 보안"
  // GRC
  | "보안 정책 및 표준 관리(ISMS/ISO)"
  | "위험 관리 및 위협 모델링"
  | "컴플라이언스(GDPR, PCI-DSS)"
  | "정보통신망이용촉진및정보보호등에관한법률"
  | "사업 연속성 계획 및 재해 복구"
  // MISC
  | "모니터링 시스템 개발"
  | "자동화 시스템 개발"
  | "오픈소스 분석"
  | "Third Party Program"
  | "백엔드 프레임워크"
  | "프론트 프레임워크"
  | "모바일 앱 프레임워크"
  | "게임 엔진"
  | "Windows MFC"
  | "클라우드 플랫폼"
  | "코드형 인프라"
  | "블록체인 및 분산원장기술"
  | "머신러닝"
  | "빅데이터 처리"
  | "텍스트/음성/영상처리"
  | "디지털 신호 처리"
  | "Embedded/MCU"
  | "펌웨어 설계"
  | "회로 분석/설계"
  | "집적회로 설계"
  | "논리회로 설계"
  | "이동통신 공학"
  | "디지털 통신 공학"
  | "채널 코딩 이론"
  | "SIGINT"
  | "대수학"
  | "유한체이론"
  | "암호알고리즘 설계/분석"
  | "양자내성암호"
  | "병렬처리 프로그래밍"
  | "의공학"
  | "OSINT"
  | "HUMINT";

export type StatusType = "all" | "not_started" | "in_progress" | "completed";
export type AuthorStatusType = "student" | "graduate";

// 필터 키 타입
export type FilterKey =
  | "search"
  | "semester"
  | "category"
  | "subCategory"
  | "status";

// 페이지 검색 파라미터
export interface StudySearchParams {
  search?: string;
  semester?: string;
  category?: string;
  subCategory?: string;
  status?: string;
  page?: string;
}

// 현재 필터 상태
export interface CurrentFilters {
  search: string;
  semester: SemesterType;
  category: CategoryType;
  subCategory: SubCategoryType;
  status: StatusType;
  page: number;
}

// Study Material
export interface StudyMaterial {
  id: string;
  isPending: boolean;
  title: string;
  description: string;
  customTags: { name: string; color: string }[];
  author: string;
  authorStatus: AuthorStatusType;
  semester: SemesterType;
  attachedFiles?: AttachedFile[];
  category: CategoryType;
  subCategory: SubCategoryType;
  hackingTechnique?: CategoryType;
  status: StatusType;
  startDate?: string;
  endDate?: string;
  currentParticipants: number;
  maxParticipants: number;
}

// 컴포넌트 Props
export interface StudyPageProps {
  searchParams: Promise<StudySearchParams>;
}
export interface StudyFilterProps {
  currentFilters: CurrentFilters;
}
export interface StudyContentProps {
  currentFilters: CurrentFilters;
}
export interface StudyPaginationProps {
  currentPage: number;
  totalPages: number;
}

// 옵션
export const SEMESTER_OPTIONS: readonly SemesterType[] = [
  "all",
  "2025-2",
] as const;
export const CATEGORY_OPTIONS: readonly CategoryType[] = [
  "all",
  "CTF",
  "CS",
  "RED",
  "BLUE",
  "GRC",
  "MISC",
] as const;

export const SUBCATEGORY_OPTIONS: readonly SubCategoryType[] = [
  "all",
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
] as const;

export const STATUS_OPTIONS: readonly StatusType[] = [
  "all",
  "not_started",
  "in_progress",
  "completed",
] as const;

// Label
export const SEMESTER_LABELS: Record<SemesterType, string> = {
  all: "전체",
  "2025-2": "2025-2학기",
} as const;
export const STATUS_LABELS: Record<StatusType, string> = {
  all: "전체",
  not_started: "시작 전",
  in_progress: "진행 중",
  completed: "종료",
} as const;
export const AUTHOR_STATUS_LABELS: Record<AuthorStatusType, string> = {
  student: "재학생",
  graduate: "졸업생",
} as const;

// 서브카테고리 맵
export const SUBCATEGORY_MAP: Record<CategoryType, readonly SubCategoryType[]> =
  {
    all: [],
    CTF: [
      "포너블",
      "리버싱",
      "웹해킹",
      "디지털 포렌식",
      "암호학",
      "WEB3",
      "AI",
      "MISC",
    ],
    CS: [
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
    ],
    RED: [
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
    ],
    BLUE: [
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
    ],
    GRC: [
      "보안 정책 및 표준 관리(ISMS/ISO)",
      "위험 관리 및 위협 모델링",
      "컴플라이언스(GDPR, PCI-DSS)",
      "정보통신망이용촉진및정보보호등에관한법률",
      "사업 연속성 계획 및 재해 복구",
    ],
    MISC: [
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
    ],
  };
// 카테고리 라벨
export const CATEGORY_LABELS = {
  all: "전체",
  CTF: "CTF",
  CS: "CS",
  RED: "RED",
  BLUE: "BLUE",
  GRC: "GRC",
  MISC: "MISC",
} as const;

// 서브카테고리 라벨
export const SUBCATEGORY_LABELS = {
  all: "전체",
  // CTF
  포너블: "포너블",
  리버싱: "리버싱",
  웹해킹: "웹해킹",
  "디지털 포렌식": "디지털 포렌식",
  암호학: "암호학",
  WEB3: "WEB3",
  AI: "AI",
  MISC: "MISC",

  // CS
  논리회로: "논리회로",
  정수론: "정수론",
  선형대수학: "선형대수학",
  알고리즘: "알고리즘",
  프로그래밍언어론: "프로그래밍언어론",
  컴파일러: "컴파일러",
  "컴퓨터 구조": "컴퓨터 구조",
  운영체제: "운영체제",
  "통신/네트워크": "통신/네트워크",
  "네트워크 보안": "네트워크 보안",
  데이터베이스: "데이터베이스",
  "C/C++": "C/C++",
  Python: "Python",
  어샘블리어: "어샘블리어",
  JavaScript: "JavaScript",
  "개발 생명주기": "개발 생명주기",
  "소프트웨어 설계": "소프트웨어 설계",
  "시큐어 코딩": "시큐어 코딩",
  "오픈소스 활용": "오픈소스 활용",
  "프론트/백/API": "프론트/백/API",
  "윈도우 커널": "윈도우 커널",
  "리눅스 커널": "리눅스 커널",
  "가상화 및 컨테이너": "가상화 및 컨테이너",
  "레이스 컨디션": "레이스 컨디션",
  "정형 검증": "정형 검증",
  "데이터 과학 및 분석": "데이터 과학 및 분석",
  인공지능: "인공지능",
  "시계열 데이터": "시계열 데이터",

  // RED
  모의해킹: "모의해킹",
  "취약점 연구": "취약점 연구",
  "APT Analysis": "APT Analysis",
  "소스코드 분석": "소스코드 분석",
  "Taint Analysis": "Taint Analysis",
  "File Format과 파싱": "File Format과 파싱",
  Diffing: "Diffing",
  "메모리 덤프": "메모리 덤프",
  후킹: "후킹",
  "바이너리 패치": "바이너리 패치",
  퍼징: "퍼징",
  "원데이 분석": "원데이 분석",
  보호기법: "보호기법",
  Primitive: "Primitive",
  "Exploit 개발": "Exploit 개발",
  "Heap Exploit": "Heap Exploit",
  리버스쉘: "리버스쉘",
  DoS: "DoS",
  "방어 시스템 우회": "방어 시스템 우회",
  "공격 인프라와 C2": "공격 인프라와 C2",
  "악성코드 제작": "악성코드 제작",
  "패킹/난독화/안티디버깅": "패킹/난독화/안티디버깅",
  "클라우드 보안": "클라우드 보안",
  "모바일 해킹": "모바일 해킹",
  "펌웨어/IoT 해킹": "펌웨어/IoT 해킹",
  "게임 해킹": "게임 해킹",
  "차량 보안": "차량 보안",
  "AI 보안": "AI 보안",

  // BLUE
  "침입 탐지 및 방어(관제)": "침입 탐지 및 방어(관제)",
  "사용자 행위 분석": "사용자 행위 분석",
  HoneyPots: "HoneyPots",
  "침해 사고 대응(DFIR)": "침해 사고 대응(DFIR)",
  "메모리 포렌식": "메모리 포렌식",
  "네트워크 포렌식": "네트워크 포렌식",
  "악성코드 분석": "악성코드 분석",
  "CTI Analysis": "CTI Analysis",
  "위협 인텔리전스 플랫폼(TIP) 활용": "위협 인텔리전스 플랫폼(TIP) 활용",
  "Threat Hunting": "Threat Hunting",
  "보안 아키텍처/엔지니어링": "보안 아키텍처/엔지니어링",
  "보안 데이터 엔지니어링": "보안 데이터 엔지니어링",
  "보안 자동화 및 오케스트레이션(SOAR)": "보안 자동화 및 오케스트레이션(SOAR)",
  AppSec: "AppSec",
  DevSecOps: "DevSecOps",
  "CI/CD Security": "CI/CD Security",
  "소프트웨어 공급망 보안": "소프트웨어 공급망 보안",
  "OT/ICS 보안": "OT/ICS 보안",

  // GRC
  "보안 정책 및 표준 관리(ISMS/ISO)": "보안 정책 및 표준 관리(ISMS/ISO)",
  "위험 관리 및 위협 모델링": "위험 관리 및 위협 모델링",
  "컴플라이언스(GDPR, PCI-DSS)": "컴플라이언스(GDPR, PCI-DSS)",
  정보통신망이용촉진및정보보호등에관한법률:
    "정보통신망이용촉진및정보보호등에관한법률",
  "사업 연속성 계획 및 재해 복구": "사업 연속성 계획 및 재해 복구",

  // MISC
  "모니터링 시스템 개발": "모니터링 시스템 개발",
  "자동화 시스템 개발": "자동화 시스템 개발",
  "오픈소스 분석": "오픈소스 분석",
  "Third Party Program": "Third Party Program",
  "백엔드 프레임워크": "백엔드 프레임워크",
  "프론트 프레임워크": "프론트 프레임워크",
  "모바일 앱 프레임워크": "모바일 앱 프레임워크",
  "게임 엔진": "게임 엔진",
  "Windows MFC": "Windows MFC",
  "클라우드 플랫폼": "클라우드 플랫폼",
  "코드형 인프라": "코드형 인프라",
  "블록체인 및 분산원장기술": "블록체인 및 분산원장기술",
  머신러닝: "머신러닝",
  "빅데이터 처리": "빅데이터 처리",
  "텍스트/음성/영상처리": "텍스트/음성/영상처리",
  "디지털 신호 처리": "디지털 신호 처리",
  "Embedded/MCU": "Embedded/MCU",
  "펌웨어 설계": "펌웨어 설계",
  "회로 분석/설계": "회로 분석/설계",
  "집적회로 설계": "집적회로 설계",
  "논리회로 설계": "논리회로 설계",
  "이동통신 공학": "이동통신 공학",
  "디지털 통신 공학": "디지털 통신 공학",
  "채널 코딩 이론": "채널 코딩 이론",
  SIGINT: "SIGINT",
  대수학: "대수학",
  유한체이론: "유한체이론",
  "암호알고리즘 설계/분석": "암호알고리즘 설계/분석",
  양자내성암호: "양자내성암호",
  "병렬처리 프로그래밍": "병렬처리 프로그래밍",
  의공학: "의공학",
  OSINT: "OSINT",
  HUMINT: "HUMINT",
} as const;

// 유틸 타입
export type NonEmptyArray<T> = [T, ...T[]];
export type FilterOptions = {
  semester: typeof SEMESTER_OPTIONS;
  category: typeof CATEGORY_OPTIONS;
  subCategory: typeof SUBCATEGORY_OPTIONS;
  status: typeof STATUS_OPTIONS;
};

// API
export interface StudyMaterialsResponse {
  materials: StudyMaterial[];
  totalCount: number;
  totalPages: number;
}
export interface FilterParams extends Omit<CurrentFilters, "page"> {
  page: number;
}

// 회의록
export interface MeetingMinute {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  delete_at?: string;
  content: string;
  participants: number;
  author: string;
  links: LinkItem[];
}
export interface LinkItem {
  title: string;
  url: string;
}
