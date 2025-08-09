// 유예기간 관련 코드 (수정 예정)
export const penaltyGracePeriod = (dateString: string) => {
  const targetDate = new Date(dateString);
  const today = new Date();
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 0) return `D-${diffDays}`;
  if (diffDays === 0) return "D-Day";
  return `D+${Math.abs(diffDays)}`;
};
