import { fetchWithAuth } from "@/lib/serverIntercept";
import { revalidatePath } from "next/cache";
export async function approveReservation(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) throw new Error("유효하지 않은 ID");

  const res = await fetchWithAuth(`/admin/schedule/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scheduleId: id, status: "APPROVED" }),
  });

  if (!res.ok) throw new Error("승인 실패");

  revalidatePath("/admin/schedule");
}

export async function rejectReservation(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) throw new Error("유효하지 않은 ID");
  const res = await fetchWithAuth(`/admin/schedule/update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scheduleId: id, status: "REJECTED" }),
  });

  if (!res.ok) throw new Error("거절 실패");

  revalidatePath("/admin/schedule");
}
