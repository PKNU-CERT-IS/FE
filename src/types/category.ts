// 메인 카테고리 (타입 변경 없음)
export type CategoryType =
  | "ALL"
  | "CTF"
  | "CS"
  | "RED"
  | "BLUE"
  | "GRC"
  | "MISC"
  | "기타";

export const CATEGORY_TO_EN: Record<CategoryType, string> = {
  ALL: "ALL",
  CTF: "CTF",
  CS: "CS",
  RED: "RED",
  BLUE: "BLUE",
  GRC: "GRC",
  MISC: "MISC",
  기타: "ETC",
};

// 서브 카테고리 (타입 변경 없음)
export type SubCategoryType =
  | "ALL"
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
  | "어셈블리어"
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
  | "HUMINT"
  // 기타
  | "기타";

export const CATEGORY_OPTIONS: readonly CategoryType[] = [
  "ALL",
  "CTF",
  "CS",
  "RED",
  "BLUE",
  "GRC",
  "MISC",
  "기타",
] as const;

export const SUBCATEGORY_OPTIONS: readonly SubCategoryType[] = [
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
  "어셈블리어",
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
  //기타
  "기타",
] as const;

// 서브카테고리 맵
export const SUBCATEGORY_MAP: Record<CategoryType, readonly SubCategoryType[]> =
  {
    ALL: ["ALL"],
    CTF: [
      "ALL",
      "포너블",
      "리버싱",
      "웹해킹",
      "디지털 포렌식",
      "암호학",
      "WEB3",
      "AI",
      "MISC",
      "기타",
    ],
    CS: [
      "ALL",
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
      "어셈블리어",
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
      "기타",
    ],
    RED: [
      "ALL",
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
      "기타",
    ],
    BLUE: [
      "ALL",
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
      "기타",
    ],
    GRC: [
      "ALL",
      "보안 정책 및 표준 관리(ISMS/ISO)",
      "위험 관리 및 위협 모델링",
      "컴플라이언스(GDPR, PCI-DSS)",
      "정보통신망이용촉진및정보보호등에관한법률",
      "사업 연속성 계획 및 재해 복구",
      "기타",
    ],
    MISC: [
      "ALL",
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
      "기타",
    ],
    기타: ["기타"],
  };
// 카테고리 라벨
export const CATEGORY_LABELS = {
  ALL: "전체",
  CTF: "CTF",
  CS: "CS",
  RED: "RED",
  BLUE: "BLUE",
  GRC: "GRC",
  MISC: "MISC",
  기타: "기타",
} as const;

// 서브카테고리 라벨
export const SUBCATEGORY_LABELS = {
  ALL: "전체",
  기타: "기타",
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
  어셈블리어: "어셈블리어",
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

// 소카테고리를 대카테고리로 매핑하는 객체 생성 -> badge color 맵핑을 위해 생성
export const SUBCATEGORY_TO_CATEGORY: Record<SubCategoryType, CategoryType> =
  Object.entries(SUBCATEGORY_MAP).reduce(
    (acc, [category, subcategories]) => {
      subcategories.forEach((sub) => {
        acc[sub] = category as CategoryType;
      });
      return acc;
    },
    {} as Record<SubCategoryType, CategoryType>,
  );

export type SubCategoryKey = keyof typeof SUBCATEGORY_LABELS;

// SubCategory 영문 매핑
export const SUBCATEGORY_TO_EN: Record<SubCategoryType, string> = {
  ALL: "ALL",
  기타: "ETC",

  // CTF
  포너블: "PWNABLE",
  리버싱: "REVERSING",
  웹해킹: "WEBHACKING",
  "디지털 포렌식": "DIGITAL_FORENSICS",
  암호학: "CRYPTOGRAPHY",
  WEB3: "WEB3",
  AI: "AI",
  MISC: "MISC",

  // CS
  논리회로: "LOGIC_CIRCUITS",
  정수론: "NUMBER_THEORY",
  선형대수학: "LINEAR_ALGEBRA",
  알고리즘: "ALGORITHMS",
  프로그래밍언어론: "PROGRAMMING_LANGUAGES",
  컴파일러: "COMPILER",
  "컴퓨터 구조": "COMPUTER_ARCHITECTURE",
  운영체제: "OPERATING_SYSTEMS",
  "통신/네트워크": "COMMUNICATION_NETWORKS",
  "네트워크 보안": "NETWORK_SECURITY",
  데이터베이스: "DATABASE",
  "C/C++": "C_CPP",
  Python: "PYTHON",
  어셈블리어: "ASSEMBLY",
  JavaScript: "JAVASCRIPT",
  "개발 생명주기": "SDLC",
  "소프트웨어 설계": "SOFTWARE_DESIGN",
  "시큐어 코딩": "SECURE_CODING",
  "오픈소스 활용": "OPEN_SOURCE",
  "프론트/백/API": "FRONT_BACK_API",
  "윈도우 커널": "WINDOWS_KERNEL",
  "리눅스 커널": "LINUX_KERNEL",
  "가상화 및 컨테이너": "VIRTUALIZATION_CONTAINERS",
  "레이스 컨디션": "RACE_CONDITION",
  "정형 검증": "FORMAL_VERIFICATION",
  "데이터 과학 및 분석": "DATA_SCIENCE",
  인공지능: "AI_GENERAL",
  "시계열 데이터": "TIME_SERIES",

  // RED
  모의해킹: "PEN_TEST",
  "취약점 연구": "VULN_RESEARCH",
  "APT Analysis": "APT_ANALYSIS",
  "소스코드 분석": "SOURCE_ANALYSIS",
  "Taint Analysis": "TAINT_ANALYSIS",
  "File Format과 파싱": "FILE_FORMAT_PARSING",
  Diffing: "DIFFING",
  "메모리 덤프": "MEMORY_DUMP",
  후킹: "HOOKING",
  "바이너리 패치": "BINARY_PATCH",
  퍼징: "FUZZING",
  "원데이 분석": "ONEDAY_ANALYSIS",
  보호기법: "DEFENSE_TECH",
  Primitive: "PRIMITIVE",
  "Exploit 개발": "EXPLOIT_DEV",
  "Heap Exploit": "HEAP_EXPLOIT",
  리버스쉘: "REVERSE_SHELL",
  DoS: "DOS",
  "방어 시스템 우회": "DEFENSE_BYPASS",
  "공격 인프라와 C2": "C2_INFRA",
  "악성코드 제작": "MALWARE_DEV",
  "패킹/난독화/안티디버깅": "PACKING_OBFUSCATION",
  "클라우드 보안": "CLOUD_SECURITY",
  "모바일 해킹": "MOBILE_HACKING",
  "펌웨어/IoT 해킹": "FIRMWARE_IOT",
  "게임 해킹": "GAME_HACKING",
  "차량 보안": "CAR_SECURITY",
  "AI 보안": "AI_SECURITY",

  // BLUE
  "침입 탐지 및 방어(관제)": "IDS_IPS",
  "사용자 행위 분석": "USER_BEHAVIOR",
  HoneyPots: "HONEYPOTS",
  "침해 사고 대응(DFIR)": "DFIR",
  "메모리 포렌식": "MEM_FORENSICS",
  "네트워크 포렌식": "NET_FORENSICS",
  "악성코드 분석": "MALWARE_ANALYSIS",
  "CTI Analysis": "CTI_ANALYSIS",
  "위협 인텔리전스 플랫폼(TIP) 활용": "TIP",
  "Threat Hunting": "THREAT_HUNTING",
  "보안 아키텍처/엔지니어링": "SEC_ARCH_ENG",
  "보안 데이터 엔지니어링": "SEC_DATA_ENG",
  "보안 자동화 및 오케스트레이션(SOAR)": "SOAR",
  AppSec: "APPSEC",
  DevSecOps: "DEVSECOPS",
  "CI/CD Security": "CICD_SECURITY",
  "소프트웨어 공급망 보안": "SUPPLY_CHAIN",
  "OT/ICS 보안": "OT_ICS",

  // GRC
  "보안 정책 및 표준 관리(ISMS/ISO)": "ISMS_ISO",
  "위험 관리 및 위협 모델링": "RISK_THREAT",
  "컴플라이언스(GDPR, PCI-DSS)": "COMPLIANCE",
  정보통신망이용촉진및정보보호등에관한법률: "KOREA_ITLAW",
  "사업 연속성 계획 및 재해 복구": "BCP_DR",

  // MISC
  "모니터링 시스템 개발": "MONITORING",
  "자동화 시스템 개발": "AUTOMATION",
  "오픈소스 분석": "OSS_ANALYSIS",
  "Third Party Program": "THIRD_PARTY",
  "백엔드 프레임워크": "BACKEND_FW",
  "프론트 프레임워크": "FRONTEND_FW",
  "모바일 앱 프레임워크": "MOBILE_FW",
  "게임 엔진": "GAME_ENGINE",
  "Windows MFC": "WINDOWS_MFC",
  "클라우드 플랫폼": "CLOUD_PLATFORM",
  "코드형 인프라": "INFRA_AS_CODE",
  "블록체인 및 분산원장기술": "BLOCKCHAIN",
  머신러닝: "MACHINE_LEARNING",
  "빅데이터 처리": "BIGDATA",
  "텍스트/음성/영상처리": "TEXT_SPEECH_VIDEO",
  "디지털 신호 처리": "DSP",
  "Embedded/MCU": "EMBEDDED_MCU",
  "펌웨어 설계": "FIRMWARE",
  "회로 분석/설계": "CIRCUIT_ANALYSIS",
  "집적회로 설계": "IC_DESIGN",
  "논리회로 설계": "LOGIC_DESIGN",
  "이동통신 공학": "MOBILE_COMM",
  "디지털 통신 공학": "DIGITAL_COMM",
  "채널 코딩 이론": "CHANNEL_CODING",
  SIGINT: "SIGINT",
  대수학: "ALGEBRA",
  유한체이론: "FINITE_FIELD",
  "암호알고리즘 설계/분석": "CRYPTO_ALGO",
  양자내성암호: "POST_QUANTUM",
  "병렬처리 프로그래밍": "PARALLEL_PROG",
  의공학: "BIOMEDICAL",
  OSINT: "OSINT",
  HUMINT: "HUMINT",
};

// 반대 매핑 (영문 → 한글)
export const SUBCATEGORY_FROM_EN: Record<string, SubCategoryType> =
  Object.entries(SUBCATEGORY_TO_EN).reduce(
    (acc, [kor, eng]) => {
      acc[eng] = kor as SubCategoryType;
      return acc;
    },
    {} as Record<string, SubCategoryType>,
  );
