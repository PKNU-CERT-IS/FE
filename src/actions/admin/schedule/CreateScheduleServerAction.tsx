"use server";

import { revalidatePath } from "next/cache";
import { ScheduleInfo } from "@/types/schedule";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createSchedule(data: ScheduleInfo) {
  // TODO: 실제 저장 로직
  revalidatePath("/admin");
}
