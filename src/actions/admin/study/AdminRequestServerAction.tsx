"use server";
import { revalidatePath } from "next/cache";

export async function approveRequest(formData: FormData) {
  const id = formData.get("id") as string;
  console.log("승인", id);

  // 페이지 자동 갱신
  revalidatePath("/admin/study");
}

export async function rejectRequest(formData: FormData) {
  const id = formData.get("id") as string;
  console.log("거절", id);

  // 페이지 자동 갱신
  revalidatePath("/admin/study");
}
