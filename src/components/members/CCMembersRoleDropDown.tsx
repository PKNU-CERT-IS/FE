"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MembersRoleCategoryType } from "@/types/members";
import { roleOptions } from "@/utils/membersUtils";
import MembersDropdown from "@/components/members/CCMembersDropdown";

export default function MembersRoleDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentRole = searchParams.get("role") || "";

  const handleRoleChange = (value: MembersRoleCategoryType) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("role", value);
    } else {
      params.delete("role");
    }

    startTransition(() => {
      router.push(`/members?${params.toString()}`);
    });
  };

  return (
    <MembersDropdown
      value={currentRole as MembersRoleCategoryType}
      onValueChange={handleRoleChange}
      options={roleOptions}
      placeholder="직책"
      className="w-full sm:w-32"
      disabled={isPending}
    />
  );
}
