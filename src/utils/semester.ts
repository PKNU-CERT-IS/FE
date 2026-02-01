import { SemesterType } from "@/types/study";

const START_YEAR = 2025; // 시작 년도
const START_SEMESTER = 2; // 시작 학기

// study, project 학기 계산
export function getSemesterOptions(): SemesterType[] {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentSemester = now.getMonth() + 1 <= 6 ? 1 : 2;

  const semesters: SemesterType[] = [];

  let year = START_YEAR;
  let semester = START_SEMESTER;

  while (
    year < currentYear ||
    (year === currentYear && semester <= currentSemester)
  ) {
    semesters.push(`${year}-${semester === 1 ? "1" : "2"}` as SemesterType);

    if (semester === 1) {
      semester = 2;
    } else {
      semester = 1;
      year++;
    }
  }
  return ["ALL", ...semesters.reverse()]; // 학기 배치 순서(최신 -> 2025-2 순서)
}
export const SEMESTER_OPTIONS = getSemesterOptions();
export const SEMESTER_LABELS: Record<string, string> = {
  ALL: "전체",
};
SEMESTER_OPTIONS.forEach((sem) => {
  if (sem !== "ALL") {
    SEMESTER_LABELS[sem] = `${sem}학기`;
  }
});
