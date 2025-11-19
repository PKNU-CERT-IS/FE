/**
 * 전화번호 포맷팅 함수 (회원가입, 프로필 수정 공통)
 * @param value - 입력된 전화번호 문자열
 * @returns 포맷된 전화번호 (예: 010-1234-5678)
 */
export const formatPhoneNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, "");

  if (!numbers) return "";

  if (numbers.length <= 3) {
    return numbers;
  } else if (numbers.length <= 7) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  } else {
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
      7,
      11,
    )}`;
  }
};

/**
 * 전공 문자열을 대학-학부-전공으로 파싱
 * @param majorString - "대학-학부-전공" 형식의 문자열
 * @returns 파싱된 객체 { college, department, major }
 */
export const parseMajorString = (
  majorString: string | undefined,
): {
  college?: string;
  department?: string;
  major?: string;
} => {
  if (!majorString) return {};

  const parts = majorString.split("-");

  return {
    college: parts[0]?.trim() || undefined,
    department: parts[1]?.trim() || undefined,
    major: parts[2]?.trim() || undefined,
  };
};

/**
 * 전공 선택 정보를 문자열로 변환
 * @param selectedMajor - 선택된 전공 정보
 * @returns "대학-학부-전공" 형식의 문자열
 */
export const formatMajorString = (selectedMajor: {
  college?: string;
  department?: string;
  major?: string;
}): string => {
  return [selectedMajor.college, selectedMajor.department, selectedMajor.major]
    .filter(Boolean)
    .join("-");
};
