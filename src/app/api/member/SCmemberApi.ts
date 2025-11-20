import { AdminMemberDetailInfoType } from "@/types/admin/adminMembers";
import { fetchWithAuth } from "@/lib/serverIntercept";

interface MemberSearchParams {
  grade?: string;
  role?: string;
  keyword?: string;
}

export async function getMembers(
  params: MemberSearchParams,
): Promise<AdminMemberDetailInfoType[]> {
  const queryString = new URLSearchParams(
    Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(params).filter(([_, v]) => v && v.length > 0), // 값 없는 건 제외
    ),
  ).toString();

  const res = await fetchWithAuth(`/member/search?${queryString}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    return [];
  }

  const { data } = await res.json();
  return data as AdminMemberDetailInfoType[];
}
