// types/major.ts

// 기본 타입 정의
export interface College {
  id: string;
  name: string;
  departments: Department[];
}

export interface Department {
  id: string;
  name: string;
  collegeId: string;
  majors: Major[];
}

export interface Major {
  id: string;
  name: string;
  departmentId: string;
  collegeId: string;
}

// 폼에서 사용할 선택된 값들의 타입
export interface SelectedMajorInfo {
  college?: string;
  department?: string;
  major?: string;
}

// 드롭다운 상태 관리용 타입
export interface MajorDropdownState {
  collegeOpen: boolean;
  departmentOpen: boolean;
  majorOpen: boolean;
}

export const COLLEGE_DATA: College[] = [
  // 인문사회과학대학
  {
    id: "humanities-social",
    name: "인문사회과학대학",
    departments: [
      {
        id: "free-major",
        name: "자유전공학부",
        collegeId: "humanities-social",
        majors: [],
      },
      {
        id: "korean-literature",
        name: "국어국문학과",
        collegeId: "humanities-social",
        majors: [],
      },
      {
        id: "english",
        name: "영어영문학부",
        collegeId: "humanities-social",
        majors: [
          {
            id: "english-literature",
            name: "영어영문학전공",
            departmentId: "english",
            collegeId: "humanities-social",
          },
          {
            id: "english-culture-industry",
            name: "영어문화·산업전공",
            departmentId: "english",
            collegeId: "humanities-social",
          },
        ],
      },
      {
        id: "japanese",
        name: "일어일문학부",
        collegeId: "humanities-social",
        majors: [
          {
            id: "japanese-literature",
            name: "일본어문학전공",
            departmentId: "japanese",
            collegeId: "humanities-social",
          },
          {
            id: "japanese-studies",
            name: "일본학전공",
            departmentId: "japanese",
            collegeId: "humanities-social",
          },
        ],
      },
      {
        id: "history",
        name: "사학과",
        collegeId: "humanities-social",
        majors: [],
      },
      {
        id: "economics",
        name: "경제학과",
        collegeId: "humanities-social",
        majors: [],
      },
      {
        id: "law",
        name: "법학과",
        collegeId: "humanities-social",
        majors: [],
      },
      {
        id: "administration-welfare",
        name: "행정복지학부",
        collegeId: "humanities-social",
        majors: [
          {
            id: "administration",
            name: "행정학전공",
            departmentId: "administration-welfare",
            collegeId: "humanities-social",
          },
          {
            id: "social-welfare",
            name: "사회복지학전공",
            departmentId: "administration-welfare",
            collegeId: "humanities-social",
          },
        ],
      },
      {
        id: "international-area",
        name: "국제지역학부",
        collegeId: "humanities-social",
        majors: [
          {
            id: "international-studies",
            name: "국제학전공",
            departmentId: "international-area",
            collegeId: "humanities-social",
          },
          {
            id: "international-development",
            name: "국제개발협력학전공",
            departmentId: "international-area",
            collegeId: "humanities-social",
          },
          {
            id: "area-studies",
            name: "국제지역연구학전공",
            departmentId: "international-area",
            collegeId: "humanities-social",
          },
        ],
      },
      {
        id: "chinese-studies",
        name: "중국학과",
        collegeId: "humanities-social",
        majors: [],
      },
      {
        id: "youth-education",
        name: "청소년교육과",
        collegeId: "humanities-social",
        majors: [],
      },
      {
        id: "early-childhood-education",
        name: "유아교육과",
        collegeId: "humanities-social",
        majors: [],
      },
      {
        id: "fashion-design",
        name: "패션디자인학과",
        collegeId: "humanities-social",
        majors: [],
      },
      {
        id: "social-history-culture",
        name: "사회·계열(법학과, 중국학과, 정치외교학과)",
        collegeId: "humanities-social",
        majors: [],
      },
      {
        id: "political-diplomacy",
        name: "정치외교학과",
        collegeId: "humanities-social",
        majors: [],
      },
    ],
  },

  // 자연과학대학
  {
    id: "natural-science",
    name: "자연과학대학",
    departments: [
      {
        id: "physics",
        name: "물리학과",
        collegeId: "natural-science",
        majors: [],
      },
      {
        id: "chemistry",
        name: "화학과",
        collegeId: "natural-science",
        majors: [],
      },
      {
        id: "microbiology",
        name: "미생물학과",
        collegeId: "natural-science",
        majors: [],
      },
      {
        id: "nursing",
        name: "간호학과",
        collegeId: "natural-science",
        majors: [],
      },
      {
        id: "science-computing",
        name: "과학컴퓨팅학과",
        collegeId: "natural-science",
        majors: [],
      },
      {
        id: "business-free-major",
        name: "경영대학 자유전공학부",
        collegeId: "natural-science",
        majors: [],
      },
    ],
  },

  // 경영대학
  {
    id: "business",
    name: "경영대학",
    departments: [
      {
        id: "business-administration",
        name: "경영학부",
        collegeId: "business",
        majors: [
          {
            id: "accounting-finance",
            name: "회계·재무학전공",
            departmentId: "business-administration",
            collegeId: "business",
          },
          {
            id: "tourism-management",
            name: "관광경영학전공",
            departmentId: "business-administration",
            collegeId: "business",
          },
          {
            id: "international-business",
            name: "국제통상학전공",
            departmentId: "business-administration",
            collegeId: "business",
          },
        ],
      },
      {
        id: "international-trade",
        name: "국제통상학부",
        collegeId: "business",
        majors: [
          {
            id: "trade-logistics",
            name: "국제무역물류학전공",
            departmentId: "international-trade",
            collegeId: "business",
          },
          {
            id: "international-management",
            name: "국제경영학전공",
            departmentId: "international-trade",
            collegeId: "business",
          },
        ],
      },
      {
        id: "business-free-major-dept",
        name: "경과대학 자유전공학부",
        collegeId: "business",
        majors: [],
      },
    ],
  },

  // 공과대학
  {
    id: "engineering",
    name: "공과대학",
    departments: [
      {
        id: "architecture",
        name: "건축공학과",
        collegeId: "engineering",
        majors: [],
      },
      {
        id: "electrical",
        name: "전기공학부",
        collegeId: "engineering",
        majors: [
          {
            id: "electrical-eng",
            name: "전기공학전공",
            departmentId: "electrical",
            collegeId: "engineering",
          },
          {
            id: "control-instrumentation",
            name: "제어계측공학전공",
            departmentId: "electrical",
            collegeId: "engineering",
          },
        ],
      },
      {
        id: "display-semiconductor",
        name: "디스플레이반도체공학전공",
        collegeId: "engineering",
        majors: [],
      },
      {
        id: "mechanical",
        name: "기계공학과",
        collegeId: "engineering",
        majors: [],
      },
      {
        id: "mechanical-design",
        name: "기계설계공학전공",
        collegeId: "engineering",
        majors: [],
      },
      {
        id: "mechanical-system",
        name: "기계시스템공학전공",
        collegeId: "engineering",
        majors: [],
      },
      {
        id: "refrigeration-air-conditioning",
        name: "냉동공조공학전공",
        collegeId: "engineering",
        majors: [],
      },
      {
        id: "shipbuilding-ocean",
        name: "조선해양시스템공학전공",
        collegeId: "engineering",
        majors: [],
      },
      {
        id: "chemical-engineering",
        name: "화학공학과",
        collegeId: "engineering",
        majors: [],
      },
      {
        id: "energy-chemistry",
        name: "에너지화학수재공학전공",
        collegeId: "engineering",
        majors: [],
      },
      {
        id: "polymer",
        name: "고분자공학전공",
        collegeId: "engineering",
        majors: [],
      },
      {
        id: "nano-convergence",
        name: "나노융합공학부",
        collegeId: "engineering",
        majors: [
          {
            id: "nano-convergence-major",
            name: "나노융합공학전공",
            departmentId: "nano-convergence",
            collegeId: "engineering",
          },
        ],
      },
      {
        id: "materials-engineering",
        name: "재료공학전공",
        collegeId: "engineering",
        majors: [],
      },
      {
        id: "industrial-management",
        name: "산업경영공학전공",
        collegeId: "engineering",
        majors: [],
      },
      {
        id: "systems-convergence",
        name: "시스템경영·기술·데이터공학전공",
        collegeId: "engineering",
        majors: [],
      },
      {
        id: "safety-engineering",
        name: "안전공학전공",
        collegeId: "engineering",
        majors: [],
      },
      {
        id: "fire-protection",
        name: "소방공학과",
        collegeId: "engineering",
        majors: [],
      },
      {
        id: "convergence-engineering",
        name: "융합공학전공",
        collegeId: "engineering",
        majors: [],
      },
      {
        id: "civil",
        name: "토목공학전공",
        collegeId: "engineering",
        majors: [],
      },
      {
        id: "new-materials-system",
        name: "신소재시스템공학전공",
        collegeId: "engineering",
        majors: [],
      },
    ],
  },

  // 수산과학대학
  {
    id: "fisheries-science",
    name: "수산과학대학",
    departments: [
      {
        id: "fisheries-free-major",
        name: "수산과학대학 자유전공학부",
        collegeId: "fisheries-science",
        majors: [],
      },
      {
        id: "food-science",
        name: "식품과학부",
        collegeId: "fisheries-science",
        majors: [
          {
            id: "food-engineering",
            name: "식품공학전공",
            departmentId: "food-science",
            collegeId: "fisheries-science",
          },
          {
            id: "food-nutrition",
            name: "식품영양학전공",
            departmentId: "food-science",
            collegeId: "fisheries-science",
          },
        ],
      },
      {
        id: "bio-engineering",
        name: "생물공학과",
        collegeId: "fisheries-science",
        majors: [],
      },
      {
        id: "marine-production",
        name: "해양생산시스템관리학부",
        collegeId: "fisheries-science",
        majors: [
          {
            id: "marine-production-system",
            name: "해양생산시스템관리전공",
            departmentId: "marine-production",
            collegeId: "fisheries-science",
          },
          {
            id: "marine-police",
            name: "해양경찰학전공",
            departmentId: "marine-production",
            collegeId: "fisheries-science",
          },
        ],
      },
      {
        id: "marine-bio-science",
        name: "수산생명과학부",
        collegeId: "fisheries-science",
        majors: [
          {
            id: "aquaculture-applied-life",
            name: "양식응용생명과학전공",
            departmentId: "marine-bio-science",
            collegeId: "fisheries-science",
          },
          {
            id: "marine-life",
            name: "자원생명학전공",
            departmentId: "marine-bio-science",
            collegeId: "fisheries-science",
          },
        ],
      },
      {
        id: "fisheries-medicine",
        name: "수산생명의학과",
        collegeId: "fisheries-science",
        majors: [],
      },
      {
        id: "mechanical-marine",
        name: "기관공학전공",
        collegeId: "fisheries-science",
        majors: [],
      },
      {
        id: "refrigeration",
        name: "냉동공학전공",
        collegeId: "fisheries-science",
        majors: [],
      },
      {
        id: "food-engineering-dept",
        name: "식품공학전공",
        collegeId: "fisheries-science",
        majors: [],
      },
      {
        id: "aquaculture-engineering",
        name: "양식공학전공",
        collegeId: "fisheries-science",
        majors: [],
      },
      {
        id: "fisheries-engineering",
        name: "어업공학전공",
        collegeId: "fisheries-science",
        majors: [],
      },
      {
        id: "navigation",
        name: "항해공학전공",
        collegeId: "fisheries-science",
        majors: [],
      },
    ],
  },

  // 환경·해양대학
  {
    id: "environmental-marine",
    name: "환경·해양대학",
    departments: [
      {
        id: "env-marine-free-major",
        name: "환경·해양대학 자유전공학부",
        collegeId: "environmental-marine",
        majors: [],
      },
      {
        id: "earth-environmental",
        name: "자구환경시스템과학부",
        collegeId: "environmental-marine",
        majors: [
          {
            id: "environmental-system",
            name: "환경지질과학전공",
            departmentId: "earth-environmental",
            collegeId: "environmental-marine",
          },
          {
            id: "atmospheric-science",
            name: "환경대기과학전공",
            departmentId: "earth-environmental",
            collegeId: "environmental-marine",
          },
        ],
      },
      {
        id: "environmental-engineering",
        name: "환경공학과",
        collegeId: "environmental-marine",
        majors: [],
      },
      {
        id: "ocean-engineering",
        name: "해양공학과",
        collegeId: "environmental-marine",
        majors: [],
      },
      {
        id: "energy-resources",
        name: "에너지자원공학과",
        collegeId: "environmental-marine",
        majors: [],
      },
    ],
  },

  // 정보융합대학
  {
    id: "information-convergence",
    name: "정보융합대학",
    departments: [
      {
        id: "info-convergence-free-major",
        name: "정보융합대학 자유전공학부",
        collegeId: "information-convergence",
        majors: [],
      },
      {
        id: "bigdata-convergence",
        name: "빅데이터융합전공",
        collegeId: "information-convergence",
        majors: [],
      },
      {
        id: "data-information",
        name: "데이터정보과학부",
        collegeId: "information-convergence",
        majors: [
          {
            id: "statistics-data-science",
            name: "통계·데이터사이언스전공",
            departmentId: "data-information",
            collegeId: "information-convergence",
          },
        ],
      },
      {
        id: "media",
        name: "미디어커뮤니케이션학전공",
        collegeId: "information-convergence",
        majors: [],
      },
      {
        id: "humanities-info",
        name: "인문정보전공",
        collegeId: "information-convergence",
        majors: [],
      },
      {
        id: "smart-healthcare",
        name: "스마트헬스케어학부",
        collegeId: "information-convergence",
        majors: [
          {
            id: "marine-sports",
            name: "해양스포츠전공",
            departmentId: "smart-healthcare",
            collegeId: "information-convergence",
          },
          {
            id: "human-bio-convergence",
            name: "휴먼바이오융합전공",
            departmentId: "smart-healthcare",
            collegeId: "information-convergence",
          },
        ],
      },
      {
        id: "electronic-info-comm",
        name: "전자정보통신공학부",
        collegeId: "information-convergence",
        majors: [
          {
            id: "electronic-engineering",
            name: "전자공학전공",
            departmentId: "electronic-info-comm",
            collegeId: "information-convergence",
          },
          {
            id: "info-comm-engineering",
            name: "정보통신공학전공",
            departmentId: "electronic-info-comm",
            collegeId: "information-convergence",
          },
        ],
      },
      {
        id: "design",
        name: "조형학부",
        collegeId: "information-convergence",
        majors: [
          {
            id: "visual-design",
            name: "시각디자인전공",
            departmentId: "design",
            collegeId: "information-convergence",
          },
          {
            id: "industrial-design",
            name: "공업디자인전공",
            departmentId: "design",
            collegeId: "information-convergence",
          },
        ],
      },
      {
        id: "computer-ai",
        name: "컴퓨터·인공지능공학부",
        collegeId: "information-convergence",
        majors: [
          {
            id: "computer-engineering",
            name: "컴퓨터공학전공",
            departmentId: "computer-ai",
            collegeId: "information-convergence",
          },
          {
            id: "ai-engineering",
            name: "인공지능전공",
            departmentId: "computer-ai",
            collegeId: "information-convergence",
          },
        ],
      },
      {
        id: "dti-fusion",
        name: "디지털금융학과",
        collegeId: "information-convergence",
        majors: [],
      },
      {
        id: "smart-mobility",
        name: "스마트모빌리티공학과",
        collegeId: "information-convergence",
        majors: [],
      },
    ],
  },

  // 미래융합대학
  {
    id: "future-convergence",
    name: "미래융합대학",
    departments: [
      {
        id: "lifelong-counseling",
        name: "평생교육상담학전공",
        collegeId: "future-convergence",
        majors: [],
      },
      {
        id: "business-creation",
        name: "경영창업지원학전공",
        collegeId: "future-convergence",
        majors: [],
      },
      {
        id: "mechanical-service",
        name: "사회복지서비스학전공",
        collegeId: "future-convergence",
        majors: [],
      },
      {
        id: "electrical-control-service",
        name: "기계조선조융합전공",
        collegeId: "future-convergence",
        majors: [],
      },
      {
        id: "electro-it-service",
        name: "전기전자SW융합전공",
        collegeId: "future-convergence",
        majors: [],
      },
    ],
  },

  // 글로벌자율전공학부 (대학 단위, 하위 없음)
  {
    id: "global-liberal",
    name: "글로벌자율전공학부",
    departments: [],
  },

  // 학부대학 자유전공학부 (대학 단위, 하위 없음)
  {
    id: "undergraduate-college",
    name: "학부대학 자유전공학부",
    departments: [],
  },
];

// 유틸리티 함수들
export const getMajorUtils = {
  // 대학별 학부 가져오기
  getDepartmentsByCollege: (collegeId: string): Department[] => {
    const college = COLLEGE_DATA.find((c) => c.id === collegeId);
    return college ? college.departments : [];
  },

  // 학부별 전공 가져오기
  getMajorsByDepartment: (departmentId: string): Major[] => {
    for (const college of COLLEGE_DATA) {
      const department = college.departments.find((d) => d.id === departmentId);
      if (department) return department.majors;
    }
    return [];
  },

  // ID로 이름 찾기
  getCollegeName: (collegeId: string): string => {
    const college = COLLEGE_DATA.find((c) => c.id === collegeId);
    return college ? college.name : "";
  },

  getDepartmentName: (departmentId: string): string => {
    for (const college of COLLEGE_DATA) {
      const department = college.departments.find((d) => d.id === departmentId);
      if (department) return department.name;
    }
    return "";
  },

  getMajorName: (majorId: string): string => {
    for (const college of COLLEGE_DATA) {
      for (const department of college.departments) {
        const major = department.majors.find((m) => m.id === majorId);
        if (major) return major.name;
      }
    }
    return "";
  },

  // 선택값 초기화 유틸리티
  resetSelection: (
    currentSelection: SelectedMajorInfo,
    level: "college" | "department"
  ): SelectedMajorInfo => {
    if (level === "college") {
      return { college: currentSelection.college };
    } else if (level === "department") {
      return {
        college: currentSelection.college,
        department: currentSelection.department,
      };
    }
    return currentSelection;
  },
};
