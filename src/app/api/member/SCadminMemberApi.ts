import { AdminMemberDetailInfoType } from "@/types/admin/adminMembers";
import { fetchWithAuth } from "@/lib/serverIntercept";

export async function getMembersForStaff(
  search?: string,
): Promise<AdminMemberDetailInfoType[]> {
  const query = search ? `?keyword=${encodeURIComponent(search)}` : "";

  const res = await fetchWithAuth(`/admin/member/search${query}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return [];
  }

  const { data } = await res.json();
  return data as AdminMemberDetailInfoType[];
}
