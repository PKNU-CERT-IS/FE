"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { StudyStatusType, studyStatus } from "@/types/profile";
import DefaultButton from "@/components/ui/defaultButton";

interface CCProfileStudyStatusFilterProps {
  selectedStatus: StudyStatusType;
}

export default function CCProfileStudyStatusFilter({
  selectedStatus,
}: CCProfileStudyStatusFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryChange = (status: StudyStatusType) => {
    const params = new URLSearchParams(searchParams);

    if (status === "전체") {
      params.delete("status");
    } else {
      params.set("status", status);
    }
    params.delete("page"); // 카테고리 변경 시 첫 페이지로

    const queryString = params.toString();
    const newUrl = queryString ? `/profile?${queryString}` : "/profile";
    router.push(newUrl);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {studyStatus.map((status) => (
        <DefaultButton
          key={status}
          variant={selectedStatus === status ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategoryChange(status)}
          className={
            selectedStatus === status
              ? "category-filter-active"
              : "category-filter dark:text-gray-200"
          }
        >
          {status}
        </DefaultButton>
      ))}
    </div>
  );
}
