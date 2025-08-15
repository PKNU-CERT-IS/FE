import { NewPageCategoryType } from "@/types/newPageForm";

// type에 따라 목록을 반환하는 함수
export const getCategories = (type: NewPageCategoryType) => {
  switch (type) {
    case "board":
      return ["공지사항", "보안이슈", "활동내용", "기술자료", "질문"];
    case "blog":
      return ["CTF", "CS", "RED", "BLUE", "GRC", "MISC", "기타"];
    case "study":
      return [
        "웹 보안",
        "모의해킹",
        "암호학",
        "디지털 포렌식",
        "네트워크 보안",
        "기타",
      ];
    case "project":
      return [
        "웹 보안",
        "모의해킹",
        "암호학",
        "디지털 포렌식",
        "네트워크 보안",
        "기타",
      ];
    default:
      return [];
  }
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
      return "스터디 목표, 진행 방식등에 대한 설명을 입력하세요...";
    case "project":
      return "프로젝트 목표, 필요 기술등에 대한 설명을 입력하세요...";
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
