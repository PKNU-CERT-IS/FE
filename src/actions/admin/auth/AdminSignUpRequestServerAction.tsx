"use server";
import { revalidatePath } from "next/cache";

export async function approveSignUp(formData: FormData) {
  const id = formData.get("id") as string;
  console.log("승인", id);

  // 실제로는 DB 업데이트
  // await db.reservation.update({
  //   where: { id: parseInt(id) },
  //   data: { status: 'approved' }
  // });

  // 페이지 자동 갱신
  revalidatePath("/admin");
}

export async function rejectSignUp(formData: FormData) {
  const id = formData.get("id") as string;
  console.log("거절", id);

  // 실제로는 DB 업데이트
  // await db.reservation.update({
  //   where: { id: parseInt(id) },
  //   data: { status: 'rejected' }
  // });

  // 페이지 자동 갱신
  revalidatePath("/admin");
}
