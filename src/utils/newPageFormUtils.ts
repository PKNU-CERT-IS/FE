import { boardCategoriesEN } from "@/types/board";
import { NewPageCategoryType } from "@/types/newPageForm";

// type에 따라 목록을 반환하는 함수
export const getCategories = (type: NewPageCategoryType) => {
  switch (type) {
    case "board":
      return boardCategoriesEN.filter((c) => c !== "ALL"); // ALL 제외
    case "blog":
      return ["CTF", "CS", "RED", "BLUE", "GRC", "MISC", "기타"];
    case "study":
    case "project":
      return ["CTF", "CS", "RED", "BLUE", "GRC", "MISC", "기타"];
    default:
      return [];
  }
};

/** 하위 카테고리 매핑 (상위 카테고리 -> 하위 카테고리 배열) */
export const getSubCategories = (mainCategory: string): string[] => {
  const map: Record<string, string[]> = {
    // CTF
    CTF: [
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
    // CS
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
      "기타",
    ],
    // RED
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
      "기타",
    ],
    // BLUE
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
      "기타",
    ],
    // GRC
    GRC: [
      "보안 정책 및 표준 관리(ISMS/ISO)",
      "위험 관리 및 위협 모델링",
      "컴플라이언스(GDPR, PCI-DSS)",
      "정보통신망이용촉진및정보보호등에관한법률",
      "사업 연속성 계획 및 재해 복구",
      "기타",
    ],
    // MISC
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
      "기타",
    ],
    // 기타(빈 목록)
    기타: [],
  };

  return map[mainCategory] ?? [];
};

// 기간 정책 정보를 반환하는 함수 (stduy와 project에 대한 정책)
export const getPeriodPolicyInfo = (type: NewPageCategoryType) => {
  switch (type) {
    case "study":
      return {
        title: "스터디 기간 정책",
        items: [
          "스터디: 1주 ~ 2개월 수행 가능",
          "2주 이하: 모든 주제 가능 (운동, 노래, 시험공부 등)",
          "2주 이상: 보안 또는 컴퓨터 관련 주제만 가능",
        ],
      };
    case "project":
      return {
        title: "프로젝트 기간 정책",
        items: [
          "프로젝트: 2주 ~ 6개월 수행 가능",
          "모든 프로젝트는 보안 또는 컴퓨터 관련 주제만 가능",
          "장기 프로젝트의 경우 중간 점검이 있을 수 있습니다",
        ],
      };
    default:
      return null;
  }
};

// description placeholder를 반환하는 함수
export const getDescriptionPlaceholder = (type: NewPageCategoryType) => {
  switch (type) {
    case "board":
      return "게시글에 대한 간단한 설명을 입력하세요...";
    case "blog":
      return "블로그 포스트에 대한 간단한 설명을 입력하세요...";
    case "study":
      return "스터디 목표, 진행 방식 등에 대한 설명을 입력하세요...";
    case "project":
      return "프로젝트 목표, 필요 기술 등에 대한 설명을 입력하세요...";
    default:
      return "간단한 설명을 입력하세요...";
  }
};

// 폼 유효성 검사 함수 해당하는 내용이 모두 채워져 있는지 확인
// 추후 가능하면 매개변수를 줄일 수 있도록
export const isFormValid = (
  title: string,
  content: string,
  category: string,
  type: NewPageCategoryType,
  maxParticipants?: string,
  startDate?: string,
  endDate?: string
) => {
  const baseValid = title.trim() && content.trim() && category;
  const dateValid =
    type === "study" || type === "project"
      ? startDate && endDate && maxParticipants
      : true;
  return baseValid && dateValid;
};
