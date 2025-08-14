"use server";

import { revalidatePath } from "next/cache";
import { ScheduleInfo } from "@/types/schedule";

export async function createSchedule(data: ScheduleInfo) {
  // TODO: 실제 저장 로직
  revalidatePath("/admin");
}
