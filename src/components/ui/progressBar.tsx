"server-only";

import { getProgressColor } from "@/utils/studyHelper";

interface ProgressBarProps {
  value: number;
  className?: string;
}

export default function ProgressBar({
  value,
  className = "",
}: ProgressBarProps) {
  const progressColor = getProgressColor(value);

  return (
    <div className={`w-full bg-gray-200 rounded-full ${className}`}>
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{
          width: `${Math.min(Math.max(value, 0), 100)}%`,
          backgroundColor: progressColor,
        }}
      />
    </div>
  );
}
