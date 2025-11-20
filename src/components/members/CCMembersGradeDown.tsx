"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MembersGradeCategoryType } from "@/types/members";
import { gradeOptions } from "@/utils/membersUtils";
import MembersDropdown from "@/components/members/CCMembersDropdown";

export default function MembersGradeDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentGrade = searchParams.get("grade") || "";

  const handleGradeChange = (value: MembersGradeCategoryType) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("grade", value);
    } else {
      params.delete("grade");
    }

    startTransition(() => {
      router.push(`/members?${params.toString()}`);
    });
  };

  return (
    <MembersDropdown
      value={currentGrade as MembersGradeCategoryType}
      onValueChange={handleGradeChange}
      options={gradeOptions}
      placeholder="학년"
      className="w-full sm:w-32"
      disabled={isPending}
    />
  );
}
