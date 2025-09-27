/**
 * startDate ~ endDate 기준 진행률(%)
 */
export function calculateProgress(startDate: string, endDate: string): number {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = new Date().getTime();

  if (now <= start) return 0;
  if (now >= end) return 100;

  const total = end - start;
  const elapsed = now - start;

  return Math.floor((elapsed / total) * 100);
}
